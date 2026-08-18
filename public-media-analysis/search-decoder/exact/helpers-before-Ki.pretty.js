m = (0, e.useMemo)(() => new Nt.QueryClient, []), v = (0, e.useCallback)(e => {
  It().publish(g + "searchCallbacks:onItemClick", {
    positions: e
  })
}, [g]), b = (0, e.useCallback)(() => {
  It().publish(g + "searchCallbacks:onClearSearchResults")
}, [g]), w = (0, e.useCallback)(e => Ut(void 0, void 0, void 0, function*() {
  const t = e.detail.value;
  t ? i.performSearch(t) : b()
}), [i, b]), y = (0, e.useRef)(null), x = (0, e.useCallback)(e => {
  var t;
  (0, d.e)(e) && "BUTTON" === e.target.tagName && ((0, d._)(e.nativeEvent), b(), null === (t = y.current) || void 0 === t || t.setFocus())
}, [b]);
return (0, e.useEffect)(() => {
  const e = It().subscribe(g + "searchCallbacks:onClearSearchResults", r.onClearSearchResults);
  return () => {
    It().unsubscribe(e)
  }
}, [r, g]), (0, e.useEffect)(() => {
  const e = It().subscribe(g + "searchCallbacks:onItemClick", (e, t) => {
    r.onItemClick(t.positions)
  });
  return () => {
    It().unsubscribe(e)
  }
}, [r, g]), (0, e.useEffect)(() => {
  setTimeout(() => {
    var e;
    null === (e = y.current) || void 0 === e || e.getInputElement().then(e => {
      e.setAttribute("aria-label", (0, h.I)("search_placeholder", "Search for a word or phrase"))
    })
  }, 0)
}, [y]), t().createElement(t().Fragment, null, "Unavailable" === o && t().createElement("div", {
  className: "search-unavailable"
}, t().createElement("h3", {
  className: "search-unavailable__title"
}, (0, h.I)("search_unavailable", "Search not available")), t().createElement("p", {
  className: "search-unavailable__message"
}, (0, h.I)("search_unavailable_message", "Sorry this book is not yet enabled for searching. Please try again at a later time."))), "Initializing" === o && t().createElement(ne.a, null), "Unavailable" !== o && "Initializing" !== o && t().createElement(t().Fragment, null, t().createElement(n.IonHeader, {
  className: "search-header"
}, t().createElement(n.IonSearchbar, {
  placeholder: (0, h.I)("search_placeholder", "Search for a word or phrase"),
  className: "searchbar",
  showClearButton: "always",
  clearIcon: "close-sharp",
  value: s,
  onIonChange: e => {
    var t;
    return null === (t = r.onSearchInputChange) || void 0 === t ? void 0 : t.call(r, e.target.value)
  },
  onIonClear: b,
  debounce: c,
  onIonInput: w,
  onKeyDown: x,
  ref: y
}), t().createElement("div", {
  "aria-live": "polite",
  "aria-atomic": "true"
}, "Searching" !== o && s && a ? t().createElement("div", {
  className: "search-results-title"
}, (0, h.I)("search_results_found", "{results} results found", {
  results: a.length
})) : t().createElement("div", {
  "aria-label": (0, h.I)("search", "Search")
}))), t().createElement(n.IonContent, {
  className: "search-content"
}, "Searching" === o && t().createElement(re, {
  theme: p
}), a && a.length > 0 && t().createElement(Nt.QueryClientProvider, {
  client: m
}, t().createElement(qt, {
  searchResultsList: a || [],
  onItemClick: v,
  isPage: l,
  batchSize: u,
  theme: p,
  showEmptyContextItems: f
})))))
};
var Yt = x(748);
const Xt = () => t().createElement("svg", {
    width: "56px",
    height: "56px",
    viewBox: "0 0 56 56",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg"
  }, t().createElement("title", null, "Side Panel Close"), t().createElement("defs", null, t().createElement("circle", {
    id: "path-1",
    cx: "22",
    cy: "22",
    r: "22"
  }), t().createElement("filter", {
    x: "-21.6%",
    y: "-19.3%",
    width: "143.2%",
    height: "143.2%",
    filterUnits: "objectBoundingBox",
    id: "filter-2"
  }, t().createElement("feMorphology", {
    radius: "0.5",
    operator: "dilate",
    in: "SourceAlpha",
    result: "shadowSpreadOuter1"
  }), t().createElement("feOffset", {
    dx: "0",
    dy: "1",
    in: "shadowSpreadOuter1",
    result: "shadowOffsetOuter1"
  }), t().createElement("feGaussianBlur", {
    stdDeviation: "2.5",
    in: "shadowOffsetOuter1",
    result: "shadowBlurOuter1"
  }), t().createElement("feColorMatrix", {
    values: "0 0 0 0 0.109803922   0 0 0 0 0.117647059   0 0 0 0 0.125490196  0 0 0 0.4 0",
    type: "matrix",
    in: "shadowBlurOuter1"
  }))), t().createElement("g", {
    id: "Page-1",
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd"
  }, t().createElement("g", {
    id: "Side-Panel-Close",
    transform: "translate(6.000000, 5.000000)"
  }, t().createElement("g", {
    id: "Oval"
  }, t().createElement("use", {
    fill: "black",
    fillOpacity: "1",
    filter: "url(#filter-2)",
    href: "#path-1"
  }), t().createElement("use", {
    fill: "var(--background-color-secondary)",
    fillRule: "evenodd",
    href: "#path-1"
  })), t().createElement("g", {
    id: "Close",
    transform: "translate(16.000000, 16.000000)",
    stroke: "var(--ion-color-primary)",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.3"
  }, t().createElement("line", {
    x1: "0",
    y1: "0",
    x2: "12",
    y2: "12",
    id: "Path"
  }), t().createElement("line", {
    x1: "0",
    y1: "0",
    x2: "12",
    y2: "12",
    id: "Path",
    transform: "translate(6.000000, 6.000000) scale(1, -1) translate(-6.000000, -6.000000) "
  }))))),
  Kt = (0, e.forwardRef)(({
    onClose: e,
    className: i
  }, r) => t().createElement(n.IonFab, {
    className: i
  }, t().createElement("button", {
    ref: r,
    className: "side-menu-close-button",
    onClick: e,
    "aria-label": (0, h.I)("close", "Close")
  }, t().createElement(Xt, null))));
