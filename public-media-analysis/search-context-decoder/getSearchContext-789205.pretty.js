one ? r(e.value) : (t = e.value, t instanceof i ? t : new i(function(e) {
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
        }, e.prototype.ontext = function(e) {
          var t = this.options.normalizeWhitespace,
            i = this.lastNode;
          if (i && i.type === o.ElementType.Text) t ? i.data = (i.data + e).replace(s, " ") : i.data += e, this.options.withEndIndices && (i.endIndex = this.parser.endIndex);
          else {
            t && (e = e.replace(s, " "));
            var n = new a.Text(e);
            this.addNode(n), this.lastNode = n
          }
        }, e.prototype.oncomment = function(e) {
          if (this.lastNode && this.lastNode.type === o.ElementType.Comment) this.lastNode.data += e;
          else {
            var t = new a.Comment(e);
            this.addNode(t), this.lastNode = t
          }
        }, e.prototype.oncommentend = function() {
          this.lastNode = null
        }, e.prototype.oncdatastart = function() {
          var e = new a.Text(""),
            t = new a.NodeWithChildren(o.ElementType.CDATA, [e]);
          this.addNode(t), e.parent = t, this.lastNode = e
        }, e.prototype.oncdataend = function() {
          this.lastNode = null
        }, e.prototype.onprocessinginstruction = function(e, t) {
          var i = new a.ProcessingInstruction(e, t);
          this.addNode(i)
        }, e.prototype.handleCallback = function(e) {
          if ("function" === typeof this.callback) this.callback(e, this.dom);
          else if (e) throw e
        }, e.prototype.addNode = function(e) {
          var t = this.tagStack[this.tagStack.length - 1],
            i = t.children[t.children.length - 1];
          this.options.withStartIndices && (e.startIndex = this.parser.startIndex), this.options.withEndIndices && (e.endIndex = this.parser.endIndex), t.children.push(e), i && (e.prev = i, i.next = e), e.parent = t, this.lastNode = null
        }, e
      }();
    t.DomHandler = c, t.default = c
  }, 52435(e, t, i) {
    "use strict";
    var n, r = this && this.__extends || (n = function(e, t) {
        return n = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function(e, t) {
          e.__proto__ = t
        } || function(e, t) {
          for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
        }, n(e, t)
      }, function(e, t) {
        if ("function" !== typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

        function i() {
          this.constructor = e
        }
        n(e, t), e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, new i)
      }),
      o = this && this.__assign || function() {
        return o = Object.assign || function(e) {
          for (var t, i = 1, n = arguments.length; i < n; i++)
            for (var r in t = arguments[i]) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          return e
        }, o.apply(this, arguments)
      };
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.cloneNode = t.hasChildren = t.isDocument = t.isDirective = t.isComment = t.isText = t.isCDATA = t.isTag = t.Element = t.Document = t.NodeWithChildren = t.ProcessingInstruction = t.Comment = t.Text = t.DataNode = t.Node = void 0;
    var a = i(45413),
      s = new Map([
        [a.ElementType.Tag, 1],
        [a.ElementType.Script, 1],
        [a.ElementType.Style, 1],
        [a.ElementType.Directive, 1],
        [a.ElementType.Text, 3],
        [a.ElementType.CDATA, 4],
        [a.ElementType.Comment, 8],
        [a.ElementType.Root, 9]
      ]),
      l = function() {
        function e(e) {
          this.type = e, this.parent = null, this.prev = null, this.next = null, this.startIndex = null, this.endIndex = null
        }
        return Object.defineProperty(e.prototype, "nodeType", {
          get: function() {
            var e;
            return null !== (e = s.get(this.type)) && void 0 !== e ? e : 1
          },
          enumerable: !1,
          configurable: !0
        }), Object.defineProperty(e.prototype, "parentNode", {
          get: function() {
            return this.parent
          },
          set: function(e) {
            this.parent = e
          },
          enumerable: !1,
          configurable: !0
        }), Object.defineProperty(e.prototype, "previousSibling", {
          get: function() {
            return this.prev
          },
          set: function(e) {
            this.prev = e
          },
          enumerable: !1,
          configurable: !0
        }), Object.defineProperty(e.prototype, "nextSibling", {
          get: function() {
            return this.next
          },
          set: function(e) {
            this.next = e
          },
          enumerable: !1,
          configurable: !0
        }), e.prototype.cloneNode = function(e) {
          return void 0 === e && (e = !1), k(this, e)
        }, e
      }();
    t.Node = l;
    var c = function(e) {
      function t(t, i) {
        var n = e.call(this, t) || this;
        return n.data = i, n
      }
      return r(t, e), Object.defineProperty(t.prototype, "nodeValue", {
        get: function() {
          return this.data
        },
        set: function(e) {
          this.data = e
        },
        enumerable: !1,
        configurable: !0
      }), t
    }(l);
    t.DataNode = c;
    var u = function(e) {
      function t(t) {
        return e.call(this, a.ElementType.Text, t) || this
      }
      return r(t, e), t
    }(c);
    t.Text = u;
    var h = function(e) {
      function t(t) {
        return e.call(this, a.ElementType.Comment, t) || this
      }
      return r(t, e), t
    }(c);
    t.Comment = h;
    var d = function(e) {
      function t(t, i) {
        var n = e.call(this, a.ElementType.Directive, i) || this;
        return n.name = t, n
      }
      return r(t, e), t
    }(c);
    t.ProcessingInstruction = d;
    var p = function(e) {
      function t(t, i) {
        var n = e.call(this, t) || this;
        return n.children = i, n
      }
      return r(t, e), Object.defineProperty(t.prototype, "firstChild", {
        get: function() {
          var e;
          return null !== (e = this.children[0]) && void 0 !== e ? e : null
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(t.prototype, "lastChild", {
        get: function() {
          return this.children.length > 0 ? this.children[this.children.length - 1] : null
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(t.prototype, "childNodes", {
        get: function() {
          return this.children
        },
        set: function(e) {
          this.children = e
        },
        enumerable: !1,
        configurable: !0
      }), t
    }(l);
    t.NodeWithChildren = p;
    var f = function(e) {
      function t(t) {
        return e.call(this, a.ElementType.Root, t) || this
      }
      return r(t, e), t
    }(p);
    t.Document = f;
    var g = function(e) {
      function t(t, i, n, r) {
        void 0 === n && (n = []), void 0 === r && (r = "script" === t ? a.ElementType.Script : "style" === t ? a.ElementType.Style : a.ElementType.Tag);
        var o = e.call(this, r, n) || this;
        return o.name = t, o.attribs = i, o
      }
      return r(t, e), Object.defineProperty(t.prototype, "tagName", {
        get: function() {
          return this.name
        },
        set: function(e) {
          this.name = e
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(t.prototype, "attributes", {
        get: function() {
          var e = this;
          return Object.keys(this.attribs).map(function(t) {
            var i, n;
            return {
              name: t,
              value: e.attribs[t],
              namespace: null === (i = e["x-attribsNamespace"]) || void 0 === i ? void 0 : i[t],
              prefix: null === (n = e["x-attribsPrefix"]) || void 0 === n ? void 0 : n[t]
            }
          })
        },
        enumerable: !1,
        configurable: !0
      }), t
    }(p);

    function m(e) {
      return (0, a.isTag)(e)
    }

    function v(e) {
      return e.type === a.ElementType.CDATA
    }

    function b(e) {
      return e.type === a.ElementType.Text
    }

    function w(e) {
      return e.type === a.ElementType.Comment
    }

    function y(e) {
      return e.type === a.ElementType.Directive
    }

    function x(e) {
      return e.type === a.ElementType.Root
    }

    function k(e, t) {
      var i;
      if (void 0 === t && (t = !1), b(e)) i = new u(e.data);
      else if (w(e)) i = new h(e.data);
      else if (m(e)) {
        var n = t ? _(e.children) : [],
          r = new g(e.name, o({}, e.attribs), n);
        n.forEach(function(e) {
          return e.parent = r
        }), null != e.namespace && (r.namespace = e.namespace), e["x-attribsNamespace"] && (r["x-attribsNamespace"] = o({}, e["x-attribsNamespace"])), e["x-attribsPrefix"] && (r["x-attribsPrefix"] = o({}, e["x-attribsPrefix"])), i = r
      } else if (v(e)) {
        n = t ? _(e.children) : [];
        var s = new p(a.ElementType.CDATA, n);
        n.forEach(function(e) {
          return e.parent = s
        }), i = s
      } else if (x(e)) {
        n = t ? _(e.children) : [];
        var l = new f(n);
        n.forEach(function(e) {
          return e.parent = l
        }), e["x-mode"] && (l["x-mode"] = e["x-mode"]), i = l
      } else {
        if (!y(e)) throw new Error("Not implemented yet: ".concat(e.type));
        var c = new d(e.name, e.data);
        null != e["x-name"] && (c["x-name"] = e["x-name"], c["x-publicId"] = e["x-publicId"], c["x-systemId"] = e["x-systemId"]), i = c
      }
      return i.startIndex = e.startIndex, i.endIndex = e.endIndex, null != e.sourceCodeLocation && (i.sourceCodeLocation = e.sourceCodeLocation), i
    }

    function _(e) {
      for (var t = e.map(function(e) {
          return k(e, !0)
        }), i = 1; i < t.length; i++) t[i].prev = t[i - 1], t[i - 1].next = t[i];
      return t
    }
    t.Element = g, t.isTag = m, t.isCDATA = v, t.isText = b, t.isComment = w, t.isDirective = y, t.isDocument = x, t.hasChildren = function(e) {
      return Object.prototype.hasOwnProperty.call(e, "children")
    }, t.cloneNode = k
  }, 36168(e) {
    e.exports = {
      CASE_SENSITIVE_TAG_NAMES: ["animateMotion", "animateTransform", "clipPath", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussainBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "foreignObject", "linearGradient", "radialGradient", "textPath"]
    }
  }, 86826(e, t, i) {
    var n = "html",
      r = "head",
      o = "body",
      a = /<([a-zA-Z]+[0-9]?)/,
      s = /<head.*>/i,
      l = /<body.*>/i,
      c = function() {
        throw new Error("This browser does not support `document.implementation.createHTMLDocument`")
      },
      u = function() {
        throw new Error("This browser does not support `DOMParser.prototype.parseFromString`")
      };
    if ("function" === typeof window.DOMParser) {
      var h = new window.DOMParser;
      c = u = function(e, t) {
        return t && (e = "<" + t + ">" + e + "</" + t + ">"), h.parseFromString(e, "text/html")
      }
    }
    if (document.implementation) {
      var d = i(95673).isIE,
        p = document.implementation.createHTMLDocument(d() ? "html-dom-parser" : void 0);
      c = function(e, t) {
        return t ? (p.documentElement.getElementsByTagName(t)[0].innerHTML = e, p) : (p.documentElement.innerHTML = e, p)
      }
    }
    var f, g = document.createElement("template");
    g.content && (f = function(e) {
        return g.innerHTML = e, g.content.childNodes
      }), e.exports = function(e) {
        var t, i, h, d, p = e.match(a);
        switch (p && p[1] && (t = p[1].toLowerCase()), t) {
          case n:
            return i = u(e), s.test(e) || (h = i.getElementsByTagName(r)[0]) && h.parentNode.removeChild(h), l.test(e) || (h = i.getE