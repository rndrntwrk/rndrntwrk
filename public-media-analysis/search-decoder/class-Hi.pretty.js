tandardDeviation() {
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
          return i = u(e), s.test(e) || (h = i.getElementsByTagName(r)[0]) && h.parentNode.removeChild(h), l.test(e) || (h = i.getElementsByTagName(o)[0]) && h.parentNode.removeChild(h), i.getElementsByTagName(n);
        case r:
        case o:
          return d = c(e).getElementsByTagName(t), l.test(e) && s.test(e) ? d[0].parentNode.childNodes : d;
        default:
          return f ? f(e) : c(e, o).getElementsByTagName(o)[0].childNodes
      }
    }
  }, 51825(e, t, i) {
    var n = i(86826),
      r = i(95673).formatDOM,
      o = /<(![a-zA-Z\s]+)>/;
    e.exports = function(e) {
      if ("string" !== typeof e) throw new TypeError("First argument must be a string");
      if ("" === e) return [];
      var t, i = e.match(o);
      return i && i[1] && (t = i[1]), r(n(e), null, t)
    }
  }, 95673(e, t, i) {
    for (var n, r = i(36168), o = i(52435), a = r.CASE_SENSITIVE_TAG_NAMES, s = o.Comment, l = o.Element, c = o.ProcessingInstruction, u = o.Text, h = {}, d = 0, p = a.length; d < p; d++) n = a[d], h[n.toLowerCase()] = n;

    function f(e) {
      for (var t, i = {}, n = 0, r = e.length; n < r; n++) i[(t = e[n]).name] = t.value;
      return i
    }

    function g(e) {
      var t = function(e) {
        return h[e]
      }(e = e.toLowerCase());
      return t || e
    }
    e.exports = {
      formatAttributes: f,
      formatDOM: function e(t, i, n) {
        i = i || null;
        for (var r = [], o = 0, a = t.length; o < a; o++) {
          var h, d = t[o];
          switch (d.nodeType) {
            case 1:
              (h = new l(g(d.nodeName), f(d.attributes))).children = e(d.childNodes, h);
              break;
            case 3:
              h = new u(d.nodeValue);
              break;
            case 8:
              h = new s(d.nodeValue);
              break;
            default:
              continue
          }
          var p = r[o - 1] || null;
          p && (p.next = h), h.parent = i, h.prev = p, h.next = null, r.push(h)
        }
        return n && ((h = new c(n.substring(0, n.indexOf(" ")).toLowerCase(), n)).next = r[0] || null, h.parent = i, r.unshift(h), r[1] && (r[1].prev = r[0])), r
      },
      isIE: function() {
        return /(MSIE |Trident\/|Edge\/)/.test(navigator.userAgent)
      }
    }
  }, 46328(e, t, i) {
    var n = i(66702),
      r = i(23026),
      o = i(51825);
    o = "function" === typeof o.default ? o.default : o;
    var a = {
      lowerCaseAttributeNames: !1
    };

    function s(e, t) {
      if ("string" !== typeof e) throw new TypeError("First argument must be a string");
      return "" === e ? [] : n(o(e, (t = t || {}).htmlparser2 || a), t)
    }
    s.domToReact = n, s.htmlToDOM = o, s.attributesToProps = r, s.Element = i(83539).Element, e.exports = s, e.exports.default = s
  }, 23026(e, t, i) {
    var n = i(14210),
      r = i(46488);

    function o(e) {
      return n.possibleStandardNames[e]
    }
    e.exports = function(e) {
      var t, i, a, s, l, c = {},
        u = (e = e || {}).type && {
          reset: !0,
          submit: !0
        } [e.type];
      for (t in e)
        if (a = e[t], n.isCustomAttribute(t)) c[t] = a;
        else if (s = o(i = t.toLowerCase())) switch (l = n.getPropertyInfo(s), "checked" !== s && "value" !== s || u || (s = o("default" + i)), c[s] = a, l && l.type) {
        case n.BOOLEAN:
          c[s] = !0;
          break;
        case n.OVERLOADED_BOOLEAN:
          "" === a && (c[s] = !0)
      } else r.PRESERVE_CUSTOM_ATTRIBUTES && (c[t] = a);
      return r.setStyleProp(e.style, c), c
    }
  }, 66702(e, t, i) {
    var n = i(96540),
      r = i(23026),
      o = i(46488),
      a = o.setStyleProp,
      s = o.canTextBeChildOfNode;

    function l(e) {
      return o.PRESERVE_CUSTOM_ATTRIBUTES && "tag" === e.type && o.isCustomComponent(e.name, e.attribs)
    }
    e.exports = function e(t, i) {
      for (var o, c, u, h, d, p = (i = i || {}).library || n, f = p.cloneElement, g = p.createElement, m = p.isValidElement, v = [], b = "function" === typeof i.replace, w = i.trim, y = 0, x = t.length; y < x; y++)
        if (o = t[y], b && m(u = i.replace(o))) x > 1 && (u = f(u, {
          key: u.key || y
        })), v.push(u);
        else if ("text" !== o.type) {
        switch (h = o.attribs, l(o) ? a(h.style, h) : h && (h = r(h)), d = null, o.type) {
          case "script":
          case "style":
            o.children[0] && (h.dangerouslySetInnerHTML = {
              __html: o.children[0].data
            });
            break;
          case "tag":
            "textarea" === o.name && o.children[0] ? h.defaultValue = o.children[0].data : o.children && o.children.length && (d = e(o.children, i));
            break;
          default:
            continue
        }
        x > 1 && (h.key = y), v.push(g(o.name, h, d))
      } else {
        if ((c = !o.data.trim().length) && o.parent && !s(o.parent)) continue;
        if (w && c) continue;
        v.push(o.data)
      }
      return 1 === v.length ? v[0] : v
    }
  }, 46488(e, t, i) {
    var n = i(96540),
      r = i(7923).default;
    var o = {
      reactCompat: !0
    };
    var a = n.version.split(".")[0] >= 16,
      s = new Set(["tr", "tbody", "thead", "tfoot", "colgroup", "table", "head", "html", "frameset"]);
    e.exports = {
      PRESERVE_CUSTOM_ATTRIBUTES: a,
      invertObject: function(e, t) {
        if (!e || "object" !== typeof e) throw new TypeError("First argument must be an object");
        var i, n, r = "function" === typeof t,
          o = {},
          a = {};
        for (i in e) n = e[i], r && (o = t(i, n)) && 2 === o.length ? a[o[0]] = o[1] : "string" === typeof n && (a[n] = i);
        return a
      },
      isCustomComponent: function(e, t) {
        if (-1 === e.indexOf("-")) return t && "string" === typeof t.is;
        switch (e) {
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return !1;
          default:
            return !0
        }
      },
      setStyleProp: function(e, t) {
        if (null !== e && void 0 !== e) try {
          t.style = r(e, o)
        } catch (e) {
          t.style = {}
        }
      },
      canTextBeChildOfNode: function(e) {
        return !s.has(e.name)
      },
      elementsWithNoTextChildren: s
    }
  }, 50029(e, t, i) {
    "use strict";
    var n = i(73738),
      r = i(17383),
      o = i(34579),
      a = i(12475),
      s = i(29511),
      l = i(28452),
      c = i(63072),
      u = i(43693),
      h = i(85715);

    function d(e) {
      return e && "object" === typeof e && "default" in e ? e : {
        default: e
      }
    }
    var p = d(n),
      f = d(r),
      g = d(o),
      m = d(a),
      v = d(s),
      b = d(l),
      w = d(c),
      y = d(u),
      x = d(h);

    function k(e, t) {
      var i = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        t && (n = n.filter(function(t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable
        })), i.push.apply(i, n)
      }
      return i
    }

    function _(e) {
      for (var t = 1; t < arguments.length; t++) {
        var i = null != arguments[t] ? arguments[t] : {};
        t % 2 ? k(Object(i), !0).forEach(function(t) {
          y.default(e, t, i[t])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : k(Object(i)).forEach(function(t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
        })
      }
      return e
    }
    var S = {
        type: "logger",
        log: function(e) {
          this.output("log", e)
        },
        warn: function(e) {
          this.output("warn", e)
        },
        error: function(e) {
          this.output("error", e)
        },
        output: function(e, t) {
          console && console[e] && console[e].apply(console, t)
        }
      },
      C = function() {
        function e(t) {
          var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          f.default(this, e), this.init(t, i)
        }
        return g.default(e, [{
          key: "init",
          value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            this.prefix = t.prefix || "i18next:", this.logger = e || S, this.options = t, this.debug = t.debug
          }
        }, {
          key: "setDebug",
          value: function(e) {
            this.debug = e
          }
        }, {
          key: "log",
          value: function() {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            return this.forward(t, "log", "", !0)
          }
        }, {
          key: "warn",
          value: function() {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            return this.forward(t, "warn", "", !0)
          }
        }, {
          key: "error",
          value: function() {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            return this.forward(t, "error", "")
          }
        }, {
          key: "deprecate",
          value: function() {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            return this.forward(t, "warn", "WARNING DEPRECATED: ", !0)
          }
        }, {
          key: "forward",
          value: function(e, t, i, n) {
            return n && !this.debug ? null : ("string" === typeof e[0] && (e[0] = "".concat(i).concat(this.prefix, " ").concat(e[0])), this.logger[t](e))
          }
        }, {
          key: "create",
          value: function(t) {
            return new e(this.logger, _(_({}, {
              prefix: "".concat(this.prefix, ":").concat(t, ":")
            }), this.options))
          }
        }]), e
      }(),
      E = new C,
      M = function() {
        function e() {
          f.default(this, e), this.observers = {}
        }
        return g.default(e, [{
          key: "on",
          value: function(e, t) {
            var i = this;
            return e.split(" ").forEach(function(e) {
              i.observers[e] = i.observers[e] || [], i.observers[e].push(t)
            }), this
          }
        }, {
    