class un {
  getSearchIndexInfo(e, t, i, n, r) {
    var o;
    return cn(this, void 0, void 0, function*() {
      const a = yield rn.getSearchIndex({
        asin: e,
        contentVersion: t,
        formatVersion: i,
        facet: null !== n && void 0 !== n ? n : "YJ"
      }, r);
      return null !== (o = a.errorCode) && void 0 !== o ? o : {
        decryptionIV: a.decryptionIV,
        decryptionKey: a.decryptionKey,
        decryptionMethod: a.decryptionMethod,
        indexSize: a.indexSize,
        s3Url: a.s3Url
      }
    })
  }
}