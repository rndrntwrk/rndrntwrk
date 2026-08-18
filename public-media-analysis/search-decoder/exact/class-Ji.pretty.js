class Ji {
  constructor(e, t) {
    this.searchIndexInfo = e, this.maximumPosition = t
  }
  getSearchIndex() {
    return this.searchIndexPromise || (this.searchIndexPromise = new Promise((e, t) => {
      const i = this.searchIndexInfo.s3Url.replace(/http:\/\//, "https://");
      fetch(i).then(t => Qi(this, void 0, void 0, function*() {
        if (!t.ok) throw new Error("SearchIndex request response not 2xx");
        {
          const i = yield t.arrayBuffer(), n = yield this.decryptSubtle(i, this.searchIndexInfo.decryptionKey, this.searchIndexInfo.decryptionIV), r = yield(0, Zi.loadAsync)(n), o = {
            maximumPosition: this.maximumPosition
          }, a = [];
          if (r.forEach((e, t) => {
              e.endsWith(".words") ? a.push(t.async("text").then(e => o.wordsFile = e)) : e.endsWith(".properties") ? a.push(t.async("text").then(e => o.propertiesFile = e)) : e.endsWith(".positions") && a.push(t.async("arraybuffer").then(e => o.positionsFile = e))
            }), yield Promise.all(a), !this.containsFileParameters(o)) throw new Error("Failed to download index files");
          e(new Ki(o))
        }
      })).catch(e => {
        t(e), this.searchIndexPromise = void 0
      })
    })), this.searchIndexPromise
  }
  containsFileParameters(e) {
    return !!(e.positionsFile && e.propertiesFile && e.wordsFile)
  }
  decryptSubtle(e, t, i) {
    return Qi(this, void 0, void 0, function*() {
      const n = this.base64ToArrayBuffer(t),
        r = this.base64ToArrayBuffer(i),
        o = yield window.crypto.subtle.importKey("raw", n, "AES-CBC", !1, ["decrypt"]);
      return yield window.crypto.subtle.decrypt({
        name: "AES-CBC",
        iv: r
      }, o, e)
    })
  }
  base64ToArrayBuffer(e) {
    const t = window.atob(e),
      i = t.length,
      n = new Uint8Array(i);
    for (let e = 0; e < i; e++) n[e] = t.charCodeAt(e);
    return n.buffer
  }
}