Kt.displayName = "SideMenuCloseButton";
var Zt = function(e, t, i, n) {
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
const Qt = ({
    contentId: i,
    menuId: r,
    side: o,
    swipeGesture: a,
    onSideMenuClose: s,
    displayMode: l,
    children: c
  }) => {
    const [u, h] = (0, e.useState)(!1), d = (0, e.useRef)(null), p = (0, e.useRef)(null), f = (0, e.useRef)(null), g = (0, e.useCallback)(() => {
      if (d.current) {
        const e = d.current.querySelector('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        e instanceof HTMLElement && (f.current = e, e.focus())
      }
    }, []), m = (0, e.useCallback)(() => {
      h(!0), g()
    }, [u]), v = (0, e.useCallback)(() => {
      h(!1)
    }, [u]), b = (0, e.useMemo)(() => "below-top-chrome" === l || "below-top-chrome-and-banner" === l, [l]), w = (0, e.useMemo)(() => "below-top-chrome" === l ? "side-menu-close" : "side-menu-close--below-banner", [l]), y = (0, e.useCallback)(e => document.activeElement === e, []), x = (0, e.useCallback)(e => {
      var t, i;
      "Tab" == e.key && (e.shiftKey && y(f.current) ? (e.preventDefault(), null === (t = p.current) || void 0 === t || t.focus()) : !e.shiftKey && y(p.current) && (e.preventDefault(), null === (i = f.current) || void 0 === i || i.focus()))
    }, [y]);
    return (0, e.useEffect)(() => (document.addEventListener("keydown", x), () => {
      document.removeEventListener("keydown", x)
    }), [x]), t().createElement(t().Fragment, null, t().createElement(n.IonMenu, {
      className: `side-menu ${l}`,
      side: o,
      contentId: i,
      menuId: r,
      swipeGesture: a,
      onIonDidOpen: () => {
        document.dispatchEvent(new CustomEvent("side-menu:opened"))
      },
      onIonDidClose: () => {
        document.dispatchEvent(new CustomEvent("side-menu:closed")), null === s || void 0 === s || s()
      },
      onIonWillOpen: m,
      onIonWillClose: v,
      tabIndex: -1
    }, t().createElement("div", {
      ref: d,
      className: "side-menu-content"
    }, c), b && u && t().createElement(Kt, {
      ref: p,
      onClose: () => Zt(void 0, void 0, void 0, function*() {
        yield Yt.menuController.close()
      }),
      className: w
    })))
  },
  Jt = ({
    onDividerMove: t
  }) => {
    const [i, n] = (0, e.useState)(0), [r, o] = (0, e.useState)(!1), a = e => {
      r && i && (e.preventDefault(), t(e.clientX, i), n(e.clientX))
    }, s = () => {
      r && o(!1)
    };
    return (0, e.useEffect)(() => (document.addEventListener("mousemove", a), document.addEventListener("mouseup", s), () => {
      document.removeEventListener("mousemove", a), document.removeEventListener("mouseup", s)
    }), [a, s]), e.createElement("div", {
      className: "divider-hitbox",
      onMouseDown: e => {
        n(e.clientX), o(!0)
      }
    }, e.createElement("div", {
      className: "divider"
    }))
  };
var ei = x(150),
  ti = x.n(ei);
const ii = e => Math.ceil(e * window.innerWidth / 100),
  ni = ii(30),
  ri = ii(50),
  oi = ii(40),
  ai = ({
    children: i,
    view: r,
    contentId: o,
    minWidth: a = ni,
    maxWidth: s = ri,
    defaultWidth: l = oi,
    onResize: c
  }) => {
    const [u, h] = (0, e.useState)(0), d = (0, e.useCallback)(ti()(e => {
      c && c(e)
    }, 100), [c]);
    return (0, e.useEffect)(() => (d(u), () => {
      d.cancel()
    }), [u, d]), (0, e.useEffect)(() => {
      h("main" === r ? 0 : l)
    }, [r, l]), t().createElement(n.IonSplitPane, {
      when: "split" === r,
      contentId: o,
      disabled: "main" === r,
      style: {
        "--side-min-width": `${a}px`,
        "--side-max-width": `${s}px`,
        "--side-width": `${u}px`
      }
    }, i, "split" === r && t().createElement(Jt, {
      onDividerMove: (e, t) => {
        const i = u - e + t;
        h(i < a ? a : i > s ? s : i)
      }
    }))
  },
  si = ({
    tocNode: i,
    onEntryClick: r,
    highlightedItem: o,
    highlightedNodeRef: a,
    allowCollapse: s,
    isSample: l = !1,
    level: c,
    parentChapter: u
  }) => {
    var p;
    let f, g = "",
      m = !1;
    const v = (0, n.getPlatforms)().includes("desktop") ? "toc-item-desktop" : "",
      [b, w] = (0, e.useState)(!0);
    (null === (p = i.subitems) || void 0 === p ? void 0 : p.length) && (f = i.subitems.map((e, n) => t().createElement(si, {
      key: n,
      tocNode: e,
      onEntryClick: r,
      highlightedItem: o,
      highlightedNodeRef: a,
      allowCollapse: s,
      isSample: l,
      level: c + 1,
      parentChapter: i.label
    })), m = s, g = b ? "chevron-up" : " chevron-down");
    const y = i === o;
    return t().createElement("div", null, t().createElement(n.IonItem, {
      role: "listitem",
      ref: y ? a : void 0,
      lines: "none",
      id: y ? "highlighted-entry" : "",
      className: `toc-item ${v} ${y?"toc-item-highlighted":""}`,
      disabled: i.disabled
    }, t().createElement("button", {
      className: "toc-item-button",
      onKeyDown: i.disabled ? void 0 : e => {
        l && (0, d.e)(e) && ((0, d._)(e), r(i.position))
      },
      onClick: i.disabled ? void 0 : () => r(i.position),
      "aria-label": c > 1 ? (0, h.I)("subchapter_of_chapter", "Subchapter {subchapter} of {chapter} chapter", {
        subchapter: i.label,
        chapter: u
      }) : i.label,
      "aria-current": y ? "page" : "false",
      "aria-disabled": i.disabled
    }, t().createElement(n.IonLabel, {
      color: y ? "primary" : "",
      className: "toc-item-label"
    }, f ? t().createElement("h4", {
      className: "chapter-title"
    }, i.label) : t().createElement("div", {
      className: "chapter-title"
    }, i.label)), m ? t().createElement("div", {
      className: g,
      onClick: e => {
        e.stopPropagation(), w(!b)
      }
    }) : t().createElement(t().Fragment, null))), f && t().createElement("div", {
      className: b ? "show-children" : "hide-children",
      role: "listbox"
    }, f))
  },
  li = ({
    toc: i,
    onEntryClick: r,
    currentPosition: o,
    allowCollapse: a = !1,
    isSample: s = !1
  }) => {
    let l;
    const c = (0, n.getPlatforms)().includes("desktop") ? "toc-title-large-margin" : "",
      u = (0, e.useMemo)(() => void 0 !== o ? p(i, o) : void 0, [i, o]),
      d = e => {
        l = e
      };
    return (0, e.useEffect)(() => {
      s || setTimeout(() => {
        l && l.scrollIntoView()
      }, 300)
    }, [i, o, l]), t().createElement(t().Fragment, null, t().createElement(n.IonHeader, {
      className: "ion-no-border",
      role: "heading",
      "aria-level": 1
    }, t().createElement(n.IonToolbar, {
      color: "default",
      className: "toc-toolbar"
    }, t().createElement(n.IonTitle, {
      className: `toc-title ${c}`
    }, (0, h.I)("table_of_contents", "Table of Contents")))), t().createElement("nav", {
      className: "toc-nav"
    }, t().createElement(xt, null, i.map((e, i) => t().createElement(si, {
      key: i,
      tocNode: e,
      onEntryClick: r,
      highlightedItem: u,
      highlightedNodeRef: d,
      allowCollapse: a,
      isSample: s,
      level: 1
    })), t().createElement("div", {
      className: "toc-bottom"
    }))));

    function p(e, t) {
      if (e.length && e[0].position <= t) {
        const i = function(e, t) {
          let i = 0,
            n = e.length - 1;
          for (; i <= n;) {
            const r = Math.floor((i + n) / 2);
            if (e[r].position === t) return r;
            e[r].position < t ? i = r + 1 : n = r - 1
          }
          return n >= 0 ? n : i
        }(e, t);
        return e[i].subitems && e[i].subitems.length > 0 ? p(e[i].subitems, t) : e[i]
      }
      return e.length ? e[0] : void 0
    }
  },
  ci = ({
    message: e,
    position: i,
    color: r,
    cssClass: o,
    buttonText: a,
    onToastDismissed: s
  }) => t().createElement(n.IonToast, {
    isOpen: !0,
    cssClass: o || "kr-toast-class",
    position: i,
    color: r,
    buttons: [{
      text: a,
      handler: s
    }],
    message: new n.IonicSafeString(e),
    animated: !1
  });
var ui = x(122),
  hi = x(469),
  di = x(8),
  pi = x(285),
  fi = x(537),
  gi = function(e, t, i, n) {
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
class mi {
  getWordCount(e, t, i) {
    return gi(this, void 0, void 0, function*() {
      return (yield me.NetworkFetch.fetchJson(this.makeURL(e, t, i))).wordCount
    })
  }
  makeURL(e, t, i) {
    let n = mi.KARAMEL_SERVICE_ROOT_URL + "wordCount?";
    return n += "asin=" + e.asin, n += "&revision=" + e.revision, n += "&contentType=" + mi.contentTypeToRequestString(e.contentType), n += "&startPosition=" + t, i && (n += "&endPosition=" + i), n
  }
  static contentTypeToRequestString(e) {
    return "EBOK" === e ? "FullBook" : "EBSP" === e ? "Sample" : ""
  }
}
mi.KARAMEL_SERVICE_ROOT_URL = "/renderer/";
var vi = function(e, t, i, n) {
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
class bi {
  constructor(e) {
    this.bookInfo = e, this.wordCountClient = new mi, this.wordsInChapter = 0, this.wordsInBook = 0
  }
  setTableOfContents(e) {
    this.tocSortedPositions = [0, ...this.flattenToc(e)].sort((e, t) => e - t)
  }
  hasTableOfContents() {
    return void 0 != this.tocSortedPositions
  }
  flattenToc(e) {
    const t = [];
    for (const i of e) t.push(...this.flattenTocItem(i));
    return t
  }
  flattenTocItem(e) {
    const t = [e.position];
    if (e.subitems)
      for (const i of e.subitems) t.push(...this.flattenTocItem(i));
    return t
  }
  inNewChapter(e, t, i) {
    let n, r;
    for (let o = 0; o < t.length - 1; o++) {
      const a = t[o],
        s = t[o + 1];
      if (n = e >= a && e < s, r = i && i >= a && i < s, n || r) break
    }
    return !(n && r)
  }
  areRangesConsecutive(e, t) {
    return e.startPosition <= t.endPosition + 1 && e.endPosition + 1 >= t.startPosition
  }
  getNextChapterPosition(e) {
    if (this.tocSortedPositions)
      for (let t = 0; t < this.tocSortedPositions.length - 1; t++) {
        const i = this.tocSortedPositions[t],
          n = this.tocSortedPositions[t + 1];
        if (e >= i && e < n) return n
      }
  }
  callClient(e, t) {
    return this.wordCountClient.getWordCount(this.bookInfo, e, t)
  }
  recalculateWordsLeftFromDiff(e, t, i, n) {
    return vi(this, void 0, void 0, function*() {
      let r = 0;
      r = i <= n ? e.wordCount : -t.wordCount, this.tocSortedPositions ? this.inNewChapter(n, this.tocSortedPositions, i) ? this.wordsInChapter = yield this.callClient(n, this.getNextChapterPosition(n)): void 0 !== this.wordsInChapter && (this.wordsInChapter -= r): this.wordsInChapter = void 0, this.wordsInBook -= r
    })
  }
  updateWordCounts(e) {
    var t;
    return vi(this, void 0, void 0, function*() {
      const i = e.startPosition,
        n = null === (t = this.currentRange) || void 0 === t ? void 0 : t.startPosition;
      return void 0 !== n && this.currentRange && this.areRangesConsecutive(this.currentRange, e) ? yield this.recalculateWordsLeftFromDiff(this.currentRange, e, n, i): (this.wordsInBook = yield this.callClient(i), this.wordsInChapter = yield this.callClient(i, this.getNextChapterPosition(i))), this.currentRange = e, {
        wordsInChapter: this.wordsInChapter,
        wordsInBook: this.wordsInBook
      }
    })
  }
}
class wi {
  constructor() {
    this.numSamples = 0, this.runningSum = 0, this.runningSumOfSquares = 0
  }
  updateMean() {
    this.mean = this.runningSum / this.numSamples
  }
  updateStandardDeviation() {
    const e = (this.runningSumOfSquares - Math.pow(this.runningSum, 2) / this.numSamples) / this.numSamples;
    this.standardDeviation = Math.sqrt(e)
  }
  addSamples(e) {
    e.forEach(e => this.addSample(e))
  }
  addSample(e) {
    this.numSamples++, this.runningSum += e, this.runningSumOfSquares += Math.pow(e, 2), this.mean = void 0, this.standardDeviation = void 0
  }
  removeSample(e) {
    this.numSamples--, this.runningSum -= e, this.runningSumOfSquares -= Math.pow(e, 2), this.mean = void 0, this.standardDeviation = void 0
  }
  getZScore(e) {
    return Math.abs((e - this.getMean()) / this.getStandardDeviation())
  }
  getMean() {
    var e;
    return void 0 === this.mean && this.updateMean(), null !== (e = this.mean) && void 0 !== e ? e : 0
  }
  getStandardDeviation() {
    return void 0 === this.standardDeviation && this.updateStandardDeviation(), this.standardDeviation ? this.standardDeviation : 1
  }
  getNumSamples() {
    return this.numSamples
  }
}
const yi = 1.5,
  xi = 8,
  ki = 30,
  _i = 1500,
  Si = 3;
class Ci {
  constructor() {
    this.valids = [], this.outliers = [], this.sampleSet = []
  }
}
class Ei {
  constructor() {
    this.model = new Ci
  }
  isOutlier(e, t) {
    return e.getZScore(t) > yi
  }
  createOutlierDist(e) {
    const t = {
      samples: []
    };
    for (const i of this.model.valids) {
      const n = i.getMean();
      n < e ? (!t.leftDist || n > t.leftDist.getMean()) && (t.leftDist = i) : (!t.rightDist || n < t.rightDist.getMean()) && (t.rightDist = i)
    }
    this.model.outliers.push(t)
  }
  addWordsPerMinuteSampleToOutliers(e) {
    for (const t of this.model.outliers) {
      const i = t.leftDist,
        n = t.rightDist;
      if ((!i || e >= i.getMean()) && (!n || e <= n.getMean())) return void t.samples.push(e)
    }
    this.createOutlierDist(e)
  }
  removeOutliers(e, t) {
    const i = [];
    t.sort();
    let n = 0,
      r = t.length - 1;
    for (; e.getNumSamples() >= xi && (this.isOutlier(e, t[n]) || this.isOutlier(e, t[r]));) {
      let o = -1;
      e.getZScore(t[n]) > e.getZScore(t[r]) ? (o = n, n += 1) : (o = r, r -= 1), e.removeSample(t[o]), i.push(t[o])
    }
    return i
  }
  instantiateModel(e) {
    const t = new wi;
    t.addSamples(e);
    const i = this.removeOutliers(t, e);
    if (t.getNumSamples() >= xi) {
      this.model.valids.push(t);
      for (const e of i) this.addWordsPerMinuteSampleToOutliers(e);
      return !0
    }
    return !1
  }
  addToSampleSet(e) {
    this.model.sampleSet.push(e), this.model.sampleSet.length >= xi && this.instantiateModel(this.model.sampleSet)
  }
  createValidDistFromOutliers() {
    for (let e = 0; e < this.model.outliers.length; e++) this.model.outliers[e].samples.length >= xi && this.instantiateModel(this.model.outliers[e].samples) && this.model.outliers.splice(e, 1)
  }
  canAddWordsPerMinuteSampleToValid(e) {
    for (const t of this.model.valids)
      if (t.getZScore(e) < yi) return !0;
    return !1
  }
  getMostLikelyDistribution(e) {
    let t, i = Number.MAX_SAFE_INTEGER;
    for (const n of this.model.valids) {
      const r = n.getZScore(e);
      r <= i && (i = r, t = n)
    }
    return t
  }
  addWordsPerMinuteSampleToValid(e) {
    const t = this.getMostLikelyDistribution(e);
    t && t.addSample(e)
  }
  getDominant() {
    let e;
    return this.model.valids.sort((e, t) => t.getNumSamples() - e.getNumSamples()), this.model.valids[0].getNumSamples() > this.model.valids[1].getNumSamples() * Si && (e = this.model.valids[0]), e
  }
  getTotalMean() {
    let e = 0,
      t = 0;
    for (const i of this.model.valids) e += i.getMean() * i.getNumSamples(), t += i.getNumSamples();
    return e / t
  }
  getReadingSpeed() {
    if (!this.model.valids.length) return;
    if (1 == this.model.valids.length) return this.model.valids[0].getMean();
    const e = this.getDominant();
    return e ? e.getMean() : this.getTotalMean()
  }
  addWordsPerMinuteSplitSample(e) {
    e < ki || e > _i || (0 == this.model.outliers.length && 0 == this.model.valids.length ? this.addToSampleSet(e) : this.canAddWordsPerMinuteSampleToValid(e) ? this.addWordsPerMinuteSampleToValid(e) : (this.addWordsPerMinuteSampleToOutliers(e), this.createValidDistFromOutliers()))
  }
  updateReadingSpeed(e, t) {
    const i = Math.max(1, Math.round(e / 70));
    for (let e = 0; e < i; e++) this.addWordsPerMinuteSplitSample(t)
  }
}
const Mi = (e, t) => {
    for (const i of t)
      if (i.asin === e) return i
  },
  $i = (e, t) => {
    const i = localStorage.getItem("readingSpeeds");
    if (i) {
      const n = t ? {
          asin: e,
          readingSpeed: t
        } : void 0,
        r = JSON.parse(i),
        o = null !== n && void 0 !== n ? n : Mi(e, r);
      if (!o) return;
      const a = ((e, t) => {
        const i = t.filter(t => t.asin != (null === e || void 0 === e ? void 0 : e.asin));
        for (; i.length >= 10;) i.shift();
        return i.push(e), i
      })(o, r);
      localStorage.setItem("readingSpeeds", JSON.stringify(a))
    } else t && localStorage.setItem("readingSpeeds", JSON.stringify([t]))
  },
  Ti = e => {
    var t;
    const i = localStorage.getItem("readingSpeeds");
    if (i) {
      const n = JSON.parse(i);
      return null === (t = Mi(e, n)) || void 0 === t ? void 0 : t.readingSpeed
    }
  };
var Li = function(e, t, i, n) {
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
const Ai = (0, e.createContext)(void 0),
  Oi = ({
    children: i,
    tableOfContents: n,
    bookInfo: r
  }) => {
    const [o] = (0, e.useState)(new Ei), [a] = (0, e.useState)(new bi(r)), s = (0, e.useRef)(), l = (0, e.useRef)(), c = (0, e.useRef)(Ti(r.asin)), [u, h] = (0, e.useState)(), [d, p] = (0, e.useState)(), [f, g] = (0, e.useState)(!0);
    !a.hasTableOfContents() && n && a.setTableOfContents(n);
    const m = (0, e.useCallback)(e => Li(void 0, void 0, void 0, function*() {
        const t = s.current,
          i = l.current;
        if (t && i && e.startPosition === i.endPosition + 1) {
          const e = i.wordCount,
            n = 6e4 * e / (Date.now() - t);
          o.updateReadingSpeed(e, n)
        }
        s.current = Date.now(), l.current = e;
        const n = o.getReadingSpeed();
        void 0 !== n && ($i(r.asin, n), c.current = n), g(void 0 === c.current);
        try {
          const t = yield a.updateWordCounts(e), i = c.current;
          i && (void 0 !== t.wordsInChapter ? h(t.wordsInChapter / i) : h(void 0), p(t.wordsInBook / i))
        } catch (e) {
          h(void 0), p(void 0)
        }
      }), [r.asin, o, a]),
      v = (0, e.useMemo)(() => ({
        updateTimeLeft: m,
        timeLeftInChapter: u ? Math.ceil(Math.max(1, u)) : void 0,
        timeLeftInBook: d ? Math.ceil(Math.max(1, d)) : void 0,
        learningReadingSpeed: f
      }), [f, d, u, m]);
    return t().createElement(Ai.Provider, {
      value: v
    }, i)
  },
  Pi = () => {
    const e = t().useContext(Ai);
    if (void 0 === e) throw new Error("useTimeLeft must be used within a TimeLeftProvider");
    return e
  },
  zi = {
    da: ["og", "i", "jeg", "det", "at", "en", "den", "til", "er", "som", "p\xe5", "de", "med", "han", "af", "for"],
    de: ["der", "die", "das", "des", "dem", "den", "ein", "eine", "einer", "einem", "einen", "dies", "diese", "diesem", "diesem", "diesen", "dieser", "dieses", "ich", "du", "er", "sie", "es", "wir", "ihr", "sie", "Sie", "als", "an", "ans", "auch", "auf", "aufs", "aus", "bei", "fuer", "f\xfcr", "nicht", "nur", "oder", "so", "und", "um", "ums", "vom", "von", "in", "im"],
    en: ["the", "a", "an", "this", "that", "these", "those", "i", "you", "she", "he", "it", "we", "they", "as", "like", "at", "to", "also", "on", "of", "by", "for", "not", "only", "or", "so", "and", "about", "from", "in"],
    es: ["el", "lo", "la", "los", "las", "un", "una", "unos", "unas", "del", "al", "este", "ese", "aquel", "estos", "esos", "aquellos", "esta", "esa", "aquella", "estas", "esas", "aquellas", "yo", "t\xfa", "tus", "vos", "usted", "\xe9l", "ella", "ello", "nosotros", "nosotras", "vosotros", "vosotras", "ustedes", "ellos", "ellas", "en", "y", "o", "a", "por", "no", "ni", "desde", "e"],
    fi: ["olla", "olen", "olet", "on", "olemme", "olette", "ovat", "ole", "se", "sen", "sit\xe4", "siin\xe4", "siit\xe4", "siihen", "sill\xe4", "silt\xe4", "sille", "sin\xe4", "siksi", "kanssa"],
    fr: ["le", "la", "l'", "les", "un", "une", "des", "du", "de", "au", "aux", "ce", "cet", "cette", "ces", "je", "tu", "elle", "il", "on", "nous", "vous", "elles", "ils", "comme", "\xe0", "aussi", "sur", "par", "pour", "ne", "n\u2019", "pas", "ou", "or", "donc", "et", "dans"],
    hu: ["a", "az", "egy", "be", "ki", "le", "fel", "meg", "el", "\xe1t", "r\xe1", "ide", "oda", "sz\xe9t", "\xf6ssze", "vissza", "de", "h\xe1t", "\xe9s", "vagy", "hogy", "van", "lesz", "volt", "csak", "nem", "igen", "mint", "\xe9n", "te", "\xf5", "mi", "ti", "\xf5k", "\xf6n"],
    it: ["il", "lo", "la", "l'", "i", "gli", "le", "un", "uno", "una", "un'", "del", "dello", "della", "dell'", "dei", "degli", "degl'", "delle", "questo", "questa", "questi", "queste", "quello", "quella", "quelli", "codesto", "codesta", "codesti", "codeste", "io", "noi", "tu", "voi", "egli", "esso", "essi", "ella", "essa", "esse", "ad", "al", "allo", "agli", "all", "agl", "alla", "alle", "con", "col", "coi", "da", "dal", "dallo", "dai", "dagli", "dall", "dagl", "dalla", "dalle", "di", "del", "dello", "dei", "degli", "dell", "degl", "della", "delle", "in", "nel", "nello", "nei", "nell", "negl", "nella", "nelle", "su", "sul", "sullo", "sui", "sugli", "sull", "sugl", "sulla", "sulle", "per", "ed", "anche", "non", "a", "e", "o"],
    nl: ["de", "en", "van", "ik", "te", "dat", "die", "in", "een", "hij", "het", "niet", "zijn", "is", "was", "op", "aan", "met", "als", "voor", "had", "er"],
    no: ["at", "en", "et", "den", "til", "er", "p\xe5", "med", "han", "av", "var", "ved", "fra", "bli", "ble", "blei", "blitt", "v\xe6re", "kom", "for", "\xe5", "blir", "v\xe6rt", "v\xe6re", "d\xe5", "ein", "eit", "eitt", "vere", "vore", "verte", "vort", "varte", "vart"],
    pt: ["o", "a", "os", "as", "um", "uma", "uns", "umas", "esta", "estes", "estas", "aquele", "aquela", "aqueles", "aqueles", "aquelas", "isto", "aquilo", "eu", "voc\xea", "ele", "ela", "n\xf3s", "v\xf3s", "voc\xeas", "eles", "elas", "de", "a", "e", "em", "para", "n\xe3o", "no", "na", "por", "como", "ou"],
    ro: ["o", "unui", "unei", "unor", "cel", "cea", "cei", "cele", "celui", "celei", "celor", "al", "a", "ai", "ale", "pe", "la", "\xeen", "f\u0103r\u0103", "sub", "despre", "c\u0103tre", "cu", "de", "din", "l\xe2ng\u0103", "spre", "ca", "sunt", "s", "e\u015fti", "este", "e", "suntem", "sunte\u0163i", "eram", "erai", "era", "era\u0163i", "erau", "fiu", "fii", "fie", "fim", "fi\u0163i", "fi", "fiind", "fost"],
    sv: ["och", "det", "att", "i", "en", "jag", "hon", "som", "han", "p\xe5", "den", "med", "var", "sig", "f\xf6r", "s\xe5", "till", "\xe4r", "men", "ett", "om", "hade", "de", "av"],
    tr: ["acaba", "altm\xfd\xfe", "alt\xfd", "ama", "bana", "baz\xfd", "belki", "ben", "benden", "beni", "benim", "be\xfe", "bin", "bir", "biri", "birka\xe7", "birkez", "bir\xfeey", "bir\xfeeyi", "biz", "bizden", "bizi", "bizim", "bu", "buna", "bunda", "bundan", "bunu", "bunun", "da", "daha", "dahi", "de", "defa", "diye", "doksan", "dokuz", "d\xf6rt", "elli", "en", "gibi", "hem", "hep", "hepsi", "her", "hi\xe7", "iki", "ile", "INSERmi", "ise", "i\xe7in", "katrilyon", "kez", "ki", "kim", "kimden", "kime", "kimi", "k\xfdrk", "milyar", "milyon", "mu", "m\xfc", "m\xfd", "nas\xfdl", "ne", "neden", "nerde", "nerede", "nereye", "niye", "ni\xe7in", "on", "ona", "ondan", "onlar", "onlardan", "onlari", "onlar\xfdn", "onu", "otuz", "sanki", "sekiz", "seksen", "sen", "senden", "seni", "senin", "siz", "sizden", "sizi", "sizin", "trilyon", "t\xfcm", "ve", "veya", "ya", "yani", "yedi", "yetmi\xfe", "yirmi", "y\xfcz", "\xe7ok", "\xe7\xfcnk\xfc", "\xfc\xe7", "\xfeey", "\xfeeyden", "\xfeeyi", "\xfeeyler", "\xfeu", "\xfeuna", "\xfeunda", "\xfeundan", "\xfeunu"]
  },
  ji = {
    de: {
      "\xdf": "ss"
    },
    es: {
      "\xd1": "OAAAAA",
      "\xf1": "oaaaaa"
    }
  },
  Ii = {
    "\u2019": "'",
    "\uff07": "'",
    "'": "'",
    "\xe0": "a",
    "\xe1": "a",
    "\xe2": "a",
    "\xe3": "a",
    "\xe4": "a",
    "\xe5": "a",
    "\xc0": "a",
    "\xc1": "a",
    "\xc2": "a",
    "\xc3": "a",
    "\xc4": "a",
    "\xc5": "a",
    "\u0100": "a",
    "\u0101": "a",
    "\u0102": "a",
    "\u0103": "a",
    "\u0104": "a",
    "\u0105": "a",
    "\xe8": "e",
    "\xe9": "e",
    "\xea": "e",
    "\xeb": "e",
    "\xc8": "e",
    "\xc9": "e",
    "\xca": "e",
    "\xcb": "e",
    "\u0112": "e",
    "\u0113": "e",
    "\u0114": "e",
    "\u0115": "e",
    "\u0116": "e",
    "\u0117": "e",
    "\u0118": "e",
    "\u0119": "e",
    "\u011a": "e",
    "\u011b": "e",
    "\xec": "i",
    "\xed": "i",
    "\xee": "i",
    "\xef": "i",
    "\xcc": "i",
    "\xcd": "i",
    "\xce": "i",
    "\xcf": "i",
    "\u0128": "i",
    "\u0129": "i",
    "\u012a": "i",
    "\u012b": "i",
    "\u012c": "i",
    "\u012d": "i",
    "\u012e": "i",
    "\u012f": "i",
    "\u0130": "i",
    "\xf2": "o",
    "\xf3": "o",
    "\xf4": "o",
    "\xf5": "o",
    "\xf6": "o",
    "\xd2": "o",
    "\xd3": "o",
    "\xd4": "o",
    "\xd5": "o",
    "\xd6": "o",
    "\u014c": "o",
    "\u014d": "o",
    "\u014e": "o",
    "\u014f": "o",
    "\u0150": "o",
    "\u0151": "o",
    "\xf9": "u",
    "\xfa": "u",
    "\xfb": "u",
    "\xfc": "u",
    "\xd9": "u",
    "\xda": "u",
    "\xdb": "u",
    "\xdc": "u",
    "\u0168": "u",
    "\u0169": "u",
    "\u016a": "u",
    "\u016b": "u",
    "\u016c": "u",
    "\u016d": "u",
    "\u016e": "u",
    "\u016f": "u",
    "\u0170": "u",
    "\u0171": "u",
    "\u0172": "u",
    "\u0173": "u",
    "\xfd": "y",
    "\xff": "y",
    "\xdd": "y",
    "\u0176": "y",
    "\u0177": "y",
    "\u0178": "y",
    "\xe7": "c",
    "\xc7": "c",
    "\u0106": "c",
    "\u0107": "c",
    "\u0108": "c",
    "\u0109": "c",
    "\u010a": "c",
    "\u010b": "c",
    "\u010c": "c",
    "\u010d": "c",
    "\xd0": "d",
    "\u010e": "d",
    "\u010f": "d",
    "\xf0": "d",
    "\u011c": "g",
    "\u011d": "g",
    "\u011e": "g",
    "\u011f": "g",
    "\u0120": "g",
    "\u0121": "g",
    "\u0122": "g",
    "\u0123": "g",
    "\u0124": "h",
    "\u0125": "h",
    "\u0134": "j",
    "\u0135": "j",
    "\u0136": "k",
    "\u0137": "k",
    "\u0139": "l",
    "\u013a": "l",
    "\u013b": "l",
    "\u013c": "l",
    "\u013d": "l",
    "\u013e": "l",
    "\xf1": "n",
    "\xd1": "n",
    "\u0143": "n",
    "\u0144": "n",
    "\u0145": "n",
    "\u0146": "n",
    "\u0147": "n",
    "\u0148": "n",
    "\u0154": "r",
    "\u0155": "r",
    "\u0156": "r",
    "\u0157": "r",
    "\u0158": "r",
    "\u0159": "r",
    "\u015a": "s",
    "\u015b": "s",
    "\u015c": "s",
    "\u015d": "s",
    "\u015e": "s",
    "\u015f": "s",
    "\u0160": "s",
    "\u0161": "s",
    "\u0162": "t",
    "\u0163": "t",
    "\u0164": "t",
    "\u0165": "t",
    "\u0174": "w",
    "\u0175": "w",
    "\u0179": "z",
    "\u017a": "z",
    "\u017b": "z",
    "\u017c": "z",
    "\u017d": "z",
    "\u017e": "z",
    "\xdf": "s",
    "\xe6": "a",
    "\xc6": "a",
    "\xde": "t",
    "\xfe": "t",
    "\xd8": "o",
    "\xf8": "o"
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