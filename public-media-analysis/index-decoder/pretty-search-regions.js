
/* ===== REGION 0 lines 1871-2639 ===== */
0001871:                                     )
0001872:                                 : i),
0001873:                               o.a(2, e.authenticatedFetchJson(a, n))
0001874:                             );
0001875:                       }, o);
0001876:                     }),
0001877:                   );
0001878:                 },
0001879:               },
0001880:               {
0001881:                 key: "stillReading",
0001882:                 value: function (t, n) {
0001883:                   return de(
0001884:                     this,
0001885:                     void 0,
0001886:                     void 0,
0001887:                     ue().m(function r() {
0001888:                       var o;
0001889:                       return ue().w(function (r) {
0001890:                         for (;;)
0001891:                           switch (r.n) {
0001892:                             case 0:
0001893:                               return (
0001894:                                 (o = e.toURLSearchParams(t).toString()),
0001895:                                 (r.n = 1),
0001896:                                 e.authenticatedFetch(
0001897:                                   ""
0001898:                                     .concat(
0001899:                                       e.SERVICE_WEB_ROOT,
0001900:                                       "reader/stillReading?",
0001901:                                     )
0001902:                                     .concat(o, "&clientVersion=")
0001903:                                     .concat(e.CLIENT_VERSION),
0001904:                                   n,
0001905:                                 )
0001906:                               );
0001907:                             case 1:
0001908:                               return r.a(2);
0001909:                           }
0001910:                       }, r);
0001911:                     }),
0001912:                   );
0001913:                 },
0001914:               },
0001915:               {
0001916:                 key: "doneReading",
0001917:                 value: function (t, n) {
0001918:                   return de(
0001919:                     this,
0001920:                     void 0,
0001921:                     void 0,
0001922:                     ue().m(function r() {
0001923:                       var o;
0001924:                       return ue().w(function (r) {
0001925:                         for (;;)
0001926:                           switch (r.n) {
0001927:                             case 0:
0001928:                               return (
0001929:                                 (o = e.toURLSearchParams(t).toString()),
0001930:                                 (r.n = 1),
0001931:                                 e.authenticatedFetch(
0001932:                                   ""
0001933:                                     .concat(
0001934:                                       e.SERVICE_WEB_ROOT,
0001935:                                       "reader/doneReading?",
0001936:                                     )
0001937:                                     .concat(o, "&clientVersion=")
0001938:                                     .concat(e.CLIENT_VERSION),
0001939:                                   n,
0001940:                                 )
0001941:                               );
0001942:                             case 1:
0001943:                               return r.a(2);
0001944:                           }
0001945:                       }, r);
0001946:                     }),
0001947:                   );
0001948:                 },
0001949:               },
0001950:               {
0001951:                 key: "getKaramelToken",
0001952:                 value: function (t, n, r, o, i) {
0001953:                   return de(
0001954:                     this,
0001955:                     void 0,
0001956:                     void 0,
0001957:                     ue().m(function a() {
0001958:                       return ue().w(function (a) {
0001959:                         for (;;)
0001960:                           if (0 === a.n)
0001961:                             return a.a(
0001962:                               2,
0001963:                               e.authenticatedFetchJson(
0001964:                                 ""
0001965:                                   .concat(
0001966:                                     e.SERVICE_WEB_ROOT,
0001967:                                     "reader/getKaramelToken?asin=",
0001968:                                   )
0001969:                                   .concat(t, "&kindleSessionId=")
0001970:                                   .concat(o, "&revision=")
0001971:                                   .concat(n, "&contentType=")
0001972:                                   .concat(r),
0001973:                                 i,
0001974:                               ),
0001975:                             );
0001976:                       }, a);
0001977:                     }),
0001978:                   );
0001979:                 },
0001980:               },
0001981:               {
0001982:                 key: "getAnnotations",
0001983:                 value: function (t, n) {
0001984:                   return de(
0001985:                     this,
0001986:                     void 0,
0001987:                     void 0,
0001988:                     ue().m(function r() {
0001989:                       var o;
0001990:                       return ue().w(function (r) {
0001991:                         for (;;)
0001992:                           if (0 === r.n)
0001993:                             return (
0001994:                               (o = e.toURLSearchParams(t).toString()),
0001995:                               r.a(
0001996:                                 2,
0001997:                                 e.authenticatedFetchJson(
0001998:                                   ""
0001999:                                     .concat(
0002000:                                       e.SERVICE_WEB_ROOT,
0002001:                                       "reader/getAnnotations?",
0002002:                                     )
0002003:                                     .concat(o, "&clientVersion=")
0002004:                                     .concat(e.CLIENT_VERSION),
0002005:                                   n,
0002006:                                 ),
0002007:                               )
0002008:                             );
0002009:                       }, r);
0002010:                     }),
0002011:                   );
0002012:                 },
0002013:               },
0002014:               {
0002015:                 key: "updateAnnotations",
0002016:                 value: function (t, n) {
0002017:                   return de(
0002018:                     this,
0002019:                     void 0,
0002020:                     void 0,
0002021:                     ue().m(function r() {
0002022:                       var o;
0002023:                       return ue().w(function (r) {
0002024:                         for (;;)
0002025:                           if (0 === r.n)
0002026:                             return (
0002027:                               (o = {
0002028:                                 Operation: "updateAnnotations",
0002029:                                 Input: Object.assign(Object.assign({}, t), {
0002030:                                   clientVersion: e.CLIENT_VERSION,
0002031:                                 }),
0002032:                               }),
0002033:                               r.a(
0002034:                                 2,
0002035:                                 e.authenticatedFetchPostJson(
0002036:                                   "".concat(
0002037:                                     e.SERVICE_WEB_ROOT,
0002038:                                     "reader/updateAnnotations",
0002039:                                   ),
0002040:                                   o,
0002041:                                   n,
0002042:                                 ),
0002043:                               )
0002044:                             );
0002045:                       }, r);
0002046:                     }),
0002047:                   );
0002048:                 },
0002049:               },
0002050:               {
0002051:                 key: "wordDefinition",
0002052:                 value: function (t, n) {
0002053:                   return de(
0002054:                     this,
0002055:                     void 0,
0002056:                     void 0,
0002057:                     ue().m(function r() {
0002058:                       var o;
0002059:                       return ue().w(function (r) {
0002060:                         for (;;)
0002061:                           if (0 === r.n)
0002062:                             return (
0002063:                               (o = e.toURLSearchParams(t).toString()),
0002064:                               r.a(
0002065:                                 2,
0002066:                                 e.authenticatedFetchJson(
0002067:                                   ""
0002068:                                     .concat(
0002069:                                       e.SERVICE_WEB_ROOT,
0002070:                                       "reader/wordDefinition?",
0002071:                                     )
0002072:                                     .concat(o),
0002073:                                   n,
0002074:                                 ),
0002075:                               )
0002076:                             );
0002077:                       }, r);
0002078:                     }),
0002079:                   );
0002080:                 },
0002081:               },
0002082:               {
0002083:                 key: "getCopiedText",
0002084:                 value: function (t, n, r, o, i, a) {
0002085:                   return de(
0002086:                     this,
0002087:                     void 0,
0002088:                     void 0,
0002089:                     ue().m(function c() {
0002090:                       var u;
0002091:                       return ue().w(function (c) {
0002092:                         for (;;)
0002093:                           if (0 === c.n)
0002094:                             return (
0002095:                               (u = {
0002096:                                 asin: t,
0002097:                                 startPosition: n,
0002098:                                 endPosition: r,
0002099:                                 guid: o,
0002100:                                 revision: i,
0002101:                                 clientVersion: e.CLIENT_VERSION,
0002102:                               }),
0002103:                               c.a(
0002104:                                 2,
0002105:                                 e.authenticatedFetchPostJson(
0002106:                                   "".concat(
0002107:                                     e.SERVICE_WEB_ROOT,
0002108:                                     "reader/copyText",
0002109:                                   ),
0002110:                                   u,
0002111:                                   a,
0002112:                                 ),
0002113:                               )
0002114:                             );
0002115:                       }, c);
0002116:                     }),
0002117:                   );
0002118:                 },
0002119:               },
0002120:               {
0002121:                 key: "getSearchIndex",
0002122:                 value: function (t, n) {
0002123:                   return de(
0002124:                     this,
0002125:                     void 0,
0002126:                     void 0,
0002127:                     ue().m(function r() {
0002128:                       var o;
0002129:                       return ue().w(function (r) {
0002130:                         for (;;)
0002131:                           if (0 === r.n)
0002132:                             return (
0002133:                               (o = e.toURLSearchParams(t).toString()),
0002134:                               r.a(
0002135:                                 2,
0002136:                                 e.authenticatedFetchJson(
0002137:                                   ""
0002138:                                     .concat(
0002139:                                       e.SERVICE_WEB_ROOT,
0002140:                                       "reader/getSearchIndex?",
0002141:                                     )
0002142:                                     .concat(o),
0002143:                                   n,
0002144:                                 ),
0002145:                               )
0002146:                             );
0002147:                       }, r);
0002148:                     }),
0002149:                   );
0002150:                 },
0002151:               },
0002152:               {
0002153:                 key: "getSearchContext",
0002154:                 value: function (t, n) {
0002155:                   return de(
0002156:                     this,
0002157:                     void 0,
0002158:                     void 0,
0002159:                     ue().m(function r() {
0002160:                       return ue().w(function (r) {
0002161:                         for (;;)
0002162:                           if (0 === r.n)
0002163:                             return r.a(
0002164:                               2,
0002165:                               e
0002166:                                 .authenticatedFetchPost(
0002167:                                   "".concat(
0002168:                                     e.SERVICE_WEB_ROOT,
0002169:                                     "reader/getSearchContext",
0002170:                                   ),
0002171:                                   Object.assign(Object.assign({}, t), {
0002172:                                     clientVersion: e.CLIENT_VERSION,
0002173:                                   }),
0002174:                                   n,
0002175:                                 )
0002176:                                 .then(function (e) {
0002177:                                   return e.json();
0002178:                                 }),
0002179:                             );
0002180:                       }, r);
0002181:                     }),
0002182:                   );
0002183:                 },
0002184:               },
0002185:               {
0002186:                 key: "authenticatedFetchJson",
0002187:                 value: function (t, n) {
0002188:                   return e.authenticatedFetch(t, n).then(function (e) {
0002189:                     return e.json();
0002190:                   });
0002191:                 },
0002192:               },
0002193:               {
0002194:                 key: "authenticatedFetch",
0002195:                 value: function (e, t) {
0002196:                   return ae.fetchSuccess(e, {
0002197:                     headers: { "X-ADP-Session-Token": t },
0002198:                   });
0002199:                 },
0002200:               },
0002201:               {
0002202:                 key: "authenticatedFetchPostJson",
0002203:                 value: function (t, n, r) {
0002204:                   return e.authenticatedFetchPost(t, n, r).then(function (e) {
0002205:                     return e.json();
0002206:                   });
0002207:                 },
0002208:               },
0002209:               {
0002210:                 key: "authenticatedFetchPost",
0002211:                 value: function (e, t, n) {
0002212:                   return ae.fetchSuccess(e, {
0002213:                     method: "POST",
0002214:                     headers: {
0002215:                       "X-ADP-Session-Token": n,
0002216:                       Accept: "application/json",
0002217:                       "Content-Type": "application/json",
0002218:                     },
0002219:                     body: JSON.stringify(t),
0002220:                   });
0002221:                 },
0002222:               },
0002223:               {
0002224:                 key: "toURLSearchParams",
0002225:                 value: function (e) {
0002226:                   var t = new URLSearchParams();
0002227:                   return (
0002228:                     Object.keys(e).forEach(function (n) {
0002229:                       void 0 !== e[n] && t.append(n, e[n]);
0002230:                     }),
0002231:                     t
0002232:                   );
0002233:                 },
0002234:               },
0002235:               {
0002236:                 key: "getLPR",
0002237:                 value: function (t, n) {
0002238:                   return de(
0002239:                     this,
0002240:                     void 0,
0002241:                     void 0,
0002242:                     ue().m(function r() {
0002243:                       var o;
0002244:                       return ue().w(function (r) {
0002245:                         for (;;)
0002246:                           if (0 === r.n)
0002247:                             return (
0002248:                               (o = e.toURLSearchParams(t).toString()),
0002249:                               r.a(
0002250:                                 2,
0002251:                                 e.authenticatedFetchJson(
0002252:                                   ""
0002253:                                     .concat(
0002254:                                       e.SERVICE_WEB_ROOT,
0002255:                                       "reader/getLPR?",
0002256:                                     )
0002257:                                     .concat(o, "&clientVersion=")
0002258:                                     .concat(e.CLIENT_VERSION),
0002259:                                   n,
0002260:                                 ),
0002261:                               )
0002262:                             );
0002263:                       }, r);
0002264:                     }),
0002265:                   );
0002266:                 },
0002267:               },
0002268:             ]),
0002269:             (n = null) && le(t.prototype, n),
0002270:             r && le(t, r),
0002271:             Object.defineProperty(t, "prototype", { writable: !1 }),
0002272:             t
0002273:           );
0002274:           var t, n, r;
0002275:         })();
0002276:       function ye() {
0002277:         var e,
0002278:           t,
0002279:           n = "function" == typeof Symbol ? Symbol : {},
0002280:           r = n.iterator || "@@iterator",
0002281:           o = n.toStringTag || "@@toStringTag";
0002282:         function i(n, r, o, i) {
0002283:           var u = r && r.prototype instanceof c ? r : c,
0002284:             s = Object.create(u.prototype);
0002285:           return (
0002286:             ge(
0002287:               s,
0002288:               "_invoke",
0002289:               (function (n, r, o) {
0002290:                 var i,
0002291:                   c,
0002292:                   u,
0002293:                   s = 0,
0002294:                   l = o || [],
0002295:                   f = !1,
0002296:                   d = {
0002297:                     p: 0,
0002298:                     n: 0,
0002299:                     v: e,
0002300:                     a: p,
0002301:                     f: p.bind(e, 4),
0002302:                     d: function (t, n) {
0002303:                       return ((i = t), (c = 0), (u = e), (d.n = n), a);
0002304:                     },
0002305:                   };
0002306:                 function p(n, r) {
0002307:                   for (
0002308:                     c = n, u = r, t = 0;
0002309:                     !f && s && !o && t < l.length;
0002310:                     t++
0002311:                   ) {
0002312:                     var o,
0002313:                       i = l[t],
0002314:                       p = d.p,
0002315:                       y = i[2];
0002316:                     n > 3
0002317:                       ? (o = y === r) &&
0002318:                         ((u = i[(c = i[4]) ? 5 : ((c = 3), 3)]),
0002319:                         (i[4] = i[5] = e))
0002320:                       : i[0] <= p &&
0002321:                         ((o = n < 2 && p < i[1])
0002322:                           ? ((c = 0), (d.v = r), (d.n = i[1]))
0002323:                           : p < y &&
0002324:                             (o = n < 3 || i[0] > r || r > y) &&
0002325:                             ((i[4] = n), (i[5] = r), (d.n = y), (c = 0)));
0002326:                   }
0002327:                   if (o || n > 1) return a;
0002328:                   throw ((f = !0), r);
0002329:                 }
0002330:                 return function (o, l, y) {
0002331:                   if (s > 1) throw TypeError("Generator is already running");
0002332:                   for (
0002333:                     f && 1 === l && p(l, y), c = l, u = y;
0002334:                     (t = c < 2 ? e : u) || !f;
0002335: 
0002336:                   ) {
0002337:                     i ||
0002338:                       (c
0002339:                         ? c < 3
0002340:                           ? (c > 1 && (d.n = -1), p(c, u))
0002341:                           : (d.n = u)
0002342:                         : (d.v = u));
0002343:                     try {
0002344:                       if (((s = 2), i)) {
0002345:                         if ((c || (o = "next"), (t = i[o]))) {
0002346:                           if (!(t = t.call(i, u)))
0002347:                             throw TypeError("iterator result is not an object");
0002348:                           if (!t.done) return t;
0002349:                           ((u = t.value), c < 2 && (c = 0));
0002350:                         } else
0002351:                           (1 === c && (t = i.return) && t.call(i),
0002352:                             c < 2 &&
0002353:                               ((u = TypeError(
0002354:                                 "The iterator does not provide a '" +
0002355:                                   o +
0002356:                                   "' method",
0002357:                               )),
0002358:                               (c = 1)));
0002359:                         i = e;
0002360:                       } else if ((t = (f = d.n < 0) ? u : n.call(r, d)) !== a)
0002361:                         break;
0002362:                     } catch (t) {
0002363:                       ((i = e), (c = 1), (u = t));
0002364:                     } finally {
0002365:                       s = 1;
0002366:                     }
0002367:                   }
0002368:                   return { value: t, done: f };
0002369:                 };
0002370:               })(n, o, i),
0002371:               !0,
0002372:             ),
0002373:             s
0002374:           );
0002375:         }
0002376:         var a = {};
0002377:         function c() {}
0002378:         function u() {}
0002379:         function s() {}
0002380:         t = Object.getPrototypeOf;
0002381:         var l = [][r]
0002382:             ? t(t([][r]()))
0002383:             : (ge((t = {}), r, function () {
0002384:                 return this;
0002385:               }),
0002386:               t),
0002387:           f = (s.prototype = c.prototype = Object.create(l));
0002388:         function d(e) {
0002389:           return (
0002390:             Object.setPrototypeOf
0002391:               ? Object.setPrototypeOf(e, s)
0002392:               : ((e.__proto__ = s), ge(e, o, "GeneratorFunction")),
0002393:             (e.prototype = Object.create(f)),
0002394:             e
0002395:           );
0002396:         }
0002397:         return (
0002398:           (u.prototype = s),
0002399:           ge(f, "constructor", s),
0002400:           ge(s, "constructor", u),
0002401:           (u.displayName = "GeneratorFunction"),
0002402:           ge(s, o, "GeneratorFunction"),
0002403:           ge(f),
0002404:           ge(f, o, "Generator"),
0002405:           ge(f, r, function () {
0002406:             return this;
0002407:           }),
0002408:           ge(f, "toString", function () {
0002409:             return "[object Generator]";
0002410:           }),
0002411:           (ye = function () {
0002412:             return { w: i, m: d };
0002413:           })()
0002414:         );
0002415:       }
0002416:       function ge(e, t, n, r) {
0002417:         var o = Object.defineProperty;
0002418:         try {
0002419:           o({}, "", {});
0002420:         } catch (e) {
0002421:           o = 0;
0002422:         }
0002423:         ((ge = function (e, t, n, r) {
0002424:           function i(t, n) {
0002425:             ge(e, t, function (e) {
0002426:               return this._invoke(t, n, e);
0002427:             });
0002428:           }
0002429:           t
0002430:             ? o
0002431:               ? o(e, t, {
0002432:                   value: n,
0002433:                   enumerable: !r,
0002434:                   configurable: !r,
0002435:                   writable: !r,
0002436:                 })
0002437:               : (e[t] = n)
0002438:             : (i("next", 0), i("throw", 1), i("return", 2));
0002439:         }),
0002440:           ge(e, t, n, r));
0002441:       }
0002442:       ((pe.SERVICE_WEB_ROOT = "/service/mobile/"),
0002443:         (pe.SERVICE_UNAUTH_WEB_ROOT = "/service/web/content/"),
0002444:         (pe.CLIENT_VERSION = "20000100"));
0002445:       var ve = function (e, t, n, r) {
0002446:           return new (n || (n = Promise))(function (o, i) {
0002447:             function a(e) {
0002448:               try {
0002449:                 u(r.next(e));
0002450:               } catch (e) {
0002451:                 i(e);
0002452:               }
0002453:             }
0002454:             function c(e) {
0002455:               try {
0002456:                 u(r.throw(e));
0002457:               } catch (e) {
0002458:                 i(e);
0002459:               }
0002460:             }
0002461:             function u(e) {
0002462:               var t;
0002463:               e.done
0002464:                 ? o(e.value)
0002465:                 : ((t = e.value),
0002466:                   t instanceof n
0002467:                     ? t
0002468:                     : new n(function (e) {
0002469:                         e(t);
0002470:                       })).then(a, c);
0002471:             }
0002472:             u((r = r.apply(e, t || [])).next());
0002473:           });
0002474:         },
0002475:         me = void 0,
0002476:         be = 0,
0002477:         he = function () {
0002478:           var e =
0002479:             arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
0002480:           return ve(
0002481:             void 0,
0002482:             void 0,
0002483:             void 0,
0002484:             ye().m(function t() {
0002485:               var n, r;
0002486:               return ye().w(function (t) {
0002487:                 for (;;)
0002488:                   switch (t.n) {
0002489:                     case 0:
0002490:                       if (!(e || void 0 === me || Date.now() - be >= 72e6)) {
0002491:                         t.n = 3;
0002492:                         break;
0002493:                       }
0002494:                       return ((t.n = 1), fetch("/reader/api/csrf/getToken"));
0002495:                     case 1:
0002496:                       return ((n = t.v), (t.n = 2), n.text());
0002497:                     case 2:
0002498:                       return (
0002499:                         (r = t.v),
0002500:                         (me = r),
0002501:                         (be = Date.now()),
0002502:                         t.a(2, Promise.resolve(r))
0002503:                       );
0002504:                     case 3:
0002505:                       return t.a(2, Promise.resolve(me));
0002506:                     case 4:
0002507:                       return t.a(2);
0002508:                   }
0002509:               }, t);
0002510:             }),
0002511:           );
0002512:         };
0002513:       function Ie(e) {
0002514:         return (
0002515:           (Ie =
0002516:             "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
0002517:               ? function (e) {
0002518:                   return typeof e;
0002519:                 }
0002520:               : function (e) {
0002521:                   return e &&
0002522:                     "function" == typeof Symbol &&
0002523:                     e.constructor === Symbol &&
0002524:                     e !== Symbol.prototype
0002525:                     ? "symbol"
0002526:                     : typeof e;
0002527:                 }),
0002528:           Ie(e)
0002529:         );
0002530:       }
0002531:       function we() {
0002532:         var e,
0002533:           t,
0002534:           n = "function" == typeof Symbol ? Symbol : {},
0002535:           r = n.iterator || "@@iterator",
0002536:           o = n.toStringTag || "@@toStringTag";
0002537:         function i(n, r, o, i) {
0002538:           var u = r && r.prototype instanceof c ? r : c,
0002539:             s = Object.create(u.prototype);
0002540:           return (
0002541:             Se(
0002542:               s,
0002543:               "_invoke",
0002544:               (function (n, r, o) {
0002545:                 var i,
0002546:                   c,
0002547:                   u,
0002548:                   s = 0,
0002549:                   l = o || [],
0002550:                   f = !1,
0002551:                   d = {
0002552:                     p: 0,
0002553:                     n: 0,
0002554:                     v: e,
0002555:                     a: p,
0002556:                     f: p.bind(e, 4),
0002557:                     d: function (t, n) {
0002558:                       return ((i = t), (c = 0), (u = e), (d.n = n), a);
0002559:                     },
0002560:                   };
0002561:                 function p(n, r) {
0002562:                   for (
0002563:                     c = n, u = r, t = 0;
0002564:                     !f && s && !o && t < l.length;
0002565:                     t++
0002566:                   ) {
0002567:                     var o,
0002568:                       i = l[t],
0002569:                       p = d.p,
0002570:                       y = i[2];
0002571:                     n > 3
0002572:                       ? (o = y === r) &&
0002573:                         ((u = i[(c = i[4]) ? 5 : ((c = 3), 3)]),
0002574:                         (i[4] = i[5] = e))
0002575:                       : i[0] <= p &&
0002576:                         ((o = n < 2 && p < i[1])
0002577:                           ? ((c = 0), (d.v = r), (d.n = i[1]))
0002578:                           : p < y &&
0002579:                             (o = n < 3 || i[0] > r || r > y) &&
0002580:                             ((i[4] = n), (i[5] = r), (d.n = y), (c = 0)));
0002581:                   }
0002582:                   if (o || n > 1) return a;
0002583:                   throw ((f = !0), r);
0002584:                 }
0002585:                 return function (o, l, y) {
0002586:                   if (s > 1) throw TypeError("Generator is already running");
0002587:                   for (
0002588:                     f && 1 === l && p(l, y), c = l, u = y;
0002589:                     (t = c < 2 ? e : u) || !f;
0002590: 
0002591:                   ) {
0002592:                     i ||
0002593:                       (c
0002594:                         ? c < 3
0002595:                           ? (c > 1 && (d.n = -1), p(c, u))
0002596:                           : (d.n = u)
0002597:                         : (d.v = u));
0002598:                     try {
0002599:                       if (((s = 2), i)) {
0002600:                         if ((c || (o = "next"), (t = i[o]))) {
0002601:                           if (!(t = t.call(i, u)))
0002602:                             throw TypeError("iterator result is not an object");
0002603:                           if (!t.done) return t;
0002604:                           ((u = t.value), c < 2 && (c = 0));
0002605:                         } else
0002606:                           (1 === c && (t = i.return) && t.call(i),
0002607:                             c < 2 &&
0002608:                               ((u = TypeError(
0002609:                                 "The iterator does not provide a '" +
0002610:                                   o +
0002611:                                   "' method",
0002612:                               )),
0002613:                               (c = 1)));
0002614:                         i = e;
0002615:                       } else if ((t = (f = d.n < 0) ? u : n.call(r, d)) !== a)
0002616:                         break;
0002617:                     } catch (t) {
0002618:                       ((i = e), (c = 1), (u = t));
0002619:                     } finally {
0002620:                       s = 1;
0002621:                     }
0002622:                   }
0002623:                   return { value: t, done: f };
0002624:                 };
0002625:               })(n, o, i),
0002626:               !0,
0002627:             ),
0002628:             s
0002629:           );
0002630:         }
0002631:         var a = {};
0002632:         function c() {}
0002633:         function u() {}
0002634:         function s() {}
0002635:         t = Object.getPrototypeOf;
0002636:         var l = [][r]
0002637:             ? t(t([][r]()))
0002638:             : (Se((t = {}), r, function () {
0002639:                 return this;

/* ===== REGION 1 lines 17806-18555 ===== */
0017806:                   onReadingProgressOptionsChange: function (e, t) {
0017807:                     var n = a.readerSettings.readingProgressOptions;
0017808:                     a.updateReaderSettings({
0017809:                       readingProgressOptions: Object.assign(
0017810:                         Object.assign({}, n),
0017811:                         Lu({}, e, t),
0017812:                       ),
0017813:                     });
0017814:                     var r = t ? "On" : "Off";
0017815:                     (f.recordCountMetrics(
0017816:                       "AaMenu:ReadingProgress:".concat(e).concat(r, ":Count"),
0017817:                       1,
0017818:                     ),
0017819:                       l(new ji(new ec(hu(e), Iu(r)))),
0017820:                       u.isVerticalLayout &&
0017821:                         (f.recordCountMetrics(
0017822:                           "AaMenu:JPV:ReadingProgress:"
0017823:                             .concat(e)
0017824:                             .concat(r, ":Count"),
0017825:                           1,
0017826:                         ),
0017827:                         l(new ji(new tc(hu(e), Iu(r))))));
0017828:                   },
0017829:                 }),
0017830:               ),
0017831:             (!kfwDisabledFeatures ||
0017832:               !kfwDisabledFeatures.includes("ANIMATION_DURATION_SLIDER")) &&
0017833:               "reflowable" !== c.bookType &&
0017834:               u.canChangeAnimationDuration &&
0017835:               r.createElement(
0017836:                 s.AaMenuItem,
0017837:                 {
0017838:                   title: Ar(
0017839:                     "aa_menu_animation_duration_label",
0017840:                     "Animate Transitions",
0017841:                   ),
0017842:                   togglableOptions: {
0017843:                     toggleButton: !0,
0017844:                     onToggleChange: function (e) {
0017845:                       (I(e), j(e ? S : 0));
0017846:                     },
0017847:                     toggleChecked: h,
0017848:                     toggleLabel: Ar(
0017849:                       "aa_menu_animation_duration_toggle_label",
0017850:                       "Toggle transition animations",
0017851:                     ),
0017852:                     className: "animation_speed_toggle",
0017853:                   },
0017854:                 },
0017855:                 r.createElement(s.AnimationDurationSlider, {
0017856:                   selectedAnimationDuration: S,
0017857:                   onAnimationDurationChange: function (e) {
0017858:                     (M(e), j(e));
0017859:                   },
0017860:                   disabled: !h,
0017861:                 }),
0017862:               ),
0017863:             p &&
0017864:               r.createElement(s.AaMenuItem, {
0017865:                 title: Ar("aa_menu_text_popups_label", "Text Pop-Ups"),
0017866:                 description: Ar(
0017867:                   "aa_menu_text_popups_description",
0017868:                   "Activate text pop-ups to reveal hidden content. This will disable zoom.",
0017869:                 ),
0017870:                 togglableOptions: {
0017871:                   toggleButton: !0,
0017872:                   onToggleChange: function (e) {
0017873:                     m({
0017874:                       viewingMode: e ? "TextPopup" : "FullPage",
0017875:                       viewingModeInitiator: "reader",
0017876:                     });
0017877:                     var t = e
0017878:                       ? "TextPopupsToggle:Activate"
0017879:                       : "TextPopupsToggle:Deactivate";
0017880:                     (f.recordCountMetrics(t, 1), l(new ji(new bu(t))));
0017881:                   },
0017882:                   toggleChecked: y,
0017883:                   toggleLabel: Ar(
0017884:                     "aa_menu_text_popups_toggle_label",
0017885:                     "Toggle text pop-ups",
0017886:                   ),
0017887:                   className: "text_popups_toggle",
0017888:                 },
0017889:               }),
0017890:             (function () {
0017891:               var e;
0017892:               return (
0017893:                 null !==
0017894:                   (e =
0017895:                     null === kfwClientFeatures || void 0 === kfwClientFeatures
0017896:                       ? void 0
0017897:                       : kfwClientFeatures.shouldShowNavModeToggle) &&
0017898:                 void 0 !== e &&
0017899:                 e
0017900:               );
0017901:             })() &&
0017902:               r.createElement(
0017903:                 s.AaMenuItem,
0017904:                 { title: "Navigation Mode Toggle" },
0017905:                 r.createElement(
0017906:                   o.IonItem,
0017907:                   null,
0017908:                   r.createElement(
0017909:                     o.IonButton,
0017910:                     {
0017911:                       onClick: function () {
0017912:                         return C("Paginated");
0017913:                       },
0017914:                     },
0017915:                     " Paginated ",
0017916:                   ),
0017917:                 ),
0017918:                 r.createElement(
0017919:                   o.IonItem,
0017920:                   null,
0017921:                   r.createElement(
0017922:                     o.IonButton,
0017923:                     {
0017924:                       onClick: function () {
0017925:                         return C("Scroll");
0017926:                       },
0017927:                     },
0017928:                     " Scroll ",
0017929:                   ),
0017930:                 ),
0017931:               ),
0017932:             (function () {
0017933:               var e;
0017934:               return (
0017935:                 null !==
0017936:                   (e =
0017937:                     null === kfwClientFeatures || void 0 === kfwClientFeatures
0017938:                       ? void 0
0017939:                       : kfwClientFeatures.shouldShowNavDirToggle) &&
0017940:                 void 0 !== e &&
0017941:                 e
0017942:               );
0017943:             })() &&
0017944:               r.createElement(
0017945:                 s.AaMenuItem,
0017946:                 { title: "Navigation Direction Toggle" },
0017947:                 r.createElement(
0017948:                   o.IonItem,
0017949:                   null,
0017950:                   r.createElement(
0017951:                     o.IonButton,
0017952:                     {
0017953:                       onClick: function () {
0017954:                         return T("Horizontal");
0017955:                       },
0017956:                     },
0017957:                     " Horizontal ",
0017958:                   ),
0017959:                 ),
0017960:                 r.createElement(
0017961:                   o.IonItem,
0017962:                   null,
0017963:                   r.createElement(
0017964:                     o.IonButton,
0017965:                     {
0017966:                       onClick: function () {
0017967:                         return T("Vertical");
0017968:                       },
0017969:                     },
0017970:                     " Vertical ",
0017971:                   ),
0017972:                 ),
0017973:               ),
0017974:             "reflowable" !== c.bookType &&
0017975:               r.createElement(s.AaMenuItem, {
0017976:                 title: Ar(
0017977:                   "aa_menu_vertical_pagination_label",
0017978:                   "Vertical Pagination",
0017979:                 ),
0017980:                 description: Ar(
0017981:                   "aa_menu_vertical_pagination_description",
0017982:                   "Read by scrolling vertically.",
0017983:                 ),
0017984:                 togglableOptions: {
0017985:                   toggleButton: !0,
0017986:                   onToggleChange: function (e) {
0017987:                     return T(e ? "Vertical" : "Horizontal");
0017988:                   },
0017989:                   toggleChecked:
0017990:                     "Vertical" === a.readerSettings.navigationDirection,
0017991:                   toggleLabel: Ar(
0017992:                     "aa_menu_vertical_pagination_toggle_label",
0017993:                     "Toggle vertical pagination",
0017994:                   ),
0017995:                   className: "vertical_pagination_toggle",
0017996:                 },
0017997:               }),
0017998:             (function () {
0017999:               var e;
0018000:               return (
0018001:                 null !==
0018002:                   (e =
0018003:                     null === kfwClientFeatures || void 0 === kfwClientFeatures
0018004:                       ? void 0
0018005:                       : kfwClientFeatures.shouldShowViewingModeToggle) &&
0018006:                 void 0 !== e &&
0018007:                 e
0018008:               );
0018009:             })() &&
0018010:               r.createElement(
0018011:                 s.AaMenuItem,
0018012:                 { title: "Viewing Mode Toggle" },
0018013:                 r.createElement(
0018014:                   o.IonItem,
0018015:                   null,
0018016:                   r.createElement(
0018017:                     o.IonButton,
0018018:                     {
0018019:                       onClick: function () {
0018020:                         return A("FullPage");
0018021:                       },
0018022:                     },
0018023:                     "Full Page",
0018024:                   ),
0018025:                 ),
0018026:                 r.createElement(
0018027:                   o.IonItem,
0018028:                   null,
0018029:                   r.createElement(
0018030:                     o.IonButton,
0018031:                     {
0018032:                       onClick: function () {
0018033:                         return A("GuidedView");
0018034:                       },
0018035:                     },
0018036:                     "Guided View",
0018037:                   ),
0018038:                 ),
0018039:                 r.createElement(
0018040:                   o.IonItem,
0018041:                   null,
0018042:                   r.createElement(
0018043:                     o.IonButton,
0018044:                     {
0018045:                       onClick: function () {
0018046:                         return A("Zoom");
0018047:                       },
0018048:                     },
0018049:                     "Zoom",
0018050:                   ),
0018051:                 ),
0018052:               ),
0018053:           );
0018054:         },
0018055:         _u = function (e) {
0018056:           return getComputedStyle(document.documentElement).getPropertyValue(e);
0018057:         },
0018058:         Uu = function (e) {
0018059:           return Number(_u(e).replace(/[^\d]/g, ""));
0018060:         },
0018061:         Bu = function (e, t) {
0018062:           var n = document.getElementsByClassName("kr-interaction-layer")[0],
0018063:             r = n ? n.getBoundingClientRect().bottom : window.innerHeight;
0018064:           if (r - e.y < 0) {
0018065:             var o = Array.from(document.getElementsByClassName(t)),
0018066:               i = o.findIndex(function (e) {
0018067:                 return r - e.getBoundingClientRect().top < 1;
0018068:               });
0018069:             if (i > 0)
0018070:               return {
0018071:                 x: o[i - 1].getBoundingClientRect().right,
0018072:                 y: o[i - 1].getBoundingClientRect().top,
0018073:               };
0018074:           }
0018075:           return e;
0018076:         },
0018077:         Zu = function (e) {
0018078:           var t,
0018079:             n =
0018080:               null === (t = e.pieces) || void 0 === t
0018081:                 ? void 0
0018082:                 : t[e.pieces.length - 1];
0018083:           return n
0018084:             ? {
0018085:                 x: n.left,
0018086:                 y: n.top,
0018087:                 width: n.right - n.left,
0018088:                 height: n.bottom - n.top,
0018089:               }
0018090:             : { x: e.x, y: e.y, width: e.width, height: e.height };
0018091:         },
0018092:         Fu = function (e) {
0018093:           return (
0018094:             window.innerHeight -
0018095:               Uu("--dictionary-popover-bottom-landscape") -
0018096:               Uu("--dictionary-popover-height-landscape") -
0018097:               e <
0018098:             Uu("--selection-popover-buttons-height")
0018099:           );
0018100:         },
0018101:         Wu = function (e, t, n, r) {
0018102:           if (on()) {
0018103:             var o = e.getBoundingClientRect().height,
0018104:               i = 0 !== o ? o : Uu("--dictionary-popover-height");
0018105:             return (
0018106:               (function (e, t, n, r) {
0018107:                 if (r) {
0018108:                   var o = document.getElementsByClassName(
0018109:                       "kr-interaction-layer",
0018110:                     )[0],
0018111:                     i = o ? o.getBoundingClientRect().width : window.innerWidth,
0018112:                     a = Zu(r),
0018113:                     c = a.x + a.width / 2 - t / 2;
0018114:                   c + t > i
0018115:                     ? (e.style.right = _u("--selection-popover-safe-position"))
0018116:                     : c < 0 &&
0018117:                       (e.style.left = _u("--selection-popover-safe-position"));
0018118:                   var u = a.y < window.innerHeight / 2;
0018119:                   e.style.top = "".concat(
0018120:                     u ? a.y + 1.5 * a.height : a.y - n - 0.5 * a.height,
0018121:                     "px",
0018122:                   );
0018123:                 }
0018124:               })(e, Uu("--dictionary-popover-width"), i, r),
0018125:               "dynamicPosition"
0018126:             );
0018127:           }
0018128:           return r && r.y > window.innerHeight / 2
0018129:             ? t
0018130:               ? "displayTopFullscreen"
0018131:               : "displayTop"
0018132:             : Fu(n)
0018133:               ? "displayBeyondScreen"
0018134:               : t
0018135:                 ? "displayBottomFullscreen"
0018136:                 : "displayBottom";
0018137:         };
0018138:       function Yu(e) {
0018139:         return (
0018140:           (Yu =
0018141:             "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
0018142:               ? function (e) {
0018143:                   return typeof e;
0018144:                 }
0018145:               : function (e) {
0018146:                   return e &&
0018147:                     "function" == typeof Symbol &&
0018148:                     e.constructor === Symbol &&
0018149:                     e !== Symbol.prototype
0018150:                     ? "symbol"
0018151:                     : typeof e;
0018152:                 }),
0018153:           Yu(e)
0018154:         );
0018155:       }
0018156:       function Hu() {
0018157:         var e,
0018158:           t,
0018159:           n = "function" == typeof Symbol ? Symbol : {},
0018160:           r = n.iterator || "@@iterator",
0018161:           o = n.toStringTag || "@@toStringTag";
0018162:         function i(n, r, o, i) {
0018163:           var u = r && r.prototype instanceof c ? r : c,
0018164:             s = Object.create(u.prototype);
0018165:           return (
0018166:             Vu(
0018167:               s,
0018168:               "_invoke",
0018169:               (function (n, r, o) {
0018170:                 var i,
0018171:                   c,
0018172:                   u,
0018173:                   s = 0,
0018174:                   l = o || [],
0018175:                   f = !1,
0018176:                   d = {
0018177:                     p: 0,
0018178:                     n: 0,
0018179:                     v: e,
0018180:                     a: p,
0018181:                     f: p.bind(e, 4),
0018182:                     d: function (t, n) {
0018183:                       return ((i = t), (c = 0), (u = e), (d.n = n), a);
0018184:                     },
0018185:                   };
0018186:                 function p(n, r) {
0018187:                   for (
0018188:                     c = n, u = r, t = 0;
0018189:                     !f && s && !o && t < l.length;
0018190:                     t++
0018191:                   ) {
0018192:                     var o,
0018193:                       i = l[t],
0018194:                       p = d.p,
0018195:                       y = i[2];
0018196:                     n > 3
0018197:                       ? (o = y === r) &&
0018198:                         ((u = i[(c = i[4]) ? 5 : ((c = 3), 3)]),
0018199:                         (i[4] = i[5] = e))
0018200:                       : i[0] <= p &&
0018201:                         ((o = n < 2 && p < i[1])
0018202:                           ? ((c = 0), (d.v = r), (d.n = i[1]))
0018203:                           : p < y &&
0018204:                             (o = n < 3 || i[0] > r || r > y) &&
0018205:                             ((i[4] = n), (i[5] = r), (d.n = y), (c = 0)));
0018206:                   }
0018207:                   if (o || n > 1) return a;
0018208:                   throw ((f = !0), r);
0018209:                 }
0018210:                 return function (o, l, y) {
0018211:                   if (s > 1) throw TypeError("Generator is already running");
0018212:                   for (
0018213:                     f && 1 === l && p(l, y), c = l, u = y;
0018214:                     (t = c < 2 ? e : u) || !f;
0018215: 
0018216:                   ) {
0018217:                     i ||
0018218:                       (c
0018219:                         ? c < 3
0018220:                           ? (c > 1 && (d.n = -1), p(c, u))
0018221:                           : (d.n = u)
0018222:                         : (d.v = u));
0018223:                     try {
0018224:                       if (((s = 2), i)) {
0018225:                         if ((c || (o = "next"), (t = i[o]))) {
0018226:                           if (!(t = t.call(i, u)))
0018227:                             throw TypeError("iterator result is not an object");
0018228:                           if (!t.done) return t;
0018229:                           ((u = t.value), c < 2 && (c = 0));
0018230:                         } else
0018231:                           (1 === c && (t = i.return) && t.call(i),
0018232:                             c < 2 &&
0018233:                               ((u = TypeError(
0018234:                                 "The iterator does not provide a '" +
0018235:                                   o +
0018236:                                   "' method",
0018237:                               )),
0018238:                               (c = 1)));
0018239:                         i = e;
0018240:                       } else if ((t = (f = d.n < 0) ? u : n.call(r, d)) !== a)
0018241:                         break;
0018242:                     } catch (t) {
0018243:                       ((i = e), (c = 1), (u = t));
0018244:                     } finally {
0018245:                       s = 1;
0018246:                     }
0018247:                   }
0018248:                   return { value: t, done: f };
0018249:                 };
0018250:               })(n, o, i),
0018251:               !0,
0018252:             ),
0018253:             s
0018254:           );
0018255:         }
0018256:         var a = {};
0018257:         function c() {}
0018258:         function u() {}
0018259:         function s() {}
0018260:         t = Object.getPrototypeOf;
0018261:         var l = [][r]
0018262:             ? t(t([][r]()))
0018263:             : (Vu((t = {}), r, function () {
0018264:                 return this;
0018265:               }),
0018266:               t),
0018267:           f = (s.prototype = c.prototype = Object.create(l));
0018268:         function d(e) {
0018269:           return (
0018270:             Object.setPrototypeOf
0018271:               ? Object.setPrototypeOf(e, s)
0018272:               : ((e.__proto__ = s), Vu(e, o, "GeneratorFunction")),
0018273:             (e.prototype = Object.create(f)),
0018274:             e
0018275:           );
0018276:         }
0018277:         return (
0018278:           (u.prototype = s),
0018279:           Vu(f, "constructor", s),
0018280:           Vu(s, "constructor", u),
0018281:           (u.displayName = "GeneratorFunction"),
0018282:           Vu(s, o, "GeneratorFunction"),
0018283:           Vu(f),
0018284:           Vu(f, o, "Generator"),
0018285:           Vu(f, r, function () {
0018286:             return this;
0018287:           }),
0018288:           Vu(f, "toString", function () {
0018289:             return "[object Generator]";
0018290:           }),
0018291:           (Hu = function () {
0018292:             return { w: i, m: d };
0018293:           })()
0018294:         );
0018295:       }
0018296:       function Vu(e, t, n, r) {
0018297:         var o = Object.defineProperty;
0018298:         try {
0018299:           o({}, "", {});
0018300:         } catch (e) {
0018301:           o = 0;
0018302:         }
0018303:         ((Vu = function (e, t, n, r) {
0018304:           function i(t, n) {
0018305:             Vu(e, t, function (e) {
0018306:               return this._invoke(t, n, e);
0018307:             });
0018308:           }
0018309:           t
0018310:             ? o
0018311:               ? o(e, t, {
0018312:                   value: n,
0018313:                   enumerable: !r,
0018314:                   configurable: !r,
0018315:                   writable: !r,
0018316:                 })
0018317:               : (e[t] = n)
0018318:             : (i("next", 0), i("throw", 1), i("return", 2));
0018319:         }),
0018320:           Vu(e, t, n, r));
0018321:       }
0018322:       function Qu(e, t) {
0018323:         for (var n = 0; n < t.length; n++) {
0018324:           var r = t[n];
0018325:           ((r.enumerable = r.enumerable || !1),
0018326:             (r.configurable = !0),
0018327:             "value" in r && (r.writable = !0),
0018328:             Object.defineProperty(e, Ju(r.key), r));
0018329:         }
0018330:       }
0018331:       function Ju(e) {
0018332:         var t = (function (e, t) {
0018333:           if ("object" != Yu(e) || !e) return e;
0018334:           var n = e[Symbol.toPrimitive];
0018335:           if (void 0 !== n) {
0018336:             var r = n.call(e, t || "default");
0018337:             if ("object" != Yu(r)) return r;
0018338:             throw new TypeError("@@toPrimitive must return a primitive value.");
0018339:           }
0018340:           return ("string" === t ? String : Number)(e);
0018341:         })(e, "string");
0018342:         return "symbol" == Yu(t) ? t : t + "";
0018343:       }
0018344:       var Ku = function (e, t, n, r) {
0018345:           return new (n || (n = Promise))(function (o, i) {
0018346:             function a(e) {
0018347:               try {
0018348:                 u(r.next(e));
0018349:               } catch (e) {
0018350:                 i(e);
0018351:               }
0018352:             }
0018353:             function c(e) {
0018354:               try {
0018355:                 u(r.throw(e));
0018356:               } catch (e) {
0018357:                 i(e);
0018358:               }
0018359:             }
0018360:             function u(e) {
0018361:               var t;
0018362:               e.done
0018363:                 ? o(e.value)
0018364:                 : ((t = e.value),
0018365:                   t instanceof n
0018366:                     ? t
0018367:                     : new n(function (e) {
0018368:                         e(t);
0018369:                       })).then(a, c);
0018370:             }
0018371:             u((r = r.apply(e, t || [])).next());
0018372:           });
0018373:         },
0018374:         Xu = (function () {
0018375:           function e(t, n) {
0018376:             (!(function (e, t) {
0018377:               if (!(e instanceof t))
0018378:                 throw new TypeError("Cannot call a class as a function");
0018379:             })(this, e),
0018380:               (this.deviceSession = t),
0018381:               (this.readingSession = n));
0018382:           }
0018383:           return (
0018384:             (t = e),
0018385:             (r = [
0018386:               {
0018387:                 key: "validateOutput",
0018388:                 value: function (e) {
0018389:                   return (
0018390:                     0 !== e.length &&
0018391:                     e.every(function (e) {
0018392:                       return (
0018393:                         !(
0018394:                           !e.headword ||
0018395:                           !e.definitionsGroups ||
0018396:                           0 === e.definitionsGroups.length
0018397:                         ) &&
0018398:                         e.definitionsGroups.every(function (e) {
0018399:                           return e.definitions && e.definitions.length > 0;
0018400:                         })
0018401:                       );
0018402:                     })
0018403:                   );
0018404:                 },
0018405:               },
0018406:             ]),
0018407:             (n = [
0018408:               {
0018409:                 key: "getWordDefinition",
0018410:                 value: function (t, n) {
0018411:                   var r = this;
0018412:                   return $.asyncExecuteMetrics(
0018413:                     "GetWordDefinition",
0018414:                     function () {
0018415:                       return Ku(
0018416:                         r,
0018417:                         void 0,
0018418:                         void 0,
0018419:                         Hu().m(function r() {
0018420:                           var o, i, a;
0018421:                           return Hu().w(
0018422:                             function (r) {
0018423:                               for (;;)
0018424:                                 switch ((r.p = r.n)) {
0018425:                                   case 0:
0018426:                                     if (!this.readingSession) {
0018427:                                       r.n = 6;
0018428:                                       break;
0018429:                                     }
0018430:                                     return (
0018431:                                       (r.p = 1),
0018432:                                       (o = {
0018433:                                         dictionaryAsin: n,
0018434:                                         bookAsin: this.readingSession.asin,
0018435:                                         yjACR: this.readingSession.acr,
0018436:                                         refEmId: this.readingSession.refEmId,
0018437:                                         revision: this.readingSession.revision,
0018438:                                         position: t,
0018439:                                       }),
0018440:                                       (r.n = 2),
0018441:                                       pe.wordDefinition(
0018442:                                         o,
0018443:                                         this.deviceSession.deviceSessionToken,
0018444:                                       )
0018445:                                     );
0018446:                                   case 2:
0018447:                                     if (
0018448:                                       !(i = r.v).definitions ||
0018449:                                       !i.definitions.length
0018450:                                     ) {
0018451:                                       r.n = 4;
0018452:                                       break;
0018453:                                     }
0018454:                                     if (!e.validateOutput(i.definitions)) {
0018455:                                       r.n = 3;
0018456:                                       break;
0018457:                                     }
0018458:                                     return (
0018459:                                       $.recordCountMetrics(
0018460:                                         "Dictionary:DefinitionFound",
0018461:                                         1,
0018462:                                       ),
0018463:                                       r.a(2, i.definitions)
0018464:                                     );
0018465:                                   case 3:
0018466:                                     return (
0018467:                                       console.error(
0018468:                                         "GetWordDefinition: UnexpectedFormat for definition [".concat(
0018469:                                           JSON.stringify(i),
0018470:                                           "]",
0018471:                                         ),
0018472:                                       ),
0018473:                                       $.recordCountMetrics(
0018474:                                         "Dictionary:DefinitionFound:UnexpectedFormat",
0018475:                                         1,
0018476:                                       ),
0018477:                                       r.a(2, [])
0018478:                                     );
0018479:                                   case 4:
0018480:                                     return (
0018481:                                       $.recordCountMetrics(
0018482:                                         "Dictionary:NoDefinition",
0018483:                                         1,
0018484:                                       ),
0018485:                                       i.message
0018486:                                         ? ($.recordCountMetrics(
0018487:                                             "Dictionary:NoDefinition:WithMessage",
0018488:                                             1,
0018489:                                           ),
0018490:                                           console.error(
0018491:                                             "GetWordDefinition returned with message ["
0018492:                                               .concat(
0018493:                                                 i.message,
0018494:                                                 "] for input [",
0018495:                                               )
0018496:                                               .concat(JSON.stringify(o), "]"),
0018497:                                           ))
0018498:                                         : console.error(
0018499:                                             "GetWordDefinition returned empty definitions for input [".concat(
0018500:                                               JSON.stringify(o),
0018501:                                               "]",
0018502:                                             ),
0018503:                                           ),
0018504:                                       r.a(2, [])
0018505:                                     );
0018506:                                   case 5:
0018507:                                     ((r.p = 5),
0018508:                                       (a = r.v),
0018509:                                       $.recordCountMetrics(
0018510:                                         "Dictionary:ServiceError",
0018511:                                         1,
0018512:                                       ),
0018513:                                       console.error(
0018514:                                         "GetWordDefinition exception with error [".concat(
0018515:                                           a,
0018516:                                           "]",
0018517:                                         ),
0018518:                                       ));
0018519:                                   case 6:
0018520:                                     return r.a(2, void 0);
0018521:                                 }
0018522:                             },
0018523:                             r,
0018524:                             this,
0018525:                             [[1, 5]],
0018526:                           );
0018527:                         }),
0018528:                       );
0018529:                     },
0018530:                   );
0018531:                 },
0018532:               },
0018533:             ]) && Qu(t.prototype, n),
0018534:             r && Qu(t, r),
0018535:             Object.defineProperty(t, "prototype", { writable: !1 }),
0018536:             t
0018537:           );
0018538:           var t, n, r;
0018539:         })();
0018540:       function qu(e) {
0018541:         return (
0018542:           (qu =
0018543:             "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
0018544:               ? function (e) {
0018545:                   return typeof e;
0018546:                 }
0018547:               : function (e) {
0018548:                   return e &&
0018549:                     "function" == typeof Symbol &&
0018550:                     e.constructor === Symbol &&
0018551:                     e !== Symbol.prototype
0018552:                     ? "symbol"
0018553:                     : typeof e;
0018554:                 }),
0018555:           qu(e)

/* ===== REGION 2 lines 31137-33416 ===== */
0031137:               })
0031138:             : null;
0031139:         };
0031140:       function sy(e) {
0031141:         return (
0031142:           (sy =
0031143:             "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
0031144:               ? function (e) {
0031145:                   return typeof e;
0031146:                 }
0031147:               : function (e) {
0031148:                   return e &&
0031149:                     "function" == typeof Symbol &&
0031150:                     e.constructor === Symbol &&
0031151:                     e !== Symbol.prototype
0031152:                     ? "symbol"
0031153:                     : typeof e;
0031154:                 }),
0031155:           sy(e)
0031156:         );
0031157:       }
0031158:       function ly() {
0031159:         var e,
0031160:           t,
0031161:           n = "function" == typeof Symbol ? Symbol : {},
0031162:           r = n.iterator || "@@iterator",
0031163:           o = n.toStringTag || "@@toStringTag";
0031164:         function i(n, r, o, i) {
0031165:           var u = r && r.prototype instanceof c ? r : c,
0031166:             s = Object.create(u.prototype);
0031167:           return (
0031168:             fy(
0031169:               s,
0031170:               "_invoke",
0031171:               (function (n, r, o) {
0031172:                 var i,
0031173:                   c,
0031174:                   u,
0031175:                   s = 0,
0031176:                   l = o || [],
0031177:                   f = !1,
0031178:                   d = {
0031179:                     p: 0,
0031180:                     n: 0,
0031181:                     v: e,
0031182:                     a: p,
0031183:                     f: p.bind(e, 4),
0031184:                     d: function (t, n) {
0031185:                       return ((i = t), (c = 0), (u = e), (d.n = n), a);
0031186:                     },
0031187:                   };
0031188:                 function p(n, r) {
0031189:                   for (
0031190:                     c = n, u = r, t = 0;
0031191:                     !f && s && !o && t < l.length;
0031192:                     t++
0031193:                   ) {
0031194:                     var o,
0031195:                       i = l[t],
0031196:                       p = d.p,
0031197:                       y = i[2];
0031198:                     n > 3
0031199:                       ? (o = y === r) &&
0031200:                         ((u = i[(c = i[4]) ? 5 : ((c = 3), 3)]),
0031201:                         (i[4] = i[5] = e))
0031202:                       : i[0] <= p &&
0031203:                         ((o = n < 2 && p < i[1])
0031204:                           ? ((c = 0), (d.v = r), (d.n = i[1]))
0031205:                           : p < y &&
0031206:                             (o = n < 3 || i[0] > r || r > y) &&
0031207:                             ((i[4] = n), (i[5] = r), (d.n = y), (c = 0)));
0031208:                   }
0031209:                   if (o || n > 1) return a;
0031210:                   throw ((f = !0), r);
0031211:                 }
0031212:                 return function (o, l, y) {
0031213:                   if (s > 1) throw TypeError("Generator is already running");
0031214:                   for (
0031215:                     f && 1 === l && p(l, y), c = l, u = y;
0031216:                     (t = c < 2 ? e : u) || !f;
0031217: 
0031218:                   ) {
0031219:                     i ||
0031220:                       (c
0031221:                         ? c < 3
0031222:                           ? (c > 1 && (d.n = -1), p(c, u))
0031223:                           : (d.n = u)
0031224:                         : (d.v = u));
0031225:                     try {
0031226:                       if (((s = 2), i)) {
0031227:                         if ((c || (o = "next"), (t = i[o]))) {
0031228:                           if (!(t = t.call(i, u)))
0031229:                             throw TypeError("iterator result is not an object");
0031230:                           if (!t.done) return t;
0031231:                           ((u = t.value), c < 2 && (c = 0));
0031232:                         } else
0031233:                           (1 === c && (t = i.return) && t.call(i),
0031234:                             c < 2 &&
0031235:                               ((u = TypeError(
0031236:                                 "The iterator does not provide a '" +
0031237:                                   o +
0031238:                                   "' method",
0031239:                               )),
0031240:                               (c = 1)));
0031241:                         i = e;
0031242:                       } else if ((t = (f = d.n < 0) ? u : n.call(r, d)) !== a)
0031243:                         break;
0031244:                     } catch (t) {
0031245:                       ((i = e), (c = 1), (u = t));
0031246:                     } finally {
0031247:                       s = 1;
0031248:                     }
0031249:                   }
0031250:                   return { value: t, done: f };
0031251:                 };
0031252:               })(n, o, i),
0031253:               !0,
0031254:             ),
0031255:             s
0031256:           );
0031257:         }
0031258:         var a = {};
0031259:         function c() {}
0031260:         function u() {}
0031261:         function s() {}
0031262:         t = Object.getPrototypeOf;
0031263:         var l = [][r]
0031264:             ? t(t([][r]()))
0031265:             : (fy((t = {}), r, function () {
0031266:                 return this;
0031267:               }),
0031268:               t),
0031269:           f = (s.prototype = c.prototype = Object.create(l));
0031270:         function d(e) {
0031271:           return (
0031272:             Object.setPrototypeOf
0031273:               ? Object.setPrototypeOf(e, s)
0031274:               : ((e.__proto__ = s), fy(e, o, "GeneratorFunction")),
0031275:             (e.prototype = Object.create(f)),
0031276:             e
0031277:           );
0031278:         }
0031279:         return (
0031280:           (u.prototype = s),
0031281:           fy(f, "constructor", s),
0031282:           fy(s, "constructor", u),
0031283:           (u.displayName = "GeneratorFunction"),
0031284:           fy(s, o, "GeneratorFunction"),
0031285:           fy(f),
0031286:           fy(f, o, "Generator"),
0031287:           fy(f, r, function () {
0031288:             return this;
0031289:           }),
0031290:           fy(f, "toString", function () {
0031291:             return "[object Generator]";
0031292:           }),
0031293:           (ly = function () {
0031294:             return { w: i, m: d };
0031295:           })()
0031296:         );
0031297:       }
0031298:       function fy(e, t, n, r) {
0031299:         var o = Object.defineProperty;
0031300:         try {
0031301:           o({}, "", {});
0031302:         } catch (e) {
0031303:           o = 0;
0031304:         }
0031305:         ((fy = function (e, t, n, r) {
0031306:           function i(t, n) {
0031307:             fy(e, t, function (e) {
0031308:               return this._invoke(t, n, e);
0031309:             });
0031310:           }
0031311:           t
0031312:             ? o
0031313:               ? o(e, t, {
0031314:                   value: n,
0031315:                   enumerable: !r,
0031316:                   configurable: !r,
0031317:                   writable: !r,
0031318:                 })
0031319:               : (e[t] = n)
0031320:             : (i("next", 0), i("throw", 1), i("return", 2));
0031321:         }),
0031322:           fy(e, t, n, r));
0031323:       }
0031324:       function dy(e, t) {
0031325:         for (var n = 0; n < t.length; n++) {
0031326:           var r = t[n];
0031327:           ((r.enumerable = r.enumerable || !1),
0031328:             (r.configurable = !0),
0031329:             "value" in r && (r.writable = !0),
0031330:             Object.defineProperty(e, py(r.key), r));
0031331:         }
0031332:       }
0031333:       function py(e) {
0031334:         var t = (function (e, t) {
0031335:           if ("object" != sy(e) || !e) return e;
0031336:           var n = e[Symbol.toPrimitive];
0031337:           if (void 0 !== n) {
0031338:             var r = n.call(e, t || "default");
0031339:             if ("object" != sy(r)) return r;
0031340:             throw new TypeError("@@toPrimitive must return a primitive value.");
0031341:           }
0031342:           return ("string" === t ? String : Number)(e);
0031343:         })(e, "string");
0031344:         return "symbol" == sy(t) ? t : t + "";
0031345:       }
0031346:       var yy = function (e, t, n, r) {
0031347:           return new (n || (n = Promise))(function (o, i) {
0031348:             function a(e) {
0031349:               try {
0031350:                 u(r.next(e));
0031351:               } catch (e) {
0031352:                 i(e);
0031353:               }
0031354:             }
0031355:             function c(e) {
0031356:               try {
0031357:                 u(r.throw(e));
0031358:               } catch (e) {
0031359:                 i(e);
0031360:               }
0031361:             }
0031362:             function u(e) {
0031363:               var t;
0031364:               e.done
0031365:                 ? o(e.value)
0031366:                 : ((t = e.value),
0031367:                   t instanceof n
0031368:                     ? t
0031369:                     : new n(function (e) {
0031370:                         e(t);
0031371:                       })).then(a, c);
0031372:             }
0031373:             u((r = r.apply(e, t || [])).next());
0031374:           });
0031375:         },
0031376:         gy = (function () {
0031377:           function e() {
0031378:             !(function (e, t) {
0031379:               if (!(e instanceof t))
0031380:                 throw new TypeError("Cannot call a class as a function");
0031381:             })(this, e);
0031382:           }
0031383:           return (
0031384:             (t = e),
0031385:             (r = [
0031386:               {
0031387:                 key: "getSearchIndex",
0031388:                 value: function (t) {
0031389:                   return yy(
0031390:                     this,
0031391:                     void 0,
0031392:                     void 0,
0031393:                     ly().m(function n() {
0031394:                       var r;
0031395:                       return ly().w(function (n) {
0031396:                         for (;;)
0031397:                           if (0 === n.n)
0031398:                             return (
0031399:                               (r = e.toURLSearchParams(t).toString()),
0031400:                               n.a(
0031401:                                 2,
0031402:                                 e.fetchJson(
0031403:                                   ""
0031404:                                     .concat(
0031405:                                       e.SERVICE_UNAUTH_WEB_ROOT,
0031406:                                       "getSearchIndex?",
0031407:                                     )
0031408:                                     .concat(r),
0031409:                                 ),
0031410:                               )
0031411:                             );
0031412:                       }, n);
0031413:                     }),
0031414:                   );
0031415:                 },
0031416:               },
0031417:               {
0031418:                 key: "getSearchContext",
0031419:                 value: function (t) {
0031420:                   return yy(
0031421:                     this,
0031422:                     void 0,
0031423:                     void 0,
0031424:                     ly().m(function n() {
0031425:                       return ly().w(function (n) {
0031426:                         for (;;)
0031427:                           if (0 === n.n)
0031428:                             return n.a(
0031429:                               2,
0031430:                               e
0031431:                                 .fetchPost(
0031432:                                   "".concat(
0031433:                                     e.SERVICE_UNAUTH_WEB_ROOT,
0031434:                                     "getSearchContext",
0031435:                                   ),
0031436:                                   Object.assign(Object.assign({}, t), {
0031437:                                     clientVersion: e.CLIENT_VERSION,
0031438:                                   }),
0031439:                                 )
0031440:                                 .then(function (e) {
0031441:                                   return e.json();
0031442:                                 }),
0031443:                             );
0031444:                       }, n);
0031445:                     }),
0031446:                   );
0031447:                 },
0031448:               },
0031449:               {
0031450:                 key: "fetchJson",
0031451:                 value: function (t) {
0031452:                   return e.fetch(t).then(function (e) {
0031453:                     return e.json();
0031454:                   });
0031455:                 },
0031456:               },
0031457:               {
0031458:                 key: "fetch",
0031459:                 value: function (e) {
0031460:                   return ae.fetchSuccess(e);
0031461:                 },
0031462:               },
0031463:               {
0031464:                 key: "fetchPost",
0031465:                 value: function (e, t) {
0031466:                   return ae.fetchSuccess(e, {
0031467:                     method: "POST",
0031468:                     headers: {
0031469:                       Accept: "application/json",
0031470:                       "Content-Type": "application/json",
0031471:                     },
0031472:                     body: JSON.stringify(t),
0031473:                   });
0031474:                 },
0031475:               },
0031476:               {
0031477:                 key: "toURLSearchParams",
0031478:                 value: function (e) {
0031479:                   var t = new URLSearchParams();
0031480:                   return (
0031481:                     Object.keys(e).map(function (n) {
0031482:                       return t.append(n, e[n]);
0031483:                     }),
0031484:                     t
0031485:                   );
0031486:                 },
0031487:               },
0031488:             ]),
0031489:             (n = null) && dy(t.prototype, n),
0031490:             r && dy(t, r),
0031491:             Object.defineProperty(t, "prototype", { writable: !1 }),
0031492:             t
0031493:           );
0031494:           var t, n, r;
0031495:         })();
0031496:       function vy(e) {
0031497:         return (
0031498:           (vy =
0031499:             "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
0031500:               ? function (e) {
0031501:                   return typeof e;
0031502:                 }
0031503:               : function (e) {
0031504:                   return e &&
0031505:                     "function" == typeof Symbol &&
0031506:                     e.constructor === Symbol &&
0031507:                     e !== Symbol.prototype
0031508:                     ? "symbol"
0031509:                     : typeof e;
0031510:                 }),
0031511:           vy(e)
0031512:         );
0031513:       }
0031514:       function my() {
0031515:         var e,
0031516:           t,
0031517:           n = "function" == typeof Symbol ? Symbol : {},
0031518:           r = n.iterator || "@@iterator",
0031519:           o = n.toStringTag || "@@toStringTag";
0031520:         function i(n, r, o, i) {
0031521:           var u = r && r.prototype instanceof c ? r : c,
0031522:             s = Object.create(u.prototype);
0031523:           return (
0031524:             by(
0031525:               s,
0031526:               "_invoke",
0031527:               (function (n, r, o) {
0031528:                 var i,
0031529:                   c,
0031530:                   u,
0031531:                   s = 0,
0031532:                   l = o || [],
0031533:                   f = !1,
0031534:                   d = {
0031535:                     p: 0,
0031536:                     n: 0,
0031537:                     v: e,
0031538:                     a: p,
0031539:                     f: p.bind(e, 4),
0031540:                     d: function (t, n) {
0031541:                       return ((i = t), (c = 0), (u = e), (d.n = n), a);
0031542:                     },
0031543:                   };
0031544:                 function p(n, r) {
0031545:                   for (
0031546:                     c = n, u = r, t = 0;
0031547:                     !f && s && !o && t < l.length;
0031548:                     t++
0031549:                   ) {
0031550:                     var o,
0031551:                       i = l[t],
0031552:                       p = d.p,
0031553:                       y = i[2];
0031554:                     n > 3
0031555:                       ? (o = y === r) &&
0031556:                         ((u = i[(c = i[4]) ? 5 : ((c = 3), 3)]),
0031557:                         (i[4] = i[5] = e))
0031558:                       : i[0] <= p &&
0031559:                         ((o = n < 2 && p < i[1])
0031560:                           ? ((c = 0), (d.v = r), (d.n = i[1]))
0031561:                           : p < y &&
0031562:                             (o = n < 3 || i[0] > r || r > y) &&
0031563:                             ((i[4] = n), (i[5] = r), (d.n = y), (c = 0)));
0031564:                   }
0031565:                   if (o || n > 1) return a;
0031566:                   throw ((f = !0), r);
0031567:                 }
0031568:                 return function (o, l, y) {
0031569:                   if (s > 1) throw TypeError("Generator is already running");
0031570:                   for (
0031571:                     f && 1 === l && p(l, y), c = l, u = y;
0031572:                     (t = c < 2 ? e : u) || !f;
0031573: 
0031574:                   ) {
0031575:                     i ||
0031576:                       (c
0031577:                         ? c < 3
0031578:                           ? (c > 1 && (d.n = -1), p(c, u))
0031579:                           : (d.n = u)
0031580:                         : (d.v = u));
0031581:                     try {
0031582:                       if (((s = 2), i)) {
0031583:                         if ((c || (o = "next"), (t = i[o]))) {
0031584:                           if (!(t = t.call(i, u)))
0031585:                             throw TypeError("iterator result is not an object");
0031586:                           if (!t.done) return t;
0031587:                           ((u = t.value), c < 2 && (c = 0));
0031588:                         } else
0031589:                           (1 === c && (t = i.return) && t.call(i),
0031590:                             c < 2 &&
0031591:                               ((u = TypeError(
0031592:                                 "The iterator does not provide a '" +
0031593:                                   o +
0031594:                                   "' method",
0031595:                               )),
0031596:                               (c = 1)));
0031597:                         i = e;
0031598:                       } else if ((t = (f = d.n < 0) ? u : n.call(r, d)) !== a)
0031599:                         break;
0031600:                     } catch (t) {
0031601:                       ((i = e), (c = 1), (u = t));
0031602:                     } finally {
0031603:                       s = 1;
0031604:                     }
0031605:                   }
0031606:                   return { value: t, done: f };
0031607:                 };
0031608:               })(n, o, i),
0031609:               !0,
0031610:             ),
0031611:             s
0031612:           );
0031613:         }
0031614:         var a = {};
0031615:         function c() {}
0031616:         function u() {}
0031617:         function s() {}
0031618:         t = Object.getPrototypeOf;
0031619:         var l = [][r]
0031620:             ? t(t([][r]()))
0031621:             : (by((t = {}), r, function () {
0031622:                 return this;
0031623:               }),
0031624:               t),
0031625:           f = (s.prototype = c.prototype = Object.create(l));
0031626:         function d(e) {
0031627:           return (
0031628:             Object.setPrototypeOf
0031629:               ? Object.setPrototypeOf(e, s)
0031630:               : ((e.__proto__ = s), by(e, o, "GeneratorFunction")),
0031631:             (e.prototype = Object.create(f)),
0031632:             e
0031633:           );
0031634:         }
0031635:         return (
0031636:           (u.prototype = s),
0031637:           by(f, "constructor", s),
0031638:           by(s, "constructor", u),
0031639:           (u.displayName = "GeneratorFunction"),
0031640:           by(s, o, "GeneratorFunction"),
0031641:           by(f),
0031642:           by(f, o, "Generator"),
0031643:           by(f, r, function () {
0031644:             return this;
0031645:           }),
0031646:           by(f, "toString", function () {
0031647:             return "[object Generator]";
0031648:           }),
0031649:           (my = function () {
0031650:             return { w: i, m: d };
0031651:           })()
0031652:         );
0031653:       }
0031654:       function by(e, t, n, r) {
0031655:         var o = Object.defineProperty;
0031656:         try {
0031657:           o({}, "", {});
0031658:         } catch (e) {
0031659:           o = 0;
0031660:         }
0031661:         ((by = function (e, t, n, r) {
0031662:           function i(t, n) {
0031663:             by(e, t, function (e) {
0031664:               return this._invoke(t, n, e);
0031665:             });
0031666:           }
0031667:           t
0031668:             ? o
0031669:               ? o(e, t, {
0031670:                   value: n,
0031671:                   enumerable: !r,
0031672:                   configurable: !r,
0031673:                   writable: !r,
0031674:                 })
0031675:               : (e[t] = n)
0031676:             : (i("next", 0), i("throw", 1), i("return", 2));
0031677:         }),
0031678:           by(e, t, n, r));
0031679:       }
0031680:       function hy(e, t) {
0031681:         for (var n = 0; n < t.length; n++) {
0031682:           var r = t[n];
0031683:           ((r.enumerable = r.enumerable || !1),
0031684:             (r.configurable = !0),
0031685:             "value" in r && (r.writable = !0),
0031686:             Object.defineProperty(e, Iy(r.key), r));
0031687:         }
0031688:       }
0031689:       function Iy(e) {
0031690:         var t = (function (e, t) {
0031691:           if ("object" != vy(e) || !e) return e;
0031692:           var n = e[Symbol.toPrimitive];
0031693:           if (void 0 !== n) {
0031694:             var r = n.call(e, t || "default");
0031695:             if ("object" != vy(r)) return r;
0031696:             throw new TypeError("@@toPrimitive must return a primitive value.");
0031697:           }
0031698:           return ("string" === t ? String : Number)(e);
0031699:         })(e, "string");
0031700:         return "symbol" == vy(t) ? t : t + "";
0031701:       }
0031702:       ((gy.SERVICE_UNAUTH_WEB_ROOT = "/service/web/content/"),
0031703:         (gy.CLIENT_VERSION = "20000100"));
0031704:       var wy = function (e, t, n, r) {
0031705:           return new (n || (n = Promise))(function (o, i) {
0031706:             function a(e) {
0031707:               try {
0031708:                 u(r.next(e));
0031709:               } catch (e) {
0031710:                 i(e);
0031711:               }
0031712:             }
0031713:             function c(e) {
0031714:               try {
0031715:                 u(r.throw(e));
0031716:               } catch (e) {
0031717:                 i(e);
0031718:               }
0031719:             }
0031720:             function u(e) {
0031721:               var t;
0031722:               e.done
0031723:                 ? o(e.value)
0031724:                 : ((t = e.value),
0031725:                   t instanceof n
0031726:                     ? t
0031727:                     : new n(function (e) {
0031728:                         e(t);
0031729:                       })).then(a, c);
0031730:             }
0031731:             u((r = r.apply(e, t || [])).next());
0031732:           });
0031733:         },
0031734:         Sy = (function () {
0031735:           return (
0031736:             (e = function e(t, n) {
0031737:               (!(function (e, t) {
0031738:                 if (!(e instanceof t))
0031739:                   throw new TypeError("Cannot call a class as a function");
0031740:               })(this, e),
0031741:                 (this.deviceSession = t),
0031742:                 (this.readingSession = n));
0031743:             }),
0031744:             (t = [
0031745:               {
0031746:                 key: "getSearchIndexInfo",
0031747:                 value: function () {
0031748:                   var e = this;
0031749:                   return $.asyncExecuteMetrics("GetSearchIndex", function () {
0031750:                     return wy(
0031751:                       e,
0031752:                       void 0,
0031753:                       void 0,
0031754:                       my().m(function e() {
0031755:                         var t, n;
0031756:                         return my().w(
0031757:                           function (e) {
0031758:                             for (;;)
0031759:                               switch (e.n) {
0031760:                                 case 0:
0031761:                                   if (F()) {
0031762:                                     e.n = 2;
0031763:                                     break;
0031764:                                   }
0031765:                                   return (
0031766:                                     (e.n = 1),
0031767:                                     pe.getSearchIndex(
0031768:                                       {
0031769:                                         asin: this.readingSession.asin,
0031770:                                         formatVersion: this.readingSession.acr,
0031771:                                         contentVersion:
0031772:                                           this.readingSession.revision,
0031773:                                         facet:
0031774:                                           "YJ" === this.readingSession.format
0031775:                                             ? "YJ"
0031776:                                             : "KCR",
0031777:                                       },
0031778:                                       this.deviceSession.deviceSessionToken,
0031779:                                     )
0031780:                                   );
0031781:                                 case 1:
0031782:                                   ((n = e.v), (e.n = 4));
0031783:                                   break;
0031784:                                 case 2:
0031785:                                   return (
0031786:                                     (e.n = 3),
0031787:                                     gy.getSearchIndex({
0031788:                                       asin: this.readingSession.asin,
0031789:                                       formatVersion: this.readingSession.acr,
0031790:                                       contentVersion:
0031791:                                         this.readingSession.revision,
0031792:                                       facet:
0031793:                                         "YJ" === this.readingSession.format
0031794:                                           ? "YJ"
0031795:                                           : "KCR",
0031796:                                     })
0031797:                                   );
0031798:                                 case 3:
0031799:                                   n = e.v;
0031800:                                 case 4:
0031801:                                   if (!(t = n).errorCode) {
0031802:                                     e.n = 5;
0031803:                                     break;
0031804:                                   }
0031805:                                   return (
0031806:                                     $.recordCountMetrics(
0031807:                                       "SrsSearchIndexService:Error:".concat(
0031808:                                         t.errorCode,
0031809:                                         ":Count",
0031810:                                       ),
0031811:                                       1,
0031812:                                     ),
0031813:                                     e.a(2, void 0)
0031814:                                   );
0031815:                                 case 5:
0031816:                                   return e.a(2, {
0031817:                                     decryptionIV: t.decryptionIV,
0031818:                                     decryptionKey: t.decryptionKey,
0031819:                                     decryptionMethod: t.decryptionMethod,
0031820:                                     indexSize: t.indexSize,
0031821:                                     s3Url: t.s3Url,
0031822:                                   });
0031823:                                 case 6:
0031824:                                   return e.a(2);
0031825:                               }
0031826:                           },
0031827:                           e,
0031828:                           this,
0031829:                         );
0031830:                       }),
0031831:                     );
0031832:                   });
0031833:                 },
0031834:               },
0031835:             ]) && hy(e.prototype, t),
0031836:             n && hy(e, n),
0031837:             Object.defineProperty(e, "prototype", { writable: !1 }),
0031838:             e
0031839:           );
0031840:           var e, t, n;
0031841:         })();
0031842:       function My(e) {
0031843:         return (
0031844:           (My =
0031845:             "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
0031846:               ? function (e) {
0031847:                   return typeof e;
0031848:                 }
0031849:               : function (e) {
0031850:                   return e &&
0031851:                     "function" == typeof Symbol &&
0031852:                     e.constructor === Symbol &&
0031853:                     e !== Symbol.prototype
0031854:                     ? "symbol"
0031855:                     : typeof e;
0031856:                 }),
0031857:           My(e)
0031858:         );
0031859:       }
0031860:       function Ay(e, t) {
0031861:         var n =
0031862:           ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
0031863:           e["@@iterator"];
0031864:         if (!n) {
0031865:           if (
0031866:             Array.isArray(e) ||
0031867:             (n = (function (e, t) {
0031868:               if (e) {
0031869:                 if ("string" == typeof e) return Cy(e, t);
0031870:                 var n = {}.toString.call(e).slice(8, -1);
0031871:                 return (
0031872:                   "Object" === n && e.constructor && (n = e.constructor.name),
0031873:                   "Map" === n || "Set" === n
0031874:                     ? Array.from(e)
0031875:                     : "Arguments" === n ||
0031876:                         /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
0031877:                       ? Cy(e, t)
0031878:                       : void 0
0031879:                 );
0031880:               }
0031881:             })(e)) ||
0031882:             (t && e && "number" == typeof e.length)
0031883:           ) {
0031884:             n && (e = n);
0031885:             var r = 0,
0031886:               o = function () {};
0031887:             return {
0031888:               s: o,
0031889:               n: function () {
0031890:                 return r >= e.length
0031891:                   ? { done: !0 }
0031892:                   : { done: !1, value: e[r++] };
0031893:               },
0031894:               e: function (e) {
0031895:                 throw e;
0031896:               },
0031897:               f: o,
0031898:             };
0031899:           }
0031900:           throw new TypeError(
0031901:             "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
0031902:           );
0031903:         }
0031904:         var i,
0031905:           a = !0,
0031906:           c = !1;
0031907:         return {
0031908:           s: function () {
0031909:             n = n.call(e);
0031910:           },
0031911:           n: function () {
0031912:             var e = n.next();
0031913:             return ((a = e.done), e);
0031914:           },
0031915:           e: function (e) {
0031916:             ((c = !0), (i = e));
0031917:           },
0031918:           f: function () {
0031919:             try {
0031920:               a || null == n.return || n.return();
0031921:             } finally {
0031922:               if (c) throw i;
0031923:             }
0031924:           },
0031925:         };
0031926:       }
0031927:       function Cy(e, t) {
0031928:         (null == t || t > e.length) && (t = e.length);
0031929:         for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
0031930:         return r;
0031931:       }
0031932:       function Ty() {
0031933:         var e,
0031934:           t,
0031935:           n = "function" == typeof Symbol ? Symbol : {},
0031936:           r = n.iterator || "@@iterator",
0031937:           o = n.toStringTag || "@@toStringTag";
0031938:         function i(n, r, o, i) {
0031939:           var u = r && r.prototype instanceof c ? r : c,
0031940:             s = Object.create(u.prototype);
0031941:           return (
0031942:             jy(
0031943:               s,
0031944:               "_invoke",
0031945:               (function (n, r, o) {
0031946:                 var i,
0031947:                   c,
0031948:                   u,
0031949:                   s = 0,
0031950:                   l = o || [],
0031951:                   f = !1,
0031952:                   d = {
0031953:                     p: 0,
0031954:                     n: 0,
0031955:                     v: e,
0031956:                     a: p,
0031957:                     f: p.bind(e, 4),
0031958:                     d: function (t, n) {
0031959:                       return ((i = t), (c = 0), (u = e), (d.n = n), a);
0031960:                     },
0031961:                   };
0031962:                 function p(n, r) {
0031963:                   for (
0031964:                     c = n, u = r, t = 0;
0031965:                     !f && s && !o && t < l.length;
0031966:                     t++
0031967:                   ) {
0031968:                     var o,
0031969:                       i = l[t],
0031970:                       p = d.p,
0031971:                       y = i[2];
0031972:                     n > 3
0031973:                       ? (o = y === r) &&
0031974:                         ((u = i[(c = i[4]) ? 5 : ((c = 3), 3)]),
0031975:                         (i[4] = i[5] = e))
0031976:                       : i[0] <= p &&
0031977:                         ((o = n < 2 && p < i[1])
0031978:                           ? ((c = 0), (d.v = r), (d.n = i[1]))
0031979:                           : p < y &&
0031980:                             (o = n < 3 || i[0] > r || r > y) &&
0031981:                             ((i[4] = n), (i[5] = r), (d.n = y), (c = 0)));
0031982:                   }
0031983:                   if (o || n > 1) return a;
0031984:                   throw ((f = !0), r);
0031985:                 }
0031986:                 return function (o, l, y) {
0031987:                   if (s > 1) throw TypeError("Generator is already running");
0031988:                   for (
0031989:                     f && 1 === l && p(l, y), c = l, u = y;
0031990:                     (t = c < 2 ? e : u) || !f;
0031991: 
0031992:                   ) {
0031993:                     i ||
0031994:                       (c
0031995:                         ? c < 3
0031996:                           ? (c > 1 && (d.n = -1), p(c, u))
0031997:                           : (d.n = u)
0031998:                         : (d.v = u));
0031999:                     try {
0032000:                       if (((s = 2), i)) {
0032001:                         if ((c || (o = "next"), (t = i[o]))) {
0032002:                           if (!(t = t.call(i, u)))
0032003:                             throw TypeError("iterator result is not an object");
0032004:                           if (!t.done) return t;
0032005:                           ((u = t.value), c < 2 && (c = 0));
0032006:                         } else
0032007:                           (1 === c && (t = i.return) && t.call(i),
0032008:                             c < 2 &&
0032009:                               ((u = TypeError(
0032010:                                 "The iterator does not provide a '" +
0032011:                                   o +
0032012:                                   "' method",
0032013:                               )),
0032014:                               (c = 1)));
0032015:                         i = e;
0032016:                       } else if ((t = (f = d.n < 0) ? u : n.call(r, d)) !== a)
0032017:                         break;
0032018:                     } catch (t) {
0032019:                       ((i = e), (c = 1), (u = t));
0032020:                     } finally {
0032021:                       s = 1;
0032022:                     }
0032023:                   }
0032024:                   return { value: t, done: f };
0032025:                 };
0032026:               })(n, o, i),
0032027:               !0,
0032028:             ),
0032029:             s
0032030:           );
0032031:         }
0032032:         var a = {};
0032033:         function c() {}
0032034:         function u() {}
0032035:         function s() {}
0032036:         t = Object.getPrototypeOf;
0032037:         var l = [][r]
0032038:             ? t(t([][r]()))
0032039:             : (jy((t = {}), r, function () {
0032040:                 return this;
0032041:               }),
0032042:               t),
0032043:           f = (s.prototype = c.prototype = Object.create(l));
0032044:         function d(e) {
0032045:           return (
0032046:             Object.setPrototypeOf
0032047:               ? Object.setPrototypeOf(e, s)
0032048:               : ((e.__proto__ = s), jy(e, o, "GeneratorFunction")),
0032049:             (e.prototype = Object.create(f)),
0032050:             e
0032051:           );
0032052:         }
0032053:         return (
0032054:           (u.prototype = s),
0032055:           jy(f, "constructor", s),
0032056:           jy(s, "constructor", u),
0032057:           (u.displayName = "GeneratorFunction"),
0032058:           jy(s, o, "GeneratorFunction"),
0032059:           jy(f),
0032060:           jy(f, o, "Generator"),
0032061:           jy(f, r, function () {
0032062:             return this;
0032063:           }),
0032064:           jy(f, "toString", function () {
0032065:             return "[object Generator]";
0032066:           }),
0032067:           (Ty = function () {
0032068:             return { w: i, m: d };
0032069:           })()
0032070:         );
0032071:       }
0032072:       function jy(e, t, n, r) {
0032073:         var o = Object.defineProperty;
0032074:         try {
0032075:           o({}, "", {});
0032076:         } catch (e) {
0032077:           o = 0;
0032078:         }
0032079:         ((jy = function (e, t, n, r) {
0032080:           function i(t, n) {
0032081:             jy(e, t, function (e) {
0032082:               return this._invoke(t, n, e);
0032083:             });
0032084:           }
0032085:           t
0032086:             ? o
0032087:               ? o(e, t, {
0032088:                   value: n,
0032089:                   enumerable: !r,
0032090:                   configurable: !r,
0032091:                   writable: !r,
0032092:                 })
0032093:               : (e[t] = n)
0032094:             : (i("next", 0), i("throw", 1), i("return", 2));
0032095:         }),
0032096:           jy(e, t, n, r));
0032097:       }
0032098:       function ky(e, t) {
0032099:         for (var n = 0; n < t.length; n++) {
0032100:           var r = t[n];
0032101:           ((r.enumerable = r.enumerable || !1),
0032102:             (r.configurable = !0),
0032103:             "value" in r && (r.writable = !0),
0032104:             Object.defineProperty(e, Ny(r.key), r));
0032105:         }
0032106:       }
0032107:       function Ny(e) {
0032108:         var t = (function (e, t) {
0032109:           if ("object" != My(e) || !e) return e;
0032110:           var n = e[Symbol.toPrimitive];
0032111:           if (void 0 !== n) {
0032112:             var r = n.call(e, t || "default");
0032113:             if ("object" != My(r)) return r;
0032114:             throw new TypeError("@@toPrimitive must return a primitive value.");
0032115:           }
0032116:           return ("string" === t ? String : Number)(e);
0032117:         })(e, "string");
0032118:         return "symbol" == My(t) ? t : t + "";
0032119:       }
0032120:       var Ey = function (e, t, n, r) {
0032121:           return new (n || (n = Promise))(function (o, i) {
0032122:             function a(e) {
0032123:               try {
0032124:                 u(r.next(e));
0032125:               } catch (e) {
0032126:                 i(e);
0032127:               }
0032128:             }
0032129:             function c(e) {
0032130:               try {
0032131:                 u(r.throw(e));
0032132:               } catch (e) {
0032133:                 i(e);
0032134:               }
0032135:             }
0032136:             function u(e) {
0032137:               var t;
0032138:               e.done
0032139:                 ? o(e.value)
0032140:                 : ((t = e.value),
0032141:                   t instanceof n
0032142:                     ? t
0032143:                     : new n(function (e) {
0032144:                         e(t);
0032145:                       })).then(a, c);
0032146:             }
0032147:             u((r = r.apply(e, t || [])).next());
0032148:           });
0032149:         },
0032150:         Oy = (function () {
0032151:           return (
0032152:             (e = function e(t, n) {
0032153:               (!(function (e, t) {
0032154:                 if (!(e instanceof t))
0032155:                   throw new TypeError("Cannot call a class as a function");
0032156:               })(this, e),
0032157:                 (this.deviceSession = t),
0032158:                 (this.readingSession = n));
0032159:             }),
0032160:             (t = [
0032161:               {
0032162:                 key: "getSearchContext",
0032163:                 value: function (e) {
0032164:                   var t = this;
0032165:                   return $.asyncExecuteMetrics("GetSearchContext", function () {
0032166:                     return Ey(
0032167:                       t,
0032168:                       void 0,
0032169:                       void 0,
0032170:                       Ty().m(function t() {
0032171:                         var n, r;
0032172:                         return Ty().w(
0032173:                           function (t) {
0032174:                             for (;;)
0032175:                               switch (t.n) {
0032176:                                 case 0:
0032177:                                   if (F()) {
0032178:                                     t.n = 2;
0032179:                                     break;
0032180:                                   }
0032181:                                   return (
0032182:                                     (t.n = 1),
0032183:                                     pe.getSearchContext(
0032184:                                       {
0032185:                                         asin: this.readingSession.asin,
0032186:                                         positions: e,
0032187:                                         refEmId: this.readingSession.refEmId,
0032188:                                         revision: this.readingSession.revision,
0032189:                                         yjACR: this.readingSession.acr,
0032190:                                       },
0032191:                                       this.deviceSession.deviceSessionToken,
0032192:                                     )
0032193:                                   );
0032194:                                 case 1:
0032195:                                   ((r = t.v), (t.n = 4));
0032196:                                   break;
0032197:                                 case 2:
0032198:                                   return (
0032199:                                     (t.n = 3),
0032200:                                     gy.getSearchContext({
0032201:                                       asin: this.readingSession.asin,
0032202:                                       positions: e,
0032203:                                       refEmId: this.readingSession.refEmId,
0032204:                                       revision: this.readingSession.revision,
0032205:                                       yjACR: this.readingSession.acr,
0032206:                                     })
0032207:                                   );
0032208:                                 case 3:
0032209:                                   r = t.v;
0032210:                                 case 4:
0032211:                                   return (
0032212:                                     (n = r),
0032213:                                     t.a(
0032214:                                       2,
0032215:                                       this.processContexts(n.searchContexts),
0032216:                                     )
0032217:                                   );
0032218:                               }
0032219:                           },
0032220:                           t,
0032221:                           this,
0032222:                         );
0032223:                       }),
0032224:                     );
0032225:                   });
0032226:                 },
0032227:               },
0032228:               {
0032229:                 key: "processContexts",
0032230:                 value: function (e) {
0032231:                   return Ey(
0032232:                     this,
0032233:                     void 0,
0032234:                     void 0,
0032235:                     Ty().m(function t() {
0032236:                       var n, r, o, i, a, c;
0032237:                       return Ty().w(
0032238:                         function (t) {
0032239:                           for (;;)
0032240:                             switch ((t.p = t.n)) {
0032241:                               case 0:
0032242:                                 ((n = []), (r = Ay(e)), (t.p = 1), r.s());
0032243:                               case 2:
0032244:                                 if ((o = r.n()).done) {
0032245:                                   t.n = 5;
0032246:                                   break;
0032247:                                 }
0032248:                                 return (
0032249:                                   (i = o.value),
0032250:                                   (t.n = 3),
0032251:                                   this.decryptContext(i)
0032252:                                 );
0032253:                               case 3:
0032254:                                 ((a = t.v), n.push(a));
0032255:                               case 4:
0032256:                                 t.n = 2;
0032257:                                 break;
0032258:                               case 5:
0032259:                                 t.n = 7;
0032260:                                 break;
0032261:                               case 6:
0032262:                                 ((t.p = 6), (c = t.v), r.e(c));
0032263:                               case 7:
0032264:                                 return ((t.p = 7), r.f(), t.f(7));
0032265:                               case 8:
0032266:                                 return t.a(2, n);
0032267:                             }
0032268:                         },
0032269:                         t,
0032270:                         this,
0032271:                         [[1, 6, 7, 8]],
0032272:                       );
0032273:                     }),
0032274:                   );
0032275:                 },
0032276:               },
0032277:               {
0032278:                 key: "decryptContext",
0032279:                 value: function (e) {
0032280:                   return Ey(
0032281:                     this,
0032282:                     void 0,
0032283:                     void 0,
0032284:                     Ty().m(function t() {
0032285:                       var n, r, o, i, a, c, u, s;
0032286:                       return Ty().w(
0032287:                         function (t) {
0032288:                           for (;;)
0032289:                             switch (t.n) {
0032290:                               case 0:
0032291:                                 return (
0032292:                                   (n = e.substring(0, 24)),
0032293:                                   (r = e.substring(24, 48)),
0032294:                                   (o = e.substring(48, e.length)),
0032295:                                   (i = this.base64StringToArrayBuffer(r)),
0032296:                                   (t.n = 1),
0032297:                                   window.crypto.subtle.importKey(
0032298:                                     "raw",
0032299:                                     this.base64StringToArrayBuffer(n),
0032300:                                     { name: "AES-GCM" },
0032301:                                     !0,
0032302:                                     ["decrypt"],
0032303:                                   )
0032304:                                 );
0032305:                               case 1:
0032306:                                 return (
0032307:                                   (a = t.v),
0032308:                                   (c = this.base64StringToArrayBuffer(o)),
0032309:                                   (t.n = 2),
0032310:                                   window.crypto.subtle.decrypt(
0032311:                                     { name: "AES-GCM", iv: i, tagLength: 128 },
0032312:                                     a,
0032313:                                     c,
0032314:                                   )
0032315:                                 );
0032316:                               case 2:
0032317:                                 return (
0032318:                                   (u = t.v),
0032319:                                   (s = new TextDecoder("utf-8")),
0032320:                                   t.a(2, s.decode(u))
0032321:                                 );
0032322:                             }
0032323:                         },
0032324:                         t,
0032325:                         this,
0032326:                       );
0032327:                     }),
0032328:                   );
0032329:                 },
0032330:               },
0032331:               {
0032332:                 key: "base64StringToArrayBuffer",
0032333:                 value: function (e) {
0032334:                   for (
0032335:                     var t = atob(e), n = new Uint8Array(t.length), r = 0;
0032336:                     r < t.length;
0032337:                     r++
0032338:                   )
0032339:                     n[r] = t.charCodeAt(r);
0032340:                   return n.buffer;
0032341:                 },
0032342:               },
0032343:             ]) && ky(e.prototype, t),
0032344:             n && ky(e, n),
0032345:             Object.defineProperty(e, "prototype", { writable: !1 }),
0032346:             e
0032347:           );
0032348:           var e, t, n;
0032349:         })();
0032350:       function Py(e) {
0032351:         return (
0032352:           (Py =
0032353:             "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
0032354:               ? function (e) {
0032355:                   return typeof e;
0032356:                 }
0032357:               : function (e) {
0032358:                   return e &&
0032359:                     "function" == typeof Symbol &&
0032360:                     e.constructor === Symbol &&
0032361:                     e !== Symbol.prototype
0032362:                     ? "symbol"
0032363:                     : typeof e;
0032364:                 }),
0032365:           Py(e)
0032366:         );
0032367:       }
0032368:       function Dy(e, t) {
0032369:         for (var n = 0; n < t.length; n++) {
0032370:           var r = t[n];
0032371:           ((r.enumerable = r.enumerable || !1),
0032372:             (r.configurable = !0),
0032373:             "value" in r && (r.writable = !0),
0032374:             Object.defineProperty(e, xy(r.key), r));
0032375:         }
0032376:       }
0032377:       function xy(e) {
0032378:         var t = (function (e, t) {
0032379:           if ("object" != Py(e) || !e) return e;
0032380:           var n = e[Symbol.toPrimitive];
0032381:           if (void 0 !== n) {
0032382:             var r = n.call(e, t || "default");
0032383:             if ("object" != Py(r)) return r;
0032384:             throw new TypeError("@@toPrimitive must return a primitive value.");
0032385:           }
0032386:           return ("string" === t ? String : Number)(e);
0032387:         })(e, "string");
0032388:         return "symbol" == Py(t) ? t : t + "";
0032389:       }
0032390:       var Ly = (function () {
0032391:           return (
0032392:             (e = function e(t) {
0032393:               (!(function (e, t) {
0032394:                 if (!(e instanceof t))
0032395:                   throw new TypeError("Cannot call a class as a function");
0032396:               })(this, e),
0032397:                 (this.HEADER_SIZE = 28),
0032398:                 (this.MAGIC = "AZSA"),
0032399:                 (this.wordsFile = t.wordsFile),
0032400:                 (this.propertiesFile = t.propertiesFile),
0032401:                 (this.positionsFile = t.positionsFile),
0032402:                 (this.positionsDataView = new DataView(this.positionsFile)),
0032403:                 (this.directory = this.parseDirectory()),
0032404:                 (this.properties = this.parseProperties()),
0032405:                 (this.wordsBufferLocation = this.parseWords()),
0032406:                 (this.searchCache = new Map()));
0032407:             }),
0032408:             (t = [
0032409:               {
0032410:                 key: "getPositions",
0032411:                 value: function (e) {
0032412:                   var t = this.searchCache.get(e);
0032413:                   if (!t) {
0032414:                     var n = this.wordsBufferLocation.get(e);
0032415:                     n &&
0032416:                       n.length > 0 &&
0032417:                       ((t = this.readPositions(n)), this.searchCache.set(e, t));
0032418:                   }
0032419:                   return Promise.resolve(t ? t.slice() : void 0);
0032420:                 },
0032421:               },
0032422:               {
0032423:                 key: "getProperty",
0032424:                 value: function (e) {
0032425:                   return this.properties.get(e);
0032426:                 },
0032427:               },
0032428:               {
0032429:                 key: "parseDirectory",
0032430:                 value: function () {
0032431:                   if (this.positionsFile.byteLength < this.HEADER_SIZE)
0032432:                     throw new Error("Index positions file is too small");
0032433:                   this.validateMagic();
0032434:                   var e = this.positionsFile.byteLength - this.HEADER_SIZE,
0032435:                     t = this.positionsDataView.getUint32(e),
0032436:                     n = this.positionsDataView.getUint32(e + 4),
0032437:                     r = this.positionsDataView.getUint32(e + 8);
0032438:                   if (this.positionsFile.byteLength !== t)
0032439:                     throw new Error(
0032440:                       "Index positions file size do not match header",
0032441:                     );
0032442:                   for (var o = n, i = new Map(); o < n + r; ) {
0032443:                     var a = this.parseDirectoryEntry(o);
0032444:                     ((i[a.name] = a), (o += a.entryLength));
0032445:                   }
0032446:                   var c = this.readEntry(i.BytesPerEntity),
0032447:                     u = this.readEntry(i.MinimumTitleEntityValue),
0032448:                     s = i.SearchBoundaryPositions,
0032449:                     l = i.Positions;
0032450:                   return {
0032451:                     bytesPerEntity: c,
0032452:                     minimumTitleEntityValue: u,
0032453:                     searchBoundaryPositions: {
0032454:                       offset: s.offset,
0032455:                       length: s.length,
0032456:                     },
0032457:                     positions: { offset: l.offset, length: l.length },
0032458:                   };
0032459:                 },
0032460:               },
0032461:               {
0032462:                 key: "validateMagic",
0032463:                 value: function () {
0032464:                   var e = new TextDecoder(),
0032465:                     t = new Uint8Array(
0032466:                       this.positionsFile,
0032467:                       0,
0032468:                       this.MAGIC.length,
0032469:                     );
0032470:                   if (e.decode(t) !== this.MAGIC)
0032471:                     throw new Error("Invalid magic value");
0032472:                 },
0032473:               },
0032474:               {
0032475:                 key: "parseDirectoryEntry",
0032476:                 value: function (e) {
0032477:                   var t = new TextDecoder(),
0032478:                     n = this.positionsDataView.getUint32(e),
0032479:                     r = this.positionsDataView.getUint32(e + 4),
0032480:                     o = this.positionsDataView.getUint8(e + 8),
0032481:                     i = new Uint8Array(this.positionsFile, e + 9, o);
0032482:                   return {
0032483:                     name: t.decode(i),
0032484:                     offset: n,
0032485:                     length: r,
0032486:                     entryLength: o + 9,
0032487:                   };
0032488:                 },
0032489:               },
0032490:               {
0032491:                 key: "readEntry",
0032492:                 value: function (e) {
0032493:                   if (1 === e.length)
0032494:                     return this.positionsDataView.getUint8(e.offset);
0032495:                   if (2 === e.length)
0032496:                     return this.positionsDataView.getUint16(e.offset);
0032497:                   if (4 === e.length)
0032498:                     return this.positionsDataView.getUint32(e.offset);
0032499:                   throw new Error("Invalid entry length");
0032500:                 },
0032501:               },
0032502:               {
0032503:                 key: "parseProperties",
0032504:                 value: function () {
0032505:                   var e = /(.*?)=(.*)/,
0032506:                     t = new Map();
0032507:                   return (
0032508:                     this.propertiesFile.split("\n").forEach(function (n) {
0032509:                       if (n) {
0032510:                         var r = e.exec(n);
0032511:                         r && 3 === r.length && t.set(r[1], r[2]);
0032512:                       }
0032513:                     }),
0032514:                     t
0032515:                   );
0032516:                 },
0032517:               },
0032518:               {
0032519:                 key: "parseWords",
0032520:                 value: function () {
0032521:                   var e = new Map();
0032522:                   return (
0032523:                     this.wordsFile.split("\n").forEach(function (t) {
0032524:                       if (t) {
0032525:                         var n = t.split(":");
0032526:                         n &&
0032527:                           3 === n.length &&
0032528:                           e.set(n[2], {
0032529:                             offset: parseInt(n[0], 10),
0032530:                             length: parseInt(n[1], 10),
0032531:                           });
0032532:                       }
0032533:                     }),
0032534:                     e
0032535:                   );
0032536:                 },
0032537:               },
0032538:               {
0032539:                 key: "readPositions",
0032540:                 value: function (e) {
0032541:                   for (
0032542:                     var t = [],
0032543:                       n = this.directory.bytesPerEntity,
0032544:                       r = this.directory.positions.offset + e.offset * n,
0032545:                       o = 0;
0032546:                     o < e.length;
0032547:                     o++
0032548:                   ) {
0032549:                     var i = r + o * n;
0032550:                     t.push(this.readPosition(i));
0032551:                   }
0032552:                   return t;
0032553:                 },
0032554:               },
0032555:               {
0032556:                 key: "readPosition",
0032557:                 value: function (e) {
0032558:                   var t = this.directory.minimumTitleEntityValue,
0032559:                     n = this.positionsDataView;
0032560:                   switch (this.directory.bytesPerEntity) {
0032561:                     case 1:
0032562:                       return n.getUint8(e) + t;
0032563:                     case 2:
0032564:                       return n.getUint16(e) + t;
0032565:                     case 3:
0032566:                       return (n.getUint8(e) << 16) + n.getUint16(e + 1) + t;
0032567:                     case 4:
0032568:                       return n.getUint32(e) + t;
0032569:                     default:
0032570:                       throw new Error("Unsupported BPE");
0032571:                   }
0032572:                 },
0032573:               },
0032574:             ]) && Dy(e.prototype, t),
0032575:             n && Dy(e, n),
0032576:             Object.defineProperty(e, "prototype", { writable: !1 }),
0032577:             e
0032578:           );
0032579:           var e, t, n;
0032580:         })(),
0032581:         Ry = n(71710),
0032582:         Gy = n.n(Ry);
0032583:       function zy(e) {
0032584:         return (
0032585:           (zy =
0032586:             "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
0032587:               ? function (e) {
0032588:                   return typeof e;
0032589:                 }
0032590:               : function (e) {
0032591:                   return e &&
0032592:                     "function" == typeof Symbol &&
0032593:                     e.constructor === Symbol &&
0032594:                     e !== Symbol.prototype
0032595:                     ? "symbol"
0032596:                     : typeof e;
0032597:                 }),
0032598:           zy(e)
0032599:         );
0032600:       }
0032601:       function _y() {
0032602:         var e,
0032603:           t,
0032604:           n = "function" == typeof Symbol ? Symbol : {},
0032605:           r = n.iterator || "@@iterator",
0032606:           o = n.toStringTag || "@@toStringTag";
0032607:         function i(n, r, o, i) {
0032608:           var u = r && r.prototype instanceof c ? r : c,
0032609:             s = Object.create(u.prototype);
0032610:           return (
0032611:             Uy(
0032612:               s,
0032613:               "_invoke",
0032614:               (function (n, r, o) {
0032615:                 var i,
0032616:                   c,
0032617:                   u,
0032618:                   s = 0,
0032619:                   l = o || [],
0032620:                   f = !1,
0032621:                   d = {
0032622:                     p: 0,
0032623:                     n: 0,
0032624:                     v: e,
0032625:                     a: p,
0032626:                     f: p.bind(e, 4),
0032627:                     d: function (t, n) {
0032628:                       return ((i = t), (c = 0), (u = e), (d.n = n), a);
0032629:                     },
0032630:                   };
0032631:                 function p(n, r) {
0032632:                   for (
0032633:                     c = n, u = r, t = 0;
0032634:                     !f && s && !o && t < l.length;
0032635:                     t++
0032636:                   ) {
0032637:                     var o,
0032638:                       i = l[t],
0032639:                       p = d.p,
0032640:                       y = i[2];
0032641:                     n > 3
0032642:                       ? (o = y === r) &&
0032643:                         ((u = i[(c = i[4]) ? 5 : ((c = 3), 3)]),
0032644:                         (i[4] = i[5] = e))
0032645:                       : i[0] <= p &&
0032646:                         ((o = n < 2 && p < i[1])
0032647:                           ? ((c = 0), (d.v = r), (d.n = i[1]))
0032648:                           : p < y &&
0032649:                             (o = n < 3 || i[0] > r || r > y) &&
0032650:                             ((i[4] = n), (i[5] = r), (d.n = y), (c = 0)));
0032651:                   }
0032652:                   if (o || n > 1) return a;
0032653:                   throw ((f = !0), r);
0032654:                 }
0032655:                 return function (o, l, y) {
0032656:                   if (s > 1) throw TypeError("Generator is already running");
0032657:                   for (
0032658:                     f && 1 === l && p(l, y), c = l, u = y;
0032659:                     (t = c < 2 ? e : u) || !f;
0032660: 
0032661:                   ) {
0032662:                     i ||
0032663:                       (c
0032664:                         ? c < 3
0032665:                           ? (c > 1 && (d.n = -1), p(c, u))
0032666:                           : (d.n = u)
0032667:                         : (d.v = u));
0032668:                     try {
0032669:                       if (((s = 2), i)) {
0032670:                         if ((c || (o = "next"), (t = i[o]))) {
0032671:                           if (!(t = t.call(i, u)))
0032672:                             throw TypeError("iterator result is not an object");
0032673:                           if (!t.done) return t;
0032674:                           ((u = t.value), c < 2 && (c = 0));
0032675:                         } else
0032676:                           (1 === c && (t = i.return) && t.call(i),
0032677:                             c < 2 &&
0032678:                               ((u = TypeError(
0032679:                                 "The iterator does not provide a '" +
0032680:                                   o +
0032681:                                   "' method",
0032682:                               )),
0032683:                               (c = 1)));
0032684:                         i = e;
0032685:                       } else if ((t = (f = d.n < 0) ? u : n.call(r, d)) !== a)
0032686:                         break;
0032687:                     } catch (t) {
0032688:                       ((i = e), (c = 1), (u = t));
0032689:                     } finally {
0032690:                       s = 1;
0032691:                     }
0032692:                   }
0032693:                   return { value: t, done: f };
0032694:                 };
0032695:               })(n, o, i),
0032696:               !0,
0032697:             ),
0032698:             s
0032699:           );
0032700:         }
0032701:         var a = {};
0032702:         function c() {}
0032703:         function u() {}
0032704:         function s() {}
0032705:         t = Object.getPrototypeOf;
0032706:         var l = [][r]
0032707:             ? t(t([][r]()))
0032708:             : (Uy((t = {}), r, function () {
0032709:                 return this;
0032710:               }),
0032711:               t),
0032712:           f = (s.prototype = c.prototype = Object.create(l));
0032713:         function d(e) {
0032714:           return (
0032715:             Object.setPrototypeOf
0032716:               ? Object.setPrototypeOf(e, s)
0032717:               : ((e.__proto__ = s), Uy(e, o, "GeneratorFunction")),
0032718:             (e.prototype = Object.create(f)),
0032719:             e
0032720:           );
0032721:         }
0032722:         return (
0032723:           (u.prototype = s),
0032724:           Uy(f, "constructor", s),
0032725:           Uy(s, "constructor", u),
0032726:           (u.displayName = "GeneratorFunction"),
0032727:           Uy(s, o, "GeneratorFunction"),
0032728:           Uy(f),
0032729:           Uy(f, o, "Generator"),
0032730:           Uy(f, r, function () {
0032731:             return this;
0032732:           }),
0032733:           Uy(f, "toString", function () {
0032734:             return "[object Generator]";
0032735:           }),
0032736:           (_y = function () {
0032737:             return { w: i, m: d };
0032738:           })()
0032739:         );
0032740:       }
0032741:       function Uy(e, t, n, r) {
0032742:         var o = Object.defineProperty;
0032743:         try {
0032744:           o({}, "", {});
0032745:         } catch (e) {
0032746:           o = 0;
0032747:         }
0032748:         ((Uy = function (e, t, n, r) {
0032749:           function i(t, n) {
0032750:             Uy(e, t, function (e) {
0032751:               return this._invoke(t, n, e);
0032752:             });
0032753:           }
0032754:           t
0032755:             ? o
0032756:               ? o(e, t, {
0032757:                   value: n,
0032758:                   enumerable: !r,
0032759:                   configurable: !r,
0032760:                   writable: !r,
0032761:                 })
0032762:               : (e[t] = n)
0032763:             : (i("next", 0), i("throw", 1), i("return", 2));
0032764:         }),
0032765:           Uy(e, t, n, r));
0032766:       }
0032767:       function By(e, t) {
0032768:         for (var n = 0; n < t.length; n++) {
0032769:           var r = t[n];
0032770:           ((r.enumerable = r.enumerable || !1),
0032771:             (r.configurable = !0),
0032772:             "value" in r && (r.writable = !0),
0032773:             Object.defineProperty(e, Zy(r.key), r));
0032774:         }
0032775:       }
0032776:       function Zy(e) {
0032777:         var t = (function (e, t) {
0032778:           if ("object" != zy(e) || !e) return e;
0032779:           var n = e[Symbol.toPrimitive];
0032780:           if (void 0 !== n) {
0032781:             var r = n.call(e, t || "default");
0032782:             if ("object" != zy(r)) return r;
0032783:             throw new TypeError("@@toPrimitive must return a primitive value.");
0032784:           }
0032785:           return ("string" === t ? String : Number)(e);
0032786:         })(e, "string");
0032787:         return "symbol" == zy(t) ? t : t + "";
0032788:       }
0032789:       var Fy = function (e, t, n, r) {
0032790:           return new (n || (n = Promise))(function (o, i) {
0032791:             function a(e) {
0032792:               try {
0032793:                 u(r.next(e));
0032794:               } catch (e) {
0032795:                 i(e);
0032796:               }
0032797:             }
0032798:             function c(e) {
0032799:               try {
0032800:                 u(r.throw(e));
0032801:               } catch (e) {
0032802:                 i(e);
0032803:               }
0032804:             }
0032805:             function u(e) {
0032806:               var t;
0032807:               e.done
0032808:                 ? o(e.value)
0032809:                 : ((t = e.value),
0032810:                   t instanceof n
0032811:                     ? t
0032812:                     : new n(function (e) {
0032813:                         e(t);
0032814:                       })).then(a, c);
0032815:             }
0032816:             u((r = r.apply(e, t || [])).next());
0032817:           });
0032818:         },
0032819:         Wy = (function () {
0032820:           return (
0032821:             (e = function e(t) {
0032822:               (!(function (e, t) {
0032823:                 if (!(e instanceof t))
0032824:                   throw new TypeError("Cannot call a class as a function");
0032825:               })(this, e),
0032826:                 (this.searchIndexInfo = t));
0032827:             }),
0032828:             (t = [
0032829:               {
0032830:                 key: "getSearchIndex",
0032831:                 value: function () {
0032832:                   var e = this;
0032833:                   return (
0032834:                     this.searchIndexPromise ||
0032835:                       (this.searchIndexPromise = new Promise(function (t, n) {
0032836:                         var r = e.searchIndexInfo.s3Url.replace(
0032837:                           /http:\/\//,
0032838:                           "https://",
0032839:                         );
0032840:                         fetch(r)
0032841:                           .then(function (n) {
0032842:                             return Fy(
0032843:                               e,
0032844:                               void 0,
0032845:                               void 0,
0032846:                               _y().m(function e() {
0032847:                                 var r, o, i, a, c, u;
0032848:                                 return _y().w(
0032849:                                   function (e) {
0032850:                                     for (;;)
0032851:                                       switch (e.n) {
0032852:                                         case 0:
0032853:                                           if (!n.ok) {
0032854:                                             e.n = 7;
0032855:                                             break;
0032856:                                           }
0032857:                                           return ((e.n = 1), n.arrayBuffer());
0032858:                                         case 1:
0032859:                                           return (
0032860:                                             (r = e.v),
0032861:                                             (e.n = 2),
0032862:                                             this.decryptSubtle(
0032863:                                               r,
0032864:                                               this.searchIndexInfo
0032865:                                                 .decryptionKey,
0032866:                                               this.searchIndexInfo.decryptionIV,
0032867:                                             )
0032868:                                           );
0032869:                                         case 2:
0032870:                                           return (
0032871:                                             (o = e.v),
0032872:                                             (e.n = 3),
0032873:                                             Gy().loadAsync(o)
0032874:                                           );
0032875:                                         case 3:
0032876:                                           return (
0032877:                                             (i = e.v),
0032878:                                             (a = {}),
0032879:                                             (c = []),
0032880:                                             i.forEach(function (e, t) {
0032881:                                               e.endsWith(".words")
0032882:                                                 ? c.push(
0032883:                                                     t
0032884:                                                       .async("text")
0032885:                                                       .then(function (e) {
0032886:                                                         return (a.wordsFile =
0032887:                                                           e);
0032888:                                                       }),
0032889:                                                   )
0032890:                                                 : e.endsWith(".properties")
0032891:                                                   ? c.push(
0032892:                                                       t
0032893:                                                         .async("text")
0032894:                                                         .then(function (e) {
0032895:                                                           return (a.propertiesFile =
0032896:                                                             e);
0032897:                                                         }),
0032898:                                                     )
0032899:                                                   : e.endsWith(".positions") &&
0032900:                                                     c.push(
0032901:                                                       t
0032902:                                                         .async("arraybuffer")
0032903:                                                         .then(function (e) {
0032904:                                                           return (a.positionsFile =
0032905:                                                             e);
0032906:                                                         }),
0032907:                                                     );
0032908:                                             }),
0032909:                                             (e.n = 4),
0032910:                                             Promise.all(c)
0032911:                                           );
0032912:                                         case 4:
0032913:                                           if (
0032914:                                             !(
0032915:                                               a.wordsFile &&
0032916:                                               a.propertiesFile &&
0032917:                                               a.positionsFile
0032918:                                             )
0032919:                                           ) {
0032920:                                             e.n = 5;
0032921:                                             break;
0032922:                                           }
0032923:                                           ((u = new Ly(a)),
0032924:                                             $.recordCountMetrics(
0032925:                                               "SearchIndexDownload:Success",
0032926:                                               1,
0032927:                                             ),
0032928:                                             t(u),
0032929:                                             (e.n = 6));
0032930:                                           break;
0032931:                                         case 5:
0032932:                                           throw new Error(
0032933:                                             "Failed to download index files",
0032934:                                           );
0032935:                                         case 6:
0032936:                                           e.n = 8;
0032937:                                           break;
0032938:                                         case 7:
0032939:                                           throw new Error(
0032940:                                             "SearchIndex request response not 2xx",
0032941:                                           );
0032942:                                         case 8:
0032943:                                           return e.a(2);
0032944:                                       }
0032945:                                   },
0032946:                                   e,
0032947:                                   this,
0032948:                                 );
0032949:                               }),
0032950:                             );
0032951:                           })
0032952:                           .catch(function (t) {
0032953:                             ($.recordCountMetrics(
0032954:                               "SearchIndexDownload:Error",
0032955:                               1,
0032956:                             ),
0032957:                               $.recordCountMetrics(
0032958:                                 "SearchIndexDownload:Success",
0032959:                                 0,
0032960:                               ),
0032961:                               n(t),
0032962:                               (e.searchIndexPromise = void 0));
0032963:                           });
0032964:                       })),
0032965:                     this.searchIndexPromise
0032966:                   );
0032967:                 },
0032968:               },
0032969:               {
0032970:                 key: "decryptSubtle",
0032971:                 value: function (e, t, n) {
0032972:                   return Fy(
0032973:                     this,
0032974:                     void 0,
0032975:                     void 0,
0032976:                     _y().m(function r() {
0032977:                       var o, i, a;
0032978:                       return _y().w(
0032979:                         function (r) {
0032980:                           for (;;)
0032981:                             switch (r.n) {
0032982:                               case 0:
0032983:                                 return (
0032984:                                   (o = this.base64ToArrayBuffer(t)),
0032985:                                   (i = this.base64ToArrayBuffer(n)),
0032986:                                   (r.n = 1),
0032987:                                   window.crypto.subtle.importKey(
0032988:                                     "raw",
0032989:                                     o,
0032990:                                     "AES-CBC",
0032991:                                     !1,
0032992:                                     ["decrypt"],
0032993:                                   )
0032994:                                 );
0032995:                               case 1:
0032996:                                 return (
0032997:                                   (a = r.v),
0032998:                                   (r.n = 2),
0032999:                                   window.crypto.subtle.decrypt(
0033000:                                     { name: "AES-CBC", iv: i },
0033001:                                     a,
0033002:                                     e,
0033003:                                   )
0033004:                                 );
0033005:                               case 2:
0033006:                                 return r.a(2, r.v);
0033007:                             }
0033008:                         },
0033009:                         r,
0033010:                         this,
0033011:                       );
0033012:                     }),
0033013:                   );
0033014:                 },
0033015:               },
0033016:               {
0033017:                 key: "base64ToArrayBuffer",
0033018:                 value: function (e) {
0033019:                   for (
0033020:                     var t = window.atob(e),
0033021:                       n = t.length,
0033022:                       r = new Uint8Array(n),
0033023:                       o = 0;
0033024:                     o < n;
0033025:                     o++
0033026:                   )
0033027:                     r[o] = t.charCodeAt(o);
0033028:                   return r.buffer;
0033029:                 },
0033030:               },
0033031:             ]) && By(e.prototype, t),
0033032:             n && By(e, n),
0033033:             Object.defineProperty(e, "prototype", { writable: !1 }),
0033034:             e
0033035:           );
0033036:           var e, t, n;
0033037:         })(),
0033038:         Yy = n(54591),
0033039:         Hy = {
0033040:           da: [
0033041:             "og",
0033042:             "i",
0033043:             "jeg",
0033044:             "det",
0033045:             "at",
0033046:             "en",
0033047:             "den",
0033048:             "til",
0033049:             "er",
0033050:             "som",
0033051:             "p\xe5",
0033052:             "de",
0033053:             "med",
0033054:             "han",
0033055:             "af",
0033056:             "for",
0033057:           ],
0033058:           de: [
0033059:             "der",
0033060:             "die",
0033061:             "das",
0033062:             "des",
0033063:             "dem",
0033064:             "den",
0033065:             "ein",
0033066:             "eine",
0033067:             "einer",
0033068:             "einem",
0033069:             "einen",
0033070:             "dies",
0033071:             "diese",
0033072:             "diesem",
0033073:             "diesem",
0033074:             "diesen",
0033075:             "dieser",
0033076:             "dieses",
0033077:             "ich",
0033078:             "du",
0033079:             "er",
0033080:             "sie",
0033081:             "es",
0033082:             "wir",
0033083:             "ihr",
0033084:             "sie",
0033085:             "Sie",
0033086:             "als",
0033087:             "an",
0033088:             "ans",
0033089:             "auch",
0033090:             "auf",
0033091:             "aufs",
0033092:             "aus",
0033093:             "bei",
0033094:             "fuer",
0033095:             "f\xfcr",
0033096:             "nicht",
0033097:             "nur",
0033098:             "oder",
0033099:             "so",
0033100:             "und",
0033101:             "um",
0033102:             "ums",
0033103:             "vom",
0033104:             "von",
0033105:             "in",
0033106:             "im",
0033107:           ],
0033108:           en: [
0033109:             "the",
0033110:             "a",
0033111:             "an",
0033112:             "this",
0033113:             "that",
0033114:             "these",
0033115:             "those",
0033116:             "i",
0033117:             "you",
0033118:             "she",
0033119:             "he",
0033120:             "it",
0033121:             "we",
0033122:             "they",
0033123:             "as",
0033124:             "like",
0033125:             "at",
0033126:             "to",
0033127:             "also",
0033128:             "on",
0033129:             "of",
0033130:             "by",
0033131:             "for",
0033132:             "not",
0033133:             "only",
0033134:             "or",
0033135:             "so",
0033136:             "and",
0033137:             "about",
0033138:             "from",
0033139:             "in",
0033140:           ],
0033141:           es: [
0033142:             "el",
0033143:             "lo",
0033144:             "la",
0033145:             "los",
0033146:             "las",
0033147:             "un",
0033148:             "una",
0033149:             "unos",
0033150:             "unas",
0033151:             "del",
0033152:             "al",
0033153:             "este",
0033154:             "ese",
0033155:             "aquel",
0033156:             "estos",
0033157:             "esos",
0033158:             "aquellos",
0033159:             "esta",
0033160:             "esa",
0033161:             "aquella",
0033162:             "estas",
0033163:             "esas",
0033164:             "aquellas",
0033165:             "yo",
0033166:             "t\xfa",
0033167:             "tus",
0033168:             "vos",
0033169:             "usted",
0033170:             "\xe9l",
0033171:             "ella",
0033172:             "ello",
0033173:             "nosotros",
0033174:             "nosotras",
0033175:             "vosotros",
0033176:             "vosotras",
0033177:             "ustedes",
0033178:             "ellos",
0033179:             "ellas",
0033180:             "en",
0033181:             "y",
0033182:             "o",
0033183:             "a",
0033184:             "por",
0033185:             "no",
0033186:             "ni",
0033187:             "desde",
0033188:             "e",
0033189:           ],
0033190:           fi: [
0033191:             "olla",
0033192:             "olen",
0033193:             "olet",
0033194:             "on",
0033195:             "olemme",
0033196:             "olette",
0033197:             "ovat",
0033198:             "ole",
0033199:             "se",
0033200:             "sen",
0033201:             "sit\xe4",
0033202:             "siin\xe4",
0033203:             "siit\xe4",
0033204:             "siihen",
0033205:             "sill\xe4",
0033206:             "silt\xe4",
0033207:             "sille",
0033208:             "sin\xe4",
0033209:             "siksi",
0033210:             "kanssa",
0033211:           ],
0033212:           fr: [
0033213:             "le",
0033214:             "la",
0033215:             "l'",
0033216:             "les",
0033217:             "un",
0033218:             "une",
0033219:             "des",
0033220:             "du",
0033221:             "de",
0033222:             "au",
0033223:             "aux",
0033224:             "ce",
0033225:             "cet",
0033226:             "cette",
0033227:             "ces",
0033228:             "je",
0033229:             "tu",
0033230:             "elle",
0033231:             "il",
0033232:             "on",
0033233:             "nous",
0033234:             "vous",
0033235:             "elles",
0033236:             "ils",
0033237:             "comme",
0033238:             "\xe0",
0033239:             "aussi",
0033240:             "sur",
0033241:             "par",
0033242:             "pour",
0033243:             "ne",
0033244:             "n\u2019",
0033245:             "pas",
0033246:             "ou",
0033247:             "or",
0033248:             "donc",
0033249:             "et",
0033250:             "dans",
0033251:           ],
0033252:           hu: [
0033253:             "a",
0033254:             "az",
0033255:             "egy",
0033256:             "be",
0033257:             "ki",
0033258:             "le",
0033259:             "fel",
0033260:             "meg",
0033261:             "el",
0033262:             "\xe1t",
0033263:             "r\xe1",
0033264:             "ide",
0033265:             "oda",
0033266:             "sz\xe9t",
0033267:             "\xf6ssze",
0033268:             "vissza",
0033269:             "de",
0033270:             "h\xe1t",
0033271:             "\xe9s",
0033272:             "vagy",
0033273:             "hogy",
0033274:             "van",
0033275:             "lesz",
0033276:             "volt",
0033277:             "csak",
0033278:             "nem",
0033279:             "igen",
0033280:             "mint",
0033281:             "\xe9n",
0033282:             "te",
0033283:             "\xf5",
0033284:             "mi",
0033285:             "ti",
0033286:             "\xf5k",
0033287:             "\xf6n",
0033288:           ],
0033289:           it: [
0033290:             "il",
0033291:             "lo",
0033292:             "la",
0033293:             "l'",
0033294:             "i",
0033295:             "gli",
0033296:             "le",
0033297:             "un",
0033298:             "uno",
0033299:             "una",
0033300:             "un'",
0033301:             "del",
0033302:             "dello",
0033303:             "della",
0033304:             "dell'",
0033305:             "dei",
0033306:             "degli",
0033307:             "degl'",
0033308:             "delle",
0033309:             "questo",
0033310:             "questa",
0033311:             "questi",
0033312:             "queste",
0033313:             "quello",
0033314:             "quella",
0033315:             "quelli",
0033316:             "codesto",
0033317:             "codesta",
0033318:             "codesti",
0033319:             "codeste",
0033320:             "io",
0033321:             "noi",
0033322:             "tu",
0033323:             "voi",
0033324:             "egli",
0033325:             "esso",
0033326:             "essi",
0033327:             "ella",
0033328:             "essa",
0033329:             "esse",
0033330:             "ad",
0033331:             "al",
0033332:             "allo",
0033333:             "agli",
0033334:             "all",
0033335:             "agl",
0033336:             "alla",
0033337:             "alle",
0033338:             "con",
0033339:             "col",
0033340:             "coi",
0033341:             "da",
0033342:             "dal",
0033343:             "dallo",
0033344:             "dai",
0033345:             "dagli",
0033346:             "dall",
0033347:             "dagl",
0033348:             "dalla",
0033349:             "dalle",
0033350:             "di",
0033351:             "del",
0033352:             "dello",
0033353:             "dei",
0033354:             "degli",
0033355:             "dell",
0033356:             "degl",
0033357:             "della",
0033358:             "delle",
0033359:             "in",
0033360:             "nel",
0033361:             "nello",
0033362:             "nei",
0033363:             "nell",
0033364:             "negl",
0033365:             "nella",
0033366:             "nelle",
0033367:             "su",
0033368:             "sul",
0033369:             "sullo",
0033370:             "sui",
0033371:             "sugli",
0033372:             "sull",
0033373:             "sugl",
0033374:             "sulla",
0033375:             "sulle",
0033376:             "per",
0033377:             "ed",
0033378:             "anche",
0033379:             "non",
0033380:             "a",
0033381:             "e",
0033382:             "o",
0033383:           ],
0033384:           nl: [
0033385:             "de",
0033386:             "en",
0033387:             "van",
0033388:             "ik",
0033389:             "te",
0033390:             "dat",
0033391:             "die",
0033392:             "in",
0033393:             "een",
0033394:             "hij",
0033395:             "het",
0033396:             "niet",
0033397:             "zijn",
0033398:             "is",
0033399:             "was",
0033400:             "op",
0033401:             "aan",
0033402:             "met",
0033403:             "als",
0033404:             "voor",
0033405:             "had",
0033406:             "er",
0033407:           ],
0033408:           no: [
0033409:             "at",
0033410:             "en",
0033411:             "et",
0033412:             "den",
0033413:             "til",
0033414:             "er",
0033415:             "p\xe5",
0033416:             "med",

/* ===== REGION 3 lines 33646-35605 ===== */
0033646:             "senden",
0033647:             "seni",
0033648:             "senin",
0033649:             "siz",
0033650:             "sizden",
0033651:             "sizi",
0033652:             "sizin",
0033653:             "trilyon",
0033654:             "t\xfcm",
0033655:             "ve",
0033656:             "veya",
0033657:             "ya",
0033658:             "yani",
0033659:             "yedi",
0033660:             "yetmi\xfe",
0033661:             "yirmi",
0033662:             "y\xfcz",
0033663:             "\xe7ok",
0033664:             "\xe7\xfcnk\xfc",
0033665:             "\xfc\xe7",
0033666:             "\xfeey",
0033667:             "\xfeeyden",
0033668:             "\xfeeyi",
0033669:             "\xfeeyler",
0033670:             "\xfeu",
0033671:             "\xfeuna",
0033672:             "\xfeunda",
0033673:             "\xfeundan",
0033674:             "\xfeunu",
0033675:           ],
0033676:         },
0033677:         Vy = {
0033678:           de: { "\xdf": "ss" },
0033679:           es: { "\xd1": "OAAAAA", "\xf1": "oaaaaa" },
0033680:         },
0033681:         Qy = {
0033682:           "\u2019": "'",
0033683:           "\uff07": "'",
0033684:           "'": "'",
0033685:           "\xe0": "a",
0033686:           "\xe1": "a",
0033687:           "\xe2": "a",
0033688:           "\xe3": "a",
0033689:           "\xe4": "a",
0033690:           "\xe5": "a",
0033691:           "\xc0": "a",
0033692:           "\xc1": "a",
0033693:           "\xc2": "a",
0033694:           "\xc3": "a",
0033695:           "\xc4": "a",
0033696:           "\xc5": "a",
0033697:           "\u0100": "a",
0033698:           "\u0101": "a",
0033699:           "\u0102": "a",
0033700:           "\u0103": "a",
0033701:           "\u0104": "a",
0033702:           "\u0105": "a",
0033703:           "\xe8": "e",
0033704:           "\xe9": "e",
0033705:           "\xea": "e",
0033706:           "\xeb": "e",
0033707:           "\xc8": "e",
0033708:           "\xc9": "e",
0033709:           "\xca": "e",
0033710:           "\xcb": "e",
0033711:           "\u0112": "e",
0033712:           "\u0113": "e",
0033713:           "\u0114": "e",
0033714:           "\u0115": "e",
0033715:           "\u0116": "e",
0033716:           "\u0117": "e",
0033717:           "\u0118": "e",
0033718:           "\u0119": "e",
0033719:           "\u011a": "e",
0033720:           "\u011b": "e",
0033721:           "\xec": "i",
0033722:           "\xed": "i",
0033723:           "\xee": "i",
0033724:           "\xef": "i",
0033725:           "\xcc": "i",
0033726:           "\xcd": "i",
0033727:           "\xce": "i",
0033728:           "\xcf": "i",
0033729:           "\u0128": "i",
0033730:           "\u0129": "i",
0033731:           "\u012a": "i",
0033732:           "\u012b": "i",
0033733:           "\u012c": "i",
0033734:           "\u012d": "i",
0033735:           "\u012e": "i",
0033736:           "\u012f": "i",
0033737:           "\u0130": "i",
0033738:           "\xf2": "o",
0033739:           "\xf3": "o",
0033740:           "\xf4": "o",
0033741:           "\xf5": "o",
0033742:           "\xf6": "o",
0033743:           "\xd2": "o",
0033744:           "\xd3": "o",
0033745:           "\xd4": "o",
0033746:           "\xd5": "o",
0033747:           "\xd6": "o",
0033748:           "\u014c": "o",
0033749:           "\u014d": "o",
0033750:           "\u014e": "o",
0033751:           "\u014f": "o",
0033752:           "\u0150": "o",
0033753:           "\u0151": "o",
0033754:           "\xf9": "u",
0033755:           "\xfa": "u",
0033756:           "\xfb": "u",
0033757:           "\xfc": "u",
0033758:           "\xd9": "u",
0033759:           "\xda": "u",
0033760:           "\xdb": "u",
0033761:           "\xdc": "u",
0033762:           "\u0168": "u",
0033763:           "\u0169": "u",
0033764:           "\u016a": "u",
0033765:           "\u016b": "u",
0033766:           "\u016c": "u",
0033767:           "\u016d": "u",
0033768:           "\u016e": "u",
0033769:           "\u016f": "u",
0033770:           "\u0170": "u",
0033771:           "\u0171": "u",
0033772:           "\u0172": "u",
0033773:           "\u0173": "u",
0033774:           "\xfd": "y",
0033775:           "\xff": "y",
0033776:           "\xdd": "y",
0033777:           "\u0176": "y",
0033778:           "\u0177": "y",
0033779:           "\u0178": "y",
0033780:           "\xe7": "c",
0033781:           "\xc7": "c",
0033782:           "\u0106": "c",
0033783:           "\u0107": "c",
0033784:           "\u0108": "c",
0033785:           "\u0109": "c",
0033786:           "\u010a": "c",
0033787:           "\u010b": "c",
0033788:           "\u010c": "c",
0033789:           "\u010d": "c",
0033790:           "\xd0": "d",
0033791:           "\u010e": "d",
0033792:           "\u010f": "d",
0033793:           "\xf0": "d",
0033794:           "\u011c": "g",
0033795:           "\u011d": "g",
0033796:           "\u011e": "g",
0033797:           "\u011f": "g",
0033798:           "\u0120": "g",
0033799:           "\u0121": "g",
0033800:           "\u0122": "g",
0033801:           "\u0123": "g",
0033802:           "\u0124": "h",
0033803:           "\u0125": "h",
0033804:           "\u0134": "j",
0033805:           "\u0135": "j",
0033806:           "\u0136": "k",
0033807:           "\u0137": "k",
0033808:           "\u0139": "l",
0033809:           "\u013a": "l",
0033810:           "\u013b": "l",
0033811:           "\u013c": "l",
0033812:           "\u013d": "l",
0033813:           "\u013e": "l",
0033814:           "\xf1": "n",
0033815:           "\xd1": "n",
0033816:           "\u0143": "n",
0033817:           "\u0144": "n",
0033818:           "\u0145": "n",
0033819:           "\u0146": "n",
0033820:           "\u0147": "n",
0033821:           "\u0148": "n",
0033822:           "\u0154": "r",
0033823:           "\u0155": "r",
0033824:           "\u0156": "r",
0033825:           "\u0157": "r",
0033826:           "\u0158": "r",
0033827:           "\u0159": "r",
0033828:           "\u015a": "s",
0033829:           "\u015b": "s",
0033830:           "\u015c": "s",
0033831:           "\u015d": "s",
0033832:           "\u015e": "s",
0033833:           "\u015f": "s",
0033834:           "\u0160": "s",
0033835:           "\u0161": "s",
0033836:           "\u0162": "t",
0033837:           "\u0163": "t",
0033838:           "\u0164": "t",
0033839:           "\u0165": "t",
0033840:           "\u0174": "w",
0033841:           "\u0175": "w",
0033842:           "\u0179": "z",
0033843:           "\u017a": "z",
0033844:           "\u017b": "z",
0033845:           "\u017c": "z",
0033846:           "\u017d": "z",
0033847:           "\u017e": "z",
0033848:           "\xdf": "s",
0033849:           "\xe6": "a",
0033850:           "\xc6": "a",
0033851:           "\xde": "t",
0033852:           "\xfe": "t",
0033853:           "\xd8": "o",
0033854:           "\xf8": "o",
0033855:         };
0033856:       function Jy(e) {
0033857:         return (
0033858:           (Jy =
0033859:             "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
0033860:               ? function (e) {
0033861:                   return typeof e;
0033862:                 }
0033863:               : function (e) {
0033864:                   return e &&
0033865:                     "function" == typeof Symbol &&
0033866:                     e.constructor === Symbol &&
0033867:                     e !== Symbol.prototype
0033868:                     ? "symbol"
0033869:                     : typeof e;
0033870:                 }),
0033871:           Jy(e)
0033872:         );
0033873:       }
0033874:       function Ky(e, t) {
0033875:         for (var n = 0; n < t.length; n++) {
0033876:           var r = t[n];
0033877:           ((r.enumerable = r.enumerable || !1),
0033878:             (r.configurable = !0),
0033879:             "value" in r && (r.writable = !0),
0033880:             Object.defineProperty(e, Xy(r.key), r));
0033881:         }
0033882:       }
0033883:       function Xy(e) {
0033884:         var t = (function (e, t) {
0033885:           if ("object" != Jy(e) || !e) return e;
0033886:           var n = e[Symbol.toPrimitive];
0033887:           if (void 0 !== n) {
0033888:             var r = n.call(e, t || "default");
0033889:             if ("object" != Jy(r)) return r;
0033890:             throw new TypeError("@@toPrimitive must return a primitive value.");
0033891:           }
0033892:           return ("string" === t ? String : Number)(e);
0033893:         })(e, "string");
0033894:         return "symbol" == Jy(t) ? t : t + "";
0033895:       }
0033896:       var qy = (function () {
0033897:         return (
0033898:           (e = function e(t) {
0033899:             var n;
0033900:             (!(function (e, t) {
0033901:               if (!(e instanceof t))
0033902:                 throw new TypeError("Cannot call a class as a function");
0033903:             })(this, e),
0033904:               (this.language = t));
0033905:             var r = e.LANG_TO_ALGORITHM.get(t);
0033906:             if (!(r && Yy.algorithms().includes(r) && Hy[t]))
0033907:               throw new Error("Unsupported language: " + t);
0033908:             ((this.stemmer = Yy.newStemmer(r)),
0033909:               (this.stopWords = Hy[t]),
0033910:               (this.langAccentMap =
0033911:                 null !== (n = Vy[t]) && void 0 !== n ? n : {}));
0033912:           }),
0033913:           (t = [
0033914:             {
0033915:               key: "getStems",
0033916:               value: function (e) {
0033917:                 var t = this,
0033918:                   n = [];
0033919:                 return (
0033920:                   this.sanitize(e)
0033921:                     .split(/[\s\n@-]+/)
0033922:                     .forEach(function (e) {
0033923:                       var r = "en" === t.language ? t.englishFilter(e) : e;
0033924:                       if (r.length > 0 && -1 === t.stopWords.indexOf(r)) {
0033925:                         var o = t.stemmer.stem(r);
0033926:                         "en" === t.language ? n.push(o) : n.push(t.sanitize(o));
0033927:                       }
0033928:                     }),
0033929:                   Promise.resolve(n)
0033930:                 );
0033931:               },
0033932:             },
0033933:             {
0033934:               key: "sanitize",
0033935:               value: function (e) {
0033936:                 var t = this;
0033937:                 return e
0033938:                   .replace(/[^A-Za-z0-9 ]/g, function (e) {
0033939:                     return t.langAccentMap[e] || Qy[e] || e;
0033940:                   })
0033941:                   .replace(/[^A-Za-z0-9\s\n.@'-]/g, "")
0033942:                   .toLowerCase();
0033943:               },
0033944:             },
0033945:             {
0033946:               key: "englishFilter",
0033947:               value: function (e) {
0033948:                 return e.replace(/'s$|'|\.(?!\d)/g, "");
0033949:               },
0033950:             },
0033951:           ]) && Ky(e.prototype, t),
0033952:           n && Ky(e, n),
0033953:           Object.defineProperty(e, "prototype", { writable: !1 }),
0033954:           e
0033955:         );
0033956:         var e, t, n;
0033957:       })();
0033958:       function $y(e) {
0033959:         return (
0033960:           ($y =
0033961:             "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
0033962:               ? function (e) {
0033963:                   return typeof e;
0033964:                 }
0033965:               : function (e) {
0033966:                   return e &&
0033967:                     "function" == typeof Symbol &&
0033968:                     e.constructor === Symbol &&
0033969:                     e !== Symbol.prototype
0033970:                     ? "symbol"
0033971:                     : typeof e;
0033972:                 }),
0033973:           $y(e)
0033974:         );
0033975:       }
0033976:       function eg(e, t) {
0033977:         for (var n = 0; n < t.length; n++) {
0033978:           var r = t[n];
0033979:           ((r.enumerable = r.enumerable || !1),
0033980:             (r.configurable = !0),
0033981:             "value" in r && (r.writable = !0),
0033982:             Object.defineProperty(e, tg(r.key), r));
0033983:         }
0033984:       }
0033985:       function tg(e) {
0033986:         var t = (function (e, t) {
0033987:           if ("object" != $y(e) || !e) return e;
0033988:           var n = e[Symbol.toPrimitive];
0033989:           if (void 0 !== n) {
0033990:             var r = n.call(e, t || "default");
0033991:             if ("object" != $y(r)) return r;
0033992:             throw new TypeError("@@toPrimitive must return a primitive value.");
0033993:           }
0033994:           return ("string" === t ? String : Number)(e);
0033995:         })(e, "string");
0033996:         return "symbol" == $y(t) ? t : t + "";
0033997:       }
0033998:       qy.LANG_TO_ALGORITHM = new Map([
0033999:         ["da", "danish"],
0034000:         ["de", "german"],
0034001:         ["en", "porter"],
0034002:         ["es", "spanish"],
0034003:         ["fi", "finnish"],
0034004:         ["fr", "french"],
0034005:         ["hu", "hungarian"],
0034006:         ["it", "italian"],
0034007:         ["nl", "dutch"],
0034008:         ["no", "norwegian"],
0034009:         ["pt", "portuguese"],
0034010:         ["ro", "romanian"],
0034011:         ["sv", "swedish"],
0034012:         ["tr", "turkish"],
0034013:       ]);
0034014:       var ng = (function () {
0034015:         return (
0034016:           (e = function e() {
0034017:             !(function (e, t) {
0034018:               if (!(e instanceof t))
0034019:                 throw new TypeError("Cannot call a class as a function");
0034020:             })(this, e);
0034021:           }),
0034022:           (t = [
0034023:             {
0034024:               key: "create",
0034025:               value: function (e, t, n, r) {
0034026:                 return {
0034027:                   getResults: function (o) {
0034028:                     return e.getPositionsResults(o).then(function (e) {
0034029:                       return e.map(function (e) {
0034030:                         var o = t.addContext(e),
0034031:                           i = n.addLocation(o);
0034032:                         return r.addPage(i);
0034033:                       });
0034034:                     });
0034035:                   },
0034036:                 };
0034037:               },
0034038:             },
0034039:           ]) && eg(e.prototype, t),
0034040:           n && eg(e, n),
0034041:           Object.defineProperty(e, "prototype", { writable: !1 }),
0034042:           e
0034043:         );
0034044:         var e, t, n;
0034045:       })();
0034046:       function rg(e) {
0034047:         return (
0034048:           (rg =
0034049:             "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
0034050:               ? function (e) {
0034051:                   return typeof e;
0034052:                 }
0034053:               : function (e) {
0034054:                   return e &&
0034055:                     "function" == typeof Symbol &&
0034056:                     e.constructor === Symbol &&
0034057:                     e !== Symbol.prototype
0034058:                     ? "symbol"
0034059:                     : typeof e;
0034060:                 }),
0034061:           rg(e)
0034062:         );
0034063:       }
0034064:       function og(e) {
0034065:         if (null != e) {
0034066:           var t =
0034067:               e[
0034068:                 ("function" == typeof Symbol && Symbol.iterator) || "@@iterator"
0034069:               ],
0034070:             n = 0;
0034071:           if (t) return t.call(e);
0034072:           if ("function" == typeof e.next) return e;
0034073:           if (!isNaN(e.length))
0034074:             return {
0034075:               next: function () {
0034076:                 return (
0034077:                   e && n >= e.length && (e = void 0),
0034078:                   { value: e && e[n++], done: !e }
0034079:                 );
0034080:               },
0034081:             };
0034082:         }
0034083:         throw new TypeError(rg(e) + " is not iterable");
0034084:       }
0034085:       function ig(e) {
0034086:         return (
0034087:           (function (e) {
0034088:             if (Array.isArray(e)) return ag(e);
0034089:           })(e) ||
0034090:           (function (e) {
0034091:             if (
0034092:               ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
0034093:               null != e["@@iterator"]
0034094:             )
0034095:               return Array.from(e);
0034096:           })(e) ||
0034097:           (function (e, t) {
0034098:             if (e) {
0034099:               if ("string" == typeof e) return ag(e, t);
0034100:               var n = {}.toString.call(e).slice(8, -1);
0034101:               return (
0034102:                 "Object" === n && e.constructor && (n = e.constructor.name),
0034103:                 "Map" === n || "Set" === n
0034104:                   ? Array.from(e)
0034105:                   : "Arguments" === n ||
0034106:                       /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
0034107:                     ? ag(e, t)
0034108:                     : void 0
0034109:               );
0034110:             }
0034111:           })(e) ||
0034112:           (function () {
0034113:             throw new TypeError(
0034114:               "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
0034115:             );
0034116:           })()
0034117:         );
0034118:       }
0034119:       function ag(e, t) {
0034120:         (null == t || t > e.length) && (t = e.length);
0034121:         for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
0034122:         return r;
0034123:       }
0034124:       function cg() {
0034125:         var e,
0034126:           t,
0034127:           n = "function" == typeof Symbol ? Symbol : {},
0034128:           r = n.iterator || "@@iterator",
0034129:           o = n.toStringTag || "@@toStringTag";
0034130:         function i(n, r, o, i) {
0034131:           var u = r && r.prototype instanceof c ? r : c,
0034132:             s = Object.create(u.prototype);
0034133:           return (
0034134:             ug(
0034135:               s,
0034136:               "_invoke",
0034137:               (function (n, r, o) {
0034138:                 var i,
0034139:                   c,
0034140:                   u,
0034141:                   s = 0,
0034142:                   l = o || [],
0034143:                   f = !1,
0034144:                   d = {
0034145:                     p: 0,
0034146:                     n: 0,
0034147:                     v: e,
0034148:                     a: p,
0034149:                     f: p.bind(e, 4),
0034150:                     d: function (t, n) {
0034151:                       return ((i = t), (c = 0), (u = e), (d.n = n), a);
0034152:                     },
0034153:                   };
0034154:                 function p(n, r) {
0034155:                   for (
0034156:                     c = n, u = r, t = 0;
0034157:                     !f && s && !o && t < l.length;
0034158:                     t++
0034159:                   ) {
0034160:                     var o,
0034161:                       i = l[t],
0034162:                       p = d.p,
0034163:                       y = i[2];
0034164:                     n > 3
0034165:                       ? (o = y === r) &&
0034166:                         ((u = i[(c = i[4]) ? 5 : ((c = 3), 3)]),
0034167:                         (i[4] = i[5] = e))
0034168:                       : i[0] <= p &&
0034169:                         ((o = n < 2 && p < i[1])
0034170:                           ? ((c = 0), (d.v = r), (d.n = i[1]))
0034171:                           : p < y &&
0034172:                             (o = n < 3 || i[0] > r || r > y) &&
0034173:                             ((i[4] = n), (i[5] = r), (d.n = y), (c = 0)));
0034174:                   }
0034175:                   if (o || n > 1) return a;
0034176:                   throw ((f = !0), r);
0034177:                 }
0034178:                 return function (o, l, y) {
0034179:                   if (s > 1) throw TypeError("Generator is already running");
0034180:                   for (
0034181:                     f && 1 === l && p(l, y), c = l, u = y;
0034182:                     (t = c < 2 ? e : u) || !f;
0034183: 
0034184:                   ) {
0034185:                     i ||
0034186:                       (c
0034187:                         ? c < 3
0034188:                           ? (c > 1 && (d.n = -1), p(c, u))
0034189:                           : (d.n = u)
0034190:                         : (d.v = u));
0034191:                     try {
0034192:                       if (((s = 2), i)) {
0034193:                         if ((c || (o = "next"), (t = i[o]))) {
0034194:                           if (!(t = t.call(i, u)))
0034195:                             throw TypeError("iterator result is not an object");
0034196:                           if (!t.done) return t;
0034197:                           ((u = t.value), c < 2 && (c = 0));
0034198:                         } else
0034199:                           (1 === c && (t = i.return) && t.call(i),
0034200:                             c < 2 &&
0034201:                               ((u = TypeError(
0034202:                                 "The iterator does not provide a '" +
0034203:                                   o +
0034204:                                   "' method",
0034205:                               )),
0034206:                               (c = 1)));
0034207:                         i = e;
0034208:                       } else if ((t = (f = d.n < 0) ? u : n.call(r, d)) !== a)
0034209:                         break;
0034210:                     } catch (t) {
0034211:                       ((i = e), (c = 1), (u = t));
0034212:                     } finally {
0034213:                       s = 1;
0034214:                     }
0034215:                   }
0034216:                   return { value: t, done: f };
0034217:                 };
0034218:               })(n, o, i),
0034219:               !0,
0034220:             ),
0034221:             s
0034222:           );
0034223:         }
0034224:         var a = {};
0034225:         function c() {}
0034226:         function u() {}
0034227:         function s() {}
0034228:         t = Object.getPrototypeOf;
0034229:         var l = [][r]
0034230:             ? t(t([][r]()))
0034231:             : (ug((t = {}), r, function () {
0034232:                 return this;
0034233:               }),
0034234:               t),
0034235:           f = (s.prototype = c.prototype = Object.create(l));
0034236:         function d(e) {
0034237:           return (
0034238:             Object.setPrototypeOf
0034239:               ? Object.setPrototypeOf(e, s)
0034240:               : ((e.__proto__ = s), ug(e, o, "GeneratorFunction")),
0034241:             (e.prototype = Object.create(f)),
0034242:             e
0034243:           );
0034244:         }
0034245:         return (
0034246:           (u.prototype = s),
0034247:           ug(f, "constructor", s),
0034248:           ug(s, "constructor", u),
0034249:           (u.displayName = "GeneratorFunction"),
0034250:           ug(s, o, "GeneratorFunction"),
0034251:           ug(f),
0034252:           ug(f, o, "Generator"),
0034253:           ug(f, r, function () {
0034254:             return this;
0034255:           }),
0034256:           ug(f, "toString", function () {
0034257:             return "[object Generator]";
0034258:           }),
0034259:           (cg = function () {
0034260:             return { w: i, m: d };
0034261:           })()
0034262:         );
0034263:       }
0034264:       function ug(e, t, n, r) {
0034265:         var o = Object.defineProperty;
0034266:         try {
0034267:           o({}, "", {});
0034268:         } catch (e) {
0034269:           o = 0;
0034270:         }
0034271:         ((ug = function (e, t, n, r) {
0034272:           function i(t, n) {
0034273:             ug(e, t, function (e) {
0034274:               return this._invoke(t, n, e);
0034275:             });
0034276:           }
0034277:           t
0034278:             ? o
0034279:               ? o(e, t, {
0034280:                   value: n,
0034281:                   enumerable: !r,
0034282:                   configurable: !r,
0034283:                   writable: !r,
0034284:                 })
0034285:               : (e[t] = n)
0034286:             : (i("next", 0), i("throw", 1), i("return", 2));
0034287:         }),
0034288:           ug(e, t, n, r));
0034289:       }
0034290:       function sg(e, t) {
0034291:         for (var n = 0; n < t.length; n++) {
0034292:           var r = t[n];
0034293:           ((r.enumerable = r.enumerable || !1),
0034294:             (r.configurable = !0),
0034295:             "value" in r && (r.writable = !0),
0034296:             Object.defineProperty(e, lg(r.key), r));
0034297:         }
0034298:       }
0034299:       function lg(e) {
0034300:         var t = (function (e, t) {
0034301:           if ("object" != rg(e) || !e) return e;
0034302:           var n = e[Symbol.toPrimitive];
0034303:           if (void 0 !== n) {
0034304:             var r = n.call(e, t || "default");
0034305:             if ("object" != rg(r)) return r;
0034306:             throw new TypeError("@@toPrimitive must return a primitive value.");
0034307:           }
0034308:           return ("string" === t ? String : Number)(e);
0034309:         })(e, "string");
0034310:         return "symbol" == rg(t) ? t : t + "";
0034311:       }
0034312:       var fg = function (e, t, n, r) {
0034313:           return new (n || (n = Promise))(function (o, i) {
0034314:             function a(e) {
0034315:               try {
0034316:                 u(r.next(e));
0034317:               } catch (e) {
0034318:                 i(e);
0034319:               }
0034320:             }
0034321:             function c(e) {
0034322:               try {
0034323:                 u(r.throw(e));
0034324:               } catch (e) {
0034325:                 i(e);
0034326:               }
0034327:             }
0034328:             function u(e) {
0034329:               var t;
0034330:               e.done
0034331:                 ? o(e.value)
0034332:                 : ((t = e.value),
0034333:                   t instanceof n
0034334:                     ? t
0034335:                     : new n(function (e) {
0034336:                         e(t);
0034337:                       })).then(a, c);
0034338:             }
0034339:             u((r = r.apply(e, t || [])).next());
0034340:           });
0034341:         },
0034342:         dg = (function () {
0034343:           return (
0034344:             (e = function e(t, n) {
0034345:               (!(function (e, t) {
0034346:                 if (!(e instanceof t))
0034347:                   throw new TypeError("Cannot call a class as a function");
0034348:               })(this, e),
0034349:                 (this.wordStemmer = t),
0034350:                 (this.searchIndex = n),
0034351:                 (this.MAX_DISTANCE = 20));
0034352:             }),
0034353:             (t = [
0034354:               {
0034355:                 key: "getPositionsResults",
0034356:                 value: function (e) {
0034357:                   return fg(
0034358:                     this,
0034359:                     void 0,
0034360:                     void 0,
0034361:                     cg().m(function t() {
0034362:                       var n,
0034363:                         r,
0034364:                         o,
0034365:                         i,
0034366:                         a,
0034367:                         c = this;
0034368:                       return cg().w(
0034369:                         function (t) {
0034370:                           for (;;)
0034371:                             switch (t.n) {
0034372:                               case 0:
0034373:                                 return (
0034374:                                   (n = []),
0034375:                                   (t.n = 1),
0034376:                                   this.wordStemmer.getStems(e)
0034377:                                 );
0034378:                               case 1:
0034379:                                 if (!((r = t.v).length > 0)) {
0034380:                                   t.n = 5;
0034381:                                   break;
0034382:                                 }
0034383:                                 return (
0034384:                                   (t.n = 2),
0034385:                                   Promise.all(
0034386:                                     r.map(function (e) {
0034387:                                       return fg(
0034388:                                         c,
0034389:                                         void 0,
0034390:                                         void 0,
0034391:                                         cg().m(function t() {
0034392:                                           var n, r, o, i;
0034393:                                           return cg().w(
0034394:                                             function (t) {
0034395:                                               for (;;)
0034396:                                                 switch (t.n) {
0034397:                                                   case 0:
0034398:                                                     return (
0034399:                                                       (t.n = 1),
0034400:                                                       this.searchIndex.getPositions(
0034401:                                                         e,
0034402:                                                       )
0034403:                                                     );
0034404:                                                   case 1:
0034405:                                                     if (
0034406:                                                       ((o = n = t.v),
0034407:                                                       !(r = null !== o))
0034408:                                                     ) {
0034409:                                                       t.n = 2;
0034410:                                                       break;
0034411:                                                     }
0034412:                                                     r = void 0 !== n;
0034413:                                                   case 2:
0034414:                                                     if (!r) {
0034415:                                                       t.n = 3;
0034416:                                                       break;
0034417:                                                     }
0034418:                                                     ((i = n), (t.n = 4));
0034419:                                                     break;
0034420:                                                   case 3:
0034421:                                                     i = [];
0034422:                                                   case 4:
0034423:                                                     return t.a(2, i);
0034424:                                                 }
0034425:                                             },
0034426:                                             t,
0034427:                                             this,
0034428:                                           );
0034429:                                         }),
0034430:                                       );
0034431:                                     }),
0034432:                                   )
0034433:                                 );
0034434:                               case 2:
0034435:                                 ((o = t.v),
0034436:                                   (i = o.length * this.MAX_DISTANCE),
0034437:                                   (a = cg().m(function e() {
0034438:                                     var t, r, a, u;
0034439:                                     return cg().w(function (e) {
0034440:                                       for (;;)
0034441:                                         switch (e.n) {
0034442:                                           case 0:
0034443:                                             ((t = o.map(c.getFirstElement)),
0034444:                                               (r = t.every(c.inOrderCalc)),
0034445:                                               (a = Math.min.apply(Math, ig(t))),
0034446:                                               (u = Math.max.apply(Math, ig(t))),
0034447:                                               r && u - a <= i
0034448:                                                 ? (o.forEach(
0034449:                                                     c.removeFirstElement,
0034450:                                                   ),
0034451:                                                   n.push(c.buildResult(t)))
0034452:                                                 : o.forEach(function (e) {
0034453:                                                     e[0] === a &&
0034454:                                                       c.removeFirstElement(e);
0034455:                                                   }));
0034456:                                           case 1:
0034457:                                             return e.a(2);
0034458:                                         }
0034459:                                     }, e);
0034460:                                   })));
0034461:                               case 3:
0034462:                                 if (!this.noneAreEmpty(o)) {
0034463:                                   t.n = 5;
0034464:                                   break;
0034465:                                 }
0034466:                                 return t.d(og(a()), 4);
0034467:                               case 4:
0034468:                                 t.n = 3;
0034469:                                 break;
0034470:                               case 5:
0034471:                                 return t.a(2, n);
0034472:                             }
0034473:                         },
0034474:                         t,
0034475:                         this,
0034476:                       );
0034477:                     }),
0034478:                   );
0034479:                 },
0034480:               },
0034481:               {
0034482:                 key: "noneAreEmpty",
0034483:                 value: function (e) {
0034484:                   return e.every(function (e) {
0034485:                     return e.length > 0;
0034486:                   });
0034487:                 },
0034488:               },
0034489:               {
0034490:                 key: "getFirstElement",
0034491:                 value: function (e) {
0034492:                   return e[0];
0034493:                 },
0034494:               },
0034495:               {
0034496:                 key: "removeFirstElement",
0034497:                 value: function (e) {
0034498:                   e.shift();
0034499:                 },
0034500:               },
0034501:               {
0034502:                 key: "inOrderCalc",
0034503:                 value: function (e, t, n) {
0034504:                   return 0 === t || n[t - 1] < e;
0034505:                 },
0034506:               },
0034507:               {
0034508:                 key: "buildResult",
0034509:                 value: function (e) {
0034510:                   return {
0034511:                     getPositions: function () {
0034512:                       return Promise.resolve(e);
0034513:                     },
0034514:                   };
0034515:                 },
0034516:               },
0034517:             ]) && sg(e.prototype, t),
0034518:             n && sg(e, n),
0034519:             Object.defineProperty(e, "prototype", { writable: !1 }),
0034520:             e
0034521:           );
0034522:           var e, t, n;
0034523:         })();
0034524:       function pg(e) {
0034525:         return (
0034526:           (pg =
0034527:             "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
0034528:               ? function (e) {
0034529:                   return typeof e;
0034530:                 }
0034531:               : function (e) {
0034532:                   return e &&
0034533:                     "function" == typeof Symbol &&
0034534:                     e.constructor === Symbol &&
0034535:                     e !== Symbol.prototype
0034536:                     ? "symbol"
0034537:                     : typeof e;
0034538:                 }),
0034539:           pg(e)
0034540:         );
0034541:       }
0034542:       function yg(e, t) {
0034543:         for (var n = 0; n < t.length; n++) {
0034544:           var r = t[n];
0034545:           ((r.enumerable = r.enumerable || !1),
0034546:             (r.configurable = !0),
0034547:             "value" in r && (r.writable = !0),
0034548:             Object.defineProperty(e, gg(r.key), r));
0034549:         }
0034550:       }
0034551:       function gg(e) {
0034552:         var t = (function (e, t) {
0034553:           if ("object" != pg(e) || !e) return e;
0034554:           var n = e[Symbol.toPrimitive];
0034555:           if (void 0 !== n) {
0034556:             var r = n.call(e, t || "default");
0034557:             if ("object" != pg(r)) return r;
0034558:             throw new TypeError("@@toPrimitive must return a primitive value.");
0034559:           }
0034560:           return ("string" === t ? String : Number)(e);
0034561:         })(e, "string");
0034562:         return "symbol" == pg(t) ? t : t + "";
0034563:       }
0034564:       var vg = (function () {
0034565:         return (
0034566:           (e = function e(t) {
0034567:             (!(function (e, t) {
0034568:               if (!(e instanceof t))
0034569:                 throw new TypeError("Cannot call a class as a function");
0034570:             })(this, e),
0034571:               (this.contextService = t));
0034572:           }),
0034573:           (t = [
0034574:             {
0034575:               key: "addContext",
0034576:               value: function (e) {
0034577:                 var t,
0034578:                   n = this.contextService;
0034579:                 return Object.assign(Object.assign({}, e), {
0034580:                   getContext: function () {
0034581:                     return (
0034582:                       t ||
0034583:                         (t = e.getPositions().then(function (e) {
0034584:                           return n.getSearchContext([e]).then(function (e) {
0034585:                             return e[0];
0034586:                           });
0034587:                         })),
0034588:                       t
0034589:                     );
0034590:                   },
0034591:                 });
0034592:               },
0034593:             },
0034594:           ]) && yg(e.prototype, t),
0034595:           n && yg(e, n),
0034596:           Object.defineProperty(e, "prototype", { writable: !1 }),
0034597:           e
0034598:         );
0034599:         var e, t, n;
0034600:       })();
0034601:       function mg(e) {
0034602:         return (
0034603:           (mg =
0034604:             "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
0034605:               ? function (e) {
0034606:                   return typeof e;
0034607:                 }
0034608:               : function (e) {
0034609:                   return e &&
0034610:                     "function" == typeof Symbol &&
0034611:                     e.constructor === Symbol &&
0034612:                     e !== Symbol.prototype
0034613:                     ? "symbol"
0034614:                     : typeof e;
0034615:                 }),
0034616:           mg(e)
0034617:         );
0034618:       }
0034619:       function bg(e, t) {
0034620:         for (var n = 0; n < t.length; n++) {
0034621:           var r = t[n];
0034622:           ((r.enumerable = r.enumerable || !1),
0034623:             (r.configurable = !0),
0034624:             "value" in r && (r.writable = !0),
0034625:             Object.defineProperty(e, hg(r.key), r));
0034626:         }
0034627:       }
0034628:       function hg(e) {
0034629:         var t = (function (e, t) {
0034630:           if ("object" != mg(e) || !e) return e;
0034631:           var n = e[Symbol.toPrimitive];
0034632:           if (void 0 !== n) {
0034633:             var r = n.call(e, t || "default");
0034634:             if ("object" != mg(r)) return r;
0034635:             throw new TypeError("@@toPrimitive must return a primitive value.");
0034636:           }
0034637:           return ("string" === t ? String : Number)(e);
0034638:         })(e, "string");
0034639:         return "symbol" == mg(t) ? t : t + "";
0034640:       }
0034641:       var Ig = (function () {
0034642:         return (
0034643:           (e = function e(t) {
0034644:             (!(function (e, t) {
0034645:               if (!(e instanceof t))
0034646:                 throw new TypeError("Cannot call a class as a function");
0034647:             })(this, e),
0034648:               (this.positionMapper = t));
0034649:           }),
0034650:           (t = [
0034651:             {
0034652:               key: "addLocation",
0034653:               value: function (e) {
0034654:                 var t,
0034655:                   n = this.positionMapper;
0034656:                 return Object.assign(Object.assign({}, e), {
0034657:                   getLocation: function () {
0034658:                     return (
0034659:                       t ||
0034660:                         (t = new Promise(function (t) {
0034661:                           e.getPositions().then(function (e) {
0034662:                             return n
0034663:                               .convertPositionToLocation(e[0])
0034664:                               .then(function (e) {
0034665:                                 t(e);
0034666:                               })
0034667:                               .catch(function () {
0034668:                                 t(void 0);
0034669:                               });
0034670:                           });
0034671:                         })),
0034672:                       t
0034673:                     );
0034674:                   },
0034675:                 });
0034676:               },
0034677:             },
0034678:             {
0034679:               key: "addPage",
0034680:               value: function (e) {
0034681:                 var t,
0034682:                   n = this.positionMapper;
0034683:                 return Object.assign(Object.assign({}, e), {
0034684:                   getPage: function () {
0034685:                     return (
0034686:                       t ||
0034687:                         (t = e.getPositions().then(function (e) {
0034688:                           return n
0034689:                             .convertPositionToPage(e[0])
0034690:                             .then(function (e) {
0034691:                               return e || void 0;
0034692:                             });
0034693:                         })),
0034694:                       t
0034695:                     );
0034696:                   },
0034697:                 });
0034698:               },
0034699:             },
0034700:           ]) && bg(e.prototype, t),
0034701:           n && bg(e, n),
0034702:           Object.defineProperty(e, "prototype", { writable: !1 }),
0034703:           e
0034704:         );
0034705:         var e, t, n;
0034706:       })();
0034707:       function wg() {
0034708:         var e,
0034709:           t,
0034710:           n = "function" == typeof Symbol ? Symbol : {},
0034711:           r = n.iterator || "@@iterator",
0034712:           o = n.toStringTag || "@@toStringTag";
0034713:         function i(n, r, o, i) {
0034714:           var u = r && r.prototype instanceof c ? r : c,
0034715:             s = Object.create(u.prototype);
0034716:           return (
0034717:             Sg(
0034718:               s,
0034719:               "_invoke",
0034720:               (function (n, r, o) {
0034721:                 var i,
0034722:                   c,
0034723:                   u,
0034724:                   s = 0,
0034725:                   l = o || [],
0034726:                   f = !1,
0034727:                   d = {
0034728:                     p: 0,
0034729:                     n: 0,
0034730:                     v: e,
0034731:                     a: p,
0034732:                     f: p.bind(e, 4),
0034733:                     d: function (t, n) {
0034734:                       return ((i = t), (c = 0), (u = e), (d.n = n), a);
0034735:                     },
0034736:                   };
0034737:                 function p(n, r) {
0034738:                   for (
0034739:                     c = n, u = r, t = 0;
0034740:                     !f && s && !o && t < l.length;
0034741:                     t++
0034742:                   ) {
0034743:                     var o,
0034744:                       i = l[t],
0034745:                       p = d.p,
0034746:                       y = i[2];
0034747:                     n > 3
0034748:                       ? (o = y === r) &&
0034749:                         ((u = i[(c = i[4]) ? 5 : ((c = 3), 3)]),
0034750:                         (i[4] = i[5] = e))
0034751:                       : i[0] <= p &&
0034752:                         ((o = n < 2 && p < i[1])
0034753:                           ? ((c = 0), (d.v = r), (d.n = i[1]))
0034754:                           : p < y &&
0034755:                             (o = n < 3 || i[0] > r || r > y) &&
0034756:                             ((i[4] = n), (i[5] = r), (d.n = y), (c = 0)));
0034757:                   }
0034758:                   if (o || n > 1) return a;
0034759:                   throw ((f = !0), r);
0034760:                 }
0034761:                 return function (o, l, y) {
0034762:                   if (s > 1) throw TypeError("Generator is already running");
0034763:                   for (
0034764:                     f && 1 === l && p(l, y), c = l, u = y;
0034765:                     (t = c < 2 ? e : u) || !f;
0034766: 
0034767:                   ) {
0034768:                     i ||
0034769:                       (c
0034770:                         ? c < 3
0034771:                           ? (c > 1 && (d.n = -1), p(c, u))
0034772:                           : (d.n = u)
0034773:                         : (d.v = u));
0034774:                     try {
0034775:                       if (((s = 2), i)) {
0034776:                         if ((c || (o = "next"), (t = i[o]))) {
0034777:                           if (!(t = t.call(i, u)))
0034778:                             throw TypeError("iterator result is not an object");
0034779:                           if (!t.done) return t;
0034780:                           ((u = t.value), c < 2 && (c = 0));
0034781:                         } else
0034782:                           (1 === c && (t = i.return) && t.call(i),
0034783:                             c < 2 &&
0034784:                               ((u = TypeError(
0034785:                                 "The iterator does not provide a '" +
0034786:                                   o +
0034787:                                   "' method",
0034788:                               )),
0034789:                               (c = 1)));
0034790:                         i = e;
0034791:                       } else if ((t = (f = d.n < 0) ? u : n.call(r, d)) !== a)
0034792:                         break;
0034793:                     } catch (t) {
0034794:                       ((i = e), (c = 1), (u = t));
0034795:                     } finally {
0034796:                       s = 1;
0034797:                     }
0034798:                   }
0034799:                   return { value: t, done: f };
0034800:                 };
0034801:               })(n, o, i),
0034802:               !0,
0034803:             ),
0034804:             s
0034805:           );
0034806:         }
0034807:         var a = {};
0034808:         function c() {}
0034809:         function u() {}
0034810:         function s() {}
0034811:         t = Object.getPrototypeOf;
0034812:         var l = [][r]
0034813:             ? t(t([][r]()))
0034814:             : (Sg((t = {}), r, function () {
0034815:                 return this;
0034816:               }),
0034817:               t),
0034818:           f = (s.prototype = c.prototype = Object.create(l));
0034819:         function d(e) {
0034820:           return (
0034821:             Object.setPrototypeOf
0034822:               ? Object.setPrototypeOf(e, s)
0034823:               : ((e.__proto__ = s), Sg(e, o, "GeneratorFunction")),
0034824:             (e.prototype = Object.create(f)),
0034825:             e
0034826:           );
0034827:         }
0034828:         return (
0034829:           (u.prototype = s),
0034830:           Sg(f, "constructor", s),
0034831:           Sg(s, "constructor", u),
0034832:           (u.displayName = "GeneratorFunction"),
0034833:           Sg(s, o, "GeneratorFunction"),
0034834:           Sg(f),
0034835:           Sg(f, o, "Generator"),
0034836:           Sg(f, r, function () {
0034837:             return this;
0034838:           }),
0034839:           Sg(f, "toString", function () {
0034840:             return "[object Generator]";
0034841:           }),
0034842:           (wg = function () {
0034843:             return { w: i, m: d };
0034844:           })()
0034845:         );
0034846:       }
0034847:       function Sg(e, t, n, r) {
0034848:         var o = Object.defineProperty;
0034849:         try {
0034850:           o({}, "", {});
0034851:         } catch (e) {
0034852:           o = 0;
0034853:         }
0034854:         ((Sg = function (e, t, n, r) {
0034855:           function i(t, n) {
0034856:             Sg(e, t, function (e) {
0034857:               return this._invoke(t, n, e);
0034858:             });
0034859:           }
0034860:           t
0034861:             ? o
0034862:               ? o(e, t, {
0034863:                   value: n,
0034864:                   enumerable: !r,
0034865:                   configurable: !r,
0034866:                   writable: !r,
0034867:                 })
0034868:               : (e[t] = n)
0034869:             : (i("next", 0), i("throw", 1), i("return", 2));
0034870:         }),
0034871:           Sg(e, t, n, r));
0034872:       }
0034873:       function Mg(e, t) {
0034874:         return (
0034875:           (function (e) {
0034876:             if (Array.isArray(e)) return e;
0034877:           })(e) ||
0034878:           (function (e, t) {
0034879:             var n =
0034880:               null == e
0034881:                 ? null
0034882:                 : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
0034883:                   e["@@iterator"];
0034884:             if (null != n) {
0034885:               var r,
0034886:                 o,
0034887:                 i,
0034888:                 a,
0034889:                 c = [],
0034890:                 u = !0,
0034891:                 s = !1;
0034892:               try {
0034893:                 if (((i = (n = n.call(e)).next), 0 === t)) {
0034894:                   if (Object(n) !== n) return;
0034895:                   u = !1;
0034896:                 } else
0034897:                   for (
0034898:                     ;
0034899:                     !(u = (r = i.call(n)).done) &&
0034900:                     (c.push(r.value), c.length !== t);
0034901:                     u = !0
0034902:                   );
0034903:               } catch (e) {
0034904:                 ((s = !0), (o = e));
0034905:               } finally {
0034906:                 try {
0034907:                   if (
0034908:                     !u &&
0034909:                     null != n.return &&
0034910:                     ((a = n.return()), Object(a) !== a)
0034911:                   )
0034912:                     return;
0034913:                 } finally {
0034914:                   if (s) throw o;
0034915:                 }
0034916:               }
0034917:               return c;
0034918:             }
0034919:           })(e, t) ||
0034920:           (function (e, t) {
0034921:             if (e) {
0034922:               if ("string" == typeof e) return Ag(e, t);
0034923:               var n = {}.toString.call(e).slice(8, -1);
0034924:               return (
0034925:                 "Object" === n && e.constructor && (n = e.constructor.name),
0034926:                 "Map" === n || "Set" === n
0034927:                   ? Array.from(e)
0034928:                   : "Arguments" === n ||
0034929:                       /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
0034930:                     ? Ag(e, t)
0034931:                     : void 0
0034932:               );
0034933:             }
0034934:           })(e, t) ||
0034935:           (function () {
0034936:             throw new TypeError(
0034937:               "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
0034938:             );
0034939:           })()
0034940:         );
0034941:       }
0034942:       function Ag(e, t) {
0034943:         (null == t || t > e.length) && (t = e.length);
0034944:         for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
0034945:         return r;
0034946:       }
0034947:       var Cg = function (e, t, n, r) {
0034948:           return new (n || (n = Promise))(function (o, i) {
0034949:             function a(e) {
0034950:               try {
0034951:                 u(r.next(e));
0034952:               } catch (e) {
0034953:                 i(e);
0034954:               }
0034955:             }
0034956:             function c(e) {
0034957:               try {
0034958:                 u(r.throw(e));
0034959:               } catch (e) {
0034960:                 i(e);
0034961:               }
0034962:             }
0034963:             function u(e) {
0034964:               var t;
0034965:               e.done
0034966:                 ? o(e.value)
0034967:                 : ((t = e.value),
0034968:                   t instanceof n
0034969:                     ? t
0034970:                     : new n(function (e) {
0034971:                         e(t);
0034972:                       })).then(a, c);
0034973:             }
0034974:             u((r = r.apply(e, t || [])).next());
0034975:           });
0034976:         },
0034977:         Tg = (0, r.createContext)(void 0),
0034978:         jg = function (e) {
0034979:           var t = e.children,
0034980:             n = e.deviceSession,
0034981:             o = e.readingSession,
0034982:             i = Mg((0, r.useState)("Initializing"), 2),
0034983:             a = i[0],
0034984:             c = i[1],
0034985:             u = Mg((0, r.useState)(), 2),
0034986:             s = u[0],
0034987:             l = u[1],
0034988:             d = Mg((0, r.useState)(), 2),
0034989:             p = d[0],
0034990:             y = d[1],
0034991:             g = Io().positionMapper,
0034992:             v = (0, r.useMemo)(
0034993:               function () {
0034994:                 return new Sy(n, o);
0034995:               },
0034996:               [n, o],
0034997:             ),
0034998:             m = (0, r.useMemo)(
0034999:               function () {
0035000:                 return new Oy(n, o);
0035001:               },
0035002:               [n, o],
0035003:             ),
0035004:             b = (0, f.useQuery)(
0035005:               ["positionsService", v],
0035006:               function () {
0035007:                 return Cg(
0035008:                   void 0,
0035009:                   void 0,
0035010:                   void 0,
0035011:                   wg().m(function e() {
0035012:                     var t, n, r, o, i;
0035013:                     return wg().w(function (e) {
0035014:                       for (;;)
0035015:                         switch (e.n) {
0035016:                           case 0:
0035017:                             return ((e.n = 1), v.getSearchIndexInfo());
0035018:                           case 1:
0035019:                             if ((t = e.v)) {
0035020:                               e.n = 2;
0035021:                               break;
0035022:                             }
0035023:                             throw new Error("Index info unavailable");
0035024:                           case 2:
0035025:                             return (
0035026:                               (n = new Wy(t)),
0035027:                               (e.n = 3),
0035028:                               n.getSearchIndex()
0035029:                             );
0035030:                           case 3:
0035031:                             return (
0035032:                               (r = e.v),
0035033:                               (o = r.getProperty("LanguageId")),
0035034:                               (i = new qy(o)),
0035035:                               e.a(2, new dg(i, r))
0035036:                             );
0035037:                         }
0035038:                     }, e);
0035039:                   }),
0035040:                 );
0035041:               },
0035042:               {
0035043:                 retry: !1,
0035044:                 refetchOnMount: !1,
0035045:                 refetchOnReconnect: !1,
0035046:                 refetchOnWindowFocus: !1,
0035047:                 onError: function () {
0035048:                   return c("Unavailable");
0035049:                 },
0035050:               },
0035051:             ),
0035052:             h = (0, r.useCallback)(
0035053:               function () {
0035054:                 (c("Initializing"), b.refetch());
0035055:               },
0035056:               [b],
0035057:             ),
0035058:             I = (0, f.useQuery)(
0035059:               ["searchService", b.data, m, g],
0035060:               function () {
0035061:                 var e = b.data,
0035062:                   t = new vg(m),
0035063:                   n = new Ig(g);
0035064:                 return new ng().create(e, t, n, n);
0035065:               },
0035066:               {
0035067:                 enabled: !!b.data && !!g,
0035068:                 retry: !1,
0035069:                 refetchOnMount: !1,
0035070:                 refetchOnReconnect: !1,
0035071:                 refetchOnWindowFocus: !1,
0035072:                 onSuccess: function () {
0035073:                   return c("Ready");
0035074:                 },
0035075:                 onError: function () {
0035076:                   return c("Unavailable");
0035077:                 },
0035078:               },
0035079:             ),
0035080:             w =
0035081:               ((0, f.useQuery)(
0035082:                 ["search", I.data, p],
0035083:                 function (e) {
0035084:                   var t = e.signal;
0035085:                   return Cg(
0035086:                     void 0,
0035087:                     void 0,
0035088:                     void 0,
0035089:                     wg().m(function e() {
0035090:                       var n, r;
0035091:                       return wg().w(function (e) {
0035092:                         for (;;)
0035093:                           switch (e.n) {
0035094:                             case 0:
0035095:                               if (void 0 !== p) {
0035096:                                 e.n = 1;
0035097:                                 break;
0035098:                               }
0035099:                               (l(void 0), (e.n = 3));
0035100:                               break;
0035101:                             case 1:
0035102:                               return (
0035103:                                 c("Searching"),
0035104:                                 (n = I.data),
0035105:                                 (e.n = 2),
0035106:                                 n.getResults(p)
0035107:                               );
0035108:                             case 2:
0035109:                               ((r = e.v), (t && t.aborted) || l(r));
0035110:                             case 3:
0035111:                               return e.a(2);
0035112:                           }
0035113:                       }, e);
0035114:                     }),
0035115:                   );
0035116:                 },
0035117:                 {
0035118:                   enabled: !!I.data,
0035119:                   retry: !1,
0035120:                   refetchOnMount: !1,
0035121:                   refetchOnReconnect: !1,
0035122:                   refetchOnWindowFocus: !1,
0035123:                   onSettled: function () {
0035124:                     return c("Ready");
0035125:                   },
0035126:                 },
0035127:               ),
0035128:               (0, r.useCallback)(
0035129:                 function (e) {
0035130:                   return (y(e), !0);
0035131:                 },
0035132:                 [y],
0035133:               )),
0035134:             S = (0, r.useCallback)(
0035135:               function () {
0035136:                 y(void 0);
0035137:               },
0035138:               [y],
0035139:             ),
0035140:             M = {
0035141:               status: a,
0035142:               searchText: p,
0035143:               searchResults: s,
0035144:               clearSearchResults: S,
0035145:               performSearch: w,
0035146:               refetchIndex: h,
0035147:             };
0035148:           return r.createElement(Tg.Provider, { value: M }, t);
0035149:         },
0035150:         kg = function () {
0035151:           var e,
0035152:             t = (function () {
0035153:               var e = r.useContext(Tg);
0035154:               if (void 0 === e)
0035155:                 throw new Error(
0035156:                   "useSearch must be used within a SearchProvider",
0035157:                 );
0035158:               return e;
0035159:             })(),
0035160:             n = fo().setSearchResults,
0035161:             o = _o(),
0035162:             i = o.state,
0035163:             a = o.moveToPosition,
0035164:             c = Io().positionMapper,
0035165:             u = fi().emitInBookAction,
0035166:             l = ur().readerSettings,
0035167:             f = (0, r.useCallback)(
0035168:               function (e) {
0035169:                 var t, r;
0035170:                 ((i.pagePositionRange &&
0035171:                   (null === (t = i.pagePositionRange) || void 0 === t
0035172:                     ? void 0
0035173:                     : t.startPosition) <= e[0] &&
0035174:                   (null === (r = i.pagePositionRange) || void 0 === r
0035175:                     ? void 0
0035176:                     : r.endPosition) >= e[0]) ||
0035177:                   a(e[0]),
0035178:                   u(new ji(new Ma("GoToResult"))),
0035179:                   n(e));
0035180:               },
0035181:               [u, a, n, i.pagePositionRange],
0035182:             );
0035183:           (0, r.useEffect)(function () {
0035184:             "Unavailable" === t.status && t.refetchIndex();
0035185:           }, []);
0035186:           var d = (0, r.useMemo)(
0035187:               function () {
0035188:                 return {
0035189:                   performSearch: function (e) {
0035190:                     (u(new ji(new Ma("UseSearch"))), t.performSearch(e));
0035191:                   },
0035192:                 };
0035193:               },
0035194:               [t, u],
0035195:             ),
0035196:             p = (0, r.useMemo)(
0035197:               function () {
0035198:                 return {
0035199:                   onItemClick: function (e) {
0035200:                     f(e);
0035201:                   },
0035202:                   onClearSearchResults: function () {
0035203:                     t.clearSearchResults();
0035204:                   },
0035205:                 };
0035206:               },
0035207:               [f, t],
0035208:             ),
0035209:             y = (0, r.useMemo)(
0035210:               function () {
0035211:                 return (
0035212:                   c &&
0035213:                   c
0035214:                     .getNavigationUnitTypes()
0035215:                     .includes(Tt.NavigationUnitType.Page)
0035216:                 );
0035217:               },
0035218:               [c],
0035219:             );
0035220:           return r.createElement(s.SearchComponent, {
0035221:             searchService: d,
0035222:             callbacks: p,
0035223:             status: t.status,
0035224:             searchInput: null !== (e = t.searchText) && void 0 !== e ? e : "",
0035225:             data: t.searchResults,
0035226:             isPage: y,
0035227:             theme: l.colorTheme,
0035228:           });
0035229:         };
0035230:       function Ng() {
0035231:         var e,
0035232:           t,
0035233:           n = "function" == typeof Symbol ? Symbol : {},
0035234:           r = n.iterator || "@@iterator",
0035235:           o = n.toStringTag || "@@toStringTag";
0035236:         function i(n, r, o, i) {
0035237:           var u = r && r.prototype instanceof c ? r : c,
0035238:             s = Object.create(u.prototype);
0035239:           return (
0035240:             Eg(
0035241:               s,
0035242:               "_invoke",
0035243:               (function (n, r, o) {
0035244:                 var i,
0035245:                   c,
0035246:                   u,
0035247:                   s = 0,
0035248:                   l = o || [],
0035249:                   f = !1,
0035250:                   d = {
0035251:                     p: 0,
0035252:                     n: 0,
0035253:                     v: e,
0035254:                     a: p,
0035255:                     f: p.bind(e, 4),
0035256:                     d: function (t, n) {
0035257:                       return ((i = t), (c = 0), (u = e), (d.n = n), a);
0035258:                     },
0035259:                   };
0035260:                 function p(n, r) {
0035261:                   for (
0035262:                     c = n, u = r, t = 0;
0035263:                     !f && s && !o && t < l.length;
0035264:                     t++
0035265:                   ) {
0035266:                     var o,
0035267:                       i = l[t],
0035268:                       p = d.p,
0035269:                       y = i[2];
0035270:                     n > 3
0035271:                       ? (o = y === r) &&
0035272:                         ((u = i[(c = i[4]) ? 5 : ((c = 3), 3)]),
0035273:                         (i[4] = i[5] = e))
0035274:                       : i[0] <= p &&
0035275:                         ((o = n < 2 && p < i[1])
0035276:                           ? ((c = 0), (d.v = r), (d.n = i[1]))
0035277:                           : p < y &&
0035278:                             (o = n < 3 || i[0] > r || r > y) &&
0035279:                             ((i[4] = n), (i[5] = r), (d.n = y), (c = 0)));
0035280:                   }
0035281:                   if (o || n > 1) return a;
0035282:                   throw ((f = !0), r);
0035283:                 }
0035284:                 return function (o, l, y) {
0035285:                   if (s > 1) throw TypeError("Generator is already running");
0035286:                   for (
0035287:                     f && 1 === l && p(l, y), c = l, u = y;
0035288:                     (t = c < 2 ? e : u) || !f;
0035289: 
0035290:                   ) {
0035291:                     i ||
0035292:                       (c
0035293:                         ? c < 3
0035294:                           ? (c > 1 && (d.n = -1), p(c, u))
0035295:                           : (d.n = u)
0035296:                         : (d.v = u));
0035297:                     try {
0035298:                       if (((s = 2), i)) {
0035299:                         if ((c || (o = "next"), (t = i[o]))) {
0035300:                           if (!(t = t.call(i, u)))
0035301:                             throw TypeError("iterator result is not an object");
0035302:                           if (!t.done) return t;
0035303:                           ((u = t.value), c < 2 && (c = 0));
0035304:                         } else
0035305:                           (1 === c && (t = i.return) && t.call(i),
0035306:                             c < 2 &&
0035307:                               ((u = TypeError(
0035308:                                 "The iterator does not provide a '" +
0035309:                                   o +
0035310:                                   "' method",
0035311:                               )),
0035312:                               (c = 1)));
0035313:                         i = e;
0035314:                       } else if ((t = (f = d.n < 0) ? u : n.call(r, d)) !== a)
0035315:                         break;
0035316:                     } catch (t) {
0035317:                       ((i = e), (c = 1), (u = t));
0035318:                     } finally {
0035319:                       s = 1;
0035320:                     }
0035321:                   }
0035322:                   return { value: t, done: f };
0035323:                 };
0035324:               })(n, o, i),
0035325:               !0,
0035326:             ),
0035327:             s
0035328:           );
0035329:         }
0035330:         var a = {};
0035331:         function c() {}
0035332:         function u() {}
0035333:         function s() {}
0035334:         t = Object.getPrototypeOf;
0035335:         var l = [][r]
0035336:             ? t(t([][r]()))
0035337:             : (Eg((t = {}), r, function () {
0035338:                 return this;
0035339:               }),
0035340:               t),
0035341:           f = (s.prototype = c.prototype = Object.create(l));
0035342:         function d(e) {
0035343:           return (
0035344:             Object.setPrototypeOf
0035345:               ? Object.setPrototypeOf(e, s)
0035346:               : ((e.__proto__ = s), Eg(e, o, "GeneratorFunction")),
0035347:             (e.prototype = Object.create(f)),
0035348:             e
0035349:           );
0035350:         }
0035351:         return (
0035352:           (u.prototype = s),
0035353:           Eg(f, "constructor", s),
0035354:           Eg(s, "constructor", u),
0035355:           (u.displayName = "GeneratorFunction"),
0035356:           Eg(s, o, "GeneratorFunction"),
0035357:           Eg(f),
0035358:           Eg(f, o, "Generator"),
0035359:           Eg(f, r, function () {
0035360:             return this;
0035361:           }),
0035362:           Eg(f, "toString", function () {
0035363:             return "[object Generator]";
0035364:           }),
0035365:           (Ng = function () {
0035366:             return { w: i, m: d };
0035367:           })()
0035368:         );
0035369:       }
0035370:       function Eg(e, t, n, r) {
0035371:         var o = Object.defineProperty;
0035372:         try {
0035373:           o({}, "", {});
0035374:         } catch (e) {
0035375:           o = 0;
0035376:         }
0035377:         ((Eg = function (e, t, n, r) {
0035378:           function i(t, n) {
0035379:             Eg(e, t, function (e) {
0035380:               return this._invoke(t, n, e);
0035381:             });
0035382:           }
0035383:           t
0035384:             ? o
0035385:               ? o(e, t, {
0035386:                   value: n,
0035387:                   enumerable: !r,
0035388:                   configurable: !r,
0035389:                   writable: !r,
0035390:                 })
0035391:               : (e[t] = n)
0035392:             : (i("next", 0), i("throw", 1), i("return", 2));
0035393:         }),
0035394:           Eg(e, t, n, r));
0035395:       }
0035396:       function Og(e, t) {
0035397:         return (
0035398:           (function (e) {
0035399:             if (Array.isArray(e)) return e;
0035400:           })(e) ||
0035401:           (function (e, t) {
0035402:             var n =
0035403:               null == e
0035404:                 ? null
0035405:                 : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
0035406:                   e["@@iterator"];
0035407:             if (null != n) {
0035408:               var r,
0035409:                 o,
0035410:                 i,
0035411:                 a,
0035412:                 c = [],
0035413:                 u = !0,
0035414:                 s = !1;
0035415:               try {
0035416:                 if (((i = (n = n.call(e)).next), 0 === t)) {
0035417:                   if (Object(n) !== n) return;
0035418:                   u = !1;
0035419:                 } else
0035420:                   for (
0035421:                     ;
0035422:                     !(u = (r = i.call(n)).done) &&
0035423:                     (c.push(r.value), c.length !== t);
0035424:                     u = !0
0035425:                   );
0035426:               } catch (e) {
0035427:                 ((s = !0), (o = e));
0035428:               } finally {
0035429:                 try {
0035430:                   if (
0035431:                     !u &&
0035432:                     null != n.return &&
0035433:                     ((a = n.return()), Object(a) !== a)
0035434:                   )
0035435:                     return;
0035436:                 } finally {
0035437:                   if (s) throw o;
0035438:                 }
0035439:               }
0035440:               return c;
0035441:             }
0035442:           })(e, t) ||
0035443:           (function (e, t) {
0035444:             if (e) {
0035445:               if ("string" == typeof e) return Pg(e, t);
0035446:               var n = {}.toString.call(e).slice(8, -1);
0035447:               return (
0035448:                 "Object" === n && e.constructor && (n = e.constructor.name),
0035449:                 "Map" === n || "Set" === n
0035450:                   ? Array.from(e)
0035451:                   : "Arguments" === n ||
0035452:                       /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
0035453:                     ? Pg(e, t)
0035454:                     : void 0
0035455:               );
0035456:             }
0035457:           })(e, t) ||
0035458:           (function () {
0035459:             throw new TypeError(
0035460:               "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
0035461:             );
0035462:           })()
0035463:         );
0035464:       }
0035465:       function Pg(e, t) {
0035466:         (null == t || t > e.length) && (t = e.length);
0035467:         for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
0035468:         return r;
0035469:       }
0035470:       var Dg = function (e, t, n, r) {
0035471:           return new (n || (n = Promise))(function (o, i) {
0035472:             function a(e) {
0035473:               try {
0035474:                 u(r.next(e));
0035475:               } catch (e) {
0035476:                 i(e);
0035477:               }
0035478:             }
0035479:             function c(e) {
0035480:               try {
0035481:                 u(r.throw(e));
0035482:               } catch (e) {
0035483:                 i(e);
0035484:               }
0035485:             }
0035486:             function u(e) {
0035487:               var t;
0035488:               e.done
0035489:                 ? o(e.value)
0035490:                 : ((t = e.value),
0035491:                   t instanceof n
0035492:                     ? t
0035493:                     : new n(function (e) {
0035494:                         e(t);
0035495:                       })).then(a, c);
0035496:             }
0035497:             u((r = r.apply(e, t || [])).next());
0035498:           });
0035499:         },
0035500:         xg = B.parse(window.location.search).asin,
0035501:         Lg = function () {
0035502:           var e = Og((0, r.useState)({ open: !1 }), 2),
0035503:             t = e[0],
0035504:             n = e[1],
0035505:             i = Og((0, r.useState)(!1), 2),
0035506:             a = i[0],
0035507:             c = i[1],
0035508:             u = Og((0, r.useState)(!1), 2),
0035509:             l = u[0],
0035510:             f = u[1],
0035511:             d = Og((0, r.useState)(!0), 2),
0035512:             p = d[0],
0035513:             y = d[1],
0035514:             g = Og((0, r.useState)(null), 2),
0035515:             v = g[0],
0035516:             m = g[1],
0035517:             b = ur(),
0035518:             h = b.readerSettings,
0035519:             I = b.updateReaderSettings,
0035520:             w = On().aaMenuOptions,
0035521:             S = Pu(),
0035522:             M = S.readerState,
0035523:             A = S.updateReaderState,
0035524:             C = oo(),
0035525:             T = mr().readingSession,
0035526:             j = yi(),
0035527:             k = Cn(),
0035528:             N = (0, s.useMetrics)(),
0035529:             E = Og((0, r.useState)(), 2),
0035530:             O = E[0],
0035531:             P = E[1],
0035532:             D = Og((0, r.useState)(!1), 2),
0035533:             x = D[0],
0035534:             L = D[1],
0035535:             R = Og((0, r.useState)(!0), 2),
0035536:             G = R[0],
0035537:             B = R[1],
0035538:             Z = Fn(),
0035539:             W = Og((0, r.useState)("key"), 2),
0035540:             Y = W[0],
0035541:             H = W[1],
0035542:             V = _n("BOOKS_KFW_LITB_DEPRECATION_1174376", !1),
0035543:             Q = void 0 === V || "T1" === V || F(),
0035544:             J = 1 === w.supportedColorThemes.length ? "White" : h.colorTheme,
0035545:             K =
0035546:               (null === kfwClientFeatures || void 0 === kfwClientFeatures
0035547:                 ? void 0
0035548:                 : kfwClientFeatures.isIOSFullscreenEnabled) || !(0, Tt.isIOS)(),
0035549:             X = (0, r.useRef)(p),
0035550:             q = (0, r.useCallback)(function (e) {
0035551:               (y(e), (X.current = e));
0035552:             }, []);
0035553:           (0, r.useEffect)(
0035554:             function () {
0035555:               ee("Dark" === J);
0035556:             },
0035557:             [J],
0035558:           );
0035559:           var ee = function (e) {
0035560:               document.body.classList.toggle("dark", e);
0035561:             },
0035562:             te = (0, r.useCallback)(function (e, t) {
0035563:               var n =
0035564:                 Tt.BACKGROUND_THEME_MAP[
0035565:                   null !== t && void 0 !== t ? t : "White"
0035566:                 ];
0035567:               document.body.style.background = n;
0035568:               var r = document.querySelector('meta[name="theme-color"]');
0035569:               r &&
0035570:                 (e && void 0 !== t && "White" !== t
0035571:                   ? r.setAttribute("content", n)
0035572:                   : r.setAttribute("content", "#FFFFFE"));
0035573:             }, []);
0035574:           ((0, r.useEffect)(
0035575:             function () {
0035576:               K
0035577:                 ? (document.body.classList.add("kr-fullpage-body"),
0035578:                   document.documentElement.classList.add(
0035579:                     "kr-fullpage-document",
0035580:                   ),
0035581:                   (0, s.preventOverscroll)(document.getElementById("root")))
0035582:                 : (document.body.classList.remove("kr-fullpage-body"),
0035583:                   document.documentElement.classList.remove(
0035584:                     "kr-fullpage-document",
0035585:                   ),
0035586:                   (0, s.enableOverscroll)(document.getElementById("root")));
0035587:             },
0035588:             [K],
0035589:           ),
0035590:             (0, r.useEffect)(
0035591:               function () {
0035592:                 te(p, J);
0035593:               },
0035594:               [p, J, w, te],
0035595:             ));
0035596:           var ne = (0, r.useMemo)(function () {
0035597:               return function () {
0035598:                 var e = _(),
0035599:                   t = U(),
0035600:                   n = (0, o.getPlatforms)(),
0035601:                   r = z(),
0035602:                   i = window.innerWidth,
0035603:                   a = window.visualViewport.scale,
0035604:                   c = window.devicePixelRatio;
0035605:                 console.info(
