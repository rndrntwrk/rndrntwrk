class Ki {
  constructor(e) {
    var t;
    this.HEADER_SIZE = 28, this.MAGIC = "AZSA", this.wordsFile = e.wordsFile, this.propertiesFile = e.propertiesFile, this.positionsFile = e.positionsFile, this.maximumPosition = null !== (t = e.maximumPosition) && void 0 !== t ? t : Number.MAX_SAFE_INTEGER, this.positionsDataView = new DataView(this.positionsFile), this.directory = this.parseDirectory(), this.properties = this.parseProperties(), this.wordsBufferLocation = this.parseWords(), this.searchCache = new Map
  }
  getPositions(e) {
    let t = this.searchCache.get(e);
    if (!t) {
      const i = this.wordsBufferLocation.get(e);
      i && i.length > 0 && (t = this.readPositions(i), this.searchCache.set(e, t))
    }
    return Promise.resolve(t ? t.slice() : void 0)
  }
  getProperty(e) {
    return this.properties.get(e)
  }
  parseDirectory() {
    if (this.positionsFile.byteLength < this.HEADER_SIZE) throw new Error("Index positions file is too small");
    this.validateMagic();
    const e = this.positionsFile.byteLength - this.HEADER_SIZE,
      t = this.positionsDataView.getUint32(e),
      i = this.positionsDataView.getUint32(e + 4),
      n = this.positionsDataView.getUint32(e + 8);
    if (this.positionsFile.byteLength !== t) throw new Error("Index positions file size do not match header");
    let r = i;
    const o = new Map;
    for (; r < i + n;) {
      const e = this.parseDirectoryEntry(r);
      o.set(e.name, e), r += e.entryLength
    }
    const a = this.readEntry(o.get("BytesPerEntity")),
      s = this.readEntry(o.get("MinimumTitleEntityValue")),
      l = o.get("SearchBoundaryPositions"),
      c = o.get("Positions");
    if (!l || !c) throw new Error("Missing required entries");
    return {
      bytesPerEntity: a,
      minimumTitleEntityValue: s,
      searchBoundaryPositions: {
        offset: l.offset,
        length: l.length
      },
      positions: {
        offset: c.offset,
        length: c.length
      }
    }
  }
  validateMagic() {
    const e = new TextDecoder,
      t = new Uint8Array(this.positionsFile, 0, this.MAGIC.length);
    if (e.decode(t) !== this.MAGIC) throw new Error("Invalid magic value")
  }
  parseDirectoryEntry(e) {
    const t = new TextDecoder,
      i = this.positionsDataView.getUint32(e),
      n = this.positionsDataView.getUint32(e + 4),
      r = this.positionsDataView.getUint8(e + 8),
      o = new Uint8Array(this.positionsFile, e + 9, r);
    return {
      name: t.decode(o),
      offset: i,
      length: n,
      entryLength: r + 9
    }
  }
  readEntry(e) {
    if (!e) throw new Error("Invalid entry");
    if (1 === e.length) return this.positionsDataView.getUint8(e.offset);
    if (2 === e.length) return this.positionsDataView.getUint16(e.offset);
    if (4 === e.length) return this.positionsDataView.getUint32(e.offset);
    throw new Error("Invalid entry length")
  }
  parseProperties() {
    const e = /(.*?)=(.*)/,
      t = new Map;
    return this.propertiesFile.split("\n").forEach(i => {
      if (i) {
        const n = e.exec(i);
        n && 3 === n.length && t.set(n[1], n[2])
      }
    }), t
  }
  parseWords() {
    const e = new Map;
    return this.wordsFile.split("\n").forEach(t => {
      if (t) {
        const i = t.split(":");
        if (i && 3 === i.length) {
          const t = {
            offset: parseInt(i[0], 10),
            length: parseInt(i[1], 10)
          };
          e.set(i[2], t)
        }
      }
    }), e
  }
  readPositions(e) {
    const t = [],
      i = this.directory.bytesPerEntity,
      n = this.directory.positions.offset + e.offset * i;
    for (let r = 0; r < e.length; r++) {
      const e = n + r * i;
      this.readPosition(e) <= this.maximumPosition && t.push(this.readPosition(e))
    }
    return t
  }
  readPosition(e) {
    const t = this.directory.minimumTitleEntityValue,
      i = this.positionsDataView;
    switch (this.directory.bytesPerEntity) {
      case 1:
        return i.getUint8(e) + t;
      case 2:
        return i.getUint16(e) + t;
      case 3:
        return (i.getUint8(e) << 16) + i.getUint16(e + 1) + t;
      case 4:
        return i.getUint32(e) + t;
      default:
        throw new Error("Unsupported BPE")
    }
  }
}