class ln {
  getSearchContext(e, t, i, n, r, o) {
    return sn(this, void 0, void 0, function*() {
      const a = yield rn.getSearchContext({
        asin: e,
        positions: i,
        refEmId: n,
        revision: t,
        yjACR: r
      }, o);
      return this.processContexts(a.searchContexts)
    })
  }
  processContexts(e) {
    return sn(this, void 0, void 0, function*() {
      const t = [];
      for (const i of e) {
        const e = yield this.decryptContext(i);
        t.push(e)
      }
      return t
    })
  }
  decryptContext(e) {
    return sn(this, void 0, void 0, function*() {
      const t = e.substring(0, 24),
        i = e.substring(24, 48),
        n = e.substring(48, e.length),
        r = this.base64StringToArrayBuffer(i),
        o = yield window.crypto.subtle.importKey("raw", this.base64StringToArrayBuffer(t), {
          name: "AES-GCM"
        }, !0, ["decrypt"]), a = this.base64StringToArrayBuffer(n), s = yield window.crypto.subtle.decrypt({
          name: "AES-GCM",
          iv: r,
          tagLength: 128
        }, o, a);
      return new TextDecoder("utf-8").decode(s)
    })
  }
  base64StringToArrayBuffer(e) {
    const t = atob(e),
      i = new Uint8Array(t.length);
    for (let e = 0; e < t.length; e++) i[e] = t.charCodeAt(e);
    return i.buffer
  }
}