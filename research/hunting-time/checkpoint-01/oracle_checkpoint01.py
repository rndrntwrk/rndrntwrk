#!/usr/bin/env python3
"""Checkpoint-01 independent Bitcoin/Electrum derivation oracle.

Uses Python stdlib plus cryptography for secp256k1 public-key serialization.
It intentionally does not import Electrum for the independent branch.
"""
from __future__ import annotations

import argparse
import hashlib
import hmac
import json
import struct
import unicodedata
from dataclasses import dataclass
from typing import Iterable, Sequence

from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import ec

SECP256K1_N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
HARDENED = 0x80000000
ELECTRUM_SEGWIT_PREFIX = "100"


def normalize_text(text: str) -> str:
    return unicodedata.normalize("NFKD", " ".join(text.split()))


def electrum_seed_bytes(mnemonic: str, passphrase: str = "") -> bytes:
    mnemonic_n = normalize_text(mnemonic)
    passphrase_n = unicodedata.normalize("NFKD", passphrase or "")
    return hashlib.pbkdf2_hmac(
        "sha512",
        mnemonic_n.encode("utf-8"),
        b"electrum" + passphrase_n.encode("utf-8"),
        2048,
    )


def bip39_seed_bytes(mnemonic: str, passphrase: str = "") -> bytes:
    mnemonic_n = normalize_text(mnemonic)
    passphrase_n = unicodedata.normalize("NFKD", passphrase or "")
    return hashlib.pbkdf2_hmac(
        "sha512",
        mnemonic_n.encode("utf-8"),
        b"mnemonic" + passphrase_n.encode("utf-8"),
        2048,
    )


def electrum_seed_version(mnemonic: str) -> str:
    digest = hmac.new(
        b"Seed version",
        normalize_text(mnemonic).encode("utf-8"),
        hashlib.sha512,
    ).hexdigest()
    return digest[:3]


def compressed_pubkey(secret: int) -> bytes:
    if not 1 <= secret < SECP256K1_N:
        raise ValueError("invalid secp256k1 secret")
    key = ec.derive_private_key(secret, ec.SECP256K1())
    return key.public_key().public_bytes(
        serialization.Encoding.X962,
        serialization.PublicFormat.CompressedPoint,
    )


@dataclass(frozen=True)
class BIP32PrivateNode:
    secret: int
    chain_code: bytes

    @classmethod
    def from_seed(cls, seed: bytes) -> "BIP32PrivateNode":
        i64 = hmac.new(b"Bitcoin seed", seed, hashlib.sha512).digest()
        secret = int.from_bytes(i64[:32], "big")
        if not 1 <= secret < SECP256K1_N:
            raise ValueError("invalid BIP32 root secret")
        return cls(secret=secret, chain_code=i64[32:])

    def child(self, index: int) -> "BIP32PrivateNode":
        if not 0 <= index <= 0xFFFFFFFF:
            raise ValueError("child index out of range")
        if index & HARDENED:
            data = b"\x00" + self.secret.to_bytes(32, "big")
        else:
            data = compressed_pubkey(self.secret)
        data += struct.pack(">I", index)
        i64 = hmac.new(self.chain_code, data, hashlib.sha512).digest()
        tweak = int.from_bytes(i64[:32], "big")
        if tweak >= SECP256K1_N:
            raise ValueError("invalid BIP32 tweak")
        secret = (self.secret + tweak) % SECP256K1_N
        if secret == 0:
            raise ValueError("invalid zero BIP32 child")
        return BIP32PrivateNode(secret=secret, chain_code=i64[32:])

    def derive(self, path: Sequence[int]) -> "BIP32PrivateNode":
        node = self
        for index in path:
            node = node.child(index)
        return node


def hash160(data: bytes) -> bytes:
    return hashlib.new("ripemd160", hashlib.sha256(data).digest()).digest()


BECH32_ALPHABET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l"


def bech32_polymod(values: Iterable[int]) -> int:
    generators = [0x3B6A57B2, 0x26508E6D, 0x1EA119FA, 0x3D4233DD, 0x2A1462B3]
    chk = 1
    for value in values:
        top = chk >> 25
        chk = ((chk & 0x1FFFFFF) << 5) ^ value
        for i, generator in enumerate(generators):
            if (top >> i) & 1:
                chk ^= generator
    return chk


def bech32_hrp_expand(hrp: str) -> list[int]:
    return [ord(c) >> 5 for c in hrp] + [0] + [ord(c) & 31 for c in hrp]


