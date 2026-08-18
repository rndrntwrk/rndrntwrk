class rn {
  static getSearchIndex(e, t) {
    return nn(this, void 0, void 0, function*() {
      const i = t ? rn.SRS_AUTHENTICATED_ROOT_URL : rn.SRS_UNAUTHENTICATED_ROOT_URL,
        n = rn.toURLSearchParams(e).toString();
      return rn.authenticatedFetch(`${i}getSearchIndex?${n}`, t)
    })
  }
  static getSearchContext(e, t) {
    return nn(this, void 0, void 0, function*() {
      const i = t ? rn.SRS_AUTHENTICATED_ROOT_URL : rn.SRS_UNAUTHENTICATED_ROOT_URL;
      return rn.authenticatedFetchPost(`${i}getSearchContext`, JSON.stringify(Object.assign(Object.assign({}, e), {
        clientVersion: rn.CLIENT_VERSION
      })), t)
    })
  }
  static authenticatedFetch(e, t) {
    return nn(this, void 0, void 0, function*() {
      return Ui.fetchJson(e, rn.constructHeaders(t))
    })
  }
  static authenticatedFetchPost(e, t, i) {
    return Ui.fetchJson(e, rn.constructHeaders(i), !0, t)
  }
  static toURLSearchParams(e) {
    const t = new URLSearchParams;
    return Object.keys(e).map(i => t.append(i, e[i])), t
  }
  static constructHeaders(e) {
    return e ? {
      "X-ADP-Session-Token": e
    } : void 0
  }
}