"\u0178": "y", "\xe7": "c", "\xc7": "c", "\u0106": "c", "\u0107": "c", "\u0108": "c", "\u0109": "c", "\u010a": "c", "\u010b": "c", "\u010c": "c", "\u010d": "c", "\xd0": "d", "\u010e": "d", "\u010f": "d", "\xf0": "d", "\u011c": "g", "\u011d": "g", "\u011e": "g", "\u011f": "g", "\u0120": "g", "\u0121": "g", "\u0122": "g", "\u0123": "g", "\u0124": "h", "\u0125": "h", "\u0134": "j", "\u0135": "j", "\u0136": "k", "\u0137": "k", "\u0139": "l", "\u013a": "l", "\u013b": "l", "\u013c": "l", "\u013d": "l", "\u013e": "l", "\xf1": "n", "\xd1": "n", "\u0143": "n", "\u0144": "n", "\u0145": "n", "\u0146": "n", "\u0147": "n", "\u0148": "n", "\u0154": "r", "\u0155": "r", "\u0156": "r", "\u0157": "r", "\u0158": "r", "\u0159": "r", "\u015a": "s", "\u015b": "s", "\u015c": "s", "\u015d": "s", "\u015e": "s", "\u015f": "s", "\u0160": "s", "\u0161": "s", "\u0162": "t", "\u0163": "t", "\u0164": "t", "\u0165": "t", "\u0174": "w", "\u0175": "w", "\u0179": "z", "\u017a": "z", "\u017b": "z", "\u017c": "z", "\u017d": "z", "\u017e": "z", "\xdf": "s", "\xe6": "a", "\xc6": "a", "\xde": "t", "\xfe": "t", "\xd8": "o", "\xf8": "o"
};
var Ri = x(398),
  Bi = x(726),
  Di = x(903),
  Ni = function(e, t, i, n) {
    return new(i || (i = Promise))(function(r, o) {
      function a(e) {
        try {
          l(n.next(e))
        } catch (e) {
          o(e)
        }
      }

      function s(e) {
        try {
          l(n.throw(e))
        } catch (e) {
          o(e)
        }
      }

      function l(e) {
        var t;
        e.done ? r(e.value) : (t = e.value, t instanceof i ? t : new i(function(e) {
          e(t)
        })).then(a, s)
      }
      l((n = n.apply(e, t || [])).next())
    })
  };
