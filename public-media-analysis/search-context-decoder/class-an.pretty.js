class an {
  constructor(e) {
    this.contextService = e
  }
  addContext(e, t, i) {
    const n = this.contextService;
    let r;
    return Object.assign(Object.assign({}, i), {
      getContext() {
        return on(this, void 0, void 0, function*() {
          if (!r) {
            const o = yield i.getPositions();
            try {
              const i = yield n.getSearchContext(e, t, [o]);
              r = i[0]
            } catch (e) {
              r = ""
            }
          }
          return r
        })
      }
    })
  }
}