def bech32_create_checksum(hrp: str, data: Sequence[int]) -> list[int]:
    values = bech32_hrp_expand(hrp) + list(data)
    polymod = bech32_polymod(values + [0] * 6) ^ 1
    return [(polymod >> 5 * (5 - i)) & 31 for i in range(6)]


def convertbits(data: bytes, from_bits: int, to_bits: int, pad: bool = True) -> list[int]:
    acc = 0
    bits = 0
    ret: list[int] = []
    maxv = (1 << to_bits) - 1
    max_acc = (1 << (from_bits + to_bits - 1)) - 1
    for value in data:
        if value < 0 or value >> from_bits:
            raise ValueError("invalid convertbits input")
        acc = ((acc << from_bits) | value) & max_acc
        bits += from_bits
        while bits >= to_bits:
            bits -= to_bits
            ret.append((acc >> bits) & maxv)
    if pad:
        if bits:
            ret.append((acc << (to_bits - bits)) & maxv)
    elif bits >= from_bits or ((acc << (to_bits - bits)) & maxv):
        raise ValueError("invalid padding")
    return ret


def p2wpkh_address(pubkey: bytes, hrp: str = "bc") -> str:
    program = hash160(pubkey)
    data = [0] + convertbits(program, 8, 5, True)
    combined = data + bech32_create_checksum(hrp, data)
    return hrp + "1" + "".join(BECH32_ALPHABET[d] for d in combined)


def derive_address(seed: bytes, path: Sequence[int]) -> str:
    node = BIP32PrivateNode.from_seed(seed).derive(path)
    return p2wpkh_address(compressed_pubkey(node.secret))


def electrum_receiving_address(mnemonic: str, index: int = 0, passphrase: str = "") -> str:
    if index < 0:
        raise ValueError("index must be non-negative")
    return derive_address(electrum_seed_bytes(mnemonic, passphrase), [HARDENED, 0, index])


def bip84_receiving_address(mnemonic: str, index: int = 0, passphrase: str = "") -> str:
    if index < 0:
        raise ValueError("index must be non-negative")
    return derive_address(
        bip39_seed_bytes(mnemonic, passphrase),
        [84 | HARDENED, HARDENED, HARDENED, 0, index],
    )


def selftest_bip84() -> dict:
    phrase = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"
    expected = "bc1qcr8te4kr609gcawutmrza0j4xv80jy8z306fyu"
    actual = bip84_receiving_address(phrase, 0, "")
    if actual != expected:
        raise AssertionError(f"BIP84 self-test failed: expected {expected}, got {actual}")
    return {"passed": True, "path": "m/84'/0'/0'/0/0", "expected": expected, "actual": actual}


def selftest_electrum_seed_vector() -> dict:
    phrase = "wild father tree among universe such mobile favorite target dynamic credit identify"
    expected_seed_hex = (
        "aac2a6302e48577ab4b46f23dbae0774e2e62c796f797d0a1b5faeb528301e3"
        "064342dafb79069e7c4c6b8c38ae11d7a973bec0d4f70626f8cc5184a8d0b0756"
    )
    actual_seed_hex = electrum_seed_bytes(phrase, "").hex()
    version = electrum_seed_version(phrase)
    if actual_seed_hex != expected_seed_hex:
        raise AssertionError("Electrum PBKDF2 vector mismatch")
    if version != ELECTRUM_SEGWIT_PREFIX:
        raise AssertionError(f"Electrum seed version mismatch: {version}")
    return {
        "passed": True,
        "seed_version": version,
        "bip32_seed_sha256": hashlib.sha256(bytes.fromhex(actual_seed_hex)).hexdigest(),
        "independent_address": electrum_receiving_address(phrase, 0, ""),
        "path": "m/0'/0/0",
    }


def run_selftests() -> dict:
    return {"bip84": selftest_bip84(), "electrum_seed_vector": selftest_electrum_seed_vector()}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--selftest", action="store_true")
    parser.add_argument("--electrum-address", metavar="MNEMONIC")
    parser.add_argument("--index", type=int, default=0)
    args = parser.parse_args()
    if args.selftest:
        print(json.dumps(run_selftests(), indent=2, sort_keys=True))
        return 0
    if args.electrum_address:
        print(electrum_receiving_address(args.electrum_address, args.index))
        return 0
    parser.error("choose --selftest or --electrum-address")
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