class Hi {
  constructor(e, t) {
    this.wordStemmer = e, this.searchIndex = t, this.MAX_DISTANCE = 20
  }
  getPositionsResults(e) {
    return Ni(this, void 0, void 0, function*() {
      const t = [],
        i = yield this.wordStemmer.getStems(e);
      if (i.length > 0) {
        const e = yield Promise.all(i.map(e => Ni(this, void 0, void 0, function*() {
          var t;
          return null !== (t = yield this.searchIndex.getPositions(e)) && void 0 !== t ? t : []
        }))), n = e.length * this.MAX_DISTANCE;
        for (; this.noneAreEmpty(e);) {
          const i = e.map(this.getFirstElement),
            r = i.every(this.inOrderCalc),
            o = Math.min(...i),
            a = Math.max(...i);
          r && a - o <= n ? (e.forEach(this.removeFirstElement), t.push(this.buildResult(i))) : e.forEach(e => {
            e[0] === o && this.removeFirstElement(e)
          })
        }
      }
      return t
    })
  }
  noneAreEmpty(e) {
    return e.every(e => e.length > 0)
  }
  getFirstElement(e) {
    return e[0]
  }
  removeFirstElement(e) {
    e.shift()
  }
  inOrderCalc(e, t, i) {
    return 0 === t || i[t - 1] < e
  }
  buildResult(e) {
    return {
      getPositions: () => Promise.resolve(e)
    }
  }
}
var Vi = function(e, t, i, n) {
  return new(i || (i = Promise))(function(r, o) {
    function a(e) {
      try {
        l(n.next(e))
      } catch (e) {
        o(e)
      }
    }

    function s(e) {
      try {
        l(n.throw(e))
      } catch (e) {
        o(e)
      }
    }

    function l(e) {
      var t;
      e.done ? r(e.value) : (t = e.value, t instanceof i ? t : new i(function(e) {
        e(t)
      })).then(a, s)
    }
    l((n = n.apply(e, t || [])).next())
  })
};
class Fi extends Error {
  constructor(e) {
    super(e), this.name = "TimeoutError"
  }
}
class qi extends Error {
  constructor(e, t) {
    super(e), this.statusCode = t, this.name = "ServerError"
  }
}
class Ui {}
Ui.GATEWAY_TIMEOUT_STATUS_CODE = 504, Ui.fetchJson = (e, t, i, n) => Vi(void 0, void 0, void 0, function*() {
  return (yield Ui.fetch(e, t, i, n)).json()
}), Ui.fetch = (e, t, i, n) => Vi(void 0, void 0, void 0, function*() {
  let r = new Response;
  try {
    r = yield fetch(e, Ui.constructRequestInit(t, i, n))
  } catch (e) {
    throw navigator.onLine || Ui.dispatchOfflineEvent(), e
  }
  if (r.ok) return r;
  {
    const e = [...r.headers];
    if (r.status === Ui.GATEWAY_TIMEOUT_STATUS_CODE) throw Ui.dispatchOfflineEvent(), new Fi(`[TimeoutError] Timeout occurred while calling the service. Response Headers = ${e}.`);
    throw new qi(`[ServerError] Error occurred while calling the service. Response Headers = ${e}.`, r.status)
  }
}), Ui.constructRequestInit = (e, t, i) => {
  const n = Ui.constructHeader(e, t);
  return Object.assign(Object.assign({
    method: t ? "POST" : "GET"
  }, n ? {
    headers: n
  } : {}), i ? {
    body: i
  } : {})
}, Ui.constructHeader = (e, t) => Object.assign(Object.assign({}, e), t ? {
  Accept: "application/json",
  "Content-Type": "application/json"
} : {}), Ui.dispatchOfflineEvent = () => {
  window.dispatchEvent(new CustomEvent("customOffline"))
};
var Wi = function(e, t, i, n) {
  return new(i || (i = Promise))(function(r, o) {
    function a(e) {
      try {
        l(n.next(e))
      } catch (e) {
        o(e)
      }
    }

    function s(e) {
      try {
        l(n.throw(e))
      } catch (e) {
        o(e)
      }
    }

    function l(e) {
      var t;
      e.done ? r(e.value) : (t = e.value, t instanceof i ? t : new i(function(e) {
        e(t)
      })).then(a, s)
    }
    l((n = n.apply(e, t || [])).next())
  })
};
class Gi {
  constructor(e) {
    this.positionMapper = e
  }
  addLocation(e) {
    const t = this.positionMapper;
    let i = null;
    return Object.assign(Object.assign({}, e), {
      getLocation() {
        return Wi(this, void 0, void 0, function*() {
          if (null !== i) return i;
          try {
            const n = yield e.getPositions();
            i = yield t.convertPositionToLocation(n[0])
          } catch (e) {
            i = void 0
          }
          return i
        })
      }
    })
  }
  addPage(e) {
    const t = this.positionMapper;
    let i = null;
    return Object.assign(Object.assign({}, e), {
      getPage() {
        return Wi(this, void 0, void 0, function*() {
          if (null !== i) return i;
          try {
            const n = yield e.getPositions(), r = yield t.convertPositionToPage(n[0]);
            i = r || void 0
          } catch (e) {
            i = void 0
          }
          return i
        })
      }
    })
  }
}
var Yi = function(e, t, i, n) {
  return new(i || (i = Promise))(function(r, o) {
    function a(e) {
      try {
        l(n.next(e))
      } catch (e) {
        o(e)
      }
    }

    function s(e) {
      try {
        l(n.throw(e))
      } catch (e) {
        o(e)
      }
    }

    function l(e) {
      var t;
      e.done ? r(e.value) : (t = e.value, t instanceof i ? t : new i(function(e) {
        e(t)
      })).then(a, s)
    }
    l((n = n.apply(e, t || [])).next())
  })
};
class Xi {
  static create(e, t, i, n) {
    return {
      getResults(r, o, a) {
        return Yi(this, void 0, void 0, function*() {
          return (yield e.getPositionsResults(a)).map(e => {
            const a = t.addContext(r, o, e),
              s = i.addLocation(a);
            return n.addPage(s)
          })
        })
      }
    }
  }
}
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
var Zi = x(547),
  Qi = function(e, t, i, n) {
    return new(i || (i = Promise))(function(r, o) {
      function a(e) {
        try {
          l(n.next(e))
        } catch (e) {
          o(e)
        }
      }

      function s(e) {
        try {
          l(n.throw(e))
        } catch (e) {
          o(e)
        }
      }

      function l(e) {
        var t;
        e.done ? r(e.value) : (t = e.value, t instanceof i ? t : new i(function(e) {
          e(t)
        })).then(a, s)
      }
      l((n = n.apply(e, t || [])).next())
    })
  };
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
var en = x(637);
class tn {
  constructor(e) {
    var t;
    this.language = e;
    const i = tn.LANG_TO_ALGORITHM.get(e);
    if (!(i && (0, en.algorithms)().includes(i) && zi[e])) throw new Error("Unsupported language: " + e);
    this.stemmer = (0, en.newStemmer)(i), this.stopWords = zi[e], this.langAccentMap = null !== (t = ji[e]) && void 0 !== t ? t : {}
  }
  getStems(e) {
    const t = [];
    return this.sanitize(e).split(/[\s\n@-]+/).forEach(e => {
      const i = "en" === this.language ? this.englishFilter(e) : e;
      if (i.length > 0 && -1 === this.stopWords.indexOf(i)) {
        const e = this.stemmer.stem(i);
        "en" === this.language ? t.push(e) : t.push(this.sanitize(e))
      }
    }), Promise.resolve(t)
  }
  sanitize(e) {
    return e.replace(/[^A-Za-z0-9 ]/g, e => this.langAccentMap[e] || Ii[e] || e).replace(/[^A-Za-z0-9\s\n.@'-]/g, "").toLowerCase()
  }
  englishFilter(e) {
    return e.replace(/'s$|'|\.(?!\d)/g, "")
  }
}
tn.LANG_TO_ALGORITHM = new Map([
  ["da", "danish"],
  ["de", "german"],
  ["en", "porter"],
  ["es", "spanish"],
  ["fi", "finnish"],
  ["fr", "french"],
  ["hu", "hungarian"],
  ["it", "italian"],
  ["nl", "dutch"],
  ["no", "norwegian"],
  ["pt", "portuguese"],
  ["ro", "romanian"],
  ["sv", "swedish"],
  ["tr", "turkish"]
]);
var nn = function(e, t, i, n) {
  return new(i || (i = Promise))(function(r, o) {
    function a(e) {
      try {
        l(n.next(e))
      } catch (e) {
        o(e)
      }
    }

    function s(e) {
      try {
        l(n.throw(e))
      } catch (e) {
        o(e)
      }
    }

    function l(e) {
      var t;
      e.done ? r(e.value) : (t = e.value, t instanceof i ? t : new i(function(e) {
        e(t)
      })).then(a, s)
    }
    l((n = n.apply(e, t || [])).next())
  })
};
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
rn.SRS_AUTHENTICATED_ROOT_URL = "/service/mobile/reader/", rn.SRS_UNAUTHENTICATED_ROOT_URL = "/service/web/content/", rn.CLIENT_VERSION = "20000100";
var on = function(e, t, i, n) {
  return new(i || (i = Promise))(function(r, o) {
    function a(e) {
      try {
        l(n.next(e))
      } catch (e) {
        o(e)
      }
    }

    function s(e) {
      try {
        l(n.throw(e))
      } catch (e) {
        o(e)
      }
    }

    function l(e) {
      var t;
      e.done ? r(e.value) : (t = e.value, t instanceof i ? t : new i(function(e) {
        e(t)
      })).then(a, s)
    }
    l((n = n.apply(e, t || [])).next())
  })
};
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
var sn = function(e, t, i, n) {
  return new(i || (i = Promise))(function(r, o) {
    function a(e) {
      try {
        l(n.next(e))
      } catch (e) {
        o(e)
      }
    }

    function s(e) {
      try {
        l(n.throw(e))
      } catch (e) {
        o(e)
      }
    }

    function l(e) {
      var t;
      e.done ? r(e.value) : (t = e.value, t instanceof i ? t : new i(function(e) {
        e(t)
      })).then(a, s)
    }
    l((n = n.apply(e, t || [])).next())
  })
};
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
var cn = function(e, t, i, n) {
  return new(i || (i = Promise))(function(r, o) {
    function a(e) {
      try {
        l(n.next(e))
      } catch (e) {
        o(e)
      }
    }

    function s(e) {
      try {
        l(n.throw(e))
      } catch (e) {
        o(e)
      }
    }

    function l(e) {
      var t;
      e.done ? r(e.value) : (t = e.value, t instanceof i ? t : new i(function(e) {
        e(t)
      })).then(a, s)
    }
    l((n = n.apply(e, t || [])).next())
  })
};
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
var hn = x(13),
  dn = x(133);
const pn = e => {
h.q.updatePathPrefix(e.path), h.q.updateLanguage(e.language)
}
})(), k
})(), e.exports = n(i(61260), i(47679), i(46184), i(5556), i(27156), i(22558), i(46328), i(50029), i(17212), i(7793), i(35480), i(32252), i(2543), i(38221), i(23224), i(96540), i(75942), i(49130), i(54591))
}, 83539(e, t, i) {
    "use strict";
    var n = this && this.__createBinding || (Object.create ? function(e, t, i, n) {
        void 0 === n && (n = i);
        var r = Object.getOwnPropertyDescriptor(t, i);
        r && !("get" in r ? !t.__esModule : r.writable || r.configurable) || (r = {
          enumerable: !0,
          get: function() {
            return t[i]
          }
        }), Object.defineProperty(e, n, r)
      } : function(e, t, i, n) {
        void 0 === n && (n = i), e[n] = t[i]
      }),
      r = this && this.__exportStar || function(e, t) {
        for (var i in e) "default" === i || Object.prototype.hasOwnProperty.call(t, i) || n(t, e, i)
      };
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.DomHandler = void 0;
    var o = i(45413),
      a = i(52435);
    r(i(52435), t);
    var s = /\s+/g,
      l = {
        normalizeWhitespace: !1,
        withStartIndices: !1,
        withEndIndices: !1,
        xmlMode: !1
      },
      c = function() {
        function e(e, t, i) {
          this.dom = [], this.root = new a.Document(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null, "function" === typeof t && (i = t, t = l), "object" === typeof e && (t = e, e = void 0), this.callback = null !== e && void 0 !== e ? e : null, this.options = null !== t && void 0 !== t ? t : l, this.elementCB = null !== i && void 0 !== i ? i : null
        }
        return e.prototype.onparserinit = function(e) {
          this.parser = e
        }, e.prototype.onreset = function() {
          this.dom = [], this.root = new a.Document(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null
        }, e.prototype.onend = function() {
          this.done || (this.done = !0, this.parser = null, this.handleCallback(null))
        }, e.prototype.onerror = function(e) {
          this.handleCallback(e)
        }, e.prototype.onclosetag = function() {
          this.lastNode = null;
          var e = this.tagStack.pop();
          this.options.withEndIndices && (e.endIndex = this.parser.endIndex), this.elementCB && this.elementCB(e)
        }, e.prototype.onopentag = function(e, t) {
          var i = this.options.xmlMode ? o.ElementType.Tag : void 0,
            n = new a.Element(e, t, void 0, i);
          this.addNode(n), this.tagStack.push(n)
        }, e.prototype.ontext = fu