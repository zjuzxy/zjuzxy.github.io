/**
 * 手机号加密版
 * 浙江 双指向 集团手机号加密
 * Created by udbac on 2018/12/18.（）
 */
function v2o(v) {
    var o = {};
    v.forEach(function (i) {
        o[i] = true;
    });
    return o;
};
var parseDomain = function (str) {
    if (!str) return '';
    if (str.indexOf('://') != -1) str = str.substr(str.indexOf('://') + 3);
    var topLevel = ['com', 'net', 'org', 'gov', 'edu', 'mil', 'biz', 'name', 'info', 'mobi', 'pro', 'travel', 'museum',
            'int', 'areo', 'post', 'rec'];
    var domains = str.split('.');
    if (domains.length <= 1) return str;
    if (!isNaN(domains[domains.length - 1])) return str;
    var i = 0;
    while (i < topLevel.length && topLevel[i] != domains[domains.length - 1]) i++;
    if (i != topLevel.length) return domains[domains.length - 2] + '.' + domains[domains.length - 1];
    else {
        i = 0;
        while (i < topLevel.length && topLevel[i] != domains[domains.length - 2]) i++;
        if (i == topLevel.length) return domains[domains.length - 2] + '.' + domains[domains.length - 1];
        else return domains[domains.length - 3] + '.' + domains[domains.length - 2] + '.' + domains[domains.length - 1];
    }
 
};
var thisUrl = window.location.hostname;
config = {
    fpc: "." + parseDomain(thisUrl),
    // 如sdc_server中各指向均未设定，则使用默认采集域名和dcsid
    domain: "sdc.10086.cn", // TODO: 默认采集服务域名
    dcsid: "dcsc151ac5xrhnxy5fn0r0eh1_5i1t", // TODO: 默认采集渠道dcsid
 
    /// 可以在sdc_server中，定义多指向采集。每个指向为一个回调函数，在函数中定义指向参数
    sdc_server: [
        /***
         * 插码采集指向设置回调函数
         * @param arg       当前页面的插码参数，如co_f、event、branch等
         * @param dcs       dcs采集参数
         * @returns {*[]}   如返回undefined，则不上报插码事件，否则根据返回的domain、dcsid、arg、dcs生成插码事件
         */
            function (arg, dcs) {
            // 第一指向为全量采集至省分公司
            if (webapp() == "app") {
                var dcsid = 'dsc8ybb94kyti5lydw2ihyedo_7p1m'; // TODO: 本指向一级App内嵌H5渠道dcsid，如"dcs00wzt05xrhnxangha82eh1_8y6s"(一级App内嵌H5)
            } else {
                var dcsid = "dsc8ybb94kyti5lydw2ihyedo_7p1m"; // TODO: 本指向非一级App内嵌H5渠道dcsid，如"dcs00wzt05xrhnxangha82eh1_8y6s"(非一级App内嵌H5)
            }
            var domain = "xwfx.zj.chinamobile.com", // TODO: 本指向采集服务域名，如"service.tj.10086.cn:7070"
                branch = "ZheJiang_YXHD"; // TODO: 本指向非一级App内嵌H5渠道的WT.branch参数
            var mobile = getMobile();
            if (is_mobile(mobile)) {
                mobile = encode_mobile(mobile);
            } else if (is_mobile(decode_mobile(mobile))) {
                mobile = mobile;
            } else {
                mobile = "";
            }
            if (!mobile && arg["mobile"]) {
                if (is_mobile(arg["mobile"])) {
                    mobile = encode_mobile(arg["mobile"]);
                } else if (is_mobile(decode_mobile(arg["mobile"]))) {
                    mobile = arg["mobile"];
                } else { //防止手机号值为0的情况
                    mobile = "";
                }
            }
            arg["mobile"] = mobile || arg["mobile"];
            arg["branch"] = branch || arg["branch"];
            return [domain, dcsid, arg, dcs];
        },
 
        function (arg, dcs) {
            // 关键业务采集至移动集团，如不需采集，删除本函数即可
            if (webapp() == "app") {
                var dcsid = 'dcsc151ac5xrhnxy5fn0r0eh1_5i1t'; // TODO: 第二指向为集团关键业务渠道dcsid，如"dcs82nyx0ejgi9sdmoauh2n3e_8d2t"(一级App内嵌H5)
            } else {
                var dcsid = 'dcsc151ac5xrhnxy5fn0r0eh1_5i1t'; // TODO: 第二指向为集团关键业务渠道dcsid，如"dcs82nyx0ejgi9sdmoauh2n3e_8d2t"(非一级App内嵌H5)
            }
            var domain = "sdc.10086.cn", // TODO: 第二指向为集团关键业务，如"sdc.10086.cn"
                dcsid = 'dcsc151ac5xrhnxy5fn0r0eh1_5i1t', // TODO: 第二指向为集团关键业务渠道dcsid，如"dcs82nyx0ejgi9sdmoauh2n3e_8d2t"
                g_sin = v2o(['PPHZ', 'CB_SJZFJF', 'CB_MMFW', 'IQ_BALANCE', 'CB_YHKJF', 'CB_PPHZ', 'CB_HMYY',
                        'IQ_GPRSLLCX', 'CB_TK', 'CB_SJYWTYCXTD%253BIQ_YDZSPYWCX', 'CB_DFTH%253BHYDH', 'CB_LLJYB',
                        'CB_HJXZ_HR', 'CB_HJXZ_HC', 'IQ_YHKCZ', 'IQ_YCZ', 'IQ_SJZFZHJF', 'IQ_YZDCX', 'IQ_YXDCX',
                        'IQ_SSXDCX', 'IQ_DQHFZECX', 'IQ_JFLSCX', 'IQ_KHXYGNCX', 'IQ_PUKMCX', 'IQ_TCYLCX', 'CB_LDTX',
                        'CB_ZJXS', 'CB_TGAJGJCT', 'CB_TGAJGJMY', 'CB_KH', 'CB_TJ', 'CB_KJ', 'IQ_YZDCX%253BDQHFZECX',
                        'IQ_YXDCX%253BSSXDCX', 'IQ_JFCX', 'IQ_YHKJF', 'CB_JTJH', 'CB_HJZY', 'IQ_ZHYECX', 'CB_HJDD',
                        'CB_YYXX', 'IQ_CZKJF', 'CB_GPRS', 'CB_YHGJ', 'IQ_YHGJ', 'CB_YHKJF', 'CB_YCZ', 'CB_YLKCZ',
                        'CB_CZKJF', 'CB_JFDH', 'CB_4GZXTC', 'CB_4GLLJYB', 'CB_4GFXTC', 'CB_4GLLYB', 'CB_LLAXB',
                        'CB_HJZY', 'IQ_YKTTCCX', 'IQ_GRZLCX', 'IQ_DZFPCX']);
            var n = arg["si_n"];
            /* if (n != undefined && g_sin[n] != undefined) { */
                var branch = "571"; // TODO: 本指向的WT.branch参数
 
                arg["branch"] = undefined || arg["branch"];
                return [domain, dcsid, arg, dcs];
           /*  } */
        },
 
        function (arg, dcs) {
            // 本省自有App采集指向样例，通过UA中的关键字「iDontKnown」判定是否为自有App
            if (navigator.userAgent.indexOf('iDontKnown') > -1) {
                var domain = "http://ido.68001.com",
                    dcsid = "dcs8idontknown22222222222_3333";
                return [domain, dcsid, arg, dcs];
            }
        }
    ],
    cooltag: [
 
        function () {
            return undefined
        },
 
        function () {
            return undefined
        },
    ],
};
if (typeof jQuery == 'undefined') {
    ! function (a, b) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function (
            a) {
            if (!a.document) throw new Error("jQuery requires a window with a document");
            return b(a)
        } : b(a)
    }("undefined" != typeof window ? window : this, function (a, b) {
        var c = [],
            d = c.slice,
            e = c.concat,
            f = c.push,
            g = c.indexOf,
            h = {}, i = h.toString,
            j = h.hasOwnProperty,
            k = {}, l = "1.11.3",
            m = function (a, b) {
                return new m.fn.init(a, b)
            }, n = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            o = /^-ms-/,
            p = /-([\da-z])/gi,
            q = function (a, b) {
                return b.toUpperCase()
            };
        m.fn = m.prototype = {
            jquery: l,
            constructor: m,
            selector: "",
            length: 0,
            toArray: function () {
                return d.call(this)
            },
            get: function (a) {
                return null != a ? 0 > a ? this[a + this.length] : this[a] : d.call(this)
            },
            pushStack: function (a) {
                var b = m.merge(this.constructor(), a);
                return b.prevObject = this, b.context = this.context, b
            },
            each: function (a, b) {
                return m.each(this, a, b)
            },
            map: function (a) {
                return this.pushStack(m.map(this, function (b, c) {
                    return a.call(b, c, b)
                }))
            },
            slice: function () {
                return this.pushStack(d.apply(this, arguments))
            },
            first: function () {
                return this.eq(0)
            },
            last: function () {
                return this.eq(-1)
            },
            eq: function (a) {
                var b = this.length,
                    c = +a + (0 > a ? b : 0);
                return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
            },
            end: function () {
                return this.prevObject || this.constructor(null)
            },
            push: f,
            sort: c.sort,
            splice: c.splice
        }, m.extend = m.fn.extend = function () {
            var a, b, c, d, e, f, g = arguments[0] || {}, h = 1,
                i = arguments.length,
                j = !1;
            for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || m.isFunction(g) ||
                (g = {}), h === i && (g = this, h--); i > h; h++) if (null != (e = arguments[h])) for (d in e) a = g[d],
                            c = e[d], g !== c && (j && c && (m.isPlainObject(c) || (b = m.isArray(c))) ? (b ? (b = !1,
                            f = a && m.isArray(a) ? a : []) : f = a && m.isPlainObject(a) ? a : {}, g[d] = m.extend(j,
                            f, c)) : void 0 !== c && (g[d] = c));
            return g
        }, m.extend({
            expando: "jQuery" + (l + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function (a) {
                throw new Error(a)
            },
            noop: function () {},
            isFunction: function (a) {
                return "function" === m.type(a)
            },
            isArray: Array.isArray || function (a) {
                return "array" === m.type(a)
            },
            isWindow: function (a) {
                return null != a && a == a.window
            },
            isNumeric: function (a) {
                return !m.isArray(a) && a - parseFloat(a) + 1 >= 0
            },
            isEmptyObject: function (a) {
                var b;
                for (b in a) return !1;
                return !0
            },
            isPlainObject: function (a) {
                var b;
                if (!a || "object" !== m.type(a) || a.nodeType || m.isWindow(a)) return !1;
                try {
                    if (a.constructor && !j.call(a, "constructor") && !j.call(a.constructor.prototype, "isPrototypeOf"))
                        return !1
                } catch (c) {
                    return !1
                }
                if (k.ownLast) for (b in a) return j.call(a, b);
                for (b in a);
                return void 0 === b || j.call(a, b)
            },
            type: function (a) {
                return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? h[i.call(a)] || "object" :
                    typeof a
            },
            globalEval: function (b) {
                b && m.trim(b) && (a.execScript || function (b) {
                    a.eval.call(a, b)
                })(b)
            },
            camelCase: function (a) {
                return a.replace(o, "ms-").replace(p, q)
            },
            nodeName: function (a, b) {
                return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
            },
            each: function (a, b, c) {
                var d, e = 0,
                    f = a.length,
                    g = r(a);
                if (c) {
                    if (g) {
                        for (; f > e; e++) if (d = b.apply(a[e], c), d === !1) break
                    } else for (e in a) if (d = b.apply(a[e], c), d === !1) break
                } else if (g) {
                    for (; f > e; e++) if (d = b.call(a[e], e, a[e]), d === !1) break
                } else for (e in a) if (d = b.call(a[e], e, a[e]), d === !1) break; return a
            },
            trim: function (a) {
                return null == a ? "" : (a + "").replace(n, "")
            },
            makeArray: function (a, b) {
                var c = b || [];
                return null != a && (r(Object(a)) ? m.merge(c, "string" == typeof a ? [a] : a) : f.call(c, a)), c
            },
            inArray: function (a, b, c) {
                var d;
                if (b) {
                    if (g) return g.call(b, a, c);
                    for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++) if (c in b && b[c] === a)
                            return c
                }
                return -1
            },
            merge: function (a, b) {
                var c = +b.length,
                    d = 0,
                    e = a.length;
                while (c > d) a[e++] = b[d++];
                if (c !== c) while (void 0 !== b[d]) a[e++] = b[d++];
                return a.length = e, a
            },
            grep: function (a, b, c) {
                for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
                return e
            },
            map: function (a, b, c) {
                var d, f = 0,
                    g = a.length,
                    h = r(a),
                    i = [];
                if (h) for (; g > f; f++) d = b(a[f], f, c), null != d && i.push(d);
                else for (f in a) d = b(a[f], f, c), null != d && i.push(d);
                return e.apply([], i)
            },
            guid: 1,
            proxy: function (a, b) {
                var c, e, f;
                return "string" == typeof b && (f = a[b], b = a, a = f), m.isFunction(a) ? (c = d.call(arguments, 2), e = function () {
                    return a.apply(b || this, c.concat(d.call(arguments)))
                }, e.guid = a.guid = a.guid || m.guid++, e) : void 0
            },
            now: function () {
                return +new Date
            },
            support: k
        }), m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (a, b) {
            h["[object " + b + "]"] = b.toLowerCase()
        });
 
        function r(a) {
            var b = "length" in a && a.length,
                c = m.type(a);
            return "function" === c || m.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b ||
                "number" == typeof b && b > 0 && b - 1 in a
        }
        var s = function (a) {
            var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = "sizzle" + 1 * new Date,
                v = a.document,
                w = 0,
                x = 0,
                y = ha(),
                z = ha(),
                A = ha(),
                B = function (a, b) {
                    return a === b && (l = !0), 0
                }, C = 1 << 31,
                D = {}.hasOwnProperty,
                E = [],
                F = E.pop,
                G = E.push,
                H = E.push,
                I = E.slice,
                J = function (a, b) {
                    for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
                    return -1
                }, K =
                    "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                L = "[\\x20\\t\\r\\n\\f]",
                M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                N = M.replace("w", "w#"),
                O = "\\[" + L + "*(" + M + ")(?:" + L + "*([*^$|!~]?=)" + L +
                    "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + N + "))|)" + L + "*\\]",
                P = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
                    O + ")*)|.*)\\)|)",
                Q = new RegExp(L + "+", "g"),
                R = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g"),
                S = new RegExp("^" + L + "*," + L + "*"),
                T = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
                U = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]", "g"),
                V = new RegExp(P),
                W = new RegExp("^" + N + "$"),
                X = {
                    ID: new RegExp("^#(" + M + ")"),
                    CLASS: new RegExp("^\\.(" + M + ")"),
                    TAG: new RegExp("^(" + M.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + O),
                    PSEUDO: new RegExp("^" + P),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + L +
                        "*(even|odd|(([+-]|)(\\d*)n|)" + L + "*(?:([+-]|)" + L + "*(\\d+)|))" + L + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + K + ")$", "i"),
                    needsContext: new RegExp("^" + L + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + L +
                        "*((?:-\\d)?\\d*)" + L + "*\\)|)(?=[^-]|$)", "i")
                }, Y = /^(?:input|select|textarea|button)$/i,
                Z = /^h\d$/i,
                $ = /^[^{]+\{\s*\[native \w/,
                _ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                aa = /[+~]/,
                ba = /'|\\/g,
                ca = new RegExp("\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)", "ig"),
                da = function (a, b, c) {
                    var d = "0x" + b - 65536;
                    return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 |
                        55296, 1023 & d | 56320)
                }, ea = function () {
                    m()
                };
            try {
                H.apply(E = I.call(v.childNodes), v.childNodes), E[v.childNodes.length].nodeType
            } catch (fa) {
                H = {
                    apply: E.length ? function (a, b) {
                        G.apply(a, I.call(b))
                    } : function (a, b) {
                        var c = a.length,
                            d = 0;
                        while (a[c++] = b[d++]);
                        a.length = c - 1
                    }
                }
            }
            function ga(a, b, d, e) {
                var f, h, j, k, l, o, r, s, w, x;
                if ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, d = d || [], k = b.nodeType, "string" !=
                    typeof a || !a || 1 !== k && 9 !== k && 11 !== k) return d;
                if (!e && p) {
                    if (11 !== k && (f = _.exec(a))) if (j = f[1]) {
                            if (9 === k) {
                                if (h = b.getElementById(j), !h || !h.parentNode) return d;
                                if (h.id === j) return d.push(h), d
                            } else if (b.ownerDocument && (h = b.ownerDocument.getElementById(j)) && t(b, h) && h.id ===
                                j) return d.push(h), d
                        } else {
                            if (f[2]) return H.apply(d, b.getElementsByTagName(a)), d;
                            if ((j = f[3]) && c.getElementsByClassName) return H.apply(d, b.getElementsByClassName(j)),
                                    d
                        }
                    if (c.qsa && (!q || !q.test(a))) {
                        if (s = r = u, w = b, x = 1 !== k && a, 1 === k && "object" !== b.nodeName.toLowerCase()) {
                            o = g(a), (r = b.getAttribute("id")) ? s = r.replace(ba, "\\$&") : b.setAttribute("id", s),
                                s = "[id='" + s + "'] ", l = o.length;
                            while (l--) o[l] = s + ra(o[l]);
                            w = aa.test(a) && pa(b.parentNode) || b, x = o.join(",")
                        }
                        if (x) try {
                                return H.apply(d, w.querySelectorAll(x)), d
                        } catch (y) {} finally {
                            r || b.removeAttribute("id")
                        }
                    }
                }
                return i(a.replace(R, "$1"), b, d, e)
            }
            function ha() {
                var a = [];
 
                function b(c, e) {
                    return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e
                }
                return b
            }
            function ia(a) {
                return a[u] = !0, a
            }
            function ja(a) {
                var b = n.createElement("div");
                try {
                    return !!a(b)
                } catch (c) {
                    return !1
                } finally {
                    b.parentNode && b.parentNode.removeChild(b), b = null
                }
            }
            function ka(a, b) {
                var c = a.split("|"),
                    e = a.length;
                while (e--) d.attrHandle[c[e]] = b
            }
            function la(a, b) {
                var c = b && a,
                    d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || C) - (~a.sourceIndex || C);
                if (d) return d;
                if (c) while (c = c.nextSibling) if (c === b) return -1;
                return a ? 1 : -1
            }
            function ma(a) {
                return function (b) {
                    var c = b.nodeName.toLowerCase();
                    return "input" === c && b.type === a
                }
            }
            function na(a) {
                return function (b) {
                    var c = b.nodeName.toLowerCase();
                    return ("input" === c || "button" === c) && b.type === a
                }
            }
            function oa(a) {
                return ia(function (b) {
                    return b = +b, ia(function (c, d) {
                        var e, f = a([], c.length, b),
                            g = f.length;
                        while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                    })
                })
            }
            function pa(a) {
                return a && "undefined" != typeof a.getElementsByTagName && a
            }
            c = ga.support = {}, f = ga.isXML = function (a) {
                var b = a && (a.ownerDocument || a).documentElement;
                return b ? "HTML" !== b.nodeName : !1
            }, m = ga.setDocument = function (a) {
                var b, e, g = a ? a.ownerDocument || a : v;
                return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = g.documentElement, e = g.defaultView,
                    e && e !== e.top && (e.addEventListener ? e.addEventListener("unload", ea, !1) : e.attachEvent && e
                    .attachEvent("onunload", ea)), p = !f(g), c.attributes = ja(function (a) {
                    return a.className = "i", !a.getAttribute("className")
                }), c.getElementsByTagName = ja(function (a) {
                    return a.appendChild(g.createComment("")), !a.getElementsByTagName("*").length
                }), c.getElementsByClassName = $.test(g.getElementsByClassName), c.getById = ja(function (a) {
                    return o.appendChild(a).id = u, !g.getElementsByName || !g.getElementsByName(u).length
                }), c.getById ? (d.find.ID = function (a, b) {
                    if ("undefined" != typeof b.getElementById && p) {
                        var c = b.getElementById(a);
                        return c && c.parentNode ? [c] : []
                    }
                }, d.filter.ID = function (a) {
                    var b = a.replace(ca, da);
                    return function (a) {
                        return a.getAttribute("id") === b
                    }
                }) : (delete d.find.ID, d.filter.ID = function (a) {
                    var b = a.replace(ca, da);
                    return function (a) {
                        var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                        return c && c.value === b
                    }
                }), d.find.TAG = c.getElementsByTagName ? function (a, b) {
                    return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(
                        a) : void 0
                } : function (a, b) {
                    var c, d = [],
                        e = 0,
                        f = b.getElementsByTagName(a);
                    if ("*" === a) {
                        while (c = f[e++]) 1 === c.nodeType && d.push(c);
                        return d
                    }
                    return f
                }, d.find.CLASS = c.getElementsByClassName && function (a, b) {
                    return p ? b.getElementsByClassName(a) : void 0
                }, r = [], q = [], (c.qsa = $.test(g.querySelectorAll)) && (ja(function (a) {
                    o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u +
                        "-\f]' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll(
                        "[msallowcapture^='']").length && q.push("[*^$]=" + L + "*(?:''|\"\")"), a.querySelectorAll(
                        "[selected]").length || q.push("\\[" + L + "*(?:value|" + K + ")"), a.querySelectorAll("[id~=" +
                        u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"),
                        a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]")
                }), ja(function (a) {
                    var b = g.createElement("input");
                    b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll(
                        "[name=d]").length && q.push("name" + L + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length ||
                        q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:")
                })), (c.matchesSelector = $.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector ||
                    o.msMatchesSelector)) && ja(function (a) {
                    c.disconnectedMatch = s.call(a, "div"), s.call(a, "[s!='']:x"), r.push("!=", P)
                }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = $.test(o.compareDocumentPosition),
                    t = b || $.test(o.contains) ? function (a, b) {
                    var c = 9 === a.nodeType ? a.documentElement : a,
                        d = b && b.parentNode;
                    return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition &&
                        16 & a.compareDocumentPosition(d)))
                } : function (a, b) {
                    if (b) while (b = b.parentNode) if (b === a) return !0;
                    return !1
                }, B = b ? function (a, b) {
                    if (a === b) return l = !0, 0;
                    var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                    return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) :
                        1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === g || a.ownerDocument ===
                        v && t(v, a) ? -1 : b === g || b.ownerDocument === v && t(v, b) ? 1 : k ? J(k, a) - J(k, b) : 0 :
                        4 & d ? -1 : 1)
                } : function (a, b) {
                    if (a === b) return l = !0, 0;
                    var c, d = 0,
                        e = a.parentNode,
                        f = b.parentNode,
                        h = [a],
                        i = [b];
                    if (!e || !f) return a === g ? -1 : b === g ? 1 : e ? -1 : f ? 1 : k ? J(k, a) - J(k, b) : 0;
                    if (e === f) return la(a, b);
                    c = a;
                    while (c = c.parentNode) h.unshift(c);
                    c = b;
                    while (c = c.parentNode) i.unshift(c);
                    while (h[d] === i[d]) d++;
                    return d ? la(h[d], i[d]) : h[d] === v ? -1 : i[d] === v ? 1 : 0
                }, g) : n
            }, ga.matches = function (a, b) {
                return ga(a, null, null, b)
            }, ga.matchesSelector = function (a, b) {
                if ((a.ownerDocument || a) !== n && m(a), b = b.replace(U, "='$1']"), !(!c.matchesSelector || !p || r &&
                    r.test(b) || q && q.test(b))) try {
                        var d = s.call(a, b);
                        if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
                } catch (e) {}
                return ga(b, n, null, [a]).length > 0
            }, ga.contains = function (a, b) {
                return (a.ownerDocument || a) !== n && m(a), t(a, b)
            }, ga.attr = function (a, b) {
                (a.ownerDocument || a) !== n && m(a);
                var e = d.attrHandle[b.toLowerCase()],
                    f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
                return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ?
                    f.value : null
            }, ga.error = function (a) {
                throw new Error("Syntax error, unrecognized expression: " + a)
            }, ga.uniqueSort = function (a) {
                var b, d = [],
                    e = 0,
                    f = 0;
                if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
                    while (b = a[f++]) b === a[f] && (e = d.push(f));
                    while (e--) a.splice(d[e], 1)
                }
                return k = null, a
            }, e = ga.getText = function (a) {
                var b, c = "",
                    d = 0,
                    f = a.nodeType;
                if (f) {
                    if (1 === f || 9 === f || 11 === f) {
                        if ("string" == typeof a.textContent) return a.textContent;
                        for (a = a.firstChild; a; a = a.nextSibling) c += e(a)
                    } else if (3 === f || 4 === f) return a.nodeValue
                } else while (b = a[d++]) c += e(b);
                return c
            }, d = ga.selectors = {
                cacheLength: 50,
                createPseudo: ia,
                match: X,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function (a) {
                        return a[1] = a[1].replace(ca, da), a[3] = (a[3] || a[4] || a[5] || "").replace(ca, da), "~=" ===
                            a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                    },
                    CHILD: function (a) {
                        return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || ga.error(a[0]), a[4] = +
                            (a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] ||
                            "odd" === a[3])) : a[3] && ga.error(a[0]), a
                    },
                    PSEUDO: function (a) {
                        var b, c = !a[6] && a[2];
                        return X.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && V.test(c) && (b = g(
                            c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] =
                            c.slice(0, b)), a.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function (a) {
                        var b = a.replace(ca, da).toLowerCase();
                        return "*" === a ? function () {
                            return !0
                        } : function (a) {
                            return a.nodeName && a.nodeName.toLowerCase() === b
                        }
                    },
                    CLASS: function (a) {
                        var b = y[a + " "];
                        return b || (b = new RegExp("(^|" + L + ")" + a + "(" + L + "|$)")) && y(a, function (a) {
                            return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute &&
                                a.getAttribute("class") || "")
                        })
                    },
                    ATTR: function (a, b, c) {
                        return function (d) {
                            var e = ga.attr(d, a);
                            return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c :
                                "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ?
                                c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(Q, " ") + " ").indexOf(c) > -
                                1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0
                        }
                    },
                    CHILD: function (a, b, c, d, e) {
                        var f = "nth" !== a.slice(0, 3),
                            g = "last" !== a.slice(-4),
                            h = "of-type" === b;
                        return 1 === d && 0 === e ? function (a) {
                            return !!a.parentNode
                        } : function (b, c, i) {
                            var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                                q = b.parentNode,
                                r = h && b.nodeName.toLowerCase(),
                                s = !i && !h;
                            if (q) {
                                if (f) {
                                    while (p) {
                                        l = b;
                                        while (l = l[p]) if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType)
                                                return !1;
                                        o = p = "only" === a && !o && "nextSibling"
                                    }
                                    return !0
                                }
                                if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                    k = q[u] || (q[u] = {}), j = k[a] || [], n = j[0] === w && j[1], m = j[0] === w &&
                                        j[2], l = n && q.childNodes[n];
                                    while (l = ++n && l && l[p] || (m = n = 0) || o.pop()) if (1 === l.nodeType && ++m &&
                                            l === b) {
                                            k[a] = [w, n, m];
                                            break
                                        }
                                } else if (s && (j = (b[u] || (b[u] = {}))[a]) && j[0] === w) m = j[1];
                                else while (l = ++n && l && l[p] || (m = n = 0) || o.pop()) if ((h ? l.nodeName.toLowerCase() ===
                                            r : 1 === l.nodeType) && ++m && (s && ((l[u] || (l[u] = {}))[a] = [w, m]),
                                            l === b)) break; return m -= e, m === d || m % d === 0 && m / d >= 0
                            }
                        }
                    },
                    PSEUDO: function (a, b) {
                        var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || ga.error("unsupported pseudo: " + a);
                        return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ?
                            ia(function (a, c) {
                            var d, f = e(a, b),
                                g = f.length;
                            while (g--) d = J(a, f[g]), a[d] = !(c[d] = f[g])
                        }) : function (a) {
                            return e(a, 0, c)
                        }) : e
                    }
                },
                pseudos: {
                    not: ia(function (a) {
                        var b = [],
                            c = [],
                            d = h(a.replace(R, "$1"));
                        return d[u] ? ia(function (a, b, c, e) {
                            var f, g = d(a, null, e, []),
                                h = a.length;
                            while (h--)(f = g[h]) && (a[h] = !(b[h] = f))
                        }) : function (a, e, f) {
                            return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop()
                        }
                    }),
                    has: ia(function (a) {
                        return function (b) {
                            return ga(a, b).length > 0
                        }
                    }),
                    contains: ia(function (a) {
                        return a = a.replace(ca, da),
                        function (b) {
                            return (b.textContent || b.innerText || e(b)).indexOf(a) > -1
                        }
                    }),
                    lang: ia(function (a) {
                        return W.test(a || "") || ga.error("unsupported lang: " + a), a = a.replace(ca, da).toLowerCase(),
                        function (b) {
                            var c;
                            do if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(),
                                        c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                            return !1
                        }
                    }),
                    target: function (b) {
                        var c = a.location && a.location.hash;
                        return c && c.slice(1) === b.id
                    },
                    root: function (a) {
                        return a === o
                    },
                    focus: function (a) {
                        return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !! (a.type || a.href || ~a.tabIndex)
                    },
                    enabled: function (a) {
                        return a.disabled === !1
                    },
                    disabled: function (a) {
                        return a.disabled === !0
                    },
                    checked: function (a) {
                        var b = a.nodeName.toLowerCase();
                        return "input" === b && !! a.checked || "option" === b && !! a.selected
                    },
                    selected: function (a) {
                        return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                    },
                    empty: function (a) {
                        for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function (a) {
                        return !d.pseudos.empty(a)
                    },
                    header: function (a) {
                        return Z.test(a.nodeName)
                    },
                    input: function (a) {
                        return Y.test(a.nodeName)
                    },
                    button: function (a) {
                        var b = a.nodeName.toLowerCase();
                        return "input" === b && "button" === a.type || "button" === b
                    },
                    text: function (a) {
                        var b;
                        return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute(
                            "type")) || "text" === b.toLowerCase())
                    },
                    first: oa(function () {
                        return [0]
                    }),
                    last: oa(function (a, b) {
                        return [b - 1]
                    }),
                    eq: oa(function (a, b, c) {
                        return [0 > c ? c + b : c]
                    }),
                    even: oa(function (a, b) {
                        for (var c = 0; b > c; c += 2) a.push(c);
                        return a
                    }),
                    odd: oa(function (a, b) {
                        for (var c = 1; b > c; c += 2) a.push(c);
                        return a
                    }),
                    lt: oa(function (a, b, c) {
                        for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
                        return a
                    }),
                    gt: oa(function (a, b, c) {
                        for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
                        return a
                    })
                }
            }, d.pseudos.nth = d.pseudos.eq;
            for (b in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) d.pseudos[b] = ma(b);
            for (b in {
                submit: !0,
                reset: !0
            }) d.pseudos[b] = na(b);
 
            function qa() {}
            qa.prototype = d.filters = d.pseudos, d.setFilters = new qa, g = ga.tokenize = function (a, b) {
                var c, e, f, g, h, i, j, k = z[a + " "];
                if (k) return b ? 0 : k.slice(0);
                h = a, i = [], j = d.preFilter;
                while (h) {
                    (!c || (e = S.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = T.exec(
                        h)) && (c = e.shift(), f.push({
                        value: c,
                        type: e[0].replace(R, " ")
                    }), h = h.slice(c.length));
                    for (g in d.filter)!(e = X[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({
                        value: c,
                        type: g,
                        matches: e
                    }), h = h.slice(c.length));
                    if (!c) break
                }
                return b ? h.length : h ? ga.error(a) : z(a, i).slice(0)
            };
 
            function ra(a) {
                for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
                return d
            }
            function sa(a, b, c) {
                var d = b.dir,
                    e = c && "parentNode" === d,
                    f = x++;
                return b.first ? function (b, c, f) {
                    while (b = b[d]) if (1 === b.nodeType || e) return a(b, c, f)
                } : function (b, c, g) {
                    var h, i, j = [w, f];
                    if (g) {
                        while (b = b[d]) if ((1 === b.nodeType || e) && a(b, c, g)) return !0
                    } else while (b = b[d]) if (1 === b.nodeType || e) {
                                if (i = b[u] || (b[u] = {}), (h = i[d]) && h[0] === w && h[1] === f) return j[2] = h[2];
                                if (i[d] = j, j[2] = a(b, c, g)) return !0
                            }
                }
            }
            function ta(a) {
                return a.length > 1 ? function (b, c, d) {
                    var e = a.length;
                    while (e--) if (!a[e](b, c, d)) return !1;
                    return !0
                } : a[0]
            }
            function ua(a, b, c) {
                for (var d = 0, e = b.length; e > d; d++) ga(a, b[d], c);
                return c
            }
            function va(a, b, c, d, e) {
                for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) &&
                        (g.push(f), j && b.push(h));
                return g
            }
            function wa(a, b, c, d, e, f) {
                return d && !d[u] && (d = wa(d)), e && !e[u] && (e = wa(e, f)), ia(function (f, g, h, i) {
                    var j, k, l, m = [],
                        n = [],
                        o = g.length,
                        p = f || ua(b || "*", h.nodeType ? [h] : h, []),
                        q = !a || !f && b ? p : va(p, m, a, h, i),
                        r = c ? e || (f ? a : o || d) ? [] : g : q;
                    if (c && c(q, r, h, i), d) {
                        j = va(r, n), d(j, [], h, i), k = j.length;
                        while (k--)(l = j[k]) && (r[n[k]] = !(q[n[k]] = l))
                    }
                    if (f) {
                        if (e || a) {
                            if (e) {
                                j = [], k = r.length;
                                while (k--)(l = r[k]) && j.push(q[k] = l);
                                e(null, r = [], j, i)
                            }
                            k = r.length;
                            while (k--)(l = r[k]) && (j = e ? J(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l))
                        }
                    } else r = va(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : H.apply(g, r)
                })
            }
            function xa(a) {
                for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k =
                        sa(function (a) {
                        return a === b
                    }, h, !0), l = sa(function (a) {
                        return J(b, a) > -1
                    }, h, !0), m = [function (a, c, d) {
                            var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
                            return b = null, e
                        }]; f > i; i++) if (c = d.relative[a[i].type]) m = [sa(ta(m), c)];
                    else {
                        if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
                            for (e = ++i; f > e; e++) if (d.relative[a[e].type]) break;
                            return wa(i > 1 && ta(m), i > 1 && ra(a.slice(0, i - 1).concat({
                                value: " " === a[i - 2].type ? "*" : ""
                            })).replace(R, "$1"), c, e > i && xa(a.slice(i, e)), f > e && xa(a = a.slice(e)), f > e &&
                                ra(a))
                        }
                        m.push(c)
                    }
                return ta(m)
            }
            function ya(a, b) {
                var c = b.length > 0,
                    e = a.length > 0,
                    f = function (f, g, h, i, k) {
                        var l, m, o, p = 0,
                            q = "0",
                            r = f && [],
                            s = [],
                            t = j,
                            u = f || e && d.find.TAG("*", k),
                            v = w += null == t ? 1 : Math.random() || .1,
                            x = u.length;
                        for (k && (j = g !== n && g); q !== x && null != (l = u[q]); q++) {
                            if (e && l) {
                                m = 0;
                                while (o = a[m++]) if (o(l, g, h)) {
                                        i.push(l);
                                        break
                                    }
                                k && (w = v)
                            }
                            c && ((l = !o && l) && p--, f && r.push(l))
                        }
                        if (p += q, c && q !== p) {
                            m = 0;
                            while (o = b[m++]) o(r, s, g, h);
                            if (f) {
                                if (p > 0) while (q--) r[q] || s[q] || (s[q] = F.call(i));
                                s = va(s)
                            }
                            H.apply(i, s), k && !f && s.length > 0 && p + b.length > 1 && ga.uniqueSort(i)
                        }
                        return k && (w = v, j = t), r
                    };
                return c ? ia(f) : f
            }
            return h = ga.compile = function (a, b) {
                var c, d = [],
                    e = [],
                    f = A[a + " "];
                if (!f) {
                    b || (b = g(a)), c = b.length;
                    while (c--) f = xa(b[c]), f[u] ? d.push(f) : e.push(f);
                    f = A(a, ya(e, d)), f.selector = a
                }
                return f
            }, i = ga.select = function (a, b, e, f) {
                var i, j, k, l, m, n = "function" == typeof a && a,
                    o = !f && g(a = n.selector || a);
                if (e = e || [], 1 === o.length) {
                    if (j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType &&
                        p && d.relative[j[1].type]) {
                        if (b = (d.find.ID(k.matches[0].replace(ca, da), b) || [])[0], !b) return e;
                        n && (b = b.parentNode), a = a.slice(j.shift().value.length)
                    }
                    i = X.needsContext.test(a) ? 0 : j.length;
                    while (i--) {
                        if (k = j[i], d.relative[l = k.type]) break;
                        if ((m = d.find[l]) && (f = m(k.matches[0].replace(ca, da), aa.test(j[0].type) && pa(b.parentNode) ||
                            b))) {
                            if (j.splice(i, 1), a = f.length && ra(j), !a) return H.apply(e, f), e;
                            break
                        }
                    }
                }
                return (n || h(a, o))(f, b, !p, e, aa.test(a) && pa(b.parentNode) || b), e
            }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !! l, m(), c.sortDetached = ja(function (
                a) {
                return 1 & a.compareDocumentPosition(n.createElement("div"))
            }), ja(function (a) {
                return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
            }) || ka("type|href|height|width", function (a, b, c) {
                return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
            }), c.attributes && ja(function (a) {
                return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute(
                    "value")
            }) || ka("value", function (a, b, c) {
                return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
            }), ja(function (a) {
                return null == a.getAttribute("disabled")
            }) || ka(K, function (a, b, c) {
                var d;
                return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value :
                    null
            }), ga
        }(a);
        m.find = s, m.expr = s.selectors, m.expr[":"] = m.expr.pseudos, m.unique = s.uniqueSort, m.text = s.getText, m.isXMLDoc =
            s.isXML, m.contains = s.contains;
        var t = m.expr.match.needsContext,
            u = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            v = /^.[^:#\[\.,]*$/;
 
        function w(a, b, c) {
            if (m.isFunction(b)) return m.grep(a, function (a, d) {
                    return !!b.call(a, d, a) !== c
                });
            if (b.nodeType) return m.grep(a, function (a) {
                    return a === b !== c
                });
            if ("string" == typeof b) {
                if (v.test(b)) return m.filter(b, a, c);
                b = m.filter(b, a)
            }
            return m.grep(a, function (a) {
                return m.inArray(a, b) >= 0 !== c
            })
        }
        m.filter = function (a, b, c) {
            var d = b[0];
            return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? m.find.matchesSelector(d, a) ? [d] : [] :
                m.find.matches(a, m.grep(b, function (a) {
                return 1 === a.nodeType
            }))
        }, m.fn.extend({
            find: function (a) {
                var b, c = [],
                    d = this,
                    e = d.length;
                if ("string" != typeof a) return this.pushStack(m(a).filter(function () {
                        for (b = 0; e > b; b++) if (m.contains(d[b], this)) return !0
                    }));
                for (b = 0; e > b; b++) m.find(a, d[b], c);
                return c = this.pushStack(e > 1 ? m.unique(c) : c), c.selector = this.selector ? this.selector + " " +
                    a : a, c
            },
            filter: function (a) {
                return this.pushStack(w(this, a || [], !1))
            },
            not: function (a) {
                return this.pushStack(w(this, a || [], !0))
            },
            is: function (a) {
                return !!w(this, "string" == typeof a && t.test(a) ? m(a) : a || [], !1).length
            }
        });
        var x, y = a.document,
            z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            A = m.fn.init = function (a, b) {
                var c, d;
                if (!a) return this;
                if ("string" == typeof a) {
                    if (c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] :
                        z.exec(a), !c || !c[1] && b) return !b || b.jquery ? (b || x).find(a) : this.constructor(b).find(
                            a);
                    if (c[1]) {
                        if (b = b instanceof m ? b[0] : b, m.merge(this, m.parseHTML(c[1], b && b.nodeType ? b.ownerDocument ||
                            b : y, !0)), u.test(c[1]) && m.isPlainObject(b)) for (c in b) m.isFunction(this[c]) ? this[
                                    c](b[c]) : this.attr(c, b[c]);
                        return this
                    }
                    if (d = y.getElementById(c[2]), d && d.parentNode) {
                        if (d.id !== c[2]) return x.find(a);
                        this.length = 1, this[0] = d
                    }
                    return this.context = y, this.selector = a, this
                }
                return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : m.isFunction(a) ? "undefined" !=
                    typeof x.ready ? x.ready(a) : a(m) : (void 0 !== a.selector && (this.selector = a.selector, this.context =
                    a.context), m.makeArray(a, this))
            };
        A.prototype = m.fn, x = m(y);
        var B = /^(?:parents|prev(?:Until|All))/,
            C = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        m.extend({
            dir: function (a, b, c) {
                var d = [],
                    e = a[b];
                while (e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !m(e).is(c))) 1 === e.nodeType &&
                        d.push(e), e = e[b];
                return d
            },
            sibling: function (a, b) {
                for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
                return c
            }
        }), m.fn.extend({
            has: function (a) {
                var b, c = m(a, this),
                    d = c.length;
                return this.filter(function () {
                    for (b = 0; d > b; b++) if (m.contains(this, c[b])) return !0
                })
            },
            closest: function (a, b) {
                for (var c, d = 0, e = this.length, f = [], g = t.test(a) || "string" != typeof a ? m(a, b || this.context) :
                        0; e > d; d++) for (c = this[d]; c && c !== b; c = c.parentNode) if (c.nodeType < 11 && (g ? g.index(
                            c) > -1 : 1 === c.nodeType && m.find.matchesSelector(c, a))) {
                            f.push(c);
                            break
                        }
                return this.pushStack(f.length > 1 ? m.unique(f) : f)
            },
            index: function (a) {
                return a ? "string" == typeof a ? m.inArray(this[0], m(a)) : m.inArray(a.jquery ? a[0] : a, this) :
                    this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function (a, b) {
                return this.pushStack(m.unique(m.merge(this.get(), m(a, b))))
            },
            addBack: function (a) {
                return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
            }
        });
 
        function D(a, b) {
            do a = a[b]; while (a && 1 !== a.nodeType);
            return a
        }
        m.each({
            parent: function (a) {
                var b = a.parentNode;
                return b && 11 !== b.nodeType ? b : null
            },
            parents: function (a) {
                return m.dir(a, "parentNode")
            },
            parentsUntil: function (a, b, c) {
                return m.dir(a, "parentNode", c)
            },
            next: function (a) {
                return D(a, "nextSibling")
            },
            prev: function (a) {
                return D(a, "previousSibling")
            },
            nextAll: function (a) {
                return m.dir(a, "nextSibling")
            },
            prevAll: function (a) {
                return m.dir(a, "previousSibling")
            },
            nextUntil: function (a, b, c) {
                return m.dir(a, "nextSibling", c)
            },
            prevUntil: function (a, b, c) {
                return m.dir(a, "previousSibling", c)
            },
            siblings: function (a) {
                return m.sibling((a.parentNode || {}).firstChild, a)
            },
            children: function (a) {
                return m.sibling(a.firstChild)
            },
            contents: function (a) {
                return m.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : m.merge([], a.childNodes)
            }
        }, function (a, b) {
            m.fn[a] = function (c, d) {
                var e = m.map(this, b, c);
                return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = m.filter(d, e)), this.length >
                    1 && (C[a] || (e = m.unique(e)), B.test(a) && (e = e.reverse())), this.pushStack(e)
            }
        });
        var E = /\S+/g,
            F = {};
 
        function G(a) {
            var b = F[a] = {};
            return m.each(a.match(E) || [], function (a, c) {
                b[c] = !0
            }), b
        }
        m.Callbacks = function (a) {
            a = "string" == typeof a ? F[a] || G(a) : m.extend({}, a);
            var b, c, d, e, f, g, h = [],
                i = !a.once && [],
                j = function (l) {
                    for (c = a.memory && l, d = !0, f = g || 0, g = 0, e = h.length, b = !0; h && e > f; f++) if (h[f].apply(
                            l[0], l[1]) === !1 && a.stopOnFalse) {
                            c = !1;
                            break
                        }
                    b = !1, h && (i ? i.length && j(i.shift()) : c ? h = [] : k.disable())
                }, k = {
                    add: function () {
                        if (h) {
                            var d = h.length;
                            ! function f(b) {
                                m.each(b, function (b, c) {
                                    var d = m.type(c);
                                    "function" === d ? a.unique && k.has(c) || h.push(c) : c && c.length && "string" !==
                                        d && f(c)
                                })
                            }(arguments), b ? e = h.length : c && (g = d, j(c))
                        }
                        return this
                    },
                    remove: function () {
                        return h && m.each(arguments, function (a, c) {
                            var d;
                            while ((d = m.inArray(c, h, d)) > -1) h.splice(d, 1), b && (e >= d && e--, f >= d && f--)
                        }), this
                    },
                    has: function (a) {
                        return a ? m.inArray(a, h) > -1 : !(!h || !h.length)
                    },
                    empty: function () {
                        return h = [], e = 0, this
                    },
                    disable: function () {
                        return h = i = c = void 0, this
                    },
                    disabled: function () {
                        return !h
                    },
                    lock: function () {
                        return i = void 0, c || k.disable(), this
                    },
                    locked: function () {
                        return !i
                    },
                    fireWith: function (a, c) {
                        return !h || d && !i || (c = c || [], c = [a, c.slice ? c.slice() : c], b ? i.push(c) : j(c)),
                            this
                    },
                    fire: function () {
                        return k.fireWith(this, arguments), this
                    },
                    fired: function () {
                        return !!d
                    }
                };
            return k
        }, m.extend({
            Deferred: function (a) {
                var b = [["resolve", "done", m.Callbacks("once memory"), "resolved"], ["reject", "fail", m.Callbacks(
                            "once memory"), "rejected"], ["notify", "progress", m.Callbacks("memory")]],
                    c = "pending",
                    d = {
                        state: function () {
                            return c
                        },
                        always: function () {
                            return e.done(arguments).fail(arguments), this
                        },
                        then: function () {
                            var a = arguments;
                            return m.Deferred(function (c) {
                                m.each(b, function (b, f) {
                                    var g = m.isFunction(a[b]) && a[b];
                                    e[f[1]](function () {
                                        var a = g && g.apply(this, arguments);
                                        a && m.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(
                                            c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] :
                                            arguments)
                                    })
                                }), a = null
                            }).promise()
                        },
                        promise: function (a) {
                            return null != a ? m.extend(a, d) : d
                        }
                    }, e = {};
                return d.pipe = d.then, m.each(b, function (a, f) {
                    var g = f[2],
                        h = f[3];
                    d[f[1]] = g.add, h && g.add(function () {
                        c = h
                    }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function () {
                        return e[f[0] + "With"](this === e ? d : this, arguments), this
                    }, e[f[0] + "With"] = g.fireWith
                }), d.promise(e), a && a.call(e, e), e
            },
            when: function (a) {
                var b = 0,
                    c = d.call(arguments),
                    e = c.length,
                    f = 1 !== e || a && m.isFunction(a.promise) ? e : 0,
                    g = 1 === f ? a : m.Deferred(),
                    h = function (a, b, c) {
                        return function (e) {
                            b[a] = this, c[a] = arguments.length > 1 ? d.call(arguments) : e, c === i ? g.notifyWith(b,
                                c) : --f || g.resolveWith(b, c)
                        }
                    }, i, j, k;
                if (e > 1) for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++) c[b] && m.isFunction(
                            c[b].promise) ? c[b].promise().done(h(b, k, c)).fail(g.reject).progress(h(b, j, i)) : --f;
                return f || g.resolveWith(k, c), g.promise()
            }
        });
        var H;
        m.fn.ready = function (a) {
            return m.ready.promise().done(a), this
        }, m.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function (a) {
                a ? m.readyWait++ : m.ready(!0)
            },
            ready: function (a) {
                if (a === !0 ? !--m.readyWait : !m.isReady) {
                    if (!y.body) return setTimeout(m.ready);
                    m.isReady = !0, a !== !0 && --m.readyWait > 0 || (H.resolveWith(y, [m]), m.fn.triggerHandler && (m(
                        y).triggerHandler("ready"), m(y).off("ready")))
                }
            }
        });
 
        function I() {
            y.addEventListener ? (y.removeEventListener("DOMContentLoaded", J, !1), a.removeEventListener("load", J, !1)) :
                (y.detachEvent("onreadystatechange", J), a.detachEvent("onload", J))
        }
        function J() {
            (y.addEventListener || "load" === event.type || "complete" === y.readyState) && (I(), m.ready())
        }
        m.ready.promise = function (b) {
            if (!H) if (H = m.Deferred(), "complete" === y.readyState) setTimeout(m.ready);
                else if (y.addEventListener) y.addEventListener("DOMContentLoaded", J, !1), a.addEventListener("load",
                    J, !1);
            else {
                y.attachEvent("onreadystatechange", J), a.attachEvent("onload", J);
                var c = !1;
                try {
                    c = null == a.frameElement && y.documentElement
                } catch (d) {}
                c && c.doScroll && ! function e() {
                    if (!m.isReady) {
                        try {
                            c.doScroll("left")
                        } catch (a) {
                            return setTimeout(e, 50)
                        }
                        I(), m.ready()
                    }
                }()
            }
            return H.promise(b)
        };
        var K = "undefined",
            L;
        for (L in m(k)) break;
        k.ownLast = "0" !== L, k.inlineBlockNeedsLayout = !1, m(function () {
            var a, b, c, d;
            c = y.getElementsByTagName("body")[0], c && c.style && (b = y.createElement("div"), d = y.createElement(
                "div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(
                d).appendChild(b), typeof b.style.zoom !== K && (b.style.cssText =
                "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", k.inlineBlockNeedsLayout = a = 3 === b
                .offsetWidth, a && (c.style.zoom = 1)), c.removeChild(d))
        }),
        function () {
            var a = y.createElement("div");
            if (null == k.deleteExpando) {
                k.deleteExpando = !0;
                try {
                    delete a.test
                } catch (b) {
                    k.deleteExpando = !1
                }
            }
            a = null
        }(), m.acceptData = function (a) {
            var b = m.noData[(a.nodeName + " ").toLowerCase()],
                c = +a.nodeType || 1;
            return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b
        };
        var M = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            N = /([A-Z])/g;
 
        function O(a, b, c) {
            if (void 0 === c && 1 === a.nodeType) {
                var d = "data-" + b.replace(N, "-$1").toLowerCase();
                if (c = a.getAttribute(d), "string" == typeof c) {
                    try {
                        c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : M.test(
                            c) ? m.parseJSON(c) : c
                    } catch (e) {}
                    m.data(a, b, c)
                } else c = void 0
            }
            return c
        }
        function P(a) {
            var b;
            for (b in a) if (("data" !== b || !m.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
 
            return !0
        }
        function Q(a, b, d, e) {
            if (m.acceptData(a)) {
                var f, g, h = m.expando,
                    i = a.nodeType,
                    j = i ? m.cache : a,
                    k = i ? a[h] : a[h] && h;
                if (k && j[k] && (e || j[k].data) || void 0 !== d || "string" != typeof b) return k || (k = i ? a[h] =
                        c.pop() || m.guid++ : h), j[k] || (j[k] = i ? {} : {
                        toJSON: m.noop
                    }), ("object" == typeof b || "function" == typeof b) && (e ? j[k] = m.extend(j[k], b) : j[k].data =
                        m.extend(j[k].data, b)), g = j[k], e || (g.data || (g.data = {}), g = g.data), void 0 !== d &&
                        (g[m.camelCase(b)] = d), "string" == typeof b ? (f = g[b], null == f && (f = g[m.camelCase(b)])) :
                        f = g, f
            }
        }
        function R(a, b, c) {
            if (m.acceptData(a)) {
                var d, e, f = a.nodeType,
                    g = f ? m.cache : a,
                    h = f ? a[m.expando] : m.expando;
                if (g[h]) {
                    if (b && (d = c ? g[h] : g[h].data)) {
                        m.isArray(b) ? b = b.concat(m.map(b, m.camelCase)) : b in d ? b = [b] : (b = m.camelCase(b), b =
                            b in d ? [b] : b.split(" ")), e = b.length;
                        while (e--) delete d[b[e]];
                        if (c ? !P(d) : !m.isEmptyObject(d)) return
                    }(c || (delete g[h].data, P(g[h]))) && (f ? m.cleanData([a], !0) : k.deleteExpando || g != g.window ?
                        delete g[h] : g[h] = null)
                }
            }
        }
        m.extend({
            cache: {},
            noData: {
                "applet ": !0,
                "embed ": !0,
                "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
            },
            hasData: function (a) {
                return a = a.nodeType ? m.cache[a[m.expando]] : a[m.expando], !! a && !P(a)
            },
            data: function (a, b, c) {
                return Q(a, b, c)
            },
            removeData: function (a, b) {
                return R(a, b)
            },
            _data: function (a, b, c) {
                return Q(a, b, c, !0)
            },
            _removeData: function (a, b) {
                return R(a, b, !0)
            }
        }), m.fn.extend({
            data: function (a, b) {
                var c, d, e, f = this[0],
                    g = f && f.attributes;
                if (void 0 === a) {
                    if (this.length && (e = m.data(f), 1 === f.nodeType && !m._data(f, "parsedAttrs"))) {
                        c = g.length;
                        while (c--) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = m.camelCase(d.slice(5)), O(
                                f, d, e[d])));
                        m._data(f, "parsedAttrs", !0)
                    }
                    return e
                }
                return "object" == typeof a ? this.each(function () {
                    m.data(this, a)
                }) : arguments.length > 1 ? this.each(function () {
                    m.data(this, a, b)
                }) : f ? O(f, a, m.data(f, a)) : void 0
            },
            removeData: function (a) {
                return this.each(function () {
                    m.removeData(this, a)
                })
            }
        }), m.extend({
            queue: function (a, b, c) {
                var d;
                return a ? (b = (b || "fx") + "queue", d = m._data(a, b), c && (!d || m.isArray(c) ? d = m._data(a, b,
                    m.makeArray(c)) : d.push(c)), d || []) : void 0
            },
            dequeue: function (a, b) {
                b = b || "fx";
                var c = m.queue(a, b),
                    d = c.length,
                    e = c.shift(),
                    f = m._queueHooks(a, b),
                    g = function () {
                        m.dequeue(a, b)
                    };
                "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop,
                    e.call(a, g, f)), !d && f && f.empty.fire()
            },
            _queueHooks: function (a, b) {
                var c = b + "queueHooks";
                return m._data(a, c) || m._data(a, c, {
                    empty: m.Callbacks("once memory").add(function () {
                        m._removeData(a, b + "queue"), m._removeData(a, c)
                    })
                })
            }
        }), m.fn.extend({
            queue: function (a, b) {
                var c = 2;
                return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? m.queue(this[0], a) :
                    void 0 === b ? this : this.each(function () {
                    var c = m.queue(this, a, b);
                    m._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && m.dequeue(this, a)
                })
            },
            dequeue: function (a) {
                return this.each(function () {
                    m.dequeue(this, a)
                })
            },
            clearQueue: function (a) {
                return this.queue(a || "fx", [])
            },
            promise: function (a, b) {
                var c, d = 1,
                    e = m.Deferred(),
                    f = this,
                    g = this.length,
                    h = function () {
                        --d || e.resolveWith(f, [f])
                    };
                "string" != typeof a && (b = a, a = void 0), a = a || "fx";
                while (g--) c = m._data(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
                return h(), e.promise(b)
            }
        });
        var S = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            T = ["Top", "Right", "Bottom", "Left"],
            U = function (a, b) {
                return a = b || a, "none" === m.css(a, "display") || !m.contains(a.ownerDocument, a)
            }, V = m.access = function (a, b, c, d, e, f, g) {
                var h = 0,
                    i = a.length,
                    j = null == c;
                if ("object" === m.type(c)) {
                    e = !0;
                    for (h in c) m.access(a, b, h, c[h], !0, f, g)
                } else if (void 0 !== d && (e = !0, m.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (
                    j = b, b = function (a, b, c) {
                    return j.call(m(a), c)
                })), b)) for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
                return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
            }, W = /^(?:checkbox|radio)$/i;
        ! function () {
            var a = y.createElement("input"),
                b = y.createElement("div"),
                c = y.createDocumentFragment();
            if (b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", k.leadingWhitespace =
                3 === b.firstChild.nodeType, k.tbody = !b.getElementsByTagName("tbody").length, k.htmlSerialize = !! b.getElementsByTagName(
                "link").length, k.html5Clone = "<:nav></:nav>" !== y.createElement("nav").cloneNode(!0).outerHTML, a.type =
                "checkbox", a.checked = !0, c.appendChild(a), k.appendChecked = a.checked, b.innerHTML =
                "<textarea>x</textarea>", k.noCloneChecked = !! b.cloneNode(!0).lastChild.defaultValue, c.appendChild(b),
                b.innerHTML = "<input type='radio' checked='checked' name='t'/>", k.checkClone = b.cloneNode(!0).cloneNode(!
                0).lastChild.checked, k.noCloneEvent = !0, b.attachEvent && (b.attachEvent("onclick", function () {
                k.noCloneEvent = !1
            }), b.cloneNode(!0).click()), null == k.deleteExpando) {
                k.deleteExpando = !0;
                try {
                    delete b.test
                } catch (d) {
                    k.deleteExpando = !1
                }
            }
        }(),
        function () {
            var b, c, d = y.createElement("div");
            for (b in {
                submit: !0,
                change: !0,
                focusin: !0
            }) c = "on" + b, (k[b + "Bubbles"] = c in a) || (d.setAttribute(c, "t"), k[b + "Bubbles"] = d.attributes[c]
                    .expando === !1);
            d = null
        }();
        var X = /^(?:input|select|textarea)$/i,
            Y = /^key/,
            Z = /^(?:mouse|pointer|contextmenu)|click/,
            $ = /^(?:focusinfocus|focusoutblur)$/,
            _ = /^([^.]*)(?:\.(.+)|)$/;
 
        function aa() {
            return !0
        }
        function ba() {
            return !1
        }
        function ca() {
            try {
                return y.activeElement
            } catch (a) {}
        }
        m.event = {
            global: {},
            add: function (a, b, c, d, e) {
                var f, g, h, i, j, k, l, n, o, p, q, r = m._data(a);
                if (r) {
                    c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = m.guid++), (g = r.events) ||
                        (g = r.events = {}), (k = r.handle) || (k = r.handle = function (a) {
                        return typeof m === K || a && m.event.triggered === a.type ? void 0 : m.event.dispatch.apply(k.elem,
                            arguments)
                    }, k.elem = a), b = (b || "").match(E) || [""], h = b.length;
                    while (h--) f = _.exec(b[h]) || [], o = q = f[1], p = (f[2] || "").split(".").sort(), o && (j = m.event
                            .special[o] || {}, o = (e ? j.delegateType : j.bindType) || o, j = m.event.special[o] || {},
                            l = m.extend({
                            type: o,
                            origType: q,
                            data: d,
                            handler: c,
                            guid: c.guid,
                            selector: e,
                            needsContext: e && m.expr.match.needsContext.test(e),
                            namespace: p.join(".")
                        }, i), (n = g[o]) || (n = g[o] = [], n.delegateCount = 0, j.setup && j.setup.call(a, d, p, k) !== !
                            1 || (a.addEventListener ? a.addEventListener(o, k, !1) : a.attachEvent && a.attachEvent(
                            "on" + o, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ?
                            n.splice(n.delegateCount++, 0, l) : n.push(l), m.event.global[o] = !0);
                    a = null
                }
            },
            remove: function (a, b, c, d, e) {
                var f, g, h, i, j, k, l, n, o, p, q, r = m.hasData(a) && m._data(a);
                if (r && (k = r.events)) {
                    b = (b || "").match(E) || [""], j = b.length;
                    while (j--) if (h = _.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o) {
                            l = m.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, n = k[o] || [], h =
                                h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = n.length;
                            while (f--) g = n[f], !e && q !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) ||
                                    d && d !== g.selector && ("**" !== d || !g.selector) || (n.splice(f, 1), g.selector &&
                                    n.delegateCount--, l.remove && l.remove.call(a, g));
                            i && !n.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || m.removeEvent(a,
                                o, r.handle), delete k[o])
                        } else for (o in k) m.event.remove(a, o + b[j], c, d, !0);
                    m.isEmptyObject(k) && (delete r.handle, m._removeData(a, "events"))
                }
            },
            trigger: function (b, c, d, e) {
                var f, g, h, i, k, l, n, o = [d || y],
                    p = j.call(b, "type") ? b.type : b,
                    q = j.call(b, "namespace") ? b.namespace.split(".") : [];
                if (h = l = d = d || y, 3 !== d.nodeType && 8 !== d.nodeType && !$.test(p + m.event.triggered) && (p.indexOf(
                    ".") >= 0 && (q = p.split("."), p = q.shift(), q.sort()), g = p.indexOf(":") < 0 && "on" + p, b = b[
                    m.expando] ? b : new m.Event(p, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace =
                    q.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") +
                    "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : m.makeArray(
                    c, [b]), k = m.event.special[p] || {}, e || !k.trigger || k.trigger.apply(d, c) !== !1)) {
                    if (!e && !k.noBubble && !m.isWindow(d)) {
                        for (i = k.delegateType || p, $.test(i + p) || (h = h.parentNode); h; h = h.parentNode) o.push(
                                h), l = h;
                        l === (d.ownerDocument || y) && o.push(l.defaultView || l.parentWindow || a)
                    }
                    n = 0;
                    while ((h = o[n++]) && !b.isPropagationStopped()) b.type = n > 1 ? i : k.bindType || p, f = (m._data(
                            h, "events") || {})[b.type] && m._data(h, "handle"), f && f.apply(h, c), f = g && h[g], f &&
                            f.apply && m.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault());
                    if (b.type = p, !e && !b.isDefaultPrevented() && (!k._default || k._default.apply(o.pop(), c) === !
                        1) && m.acceptData(d) && g && d[p] && !m.isWindow(d)) {
                        l = d[g], l && (d[g] = null), m.event.triggered = p;
                        try {
                            d[p]()
                        } catch (r) {}
                        m.event.triggered = void 0, l && (d[g] = l)
                    }
                    return b.result
                }
            },
            dispatch: function (a) {
                a = m.event.fix(a);
                var b, c, e, f, g, h = [],
                    i = d.call(arguments),
                    j = (m._data(this, "events") || {})[a.type] || [],
                    k = m.event.special[a.type] || {};
                if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
                    h = m.event.handlers.call(this, a, j), b = 0;
                    while ((f = h[b++]) && !a.isPropagationStopped()) {
                        a.currentTarget = f.elem, g = 0;
                        while ((e = f.handlers[g++]) && !a.isImmediatePropagationStopped())(!a.namespace_re || a.namespace_re
                                .test(e.namespace)) && (a.handleObj = e, a.data = e.data, c = ((m.event.special[e.origType] || {})
                                .handle || e.handler).apply(f.elem, i), void 0 !== c && (a.result = c) === !1 && (a.preventDefault(),
                                a.stopPropagation()))
                    }
                    return k.postDispatch && k.postDispatch.call(this, a), a.result
                }
            },
            handlers: function (a, b) {
                var c, d, e, f, g = [],
                    h = b.delegateCount,
                    i = a.target;
                if (h && i.nodeType && (!a.button || "click" !== a.type)) for (; i != this; i = i.parentNode || this) if (
                            1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                            for (e = [], f = 0; h > f; f++) d = b[f], c = d.selector + " ", void 0 === e[c] && (e[c] =
                                    d.needsContext ? m(c, this).index(i) >= 0 : m.find(c, this, null, [i]).length), e[c] &&
                                    e.push(d);
                            e.length && g.push({
                                elem: i,
                                handlers: e
                            })
                        }
                return h < b.length && g.push({
                    elem: this,
                    handlers: b.slice(h)
                }), g
            },
            fix: function (a) {
                if (a[m.expando]) return a;
                var b, c, d, e = a.type,
                    f = a,
                    g = this.fixHooks[e];
                g || (this.fixHooks[e] = g = Z.test(e) ? this.mouseHooks : Y.test(e) ? this.keyHooks : {}), d = g.props ?
                    this.props.concat(g.props) : this.props, a = new m.Event(f), b = d.length;
                while (b--) c = d[b], a[c] = f[c];
                return a.target || (a.target = f.srcElement || y), 3 === a.target.nodeType && (a.target = a.target.parentNode),
                    a.metaKey = !! a.metaKey, g.filter ? g.filter(a, f) : a
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which"
                .split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function (a, b) {
                    return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement"
                    .split(" "),
                filter: function (a, b) {
                    var c, d, e, f = b.button,
                        g = b.fromElement;
                    return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || y, e = d.documentElement,
                        c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft ||
                        c && c.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e &&
                        e.clientTop || c && c.clientTop || 0)), !a.relatedTarget && g && (a.relatedTarget = g === a.target ?
                        b.toElement : g), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0),
                        a
                }
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function () {
                        if (this !== ca() && this.focus) try {
                                return this.focus(), !1
                        } catch (a) {}
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function () {
                        return this === ca() && this.blur ? (this.blur(), !1) : void 0
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function () {
                        return m.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) :
                            void 0
                    },
                    _default: function (a) {
                        return m.nodeName(a.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function (a) {
                        void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                    }
                }
            },
            simulate: function (a, b, c, d) {
                var e = m.extend(new m.Event, c, {
                    type: a,
                    isSimulated: !0,
                    originalEvent: {}
                });
                d ? m.event.trigger(e, null, b) : m.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
            }
        }, m.removeEvent = y.removeEventListener ? function (a, b, c) {
            a.removeEventListener && a.removeEventListener(b, c, !1)
        } : function (a, b, c) {
            var d = "on" + b;
            a.detachEvent && (typeof a[d] === K && (a[d] = null), a.detachEvent(d, c))
        }, m.Event = function (a, b) {
            return this instanceof m.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented =
                a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? aa : ba) : this.type = a,
                b && m.extend(this, b), this.timeStamp = a && a.timeStamp || m.now(), void(this[m.expando] = !0)) : new m
                .Event(a, b)
        }, m.Event.prototype = {
            isDefaultPrevented: ba,
            isPropagationStopped: ba,
            isImmediatePropagationStopped: ba,
            preventDefault: function () {
                var a = this.originalEvent;
                this.isDefaultPrevented = aa, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
            },
            stopPropagation: function () {
                var a = this.originalEvent;
                this.isPropagationStopped = aa, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
            },
            stopImmediatePropagation: function () {
                var a = this.originalEvent;
                this.isImmediatePropagationStopped = aa, a && a.stopImmediatePropagation && a.stopImmediatePropagation(),
                    this.stopPropagation()
            }
        }, m.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function (a, b) {
            m.event.special[a] = {
                delegateType: b,
                bindType: b,
                handle: function (a) {
                    var c, d = this,
                        e = a.relatedTarget,
                        f = a.handleObj;
                    return (!e || e !== d && !m.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this,
                        arguments), a.type = b), c
                }
            }
        }), k.submitBubbles || (m.event.special.submit = {
            setup: function () {
                return m.nodeName(this, "form") ? !1 : void m.event.add(this, "click._submit keypress._submit", function (
                    a) {
                    var b = a.target,
                        c = m.nodeName(b, "input") || m.nodeName(b, "button") ? b.form : void 0;
                    c && !m._data(c, "submitBubbles") && (m.event.add(c, "submit._submit", function (a) {
                        a._submit_bubble = !0
                    }), m._data(c, "submitBubbles", !0))
                })
            },
            postDispatch: function (a) {
                a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && m.event.simulate(
                    "submit", this.parentNode, a, !0))
            },
            teardown: function () {
                return m.nodeName(this, "form") ? !1 : void m.event.remove(this, "._submit")
            }
        }), k.changeBubbles || (m.event.special.change = {
            setup: function () {
                return X.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (m.event.add(
                    this, "propertychange._change", function (a) {
                    "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
                }), m.event.add(this, "click._change", function (a) {
                    this._just_changed && !a.isTrigger && (this._just_changed = !1), m.event.simulate("change", this, a, !
                        0)
                })), !1) : void m.event.add(this, "beforeactivate._change", function (a) {
                    var b = a.target;
                    X.test(b.nodeName) && !m._data(b, "changeBubbles") && (m.event.add(b, "change._change", function (a) {
                        !this.parentNode || a.isSimulated || a.isTrigger || m.event.simulate("change", this.parentNode,
                            a, !0)
                    }), m._data(b, "changeBubbles", !0))
                })
            },
            handle: function (a) {
                var b = a.target;
                return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj
                    .handler.apply(this, arguments) : void 0
            },
            teardown: function () {
                return m.event.remove(this, "._change"), !X.test(this.nodeName)
            }
        }), k.focusinBubbles || m.each({
            focus: "focusin",
            blur: "focusout"
        }, function (a, b) {
            var c = function (a) {
                m.event.simulate(b, a.target, m.event.fix(a), !0)
            };
            m.event.special[b] = {
                setup: function () {
                    var d = this.ownerDocument || this,
                        e = m._data(d, b);
                    e || d.addEventListener(a, c, !0), m._data(d, b, (e || 0) + 1)
                },
                teardown: function () {
                    var d = this.ownerDocument || this,
                        e = m._data(d, b) - 1;
                    e ? m._data(d, b, e) : (d.removeEventListener(a, c, !0), m._removeData(d, b))
                }
            }
        }), m.fn.extend({
            on: function (a, b, c, d, e) {
                var f, g;
                if ("object" == typeof a) {
                    "string" != typeof b && (c = c || b, b = void 0);
                    for (f in a) this.on(f, b, c, a[f], e);
                    return this
                }
                if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c =
                    void 0) : (d = c, c = b, b = void 0)), d === !1) d = ba;
                else if (!d) return this;
                return 1 === e && (g = d, d = function (a) {
                    return m().off(a), g.apply(this, arguments)
                }, d.guid = g.guid || (g.guid = m.guid++)), this.each(function () {
                    m.event.add(this, a, d, c, b)
                })
            },
            one: function (a, b, c, d) {
                return this.on(a, b, c, d, 1)
            },
            off: function (a, b, c) {
                var d, e;
                if (a && a.preventDefault && a.handleObj) return d = a.handleObj, m(a.delegateTarget).off(d.namespace ?
                        d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
                if ("object" == typeof a) {
                    for (e in a) this.off(e, b, a[e]);
                    return this
                }
                return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = ba), this.each(function () {
                    m.event.remove(this, a, c, b)
                })
            },
            trigger: function (a, b) {
                return this.each(function () {
                    m.event.trigger(a, b, this)
                })
            },
            triggerHandler: function (a, b) {
                var c = this[0];
                return c ? m.event.trigger(a, b, c, !0) : void 0
            }
        });
 
        function da(a) {
            var b = ea.split("|"),
                c = a.createDocumentFragment();
            if (c.createElement) while (b.length) c.createElement(b.pop());
            return c
        }
        var ea =
            "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            fa = / jQuery\d+="(?:null|\d+)"/g,
            ga = new RegExp("<(?:" + ea + ")[\\s/>]", "i"),
            ha = /^\s+/,
            ia = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            ja = /<([\w:]+)/,
            ka = /<tbody/i,
            la = /<|&#?\w+;/,
            ma = /<(?:script|style|link)/i,
            na = /checked\s*(?:[^=]|=\s*.checked.)/i,
            oa = /^$|\/(?:java|ecma)script/i,
            pa = /^true\/(.*)/,
            qa = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            ra = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                area: [1, "<map>", "</map>"],
                param: [1, "<object>", "</object>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: k.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
            }, sa = da(y),
            ta = sa.appendChild(y.createElement("div"));
        ra.optgroup = ra.option, ra.tbody = ra.tfoot = ra.colgroup = ra.caption = ra.thead, ra.th = ra.td;
 
        function ua(a, b) {
            var c, d, e = 0,
                f = typeof a.getElementsByTagName !== K ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !==
                    K ? a.querySelectorAll(b || "*") : void 0;
            if (!f) for (f = [], c = a.childNodes || a; null != (d = c[e]); e++)!b || m.nodeName(d, b) ? f.push(d) : m.merge(
                    f, ua(d, b));
            return void 0 === b || b && m.nodeName(a, b) ? m.merge([a], f) : f
        }
        function va(a) {
            W.test(a.type) && (a.defaultChecked = a.checked)
        }
        function wa(a, b) {
            return m.nodeName(a, "table") && m.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName(
                "tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
        }
        function xa(a) {
            return a.type = (null !== m.find.attr(a, "type")) + "/" + a.type, a
        }
        function ya(a) {
            var b = pa.exec(a.type);
            return b ? a.type = b[1] : a.removeAttribute("type"), a
        }
        function za(a, b) {
            for (var c, d = 0; null != (c = a[d]); d++) m._data(c, "globalEval", !b || m._data(b[d], "globalEval"))
        }
        function Aa(a, b) {
            if (1 === b.nodeType && m.hasData(a)) {
                var c, d, e, f = m._data(a),
                    g = m._data(b, f),
                    h = f.events;
                if (h) {
                    delete g.handle, g.events = {};
                    for (c in h) for (d = 0, e = h[c].length; e > d; d++) m.event.add(b, c, h[c][d])
                }
                g.data && (g.data = m.extend({}, g.data))
            }
        }
        function Ba(a, b) {
            var c, d, e;
            if (1 === b.nodeType) {
                if (c = b.nodeName.toLowerCase(), !k.noCloneEvent && b[m.expando]) {
                    e = m._data(b);
                    for (d in e.events) m.removeEvent(b, d, e.handle);
                    b.removeAttribute(m.expando)
                }
                "script" === c && b.text !== a.text ? (xa(b).text = a.text, ya(b)) : "object" === c ? (b.parentNode &&
                    (b.outerHTML = a.outerHTML), k.html5Clone && a.innerHTML && !m.trim(b.innerHTML) && (b.innerHTML =
                    a.innerHTML)) : "input" === c && W.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !==
                    a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected :
                    ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
            }
        }
        m.extend({
            clone: function (a, b, c) {
                var d, e, f, g, h, i = m.contains(a.ownerDocument, a);
                if (k.html5Clone || m.isXMLDoc(a) || !ga.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (ta.innerHTML =
                    a.outerHTML, ta.removeChild(f = ta.firstChild)), !(k.noCloneEvent && k.noCloneChecked || 1 !== a.nodeType &&
                    11 !== a.nodeType || m.isXMLDoc(a))) for (d = ua(f), h = ua(a), g = 0; null != (e = h[g]); ++g) d[g] &&
                            Ba(e, d[g]);
                if (b) if (c) for (h = h || ua(a), d = d || ua(f), g = 0; null != (e = h[g]); g++) Aa(e, d[g]);
                    else Aa(a, f);
                return d = ua(f, "script"), d.length > 0 && za(d, !i && ua(a, "script")), d = h = e = null, f
            },
            buildFragment: function (a, b, c, d) {
                for (var e, f, g, h, i, j, l, n = a.length, o = da(b), p = [], q = 0; n > q; q++) if (f = a[q], f || 0 ===
                        f) if ("object" === m.type(f)) m.merge(p, f.nodeType ? [f] : f);
                        else if (la.test(f)) {
                    h = h || o.appendChild(b.createElement("div")), i = (ja.exec(f) || ["", ""])[1].toLowerCase(), l =
                        ra[i] || ra._default, h.innerHTML = l[1] + f.replace(ia, "<$1></$2>") + l[2], e = l[0];
                    while (e--) h = h.lastChild;
                    if (!k.leadingWhitespace && ha.test(f) && p.push(b.createTextNode(ha.exec(f)[0])), !k.tbody) {
                        f = "table" !== i || ka.test(f) ? "<table>" !== l[1] || ka.test(f) ? 0 : h : h.firstChild, e =
                            f && f.childNodes.length;
                        while (e--) m.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j)
                    }
                    m.merge(p, h.childNodes), h.textContent = "";
                    while (h.firstChild) h.removeChild(h.firstChild);
                    h = o.lastChild
                } else p.push(b.createTextNode(f));
                h && o.removeChild(h), k.appendChecked || m.grep(ua(p, "input"), va), q = 0;
                while (f = p[q++]) if ((!d || -1 === m.inArray(f, d)) && (g = m.contains(f.ownerDocument, f), h = ua(o.appendChild(
                        f), "script"), g && za(h), c)) {
                        e = 0;
                        while (f = h[e++]) oa.test(f.type || "") && c.push(f)
                    }
                return h = null, o
            },
            cleanData: function (a, b) {
                for (var d, e, f, g, h = 0, i = m.expando, j = m.cache, l = k.deleteExpando, n = m.event.special; null !=
                    (d = a[h]); h++) if ((b || m.acceptData(d)) && (f = d[i], g = f && j[f])) {
                        if (g.events) for (e in g.events) n[e] ? m.event.remove(d, e) : m.removeEvent(d, e, g.handle);
                        j[f] && (delete j[f], l ? delete d[i] : typeof d.removeAttribute !== K ? d.removeAttribute(i) :
                            d[i] = null, c.push(f))
                    }
            }
        }), m.fn.extend({
            text: function (a) {
                return V(this, function (a) {
                    return void 0 === a ? m.text(this) : this.empty().append((this[0] && this[0].ownerDocument || y).createTextNode(
                        a))
                }, null, a, arguments.length)
            },
            append: function () {
                return this.domManip(arguments, function (a) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var b = wa(this, a);
                        b.appendChild(a)
                    }
                })
            },
            prepend: function () {
                return this.domManip(arguments, function (a) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var b = wa(this, a);
                        b.insertBefore(a, b.firstChild)
                    }
                })
            },
            before: function () {
                return this.domManip(arguments, function (a) {
                    this.parentNode && this.parentNode.insertBefore(a, this)
                })
            },
            after: function () {
                return this.domManip(arguments, function (a) {
                    this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
                })
            },
            remove: function (a, b) {
                for (var c, d = a ? m.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType ||
                        m.cleanData(ua(c)), c.parentNode && (b && m.contains(c.ownerDocument, c) && za(ua(c, "script")),
                        c.parentNode.removeChild(c));
                return this
            },
            empty: function () {
                for (var a, b = 0; null != (a = this[b]); b++) {
                    1 === a.nodeType && m.cleanData(ua(a, !1));
                    while (a.firstChild) a.removeChild(a.firstChild);
                    a.options && m.nodeName(a, "select") && (a.options.length = 0)
                }
                return this
            },
            clone: function (a, b) {
                return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () {
                    return m.clone(this, a, b)
                })
            },
            html: function (a) {
                return V(this, function (a) {
                    var b = this[0] || {}, c = 0,
                        d = this.length;
                    if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(fa, "") : void 0;
                    if (!("string" != typeof a || ma.test(a) || !k.htmlSerialize && ga.test(a) || !k.leadingWhitespace &&
                        ha.test(a) || ra[(ja.exec(a) || ["", ""])[1].toLowerCase()])) {
                        a = a.replace(ia, "<$1></$2>");
                        try {
                            for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (m.cleanData(ua(b, !1)), b.innerHTML =
                                    a);
                            b = 0
                        } catch (e) {}
                    }
                    b && this.empty().append(a)
                }, null, a, arguments.length)
            },
            replaceWith: function () {
                var a = arguments[0];
                return this.domManip(arguments, function (b) {
                    a = this.parentNode, m.cleanData(ua(this)), a && a.replaceChild(b, this)
                }), a && (a.length || a.nodeType) ? this : this.remove()
            },
            detach: function (a) {
                return this.remove(a, !0)
            },
            domManip: function (a, b) {
                a = e.apply([], a);
                var c, d, f, g, h, i, j = 0,
                    l = this.length,
                    n = this,
                    o = l - 1,
                    p = a[0],
                    q = m.isFunction(p);
                if (q || l > 1 && "string" == typeof p && !k.checkClone && na.test(p)) return this.each(function (c) {
                        var d = n.eq(c);
                        q && (a[0] = p.call(this, c, d.html())), d.domManip(a, b)
                    });
                if (l && (i = m.buildFragment(a, this[0].ownerDocument, !1, this), c = i.firstChild, 1 === i.childNodes
                    .length && (i = c), c)) {
                    for (g = m.map(ua(i, "script"), xa), f = g.length; l > j; j++) d = i, j !== o && (d = m.clone(d, !0, !
                            0), f && m.merge(g, ua(d, "script"))), b.call(this[j], d, j);
                    if (f) for (h = g[g.length - 1].ownerDocument, m.map(g, ya), j = 0; f > j; j++) d = g[j], oa.test(d
                                .type || "") && !m._data(d, "globalEval") && m.contains(h, d) && (d.src ? m._evalUrl &&
                                m._evalUrl(d.src) : m.globalEval((d.text || d.textContent || d.innerHTML || "").replace(
                                qa, "")));
                    i = c = null
                }
                return this
            }
        }), m.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function (a, b) {
            m.fn[a] = function (a) {
                for (var c, d = 0, e = [], g = m(a), h = g.length - 1; h >= d; d++) c = d === h ? this : this.clone(!0),
                        m(g[d])[b](c), f.apply(e, c.get());
                return this.pushStack(e)
            }
        });
        var Ca, Da = {};
 
        function Ea(b, c) {
            var d, e = m(c.createElement(b)).appendTo(c.body),
                f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : m.css(e[0],
                    "display");
            return e.detach(), f
        }
        function Fa(a) {
            var b = y,
                c = Da[a];
            return c || (c = Ea(a, b), "none" !== c && c || (Ca = (Ca || m(
                "<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = (Ca[0].contentWindow ||
                Ca[0].contentDocument).document, b.write(), b.close(), c = Ea(a, b), Ca.detach()), Da[a] = c), c
        }! function () {
            var a;
            k.shrinkWrapBlocks = function () {
                if (null != a) return a;
                a = !1;
                var b, c, d;
                return c = y.getElementsByTagName("body")[0], c && c.style ? (b = y.createElement("div"), d = y.createElement(
                    "div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(
                    d).appendChild(b), typeof b.style.zoom !== K && (b.style.cssText =
                    "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",
                    b.appendChild(y.createElement("div")).style.width = "5px", a = 3 !== b.offsetWidth), c.removeChild(
                    d), a) : void 0
            }
        }();
        var Ga = /^margin/,
            Ha = new RegExp("^(" + S + ")(?!px)[a-z%]+$", "i"),
            Ia, Ja, Ka = /^(top|right|bottom|left)$/;
        a.getComputedStyle ? (Ia = function (b) {
            return b.ownerDocument.defaultView.opener ? b.ownerDocument.defaultView.getComputedStyle(b, null) : a.getComputedStyle(
                b, null)
        }, Ja = function (a, b, c) {
            var d, e, f, g, h = a.style;
            return c = c || Ia(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, c && ("" !== g || m.contains(a.ownerDocument,
                a) || (g = m.style(a, b)), Ha.test(g) && Ga.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth =
                h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 === g ? g :
                g + ""
        }) : y.documentElement.currentStyle && (Ia = function (a) {
            return a.currentStyle
        }, Ja = function (a, b, c) {
            var d, e, f, g, h = a.style;
            return c = c || Ia(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), Ha.test(g) && !Ka.test(
                b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left =
                "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), void 0 === g ? g :
                g + "" || "auto"
        });
 
        function La(a, b) {
            return {
                get: function () {
                    var c = a();
                    if (null != c) return c ? void delete this.get : (this.get = b).apply(this, arguments)
                }
            }
        }! function () {
            var b, c, d, e, f, g, h;
            if (b = y.createElement("div"), b.innerHTML =
                "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0],
                c = d && d.style) {
                c.cssText = "float:left;opacity:.5", k.opacity = "0.5" === c.opacity, k.cssFloat = !! c.cssFloat, b.style
                    .backgroundClip = "content-box", b.cloneNode(!0).style.backgroundClip = "", k.clearCloneStyle =
                    "content-box" === b.style.backgroundClip, k.boxSizing = "" === c.boxSizing || "" === c.MozBoxSizing ||
                    "" === c.WebkitBoxSizing, m.extend(k, {
                    reliableHiddenOffsets: function () {
                        return null == g && i(), g
                    },
                    boxSizingReliable: function () {
                        return null == f && i(), f
                    },
                    pixelPosition: function () {
                        return null == e && i(), e
                    },
                    reliableMarginRight: function () {
                        return null == h && i(), h
                    }
                });
 
                function i() {
                    var b, c, d, i;
                    c = y.getElementsByTagName("body")[0], c && c.style && (b = y.createElement("div"), d = y.createElement(
                        "div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(
                        d).appendChild(b), b.style.cssText =
                        "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",
                        e = f = !1, h = !0, a.getComputedStyle && (e = "1%" !== (a.getComputedStyle(b, null) || {}).top,
                        f = "4px" === (a.getComputedStyle(b, null) || {
                        width: "4px"
                    }).width, i = b.appendChild(y.createElement("div")), i.style.cssText = b.style.cssText =
                        "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
                        i.style.marginRight = i.style.width = "0", b.style.width = "1px", h = !parseFloat((a.getComputedStyle(
                        i, null) || {}).marginRight), b.removeChild(i)), b.innerHTML =
                        "<table><tr><td></td><td>t</td></tr></table>", i = b.getElementsByTagName("td"), i[0].style.cssText =
                        "margin:0;border:0;padding:0;display:none", g = 0 === i[0].offsetHeight, g && (i[0].style.display =
                        "", i[1].style.display = "none", g = 0 === i[0].offsetHeight), c.removeChild(d))
                }
            }
        }(), m.swap = function (a, b, c, d) {
            var e, f, g = {};
            for (f in b) g[f] = a.style[f], a.style[f] = b[f];
            e = c.apply(a, d || []);
            for (f in b) a.style[f] = g[f];
            return e
        };
        var Ma = /alpha\([^)]*\)/i,
            Na = /opacity\s*=\s*([^)]*)/,
            Oa = /^(none|table(?!-c[ea]).+)/,
            Pa = new RegExp("^(" + S + ")(.*)$", "i"),
            Qa = new RegExp("^([+-])=(" + S + ")", "i"),
            Ra = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            }, Sa = {
                letterSpacing: "0",
                fontWeight: "400"
            }, Ta = ["Webkit", "O", "Moz", "ms"];
 
        function Ua(a, b) {
            if (b in a) return b;
            var c = b.charAt(0).toUpperCase() + b.slice(1),
                d = b,
                e = Ta.length;
            while (e--) if (b = Ta[e] + c, b in a) return b;
            return d
        }
        function Va(a, b) {
            for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = m._data(d,
                    "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style
                    .display && U(d) && (f[g] = m._data(d, "olddisplay", Fa(d.nodeName)))) : (e = U(d), (c && "none" !==
                    c || !e) && m._data(d, "olddisplay", e ? c : m.css(d, "display"))));
            for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display ||
                    (d.style.display = b ? f[g] || "" : "none"));
            return a
        }
        function Wa(a, b, c) {
            var d = Pa.exec(b);
            return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
        }
        function Xa(a, b, c, d, e) {
            for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" ===
                    c && (g += m.css(a, c + T[f], !0, e)), d ? ("content" === c && (g -= m.css(a, "padding" + T[f], !0,
                    e)), "margin" !== c && (g -= m.css(a, "border" + T[f] + "Width", !0, e))) : (g += m.css(a,
                    "padding" + T[f], !0, e), "padding" !== c && (g += m.css(a, "border" + T[f] + "Width", !0, e)));
            return g
        }
        function Ya(a, b, c) {
            var d = !0,
                e = "width" === b ? a.offsetWidth : a.offsetHeight,
                f = Ia(a),
                g = k.boxSizing && "border-box" === m.css(a, "boxSizing", !1, f);
            if (0 >= e || null == e) {
                if (e = Ja(a, b, f), (0 > e || null == e) && (e = a.style[b]), Ha.test(e)) return e;
                d = g && (k.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
            }
            return e + Xa(a, b, c || (g ? "border" : "content"), d, f) + "px"
        }
        m.extend({
            cssHooks: {
                opacity: {
                    get: function (a, b) {
                        if (b) {
                            var c = Ja(a, "opacity");
                            return "" === c ? "1" : c
                        }
                    }
                }
            },
            cssNumber: {
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": k.cssFloat ? "cssFloat" : "styleFloat"
            },
            style: function (a, b, c, d) {
                if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                    var e, f, g, h = m.camelCase(b),
                        i = a.style;
                    if (b = m.cssProps[h] || (m.cssProps[h] = Ua(i, h)), g = m.cssHooks[b] || m.cssHooks[h], void 0 ===
                        c) return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
                    if (f = typeof c, "string" === f && (e = Qa.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(m.css(a,
                        b)), f = "number"), null != c && c === c && ("number" !== f || m.cssNumber[h] || (c += "px"), k
                        .clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), !(g &&
                        "set" in g && void 0 === (c = g.set(a, c, d))))) try {
                            i[b] = c
                    } catch (j) {}
                }
            },
            css: function (a, b, c, d) {
                var e, f, g, h = m.camelCase(b);
                return b = m.cssProps[h] || (m.cssProps[h] = Ua(a.style, h)), g = m.cssHooks[b] || m.cssHooks[h], g &&
                    "get" in g && (f = g.get(a, !0, c)), void 0 === f && (f = Ja(a, b, d)), "normal" === f && b in Sa &&
                    (f = Sa[b]), "" === c || c ? (e = parseFloat(f), c === !0 || m.isNumeric(e) ? e || 0 : f) : f
            }
        }), m.each(["height", "width"], function (a, b) {
            m.cssHooks[b] = {
                get: function (a, c, d) {
                    return c ? Oa.test(m.css(a, "display")) && 0 === a.offsetWidth ? m.swap(a, Ra, function () {
                        return Ya(a, b, d)
                    }) : Ya(a, b, d) : void 0
                },
                set: function (a, c, d) {
                    var e = d && Ia(a);
                    return Wa(a, c, d ? Xa(a, b, d, k.boxSizing && "border-box" === m.css(a, "boxSizing", !1, e), e) :
                        0)
                }
            }
        }), k.opacity || (m.cssHooks.opacity = {
            get: function (a, b) {
                return Na.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(
                    RegExp.$1) + "" : b ? "1" : ""
            },
            set: function (a, b) {
                var c = a.style,
                    d = a.currentStyle,
                    e = m.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
                    f = d && d.filter || c.filter || "";
                c.zoom = 1, (b >= 1 || "" === b) && "" === m.trim(f.replace(Ma, "")) && c.removeAttribute && (c.removeAttribute(
                    "filter"), "" === b || d && !d.filter) || (c.filter = Ma.test(f) ? f.replace(Ma, e) : f + " " + e)
            }
        }), m.cssHooks.marginRight = La(k.reliableMarginRight, function (a, b) {
            return b ? m.swap(a, {
                display: "inline-block"
            }, Ja, [a, "marginRight"]) : void 0
        }), m.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function (a, b) {
            m.cssHooks[a + b] = {
                expand: function (c) {
                    for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + T[d] + b] =
                            f[d] || f[d - 2] || f[0];
                    return e
                }
            }, Ga.test(a) || (m.cssHooks[a + b].set = Wa)
        }), m.fn.extend({
            css: function (a, b) {
                return V(this, function (a, b, c) {
                    var d, e, f = {}, g = 0;
                    if (m.isArray(b)) {
                        for (d = Ia(a), e = b.length; e > g; g++) f[b[g]] = m.css(a, b[g], !1, d);
                        return f
                    }
                    return void 0 !== c ? m.style(a, b, c) : m.css(a, b)
                }, a, b, arguments.length > 1)
            },
            show: function () {
                return Va(this, !0)
            },
            hide: function () {
                return Va(this)
            },
            toggle: function (a) {
                return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
                    U(this) ? m(this).show() : m(this).hide()
                })
            }
        });
 
        function Za(a, b, c, d, e) {
            return new Za.prototype.init(a, b, c, d, e)
        }
        m.Tween = Za, Za.prototype = {
            constructor: Za,
            init: function (a, b, c, d, e, f) {
                this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now =
                    this.cur(), this.end = d, this.unit = f || (m.cssNumber[c] ? "" : "px")
            },
            cur: function () {
                var a = Za.propHooks[this.prop];
                return a && a.get ? a.get(this) : Za.propHooks._default.get(this)
            },
            run: function (a) {
                var b, c = Za.propHooks[this.prop];
                return this.options.duration ? this.pos = b = m.easing[this.easing](a, this.options.duration * a, 0, 1,
                    this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start,
                    this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) :
                    Za.propHooks._default.set(this), this
            }
        }, Za.prototype.init.prototype = Za.prototype, Za.propHooks = {
            _default: {
                get: function (a) {
                    var b;
                    return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = m.css(a.elem,
                        a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
                },
                set: function (a) {
                    m.fx.step[a.prop] ? m.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[m.cssProps[a.prop]] ||
                        m.cssHooks[a.prop]) ? m.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
                }
            }
        }, Za.propHooks.scrollTop = Za.propHooks.scrollLeft = {
            set: function (a) {
                a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
            }
        }, m.easing = {
            linear: function (a) {
                return a
            },
            swing: function (a) {
                return .5 - Math.cos(a * Math.PI) / 2
            }
        }, m.fx = Za.prototype.init, m.fx.step = {};
        var $a, _a, ab = /^(?:toggle|show|hide)$/,
            bb = new RegExp("^(?:([+-])=|)(" + S + ")([a-z%]*)$", "i"),
            cb = /queueHooks$/,
            db = [ib],
            eb = {
                "*": [function (a, b) {
                        var c = this.createTween(a, b),
                            d = c.cur(),
                            e = bb.exec(b),
                            f = e && e[3] || (m.cssNumber[a] ? "" : "px"),
                            g = (m.cssNumber[a] || "px" !== f && +d) && bb.exec(m.css(c.elem, a)),
                            h = 1,
                            i = 20;
                        if (g && g[3] !== f) {
                            f = f || g[3], e = e || [], g = +d || 1;
                            do h = h || ".5", g /= h, m.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !==
                                h && --i)
                        }
                        return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[
                            2]), c
                    }]
            };
 
        function fb() {
            return setTimeout(function () {
                $a = void 0
            }), $a = m.now()
        }
        function gb(a, b) {
            var c, d = {
                    height: a
                }, e = 0;
            for (b = b ? 1 : 0; 4 > e; e += 2 - b) c = T[e], d["margin" + c] = d["padding" + c] = a;
            return b && (d.opacity = d.width = a), d
        }
        function hb(a, b, c) {
            for (var d, e = (eb[b] || []).concat(eb["*"]), f = 0, g = e.length; g > f; f++) if (d = e[f].call(c, b, a))
                    return d
        }
        function ib(a, b, c) {
            var d, e, f, g, h, i, j, l, n = this,
                o = {}, p = a.style,
                q = a.nodeType && U(a),
                r = m._data(a, "fxshow");
            c.queue || (h = m._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function () {
                h.unqueued || i()
            }), h.unqueued++, n.always(function () {
                n.always(function () {
                    h.unqueued--, m.queue(a, "fx").length || h.empty.fire()
                })
            })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [p.overflow, p.overflowX, p.overflowY],
                j = m.css(a, "display"), l = "none" === j ? m._data(a, "olddisplay") || Fa(a.nodeName) : j, "inline" ===
                l && "none" === m.css(a, "float") && (k.inlineBlockNeedsLayout && "inline" !== Fa(a.nodeName) ? p.zoom =
                1 : p.display = "inline-block")), c.overflow && (p.overflow = "hidden", k.shrinkWrapBlocks() || n.always(function () {
                p.overflow = c.overflow[0], p.overflowX = c.overflow[1], p.overflowY = c.overflow[2]
            }));
            for (d in b) if (e = b[d], ab.exec(e)) {
                    if (delete b[d], f = f || "toggle" === e, e === (q ? "hide" : "show")) {
                        if ("show" !== e || !r || void 0 === r[d]) continue;
                        q = !0
                    }
                    o[d] = r && r[d] || m.style(a, d)
                } else j = void 0;
            if (m.isEmptyObject(o)) "inline" === ("none" === j ? Fa(a.nodeName) : j) && (p.display = j);
            else {
                r ? "hidden" in r && (q = r.hidden) : r = m._data(a, "fxshow", {}), f && (r.hidden = !q), q ? m(a).show() :
                    n.done(function () {
                    m(a).hide()
                }), n.done(function () {
                    var b;
                    m._removeData(a, "fxshow");
                    for (b in o) m.style(a, b, o[b])
                });
                for (d in o) g = hb(q ? r[d] : 0, d, n), d in r || (r[d] = g.start, q && (g.end = g.start, g.start =
                        "width" === d || "height" === d ? 1 : 0))
            }
        }
        function jb(a, b) {
            var c, d, e, f, g;
            for (c in a) if (d = m.camelCase(c), e = b[d], f = a[c], m.isArray(f) && (e = f[1], f = a[c] = f[0]), c !==
                    d && (a[d] = f, delete a[c]), g = m.cssHooks[d], g && "expand" in g) {
                    f = g.expand(f), delete a[d];
                    for (c in f) c in a || (a[c] = f[c], b[c] = e)
                } else b[d] = e
        }
        function kb(a, b, c) {
            var d, e, f = 0,
                g = db.length,
                h = m.Deferred().always(function () {
                    delete i.elem
                }),
                i = function () {
                    if (e) return !1;
                    for (var b = $a || fb(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f =
                            1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
                    return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
                }, j = h.promise({
                    elem: a,
                    props: m.extend({}, b),
                    opts: m.extend(!0, {
                        specialEasing: {}
                    }, c),
                    originalProperties: b,
                    originalOptions: c,
                    startTime: $a || fb(),
                    duration: c.duration,
                    tweens: [],
                    createTween: function (b, c) {
                        var d = m.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                        return j.tweens.push(d), d
                    },
                    stop: function (b) {
                        var c = 0,
                            d = b ? j.tweens.length : 0;
                        if (e) return this;
                        for (e = !0; d > c; c++) j.tweens[c].run(1);
                        return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
                    }
                }),
                k = j.props;
            for (jb(k, j.opts.specialEasing); g > f; f++) if (d = db[f].call(j, a, k, j.opts)) return d;
            return m.map(k, hb, j), m.isFunction(j.opts.start) && j.opts.start.call(a, j), m.fx.timer(m.extend(i, {
                elem: a,
                anim: j,
                queue: j.opts.queue
            })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
        }
        m.Animation = m.extend(kb, {
            tweener: function (a, b) {
                m.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
                for (var c, d = 0, e = a.length; e > d; d++) c = a[d], eb[c] = eb[c] || [], eb[c].unshift(b)
            },
            prefilter: function (a, b) {
                b ? db.unshift(a) : db.push(a)
            }
        }), m.speed = function (a, b, c) {
            var d = a && "object" == typeof a ? m.extend({}, a) : {
                complete: c || !c && b || m.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !m.isFunction(b) && b
            };
            return d.duration = m.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in m.fx.speeds ?
                m.fx.speeds[d.duration] : m.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"),
                d.old = d.complete, d.complete = function () {
                m.isFunction(d.old) && d.old.call(this), d.queue && m.dequeue(this, d.queue)
            }, d
        }, m.fn.extend({
            fadeTo: function (a, b, c, d) {
                return this.filter(U).css("opacity", 0).show().end().animate({
                    opacity: b
                }, a, c, d)
            },
            animate: function (a, b, c, d) {
                var e = m.isEmptyObject(a),
                    f = m.speed(b, c, d),
                    g = function () {
                        var b = kb(this, m.extend({}, a), f);
                        (e || m._data(this, "finish")) && b.stop(!0)
                    };
                return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
            },
            stop: function (a, b, c) {
                var d = function (a) {
                    var b = a.stop;
                    delete a.stop, b(c)
                };
                return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []),
                    this.each(function () {
                    var b = !0,
                        e = null != a && a + "queueHooks",
                        f = m.timers,
                        g = m._data(this);
                    if (e) g[e] && g[e].stop && d(g[e]);
                    else for (e in g) g[e] && g[e].stop && cb.test(e) && d(g[e]);
                    for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c),
                            b = !1, f.splice(e, 1));
                    (b || !c) && m.dequeue(this, a)
                })
            },
            finish: function (a) {
                return a !== !1 && (a = a || "fx"), this.each(function () {
                    var b, c = m._data(this),
                        d = c[a + "queue"],
                        e = c[a + "queueHooks"],
                        f = m.timers,
                        g = d ? d.length : 0;
                    for (c.finish = !0, m.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;)
                        f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                    for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                    delete c.finish
                })
            }
        }), m.each(["toggle", "show", "hide"], function (a, b) {
            var c = m.fn[b];
            m.fn[b] = function (a, d, e) {
                return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(gb(b, !0), a, d, e)
            }
        }), m.each({
            slideDown: gb("show"),
            slideUp: gb("hide"),
            slideToggle: gb("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function (a, b) {
            m.fn[a] = function (a, c, d) {
                return this.animate(b, a, c, d)
            }
        }), m.timers = [], m.fx.tick = function () {
            var a, b = m.timers,
                c = 0;
            for ($a = m.now(); c < b.length; c++) a = b[c], a() || b[c] !== a || b.splice(c--, 1);
            b.length || m.fx.stop(), $a = void 0
        }, m.fx.timer = function (a) {
            m.timers.push(a), a() ? m.fx.start() : m.timers.pop()
        }, m.fx.interval = 13, m.fx.start = function () {
            _a || (_a = setInterval(m.fx.tick, m.fx.interval))
        }, m.fx.stop = function () {
            clearInterval(_a), _a = null
        }, m.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, m.fn.delay = function (a, b) {
            return a = m.fx ? m.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) {
                var d = setTimeout(b, a);
                c.stop = function () {
                    clearTimeout(d)
                }
            })
        },
        function () {
            var a, b, c, d, e;
            b = y.createElement("div"), b.setAttribute("className", "t"), b.innerHTML =
                "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0],
                c = y.createElement("select"), e = c.appendChild(y.createElement("option")), a = b.getElementsByTagName(
                "input")[0], d.style.cssText = "top:1px", k.getSetAttribute = "t" !== b.className, k.style = /top/.test(
                d.getAttribute("style")), k.hrefNormalized = "/a" === d.getAttribute("href"), k.checkOn = !! a.value, k
                .optSelected = e.selected, k.enctype = !! y.createElement("form").enctype, c.disabled = !0, k.optDisabled = !
                e.disabled, a = y.createElement("input"), a.setAttribute("value", ""), k.input = "" === a.getAttribute(
                "value"), a.value = "t", a.setAttribute("type", "radio"), k.radioValue = "t" === a.value
        }();
        var lb = /\r/g;
        m.fn.extend({
            val: function (a) {
                var b, c, d, e = this[0]; {
                    if (arguments.length) return d = m.isFunction(a), this.each(function (c) {
                            var e;
                            1 === this.nodeType && (e = d ? a.call(this, c, m(this).val()) : a, null == e ? e = "" :
                                "number" == typeof e ? e += "" : m.isArray(e) && (e = m.map(e, function (a) {
                                return null == a ? "" : a + ""
                            })), b = m.valHooks[this.type] || m.valHooks[this.nodeName.toLowerCase()], b && "set" in b &&
                                void 0 !== b.set(this, e, "value") || (this.value = e))
                        });
                    if (e) return b = m.valHooks[e.type] || m.valHooks[e.nodeName.toLowerCase()], b && "get" in b &&
                            void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(lb,
                            "") : null == c ? "" : c)
                }
            }
        }), m.extend({
            valHooks: {
                option: {
                    get: function (a) {
                        var b = m.find.attr(a, "value");
                        return null != b ? b : m.trim(m.text(a))
                    }
                },
                select: {
                    get: function (a) {
                        for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ?
                                null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++) if (c = d[i], !
                                (!c.selected && i !== e || (k.optDisabled ? c.disabled : null !== c.getAttribute(
                                "disabled")) || c.parentNode.disabled && m.nodeName(c.parentNode, "optgroup"))) {
                                if (b = m(c).val(), f) return b;
                                g.push(b)
                            }
                        return g
                    },
                    set: function (a, b) {
                        var c, d, e = a.options,
                            f = m.makeArray(b),
                            g = e.length;
                        while (g--) if (d = e[g], m.inArray(m.valHooks.option.get(d), f) >= 0) try {
                                    d.selected = c = !0
                            } catch (h) {
                            d.scrollHeight
                        } else d.selected = !1;
                        return c || (a.selectedIndex = -1), e
                    }
                }
            }
        }), m.each(["radio", "checkbox"], function () {
            m.valHooks[this] = {
                set: function (a, b) {
                    return m.isArray(b) ? a.checked = m.inArray(m(a).val(), b) >= 0 : void 0
                }
            }, k.checkOn || (m.valHooks[this].get = function (a) {
                return null === a.getAttribute("value") ? "on" : a.value
            })
        });
        var mb, nb, ob = m.expr.attrHandle,
            pb = /^(?:checked|selected)$/i,
            qb = k.getSetAttribute,
            rb = k.input;
        m.fn.extend({
            attr: function (a, b) {
                return V(this, m.attr, a, b, arguments.length > 1)
            },
            removeAttr: function (a) {
                return this.each(function () {
                    m.removeAttr(this, a)
                })
            }
        }), m.extend({
            attr: function (a, b, c) {
                var d, e, f = a.nodeType;
                if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === K ? m.prop(a, b, c) : (1 === f &&
                        m.isXMLDoc(a) || (b = b.toLowerCase(), d = m.attrHooks[b] || (m.expr.match.bool.test(b) ? nb :
                        mb)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = m.find.attr(a, b),
                        null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e :
                        (a.setAttribute(b, c + ""), c) : void m.removeAttr(a, b))
            },
            removeAttr: function (a, b) {
                var c, d, e = 0,
                    f = b && b.match(E);
                if (f && 1 === a.nodeType) while (c = f[e++]) d = m.propFix[c] || c, m.expr.match.bool.test(c) ? rb &&
                            qb || !pb.test(c) ? a[d] = !1 : a[m.camelCase("default-" + c)] = a[d] = !1 : m.attr(a, c,
                            ""), a.removeAttribute(qb ? c : d)
            },
            attrHooks: {
                type: {
                    set: function (a, b) {
                        if (!k.radioValue && "radio" === b && m.nodeName(a, "input")) {
                            var c = a.value;
                            return a.setAttribute("type", b), c && (a.value = c), b
                        }
                    }
                }
            }
        }), nb = {
            set: function (a, b, c) {
                return b === !1 ? m.removeAttr(a, c) : rb && qb || !pb.test(c) ? a.setAttribute(!qb && m.propFix[c] ||
                    c, c) : a[m.camelCase("default-" + c)] = a[c] = !0, c
            }
        }, m.each(m.expr.match.bool.source.match(/\w+/g), function (a, b) {
            var c = ob[b] || m.find.attr;
            ob[b] = rb && qb || !pb.test(b) ? function (a, b, d) {
                var e, f;
                return d || (f = ob[b], ob[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, ob[b] = f), e
            } : function (a, b, c) {
                return c ? void 0 : a[m.camelCase("default-" + b)] ? b.toLowerCase() : null
            }
        }), rb && qb || (m.attrHooks.value = {
            set: function (a, b, c) {
                return m.nodeName(a, "input") ? void(a.defaultValue = b) : mb && mb.set(a, b, c)
            }
        }), qb || (mb = {
            set: function (a, b, c) {
                var d = a.getAttributeNode(c);
                return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", "value" ===
                    c || b === a.getAttribute(c) ? b : void 0
            }
        }, ob.id = ob.name = ob.coords = function (a, b, c) {
            var d;
            return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null
        }, m.valHooks.button = {
            get: function (a, b) {
                var c = a.getAttributeNode(b);
                return c && c.specified ? c.value : void 0
            },
            set: mb.set
        }, m.attrHooks.contenteditable = {
            set: function (a, b, c) {
                mb.set(a, "" === b ? !1 : b, c)
            }
        }, m.each(["width", "height"], function (a, b) {
            m.attrHooks[b] = {
                set: function (a, c) {
                    return "" === c ? (a.setAttribute(b, "auto"), c) : void 0
                }
            }
        })), k.style || (m.attrHooks.style = {
            get: function (a) {
                return a.style.cssText || void 0
            },
            set: function (a, b) {
                return a.style.cssText = b + ""
            }
        });
        var sb = /^(?:input|select|textarea|button|object)$/i,
            tb = /^(?:a|area)$/i;
        m.fn.extend({
            prop: function (a, b) {
                return V(this, m.prop, a, b, arguments.length > 1)
            },
            removeProp: function (a) {
                return a = m.propFix[a] || a, this.each(function () {
                    try {
                        this[a] = void 0, delete this[a]
                    } catch (b) {}
                })
            }
        }), m.extend({
            propFix: {
                "for": "htmlFor",
                "class": "className"
            },
            prop: function (a, b, c) {
                var d, e, f, g = a.nodeType;
                if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !m.isXMLDoc(a), f && (b = m.propFix[b] ||
                        b, e = m.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d :
                        a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
            },
            propHooks: {
                tabIndex: {
                    get: function (a) {
                        var b = m.find.attr(a, "tabindex");
                        return b ? parseInt(b, 10) : sb.test(a.nodeName) || tb.test(a.nodeName) && a.href ? 0 : -1
                    }
                }
            }
        }), k.hrefNormalized || m.each(["href", "src"], function (a, b) {
            m.propHooks[b] = {
                get: function (a) {
                    return a.getAttribute(b, 4)
                }
            }
        }), k.optSelected || (m.propHooks.selected = {
            get: function (a) {
                var b = a.parentNode;
                return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
            }
        }), m.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap",
                "frameBorder", "contentEditable"], function () {
            m.propFix[this.toLowerCase()] = this
        }), k.enctype || (m.propFix.enctype = "encoding");
        var ub = /[\t\r\n\f]/g;
        m.fn.extend({
            addClass: function (a) {
                var b, c, d, e, f, g, h = 0,
                    i = this.length,
                    j = "string" == typeof a && a;
                if (m.isFunction(a)) return this.each(function (b) {
                        m(this).addClass(a.call(this, b, this.className))
                    });
                if (j) for (b = (a || "").match(E) || []; i > h; h++) if (c = this[h], d = 1 === c.nodeType && (c.className ?
                            (" " + c.className + " ").replace(ub, " ") : " ")) {
                            f = 0;
                            while (e = b[f++]) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                            g = m.trim(d), c.className !== g && (c.className = g)
                        }
                return this
            },
            removeClass: function (a) {
                var b, c, d, e, f, g, h = 0,
                    i = this.length,
                    j = 0 === arguments.length || "string" == typeof a && a;
                if (m.isFunction(a)) return this.each(function (b) {
                        m(this).removeClass(a.call(this, b, this.className))
                    });
                if (j) for (b = (a || "").match(E) || []; i > h; h++) if (c = this[h], d = 1 === c.nodeType && (c.className ?
                            (" " + c.className + " ").replace(ub, " ") : "")) {
                            f = 0;
                            while (e = b[f++]) while (d.indexOf(" " + e + " ") >= 0) d = d.replace(" " + e + " ", " ");
                            g = a ? m.trim(d) : "", c.className !== g && (c.className = g)
                        }
                return this
            },
            toggleClass: function (a, b) {
                var c = typeof a;
                return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(
                    m.isFunction(a) ? function (c) {
                    m(this).toggleClass(a.call(this, c, this.className, b), b)
                } : function () {
                    if ("string" === c) {
                        var b, d = 0,
                            e = m(this),
                            f = a.match(E) || [];
                        while (b = f[d++]) e.hasClass(b) ? e.removeClass(b) : e.addClass(b)
                    } else(c === K || "boolean" === c) && (this.className && m._data(this, "__className__", this.className),
                            this.className = this.className || a === !1 ? "" : m._data(this, "__className__") || "")
                })
            },
            hasClass: function (a) {
                for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++) if (1 === this[c].nodeType && (" " +
                        this[c].className + " ").replace(ub, " ").indexOf(b) >= 0) return !0;
                return !1
            }
        }), m.each(
            "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu"
            .split(" "), function (a, b) {
            m.fn[b] = function (a, c) {
                return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
            }
        }), m.fn.extend({
            hover: function (a, b) {
                return this.mouseenter(a).mouseleave(b || a)
            },
            bind: function (a, b, c) {
                return this.on(a, null, b, c)
            },
            unbind: function (a, b) {
                return this.off(a, null, b)
            },
            delegate: function (a, b, c, d) {
                return this.on(b, a, c, d)
            },
            undelegate: function (a, b, c) {
                return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
            }
        });
        var vb = m.now(),
            wb = /\?/,
            xb =
                /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
        m.parseJSON = function (b) {
            if (a.JSON && a.JSON.parse) return a.JSON.parse(b + "");
            var c, d = null,
                e = m.trim(b + "");
            return e && !m.trim(e.replace(xb, function (a, b, e, f) {
                return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "")
            })) ? Function("return " + e)() : m.error("Invalid JSON: " + b)
        }, m.parseXML = function (b) {
            var c, d;
            if (!b || "string" != typeof b) return null;
            try {
                a.DOMParser ? (d = new DOMParser, c = d.parseFromString(b, "text/xml")) : (c = new ActiveXObject(
                    "Microsoft.XMLDOM"), c.async = "false", c.loadXML(b))
            } catch (e) {
                c = void 0
            }
            return c && c.documentElement && !c.getElementsByTagName("parsererror").length || m.error("Invalid XML: " +
                b), c
        };
        var yb, zb, Ab = /#.*$/,
            Bb = /([?&])_=[^&]*!/,
            Cb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
            Db = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            Eb = /^(?:GET|HEAD)$/,
            Fb = /^\/\//,
            Gb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
            Hb = {}, Ib = {}, Jb = "*!/".concat("*");
        try {
            zb = location.href
        } catch (Kb) {
            zb = y.createElement("a"), zb.href = "", zb = zb.href
        }
        yb = Gb.exec(zb.toLowerCase()) || [];
 
        function Lb(a) {
            return function (b, c) {
                "string" != typeof b && (c = b, b = "*");
                var d, e = 0,
                    f = b.toLowerCase().match(E) || [];
                if (m.isFunction(c)) while (d = f[e++]) "+" === d.charAt(0) ? (d = d.slice(1) || "*", (a[d] = a[d] || [])
                            .unshift(c)) : (a[d] = a[d] || []).push(c)
            }
        }
        function Mb(a, b, c, d) {
            var e = {}, f = a === Ib;
 
            function g(h) {
                var i;
                return e[h] = !0, m.each(a[h] || [], function (a, h) {
                    var j = h(b, c, d);
                    return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !
                        1)
                }), i
            }
            return g(b.dataTypes[0]) || !e["*"] && g("*")
        }
        function Nb(a, b) {
            var c, d, e = m.ajaxSettings.flatOptions || {};
            for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
            return c && m.extend(!0, a, c), a
        }
        function Ob(a, b, c) {
            var d, e, f, g, h = a.contents,
                i = a.dataTypes;
            while ("*" === i[0]) i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
            if (e) for (g in h) if (h[g] && h[g].test(e)) {
                        i.unshift(g);
                        break
                    }
            if (i[0] in c) f = i[0];
            else {
                for (g in c) {
                    if (!i[0] || a.converters[g + " " + i[0]]) {
                        f = g;
                        break
                    }
                    d || (d = g)
                }
                f = f || d
            }
            return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
        }
        function Pb(a, b, c, d) {
            var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
            if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
            f = k.shift();
            while (f) if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(
                    b, a.dataType)), i = f, f = k.shift()) if ("*" === f) f = i;
                    else if ("*" !== i && i !== f) {
                if (g = j[i + " " + f] || j["* " + f], !g) for (e in j) if (h = e.split(" "), h[1] === f && (g = j[i +
                            " " + h[0]] || j["* " + h[0]])) {
                            g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                            break
                        }
                if (g !== !0) if (g && a["throws"]) b = g(b);
                    else try {
                            b = g(b)
                    } catch (l) {
                    return {
                        state: "parsererror",
                        error: g ? l : "No conversion from " + i + " to " + f
                    }
                }
            }
            return {
                state: "success",
                data: b
            }
        }
        m.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: zb,
                type: "GET",
                isLocal: Db.test(yb[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": Jb,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": m.parseJSON,
                    "text xml": m.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function (a, b) {
                return b ? Nb(Nb(a, m.ajaxSettings), b) : Nb(m.ajaxSettings, a)
            },
            ajaxPrefilter: Lb(Hb),
            ajaxTransport: Lb(Ib),
            ajax: function (a, b) {
                "object" == typeof a && (b = a, a = void 0), b = b || {};
                var c, d, e, f, g, h, i, j, k = m.ajaxSetup({}, b),
                    l = k.context || k,
                    n = k.context && (l.nodeType || l.jquery) ? m(l) : m.event,
                    o = m.Deferred(),
                    p = m.Callbacks("once memory"),
                    q = k.statusCode || {}, r = {}, s = {}, t = 0,
                    u = "canceled",
                    v = {
                        readyState: 0,
                        getResponseHeader: function (a) {
                            var b;
                            if (2 === t) {
                                if (!j) {
                                    j = {};
                                    while (b = Cb.exec(f)) j[b[1].toLowerCase()] = b[2]
                                }
                                b = j[a.toLowerCase()]
                            }
                            return null == b ? null : b
                        },
                        getAllResponseHeaders: function () {
                            return 2 === t ? f : null
                        },
                        setRequestHeader: function (a, b) {
                            var c = a.toLowerCase();
                            return t || (a = s[c] = s[c] || a, r[a] = b), this
                        },
                        overrideMimeType: function (a) {
                            return t || (k.mimeType = a), this
                        },
                        statusCode: function (a) {
                            var b;
                            if (a) if (2 > t) for (b in a) q[b] = [q[b], a[b]];
                                else v.always(a[v.status]);
                            return this
                        },
                        abort: function (a) {
                            var b = a || u;
                            return i && i.abort(b), x(0, b), this
                        }
                    };
                if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || zb) +
                    "").replace(Ab, "").replace(Fb, yb[1] + "//"), k.type = b.method || b.type || k.method || k.type, k
                    .dataTypes = m.trim(k.dataType || "*").toLowerCase().match(E) || [""], null == k.crossDomain && (c =
                    Gb.exec(k.url.toLowerCase()), k.crossDomain = !(!c || c[1] === yb[1] && c[2] === yb[2] && (c[3] ||
                    ("http:" === c[1] ? "80" : "443")) === (yb[3] || ("http:" === yb[1] ? "80" : "443")))), k.data && k
                    .processData && "string" != typeof k.data && (k.data = m.param(k.data, k.traditional)), Mb(Hb, k, b,
                    v), 2 === t) return v;
                h = m.event && k.global, h && 0 === m.active++ && m.event.trigger("ajaxStart"), k.type = k.type.toUpperCase(),
                    k.hasContent = !Eb.test(k.type), e = k.url, k.hasContent || (k.data && (e = k.url += (wb.test(e) ?
                    "&" : "?") + k.data, delete k.data), k.cache === !1 && (k.url = Bb.test(e) ? e.replace(Bb, "$1_=" +
                    vb++) : e + (wb.test(e) ? "&" : "?") + "_=" + vb++)), k.ifModified && (m.lastModified[e] && v.setRequestHeader(
                    "If-Modified-Since", m.lastModified[e]), m.etag[e] && v.setRequestHeader("If-None-Match", m.etag[e])), (
                    k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader(
                    "Content-Type", k.contentType), v.setRequestHeader("Accept", k.dataTypes[0] && k.accepts[k.dataTypes[
                    0]] ? k.accepts[k.dataTypes[0]] + ("*" !== k.dataTypes[0] ? ", " + Jb + "; q=0.01" : "") : k.accepts[
                    "*"]);
                for (d in k.headers) v.setRequestHeader(d, k.headers[d]);
                if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t)) return v.abort();
                u = "abort";
                for (d in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) v[d](k[d]);
                if (i = Mb(Ib, k, b, v)) {
                    v.readyState = 1, h && n.trigger("ajaxSend", [v, k]), k.async && k.timeout > 0 && (g = setTimeout(function () {
                        v.abort("timeout")
                    }, k.timeout));
                    try {
                        t = 1, i.send(r, x)
                    } catch (w) {
                        if (!(2 > t)) throw w;
                        x(-1, w)
                    }
                } else x(-1, "No Transport");
 
                function x(a, b, c, d) {
                    var j, r, s, u, w, x = b;
                    2 !== t && (t = 2, g && clearTimeout(g), i = void 0, f = d || "", v.readyState = a > 0 ? 4 : 0, j =
                        a >= 200 && 300 > a || 304 === a, c && (u = Ob(k, v, c)), u = Pb(k, u, v, j), j ? (k.ifModified &&
                        (w = v.getResponseHeader("Last-Modified"), w && (m.lastModified[e] = w), w = v.getResponseHeader(
                        "etag"), w && (m.etag[e] = w)), 204 === a || "HEAD" === k.type ? x = "nocontent" : 304 === a ?
                        x = "notmodified" : (x = u.state, r = u.data, s = u.error, j = !s)) : (s = x, (a || !x) && (x =
                        "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || x) + "", j ? o.resolveWith(l, [
                            r, x, v]) : o.rejectWith(l, [v, x, s]), v.statusCode(q), q = void 0, h && n.trigger(j ?
                        "ajaxSuccess" : "ajaxError", [v, k, j ? r : s]), p.fireWith(l, [v, x]), h && (n.trigger(
                        "ajaxComplete", [v, k]), --m.active || m.event.trigger("ajaxStop")))
                }
                return v
            },
            getJSON: function (a, b, c) {
                return m.get(a, b, c, "json")
            },
            getScript: function (a, b) {
                return m.get(a, void 0, b, "script")
            }
        }), m.each(["get", "post"], function (a, b) {
            m[b] = function (a, c, d, e) {
                return m.isFunction(c) && (e = e || d, d = c, c = void 0), m.ajax({
                    url: a,
                    type: b,
                    dataType: e,
                    data: c,
                    success: d
                })
            }
        }), m._evalUrl = function (a) {
            return m.ajax({
                url: a,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            })
        }, m.fn.extend({
            wrapAll: function (a) {
                if (m.isFunction(a)) return this.each(function (b) {
                        m(this).wrapAll(a.call(this, b))
                    });
                if (this[0]) {
                    var b = m(a, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                        var a = this;
                        while (a.firstChild && 1 === a.firstChild.nodeType) a = a.firstChild;
                        return a
                    }).append(this)
                }
                return this
            },
            wrapInner: function (a) {
                return this.each(m.isFunction(a) ? function (b) {
                    m(this).wrapInner(a.call(this, b))
                } : function () {
                    var b = m(this),
                        c = b.contents();
                    c.length ? c.wrapAll(a) : b.append(a)
                })
            },
            wrap: function (a) {
                var b = m.isFunction(a);
                return this.each(function (c) {
                    m(this).wrapAll(b ? a.call(this, c) : a)
                })
            },
            unwrap: function () {
                return this.parent().each(function () {
                    m.nodeName(this, "body") || m(this).replaceWith(this.childNodes)
                }).end()
            }
        }), m.expr.filters.hidden = function (a) {
            return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !k.reliableHiddenOffsets() && "none" === (a.style && a.style
                .display || m.css(a, "display"))
        }, m.expr.filters.visible = function (a) {
            return !m.expr.filters.hidden(a)
        };
        var Qb = /%20/g,
            Rb = /\[\]$/,
            Sb = /\r?\n/g,
            Tb = /^(?:submit|button|image|reset|file)$/i,
            Ub = /^(?:input|select|textarea|keygen)/i;
 
        function Vb(a, b, c, d) {
            var e;
            if (m.isArray(b)) m.each(b, function (b, e) {
                    c || Rb.test(a) ? d(a, e) : Vb(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
                });
            else if (c || "object" !== m.type(b)) d(a, b);
            else for (e in b) Vb(a + "[" + e + "]", b[e], c, d)
        }
        m.param = function (a, b) {
            var c, d = [],
                e = function (a, b) {
                    b = m.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" +
                        encodeURIComponent(b)
                };
            if (void 0 === b && (b = m.ajaxSettings && m.ajaxSettings.traditional), m.isArray(a) || a.jquery && !m.isPlainObject(
                a)) m.each(a, function () {
                    e(this.name, this.value)
                });
            else for (c in a) Vb(c, a[c], b, e);
            return d.join("&").replace(Qb, "+")
        }, m.fn.extend({
            serialize: function () {
                return m.param(this.serializeArray())
            },
            serializeArray: function () {
                return this.map(function () {
                    var a = m.prop(this, "elements");
                    return a ? m.makeArray(a) : this
                }).filter(function () {
                    var a = this.type;
                    return this.name && !m(this).is(":disabled") && Ub.test(this.nodeName) && !Tb.test(a) && (this.checked || !
                        W.test(a))
                }).map(function (a, b) {
                    var c = m(this).val();
                    return null == c ? null : m.isArray(c) ? m.map(c, function (a) {
                        return {
                            name: b.name,
                            value: a.replace(Sb, "\r\n")
                        }
                    }) : {
                        name: b.name,
                        value: c.replace(Sb, "\r\n")
                    }
                }).get()
            }
        }), m.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function () {
            return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && Zb() || $b()
        } : Zb;
        var Wb = 0,
            Xb = {}, Yb = m.ajaxSettings.xhr();
        a.attachEvent && a.attachEvent("onunload", function () {
            for (var a in Xb) Xb[a](void 0, !0)
        }), k.cors = !! Yb && "withCredentials" in Yb, Yb = k.ajax = !! Yb, Yb && m.ajaxTransport(function (a) {
            if (!a.crossDomain || k.cors) {
                var b;
                return {
                    send: function (c, d) {
                        var e, f = a.xhr(),
                            g = ++Wb;
                        if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields) for (e in a.xhrFields)
                                f[e] = a.xhrFields[e];
                        a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c[
                            "X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                        for (e in c) void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
                        f.send(a.hasContent && a.data || null), b = function (c, e) {
                            var h, i, j;
                            if (b && (e || 4 === f.readyState)) if (delete Xb[g], b = void 0, f.onreadystatechange = m.noop,
                                    e) 4 !== f.readyState && f.abort();
                                else {
                                    j = {}, h = f.status, "string" == typeof f.responseText && (j.text = f.responseText);
                                    try {
                                        i = f.statusText
                                    } catch (k) {
                                        i = ""
                                    }
                                    h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : h = j.text ? 200 : 404
                                }
                            j && d(h, i, j, f.getAllResponseHeaders())
                        }, a.async ? 4 === f.readyState ? setTimeout(b) : f.onreadystatechange = Xb[g] = b : b()
                    },
                    abort: function () {
                        b && b(void 0, !0)
                    }
                }
            }
        });
 
        function Zb() {
            try {
                return new a.XMLHttpRequest
            } catch (b) {}
        }
        function $b() {
            try {
                return new a.ActiveXObject("Microsoft.XMLHTTP")
            } catch (b) {}
        }
        m.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /(?:java|ecma)script/
            },
            converters: {
                "text script": function (a) {
                    return m.globalEval(a), a
                }
            }
        }), m.ajaxPrefilter("script", function (a) {
            void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
        }), m.ajaxTransport("script", function (a) {
            if (a.crossDomain) {
                var b, c = y.head || m("head")[0] || y.documentElement;
                return {
                    send: function (d, e) {
                        b = y.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset),
                            b.src = a.url, b.onload = b.onreadystatechange = function (a, c) {
                            (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange =
                                null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, "success"))
                        }, c.insertBefore(b, c.firstChild)
                    },
                    abort: function () {
                        b && b.onload(void 0, !0)
                    }
                }
            }
        });
        var _b = [],
            ac = /(=)\?(?=&|$)|\?\?/;
        m.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function () {
                var a = _b.pop() || m.expando + "_" + vb++;
                return this[a] = !0, a
            }
        }), m.ajaxPrefilter("json jsonp", function (b, c, d) {
            var e, f, g, h = b.jsonp !== !1 && (ac.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType ||
                    "").indexOf("application/x-www-form-urlencoded") && ac.test(b.data) && "data");
            return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = m.isFunction(b.jsonpCallback) ? b.jsonpCallback() :
                b.jsonpCallback, h ? b[h] = b[h].replace(ac, "$1" + e) : b.jsonp !== !1 && (b.url += (wb.test(b.url) ?
                "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () {
                return g || m.error(e + " was not called"), g[0]
            }, b.dataTypes[0] = "json", f = a[e], a[e] = function () {
                g = arguments
            }, d.always(function () {
                a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, _b.push(e)), g && m.isFunction(f) && f(g[0]), g =
                    f = void 0
            }), "script") : void 0
        }), m.parseHTML = function (a, b, c) {
            if (!a || "string" != typeof a) return null;
            "boolean" == typeof b && (c = b, b = !1), b = b || y;
            var d = u.exec(a),
                e = !c && [];
            return d ? [b.createElement(d[1])] : (d = m.buildFragment([a], b, e), e && e.length && m(e).remove(), m.merge([],
                d.childNodes))
        };
        var bc = m.fn.load;
        m.fn.load = function (a, b, c) {
            if ("string" != typeof a && bc) return bc.apply(this, arguments);
            var d, e, f, g = this,
                h = a.indexOf(" ");
            return h >= 0 && (d = m.trim(a.slice(h, a.length)), a = a.slice(0, h)), m.isFunction(b) ? (c = b, b = void 0) :
                b && "object" == typeof b && (f = "POST"), g.length > 0 && m.ajax({
                url: a,
                type: f,
                dataType: "html",
                data: b
            }).done(function (a) {
                e = arguments, g.html(d ? m("<div>").append(m.parseHTML(a)).find(d) : a)
            }).complete(c && function (a, b) {
                g.each(c, e || [a.responseText, b, a])
            }), this
        }, m.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
            m.fn[b] = function (a) {
                return this.on(b, a)
            }
        }), m.expr.filters.animated = function (a) {
            return m.grep(m.timers, function (b) {
                return a === b.elem
            }).length
        };
        var cc = a.document.documentElement;
 
        function dc(a) {
            return m.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
        }
        m.offset = {
            setOffset: function (a, b, c) {
                var d, e, f, g, h, i, j, k = m.css(a, "position"),
                    l = m(a),
                    n = {};
                "static" === k && (a.style.position = "relative"), h = l.offset(), f = m.css(a, "top"), i = m.css(a,
                    "left"), j = ("absolute" === k || "fixed" === k) && m.inArray("auto", [f, i]) > -1, j ? (d = l.position(),
                    g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), m.isFunction(b) && (b =
                    b.call(a, c, h)), null != b.top && (n.top = b.top - h.top + g), null != b.left && (n.left = b.left -
                    h.left + e), "using" in b ? b.using.call(a, n) : l.css(n)
            }
        }, m.fn.extend({
            offset: function (a) {
                if (arguments.length) return void 0 === a ? this : this.each(function (b) {
                        m.offset.setOffset(this, a, b)
                    });
                var b, c, d = {
                        top: 0,
                        left: 0
                    }, e = this[0],
                    f = e && e.ownerDocument;
                if (f) return b = f.documentElement, m.contains(b, e) ? (typeof e.getBoundingClientRect !== K && (d = e
                        .getBoundingClientRect()), c = dc(f), {
                        top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                        left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
                    }) : d
            },
            position: function () {
                if (this[0]) {
                    var a, b, c = {
                            top: 0,
                            left: 0
                        }, d = this[0];
                    return "fixed" === m.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(),
                        b = this.offset(), m.nodeName(a[0], "html") || (c = a.offset()), c.top += m.css(a[0],
                        "borderTopWidth", !0), c.left += m.css(a[0], "borderLeftWidth", !0)), {
                        top: b.top - c.top - m.css(d, "marginTop", !0),
                        left: b.left - c.left - m.css(d, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function () {
                return this.map(function () {
                    var a = this.offsetParent || cc;
                    while (a && !m.nodeName(a, "html") && "static" === m.css(a, "position")) a = a.offsetParent;
                    return a || cc
                })
            }
        }), m.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function (a, b) {
            var c = /Y/.test(b);
            m.fn[a] = function (d) {
                return V(this, function (a, d, e) {
                    var f = dc(a);
                    return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void(f ? f.scrollTo(
                        c ? m(f).scrollLeft() : e, c ? e : m(f).scrollTop()) : a[d] = e)
                }, a, d, arguments.length, null)
            }
        }), m.each(["top", "left"], function (a, b) {
            m.cssHooks[b] = La(k.pixelPosition, function (a, c) {
                return c ? (c = Ja(a, b), Ha.test(c) ? m(a).position()[b] + "px" : c) : void 0
            })
        }), m.each({
            Height: "height",
            Width: "width"
        }, function (a, b) {
            m.each({
                padding: "inner" + a,
                content: b,
                "": "outer" + a
            }, function (c, d) {
                m.fn[d] = function (d, e) {
                    var f = arguments.length && (c || "boolean" != typeof d),
                        g = c || (d === !0 || e === !0 ? "margin" : "border");
                    return V(this, function (b, c, d) {
                        var e;
                        return m.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement,
                            Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e[
                            "client" + a])) : void 0 === d ? m.css(b, c, g) : m.style(b, c, d, g)
                    }, b, f ? d : void 0, f, null)
                }
            })
        }), m.fn.size = function () {
            return this.length
        }, m.fn.andSelf = m.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
            return m
        });
        var ec = a.jQuery,
            fc = a.$;
        return m.noConflict = function (b) {
            return a.$ === m && (a.$ = fc), b && a.jQuery === m && (a.jQuery = ec), m
        }, typeof b === K && (a.jQuery = a.$ = m), m
    });
}
var config = config;
var hexcase = 0;
var b64pad = "";
var chrsz = 8;
 
function hex_md5(s) {
    return binl2hex(core_md5(str2binl(s), s.length * chrsz))
}
function b64_md5(s) {
    return binl2b64(core_md5(str2binl(s), s.length * chrsz))
}
function str_md5(s) {
    return binl2str(core_md5(str2binl(s), s.length * chrsz))
}
function hex_hmac_md5(key, data) {
    return binl2hex(core_hmac_md5(key, data))
}
function b64_hmac_md5(key, data) {
    return binl2b64(core_hmac_md5(key, data))
}
function str_hmac_md5(key, data) {
    return binl2str(core_hmac_md5(key, data))
}
function md5_vm_test() {
    return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72"
}
function core_md5(x, len) {
    x[len >> 5] |= 128 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd)
    }
    return Array(a, b, c, d)
};
 
function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)
};
 
function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t)
};
 
function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t)
};
 
function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t)
};
 
function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t)
};
 
function core_hmac_md5(key, data) {
    var bkey = str2binl(key);
    if (bkey.length > 16) {
        bkey = core_md5(bkey, key.length * chrsz)
    };
    var ipad = Array(16),
        opad = Array(16);
    for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 909522486;
        opad[i] = bkey[i] ^ 1549556828
    };
    var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
    return core_md5(opad.concat(hash), 512 + 128)
};
 
function safe_add(x, y) {
    var lsw = (x & 65535) + (y & 65535);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 65535)
};
 
function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt))
};
 
function str2binl(str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz) {
        bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32)
    };
    return bin
};
 
function binl2str(bin) {
    var str = "";
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < bin.length * 32; i += chrsz) {
        str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask)
    };
    return str
};
 
function binl2hex(binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
        str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 15) + hex_tab.charAt((binarray[i >> 2] >> ((i %
            4) * 8)) & 15)
    };
    return str
};
 
function binl2b64(binarray) {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i += 3) {
        var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 255) << 16) | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) &
            255) << 8) | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 255);
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > binarray.length * 32) {
                str += b64pad
            } else {
                str += tab.charAt((triplet >> 6 * (3 - j)) & 63)
            }
        }
    };
    return str
};
var fashion = {
    mobile_os: ["android", "wp8", "ios"],
    last_cmd: "",
    error_reason: "",
    O2String: function (O) {
        var S = [];
        var J = "";
        if (Object.prototype.toString.apply(O) === '[object Array]') {
            for (var i = 0; i < O.length; i++) S.push(O2String(O[i]));
            J = '[' + S.join(',') + ']'
        } else if (Object.prototype.toString.apply(O) === '[object Date]') {
            J = "new Date(" + O.getTime() + ")"
        } else if (Object.prototype.toString.apply(O) === '[object RegExp]' || Object.prototype.toString.apply(O) ===
            '[object Function]') {
            J = O.toString()
        } else if (Object.prototype.toString.apply(O) === '[object Object]') {
            for (var i in O) {
                var tmp = typeof (O[i]) == 'string' ? '"' + O[i] + '"' : (typeof (O[i]) === 'object' ? O2String(O[i]) :
                    O[i]);
                S.push('"' + i + '":' + tmp)
            }
            J = '{' + S.join(',') + '}'
        } else if (Object.prototype.toString.apply(O) === '[object Number]') {
            J = O.toString()
        } else if (Object.prototype.toString.apply(O) === '[object String]') {
            J = O
        };
        return J
    },
    mobile_info: {},
    user_call_back: function (obj) {
        fashion.error_reason = "undefined user call back."
    },
    init_cb: function (obj) {},
    mobileInvoke: function (jsonstr) {
        fashion.last_cmd = "mobileInvoke(" + jsonstr + ")";
        var obj = eval("(" + jsonstr + ")");
        if (undefined != typeof (obj.BUSINESSNAME) && "undefined" != typeof (obj.BUSINESSNAME) && "initJS" == obj.BUSINESSNAME &&
            undefined != typeof (obj.OSTYPE) && "undefined" != typeof (obj.OSTYPE)) {
            fashion.mobile_info = obj;
            fashion.init_cb(obj)
        } else {
            fashion.user_call_back(obj)
        }
    },
    set_init_cb: function (func) {
        fashion.init_cb = func
    },
    invokeMobile: function (obj, cb) {
        var arg = fashion.O2String(obj);
        fashion.last_cmd = "invokeMobile" + arg;
        fashion.user_call_back = cb;
        var u = navigator.userAgent;
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
            javascript: sdkInterface.enteryMobile(arg)
        } else if ( !! u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            window.location.href = "mobileFunc:" + arg
        } else if (u.indexOf('IEMobile') > -1) {
            window.external.notify(arg)
        } else {
            fashion.error_reason = "不支持该操作系统";
            return
        }
    }
};
var mobileInvoke = function (jsonstr) {
    fashion.mobileInvoke(jsonstr)
};
 
function webapp() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        var browser = {
            versions: function () {
                var u = navigator.userAgent;
                return {
                    mobile: !! u.match(/AppleWebKit.*Mobile.*/),
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                    qq: u.indexOf("MQQBrowser") > -1,
                }
            }(),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        };
        if (browser.versions.mobile) {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/leadeon/i) == "leadeon") {
                return "app"
            };
            if (navigator.userAgent.indexOf('UCBrowser') > -1) {
                return "qita"
            };
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return "weixin"
            } else {
                return "qita"
            }
        }
    } else {
        return "PC"
    }
};
var isApp = webapp();
 
function get_APP_p() {
    var userPhone = '';
    var msg = {
        "CODE": 23,
        "BUSINESSNAME": "isLogin"
    };
    fashion.invokeMobile(msg, fun_cb);
 
    function fun_cb(obj) {
        if (obj.ISLOGIN) {
            var msg = {
                "CODE": 100,
                "BUSINESSNAME": "getUserInfo"
            };
            fashion.invokeMobile(msg, getUserIngo)
        } else {
            var login = {
                "CODE": 22,
                "BUSINESSNAME": "showlogin"
            };
            fashion.invokeMobile(login, showLogin);
 
            function showLogin(obj) {
                var msg = {
                    "CODE": 100,
                    "BUSINESSNAME": "getUserInfo"
                };
                fashion.invokeMobile(msg, getUserIngo)
            }
        }
    };
 
    function getUserIngo(obj) {
        localStorage.setItem("_userPhone_", obj.USERPHONENUM);
        if (config.cooltag[0]()) {
            if (config.cooltag[0]().indexOf("http") > -1 && config.cooltag[1]().indexOf("http") > -1) {
                $.ajax({
                    type: "get",
                    url: config.cooltag[0](),
                    data: {
                        "op": "get",
                        "db": "pied",
                        "key": "mobile_list",
                    },
                    success: function (result) {
                        if (result.val && result.val.length) {
                            for (var i = 0; i < result.val.length; i++) {
                                if (result.val[i] === (obj.USERPHONENUM + "")) {
                                    console.log("手机号在白名单内，显示浮层数据");
                                    var s = document.createElement("script");
                                    s.async = true;
                                    s.src = config.cooltag[1]();
                                    var s2 = document.getElementsByTagName("script")[0];
                                    s2.parentNode.insertBefore(s, s2);
                                    return true
                                }
                            }
                            console.log("您的手机号未在白名单列表中，不显示相关数据");
                            return false
                        } else {
                            console.log("当前无白名单列表");
                            return false
                        }
                    }
                })
            }
        }
    }
};
 
function get_mobile_p(thisMobile) {
    if (config.cooltag[0]()) {
        if (config.cooltag[0]().indexOf("http") > -1 && config.cooltag[1]().indexOf("http") > -1) {
            if (thisMobile) {
                $.ajax({
                    type: "get",
                    url: config.cooltag[0](),
                    data: {
                        "op": "get",
                        "db": "pied",
                        "key": "mobile_list",
                    },
                    success: function (result) {
                        if (result.val && result.val.length) {
                            for (var i = 0; i < result.val.length; i++) {
                                if (result.val[i] === (thisMobile + "")) {
                                    console.log("手机号在白名单内，显示浮层数据");
                                    var s = document.createElement("script");
                                    s.async = true;
                                    s.src = config.cooltag[1]();
                                    var s2 = document.getElementsByTagName("script")[0];
                                    s2.parentNode.insertBefore(s, s2);
                                    return true
                                }
                            }
                            console.log("您的手机号未在白名单列表中，不显示相关数据");
                            return false
                        } else {
                            console.log("当前无白名单列表");
                            return false
                        }
                    }
                })
            } else {
                return false
            }
        }
    }
};
 
function get_t_or_f(thisMobile) {
    if (isApp == "app") {
        return get_APP_p()
    } else {
        return get_mobile_p(thisMobile)
    }
};
$(function () {
    var mobile = getMobile();
    var si_n = "";
    get_t_or_f(mobile);
    $("body").on("click", "*", function () {
        si_n = document.title;
        var si_x = "";
        var e = this;
        var t = "",
            j;
        var manCenter = "",
            imgSrc = "";
        manCenter = (Trim_udbac_shaggy($(e).attr("class")) ? Trim_udbac_shaggy($(e).attr("class")) : "");
        if ($(e).find("img").length > 0) {
            imgSrc = getSrc($(e).find("img").eq(0).attr("src"))
        }
        if (!e.type) {
            var apath = "";
            if (e.href) {
                apath = splitPath(e.href)
            }
            var thisTxt = "";
            if (Trim_udbac_shaggy($(e).text()).length > 20) {
                thisTxt = Trim_udbac_shaggy($(e).text()).substring(0, 10)
            } else {
                thisTxt = Trim_udbac_shaggy($(e).text())
            }
            si_x = thisTxt;
            t += (e.id ? ("_" + e.id) : "") + (manCenter ? ("_" + manCenter) : "") + (thisTxt ? ("_" + thisTxt) : "") +
                (imgSrc ? ("_" + imgSrc) : "") + (apath ? ("_" + apath) : "");
            j = "Link"
        } else {
            if (e.value) {
                var thisVal = "";
                if (Trim_udbac_shaggy($(e).val()).length > 20) {
                    thisVal = Trim_udbac_shaggy($(e).val()).substring(0, 10)
                } else {
                    thisVal = Trim_udbac_shaggy($(e).val())
                }
                si_x = thisVal;
                t = (e.id ? ("_" + e.id) : "") + (manCenter ? ("_" + manCenter) : "") + (thisVal ? ("_" + thisVal) : "") +
                    (imgSrc ? ("_" + imgSrc) : "") + (e.name ? ("_" + e.name) : "")
            } else {
                var thisText = "";
                if (Trim_udbac_shaggy($(e).text()).length > 20) {
                    thisText = Trim_udbac_shaggy($(e).text()).substring(0, 10)
                } else {
                    thisText = Trim_udbac_shaggy($(e).text())
                }
                si_x = thisText;
                t = (e.id ? ("_" + e.id) : "") + (manCenter ? ("_" + manCenter) : "") + (thisText ? ("_" + thisText) :
                    "") + (imgSrc ? ("_" + imgSrc) : "") + (e.name ? ("_" + e.name) : "")
            }
            j = e.type
        } if (!(e.tagName == "A" || e.tagName == "INPUT" || e.tagName == "BUTTON")) {
            if (!($(e).attr("onclick") || $._data(this, "events") && $._data(this, "events").click)) {
                return
            }
        }
        if (si_x != "" && si_n != "") {
            if ($(e).attr("wtEvent")) {
                t = $(e).attr("wtEvent")
            }
            _tag.dcsMultiTrack("DCS.dcsuri", "/nopv.gif", "WT.event", Trim_udbac_shaggy(t), "WT.nodeId", hex_md5(
                Trim_udbac_shaggy(t)), "WT.si_n", si_n, "WT.si_x", si_x, "WT.mobile", mobile, "WT.obj", j)
        } else {
            if ($(e).attr("wtEvent")) {
                t = $(e).attr("wtEvent")
            }
            _tag.dcsMultiTrack("DCS.dcsuri", "/nopv.gif", "WT.event", Trim_udbac_shaggy(t), "WT.nodeId", hex_md5(
                Trim_udbac_shaggy(t)), "WT.mobile", mobile, "WT.obj", j)
        }
    })
});
var _tag;
if (!window._tag) {
    function _wt() {};
    _wt.prototype.trackEvent = function () {};
    _wt.prototype.E = function ($h, $i) {
        var e = $h.target || $h.srcElement;
        while (e.tagName && (e.tagName.toLowerCase() != $i.toLowerCase())) {
            e = e.parentElement || e.parentNode;
            e = e || {}
        };
        return e
    };
    _wt.prototype.P = function ($h) {
        var x = $h.clientX;
        var y = $h.clientY;
        $j = (document.documentElement != undefined && document.documentElement.clientHeight != 0) ? document.documentElement :
            document.body;
        var $k = window.pageXOffset == undefined ? $j.scrollLeft : window.pageXOffset;
        var $l = window.pageYOffset == undefined ? $j.scrollTop : window.pageYOffset;
        return (x + $k) + "x" + (y + $l)
    };
    _wt.prototype.N = function ($h) {
        var id = "";
        var $m = "";
        var $c = ["div", "table"];
        var $n = $c.length;
        var i, e, $o;
        for (i = 0; i < $n; i++) {
            $o = $c[i];
            if ($o.length) {
                e = this.E($h, $o);
                id = (e.getAttribute && e.getAttribute("id")) ? e.getAttribute("id") : "";
                $m = e.className || "";
                if (id.length || $m.length) break
            }
        };
        return id.length ? id : $m
    };
    Function.prototype.wtbind = function ($p) {
        var $q = this;
        var $r = function () {
            return $q.apply($p, arguments)
        };
        return $r
    };
    _wt.prototype.dcsMultiTrack = function () {
        if (window.Webtrends) Webtrends.multiTrack({
                "argsa": arguments,
                delayTime: 100
            })
    };
    _tag = new _wt()
};
window.webtrendsAsyncInit = function () {
    var dcs = new Webtrends.dcs().init({
        domain: config.domain,
        dcsid: config.dcsid,
        fpcdom: config.fpc,
        fpc: "WT_FPC",
        timezone: 8,
        i18n: true,
        dcsdelay: 500,
        plugins: {}
    });
    dcs.WT.branch = config.branch;
    var mobile;
    if (localStorage.getItem('_userPhone_')) {
        mobile = localStorage.getItem('_userPhone_')
    } else {
        mobile = getMobile()
    }; if (mobile != '' && mobile != undefined && is_mobile(mobile)) {
        dcs.WT.mobile = mobile
    };
    dcs.track()
};
 
function is_mobile(mobile) {
    var reg = /^(\+[0-9]{2,}-?)?1(3[0-9]|5[0-35-9]|8[0-9]|4[57]|7[678])[0-9]{8}$/;
    return reg.test(mobile)
};
 
function get_a_random() {
    var a = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');
    return String(a[parseInt(Math.random() * (15 + 1), 10)])
};
 
function pre_fix_integer(num, n) {
    return (Array(n).join(0) + num).slice(-n)
};
 
function encode_mobile(mobile) {
    if (is_mobile(mobile)) {
        var key = 'abcdef';
        var mobile = String(mobile);
        mobile = mobile.substring(0, 2) + get_a_random() + get_a_random() + mobile.substring(2, 5) + get_a_random() +
            get_a_random() + mobile.substring(5, 8) + get_a_random() + mobile.substring(8, 11);
        var m1 = String(parseInt('0x' + String(mobile.substring(0, 4))) ^ key);
        var m2 = String(parseInt('0x' + String(mobile.substring(4, 8))) ^ key);
        var m3 = String(parseInt('0x' + String(mobile.substring(8, 12))) ^ key);
        var m4 = String(parseInt('0x' + String(mobile.substring(12, 16))) ^ key);
        return m3 + '-' + m4 + '-' + m1 + '-' + m2
    } else {
        return mobile;
    }
};
 
function decode_mobile(str) {
    var key = 'abcdef';
    str = str.split("-");
    var m3 = pre_fix_integer(Number(str[0] ^ key).toString(16), 4);
    var m4 = pre_fix_integer(Number(str[1] ^ key).toString(16), 4);
    var m1 = pre_fix_integer(Number(str[2] ^ key).toString(16), 4);
    var m2 = pre_fix_integer(Number(str[3] ^ key).toString(16), 4);
    var m5 = m1 + m2 + m3 + m4;
    return m5.substring(0, 2) + m5.substring(4, 7) + m5.substring(9, 12) + m5.substring(13, 17)
};
 
function Trim_udbac_shaggy(str) {
    if (str == '' || str == undefined) {
        return ''
    }
    var result = str.replace(/\s+/g, "");
    return result
};
 
function getSrc(src) {
    if (src) {
        var img_data = src.split("/");
        if (img_data.length > 0) {
            var img_list = img_data[img_data.length - 2] + '_' + img_data[img_data.length - 1].split(".")[0];
            return img_list
        }
    }
};
 
function splitPath(href) {
    var now_url = "",
        path_url = "",
        path_event = "",
        true_url;
    if (href) {
        now_url = href
    } else {
        now_url = window.location.href
    }; if (now_url.indexOf("redirect_uri") != -1) {
        true_url = now_url.split("?")[1];
        var false_url_a = true_url.split("&");
        for (var j = 0; j < false_url_a.length; j++) {
            if (false_url_a[j].indexOf("redirect_uri") != -1) {
                var re_url = unescape(false_url_a[j].replace("redirect_uri=", ""));
                path_url = re_url.split("?")[0]
            }
        }
    } else {
        path_url = now_url.split("?")[0]
    }; if (path_url) {
        var path_data = path_url.split("/");
        if (path_data) {
            path_event = (path_data.length > 0 ? path_data[path_data.length - 1] : "") + "_" + (path_data.length > 1 ?
                path_data[path_data.length - 2] : "");
            return path_event || ''
        }
    }
};
 
function getCookie(objName) {
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName) {
            return decodeURI(temp[1])
        }
    }
};
 
function getMobile() {
    var mobile = "";
    var metas = window.parent.document.getElementsByTagName("meta");
    for (i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute("name") == "WT.mobile") {
            mobile = metas[i].getAttribute("content");
            if (is_mobile(mobile)) {
                mobile = encode_mobile(mobile);
                metas[i].setAttribute("content", mobile)
            }
        }
    }
    if (mobile) {
        if (is_mobile(mobile)) {
            document.cookie = "mobile=" + encode_mobile(mobile) + ";path=/;domain=" + window.location.host.split(":")[0]
        } else {
            document.cookie = "mobile=" + mobile + ";path=/;domain=" + window.location.host.split(":")[0]
        }
    } else {
        mobile = document.cookie.replace(/(?:(?:^|.*;\s*)mobile\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if (mobile) {
            if (is_mobile(mobile)) {
                mobile = encode_mobile(mobile)
            } else {
                mobile = mobile
            }
        }
    }
    return mobile
};
var n = void 0;
(function (i, j, k, l) {
    function m(a) {
        if (a) {
            if (!a.forEach) a.forEach = function (a, c) {
                    for (var e = c || window, d = 0, g = this.length; d < g; ++d) a.call(e, this[d], d, this)
            };
            if (!a.filter) a.filter = function (a, c) {
                    for (var e = c || window, d = [], g = 0, h = this.length; g < h; ++g) a.call(e, this[g], g, this) &&
                            d.push(this[g]);
                    return d
            };
            if (!a.indexOf) a.indexOf = function (a) {
                    for (var c = 0; c < this.length; ++c) if (this[c] === a) return c;
                    return -1
            }
        }
        return a
    }
    if (!i.Ba || !i.Ba.zb) {
        var d = {
            zb: !0,
            e: {},
            plugins: {},
            hb: 0,
            f: {},
            addEventListener: i.addEventListener ? function (a, b, c) {
                a.addEventListener && a.addEventListener(b, c, !1)
            } : function (a, b, c) {
                a.attachEvent && a.attachEvent("on" + b, c, !1)
            },
            h: {},
            version: "10.12.3.1",
            i: {},
            pb: !1,
            t: 500,
            $: function () {
                if (/MSIE ([0-9]{1,}[.0-9]{0,})/.exec(k.userAgent) != null) d.da = parseFloat(RegExp.$1);
                if (l.search) d.i = d.pa(l.search);
                if (i.webtrendsAsyncInit && !i.webtrendsAsyncInit.hasRun) i.webtrendsAsyncInit(), i.webtrendsAsyncInit.hasRun = !
                        0;
                d.addEventListener(i, "load", function () {
                    d.pb = !0
                })
            },
            g: function (a) {
                return Object.prototype.toString.call(a) === "[object Function]"
            },
            qb: function (a) {
                var b = [],
                    c;
                for (c in a) a.hasOwnProperty(c) && a[c] != "" && a[c] != n && typeof a[c] != "function" && b.push({
                        k: c,
                        v: a[c]
                    });
                return b
            },
            extend: function (a, b, c) {
                for (var e in b) if (c || typeof a[e] === "undefined") a[e] = b[e];
                return a
            },
            find: function (a) {
                if (!d.wa) d.wa = d.nb();
                return d.wa(a)
            },
            nb: function () {
                var a = /MSIE (\d+)/.exec(k.userAgent),
                    a = a ? a[1] : 99;
                if (j.querySelectorAll && j.body && a > 8) {
                    var b = j.body;
                    return function (a) {
                        return b.querySelectorAll(a)
                    }
                }
                if (i.jQuery) return i.jQuery.find;
                if (i.Sizzle) return i.Sizzle;
                if (i.YAHOO && YAHOO.za && YAHOO.za.Aa) return YAHOO.za.Aa.Nb;
                if ("qwery" in i) return qwery;
                i.YUI && YUI().Pb("node", function (a) {
                    return a.all
                });
                return j.querySelectorAll ? (b = j.body) ? function (a) {
                    return b.querySelectorAll(a)
                } : function () {
                    return []
                } : function () {
                    return []
                }
            },
            pa: function (a) {
                var a = a.split(/[&?]/g),
                    b = {};
                try {
                    for (var c = 0, e = a.length; c < e; ++c) {
                        var d = a[c].match(/^([^=]+)(?:=([\s\S]*))?/);
                        if (d && d[1]) {
                            var g = "";
                            try {
                                g = decodeURIComponent(d[1])
                            } catch (h) {
                                try {
                                    g = unescape(d[1])
                                } catch (j) {
                                    g = d[1]
                                }
                            }
                            var i = "";
                            try {
                                i = decodeURIComponent(d[2])
                            } catch (k) {
                                try {
                                    i = unescape(d[2])
                                } catch (l) {
                                    i = d[2]
                                }
                            }
                            b[g] ? (b[g] = [b[g]], b[g].push(i)) : b[g] = i
                        }
                    }
                } catch (m) {}
                return b
            },
            aa: function (a, b, c) {
                arguments.length < 2 && (b = !0);
                var e = j.createElement("script");
                e.type = "text/javascript";
                e.async = b;
                e.src = a;
                var d = j.getElementsByTagName("script")[0];
                d.parentNode.insertBefore(e, d)
            },
            V: function (a, b) {
                var c = a.target || a.srcElement;
                if (typeof b == "string") {
                    var e = b,
                        b = {};
                    b[e.toUpperCase()] = 1
                }
                for (; c && c.tagName && !b[c.tagName.toUpperCase()];) c = c.parentElement || c.parentNode;
                return c
            },
            fa: function (a) {
                return typeof encodeURIComponent == "function" ? encodeURIComponent(a) : escape(a)
            },
            sa: function (a) {
                var o = a;
                if (typeof (arguments[0]) == "string") {
                    o = {
                        'argsa': Array.prototype.slice.call(arguments)
                    }
                }
                for (var b in d.e) d.e[b].ha(o);
                return !1
            },
            Q: function (a, b, c) {
                b || (b = "collect");
                c ? d.D("transform." + b, a, c) : d.D("transform." + b, a);
                return this
            },
            D: function (a, b, c) {
                function e(b, c) {
                    d.h[a][b.n] || (d.h[a][b.n] = m([]));
                    d.h[a][b.n].push(c)
                }
                if (a && b && a != "" && d.g(b)) {
                    a === "wtmouseup" && (a = "wtmouse");
                    if (a === "wtmouse" && !d.ta) {
                        var f = /MSIE (\d+)/.exec(k.userAgent);
                        d.addEventListener(j, (f ? f[1] : 99) >= 8 ? "mousedown" : "mouseup", function (b) {
                            if (!b) b = window.event;
                            d.Pa(a, {
                                event: b
                            })
                        });
                        d.ta = !0
                    }
                    d.h[a] || (d.h[a] = {});
                    if (c) e(c, b);
                    else for (var g in d.e) e(d.e[g], b)
                }
            },
            Pa: function (a, b) {
                for (var c in d.e) d.fireEvent(a, d.e[c], b)
            },
            Ca: function (a, b, c, e) {
                if (typeof b === "function") return b.onetime ? (c.push(b), !0) : (b(a, e), !1)
            },
            fireEvent: function (a, b, c) {
                var e = m([]);
                if (d.h[a] && d.h[a][b.n]) {
                    a = d.h[a][b.n];
                    if (!a.length) return;
                    for (var f = a.length - 1; f >= 0; f--) d.Ca(b, a[f], e, c) && a.pop()
                }
                e.forEach(function (a) {
                    a(b, c)
                })
            },
            ca: function (a, b) {
                var c = !1,
                    e;
                for (e in d.e) {
                    var f = d.e[e];
                    a in f.plugins && (c = !0, f.ca(a, b))
                }
                c || b({
                    Mb: !0
                })
            },
            T: function (a, b) {
                for (var c = j.cookie.split("; "), e = [], d = 0, g = 0, h = a.length, p = c.length, g = 0; g < p; g++) {
                    var i = c[g];
                    i.substring(0, h + 1) == a + "=" && (e[d++] = i)
                }
                c = e.length;
                if (c > 0) {
                    d = 0;
                    if (c > 1 && a == b) {
                        p = new Date(0);
                        for (g = 0; g < c; g++) i = new Date(parseInt(this.Wa(e[g], "lv"))), i > p && (p.setTime(i.getTime()),
                                d = g)
                    }
                    return unescape(e[d].substring(h + 1))
                } else return null
            },
            Wa: function (a, b, c) {
                a = a.split(c || ":");
                for (c = 0; c < a.length; c++) {
                    var e = a[c].split("=");
                    if (b == e[0]) return e[1]
                }
                return null
            }
        }, q = d.fireEvent,
            r = d.D;
        d.b = function () {
            this.na = i.RegExp ?
                /dcs(uri)|(ref)|(aut)|(met)|(sta)|(sip)|(pro)|(byt)|(dat)|(p3p)|(cfg)|(redirect)|(cip)/i : "";
            this.va = {};
            this.plugins = this.plugins = {};
            this.d = this.WT = {};
            this.j = this.DCS = {};
            this.q = this.DCSext = {};
            this.n = this.dcssID = "dcsobj_" + d.hb++;
            this.images = this.images = [];
            this.ma = this.errors = [];
            this.a = this.FPCConfig = {};
            this.c = this.TPCConfig = {};
            this.images = [];
            this.w = [];
            this.Eb = [];
            this.l = [];
            this.N = [];
            this.P = "";
            this.ba = this.p = 0;
            this.X = this.oa = "";
            this.ta = !1;
            return this
        };
        d.b.prototype = {
            $: function (a) {
                function b(b, c) {
                    return a.hasOwnProperty(b) ? a[b] : c
                }
                function c(a, b, c) {
                    return !a ? c : a.hasOwnProperty(b) ? a[b] : c
                }
                this.Gb = a;
                this.I = b("errorlogger", function () {});
                this.gb = this.dcsid = a.dcsid;
                this.L = this.queue = b("queue", []);
                this.domain = this.domain = b("domain", "statse.webtrendslive.com");
                this.Bb = this.timezone = b("timezone", -8);
                this.enabled = this.enabled = b("enabled", !0);
                this.Z = this.i18n = b("i18n", !0);
                this.va = i.RegExp ? this.Z ? {
                    "%25": /\%/g,
                    "%26": /\&/g,
                    "%23": /\#/g
                } : {
                    "%09": /\t/g,
                    "%20": / /g,
                    "%23": /\#/g,
                    "%26": /\&/g,
                    "%2B": /\+/g,
                    "%3F": /\?/g,
                    "%5C": /\\/g,
                    "%22": /\"/g,
                    "%7F": /\x7F/g,
                    "%A0": /\xA0/g
                } : "";
                if (a.metanames) this.ra = m(a.metanames.toLowerCase().split(","));
                i.webtrendsAsyncLoad && typeof i.webtrendsAsyncLoad === "function" && !b("privateFlag", !1) && d.D(
                    "onready", window.webtrendsAsyncLoad, this);
                this.M = this.vtid = b("vtid", n);
                this.ua = b("paidsearchparams", "gclid");
                this.yb = this.splitvalue = b("splitvalue", "");
                d.t = a.dcsdelay || d.t;
                this.ib = this.delayAll = b("delayAll", !1);
                this.K = this.preserve = b("preserve", !0);
                this.w = m(b("navigationtag", "div,table").toLowerCase().split(","));
                this.l = b("onsitedoms", "");
                if (!d.g(this.l.test)) this.l = m(this.l.toLowerCase().split(",")), this.l.forEach(function (a, b, c) {
                        c[b] = a.replace(/^\s*/, "").replace(/\s*$/, "")
                    });
                this.N = m(b("downloadtypes", "xls,doc,pdf,txt,csv,zip,docx,xlsx,rar,gzip").toLowerCase().split(","));
                this.N.forEach(function (a, b, c) {
                    c[b] = a.replace(/^\s*/, "").replace(/\s*$/, "")
                });
                if (b("adimpressions", !1)) this.P = b("adsparam", "WT.ac");
                this.a.enabled = this.FPCConfig.enabled = c(a.FPCConfig, "enabled", !0);
                this.a.domain = this.FPCConfig.domain = c(a.FPCConfig, "domain", b("fpcdom", ""));
                this.a.name = this.FPCConfig.name = c(a.FPCConfig, "name", b("fpc", "WT_FPC"));
                this.a.u = this.FPCConfig.expiry = c(a.FPCConfig, "expires", b("cookieexpires", 63113851500));
                this.a.u = this.a.u < 63113851500 ? this.a.u : 63113851500;
                this.a.kb = new Date(this.getTime() + this.a.u);
                this.a.wb = this.a.u === 0;
                this.c.enabled = this.TPCConfig.enabled = c(a.TPCConfig, "enabled", !b("disablecookie", !1));
                this.c.R = this.TPCConfig.cfgType = c(a.TPCConfig, "cfgType", !this.c.enabled ? "1" : "");
                if (a.cookieTypes) if (a.cookieTypes.toLowerCase() === "none") this.a.enabled = !1, this.c.enabled = !1,
                            this.c.R = "1";
                    else if (a.cookieTypes.toLowerCase() === "firstpartyonly") this.a.enabled = !0, this.c.enabled = !1,
                        this.c.R = "1";
                else if (a.cookieTypes.toLowerCase() === "all") this.a.enabled = !0, this.c.enabled = !0, this.c.R = c(
                        a.TPCConfig, "cfgType", "");
                this.Jb = this.fpc = this.a.name;
                this.Kb = this.fpcdom = this.a.domain;
                this.Ib = this.cookieExp = this.a.u;
                m(b("pageEvents", [])).forEach(function (b) {
                    this.Db = a[b.toLowerCase()] = !0
                });
                b("offsite", !1) && this.Ma();
                b("download", !1) && this.Ka();
                b("anchor", !1) && this.Ja();
                b("javascript", !1) && this.La();
                b("rightclick", !1) && this.Na();
                b("privateFlag", !1) || (d.e[this.n] = this);
                this.plugins = a.plugins || {};
                this.Fa();
                d.f[this.domain] || (d.f[this.domain] = "");
                !b("privateFlag", !1) && this.a.enabled && this.Ya(this.n);
                this.F();
                return this
            },
            Fa: function () {
                for (var a in this.plugins) {
                    var b = this.plugins[a];
                    if (!d.plugins[a]) {
                        d.plugins[a] = b;
                        var c = b.src;
                        d.g(c) ? i.setTimeout(function (a) {
                            return function () {
                                a()
                            }
                        }(c), 1) : d.aa(c, !1)
                    }
                    if (!b.async) {
                        var e = this;
                        b.loaded = !1;
                        this.p++;
                        b.Qb && this.ba++;
                        b.timeout && i.setTimeout(function (a) {
                            return function () {
                                if (!a.loaded) a.Ab = !0, e.p--, e.F()
                            }
                        }(b), b.timeout)
                    }
                }
            },
            Za: function (a) {
                if (typeof a != "undefined")!d.f[this.domain] && a.gTempWtId && (d.f[this.domain] = a.gTempWtId), this.X =
                    a.gTempWtId, !d.f[this.domain] && a.gWtId && (d.f[this.domain] = a.gWtId), this.oa = a.gWtAccountRollup;
                this.p--;
                this.F()
            },
            Ya: function (a) {
                return j.cookie.indexOf(this.a.name + "=") == -1 && j.cookie.indexOf("WTLOPTOUT=") == -1 && this.c.enabled ? !
                    1 : !0
            },
            ca: function (a, b) {
                var c = this.plugins[a];
                if (c) d.g(b) && (this.tb() ? b(this, c) : r("pluginsLoaded", function (a, b, c) {
                        function d() {
                            a(b, c)
                        }
                        d.onetime = !0;
                        return d
                    }(b, this, c), this)), c.loaded = !0, !c.async && !c.Ab && this.p--;
                this.F()
            },
            vb: function () {
                this.ba--;
                this.F()
            },
            tb: function () {
                return this.p <= 0
            },
            F: function () {
                if (this.p <= 0) {
                    if (!this.Ea) q("pluginsLoaded", this), this.Ea = !0;
                    this.ba <= 0 && this.xb()
                }
            },
            xb: function () {
                if (!this.Ga) q("onready", this), this.ob(), this.ub(), this.Ga = !0
            },
            ob: function () {
                for (var a = 0; a < this.L.length; a++) this.ka(this.L[a]);
                this.L = []
            },
            ub: function () {
                var a = this;
                this.L.push = function (b) {
                    a.ka(b)
                }
            },
            Q: function (a, b) {
                d.Q(a, b, this)
            },
            r: function (a, b) {
                var c = this,
                    e = d.extend({
                        domEvent: "click",
                        callback: n,
                        argsa: [],
                        args: {},
                        delayTime: n,
                        transform: n,
                        filter: n,
                        actionElems: {
                            A: 1,
                            INPUT: 1,
                            BUTTON: 1
                        },
                        finish: n
                    }, b, !0);
                r("wtmouse", function (b, g) {
                    c.Oa(c, a, d.extend(g, e, !0))
                }, c);
                return this
            },
            xa: function (a, b, c, e) {
                b.element = c;
                if (e === "form" || e === "input" || e === "button") b.domEvent = "submit";
                a.ea(b)
            },
            Oa: function (a, b, c) {
                var e = d.find;
                if (e && c.event && c.actionElems) {
                    var f = d.V(c.event, c.actionElems),
                        g = f.tagName ? f.tagName.toLowerCase() : "";
                    if (b.toUpperCase() in c.actionElems && b.toUpperCase() === g.toUpperCase()) return this.xa(a, c, f,
                            g);
                    if ((b = e(b)) && f && b && b.length) for (e = 0; e < b.length; e++) if (b[e] === f) {
                                this.xa(a, c, f, g);
                                break
                            }
                }
            },
            W: function (a, b) {
                var c = m(j.cookie.split("; ")).filter(function (b) {
                    return b.indexOf(a + "=") != -1
                })[0];
                if (!c || c.length < a.length + 1) return !1;
                m(c.split(a + "=")[1].split(":")).forEach(function (a) {
                    a = a.split("=");
                    b[a[0]] = a[1]
                });
                return !0
            },
            T: function (a) {
                return d.T(a, this.a.name)
            },
            cb: function (a, b, c) {
                var e = [],
                    b = d.qb(b);
                m(b).forEach(function (a) {
                    e.push(a.k + "=" + a.v)
                });
                e = e.sort().join(":");
                j.cookie = a + "=" + e + c
            },
            Ta: function (a, b, c) {
                a += "=";
                a += "; expires=expires=Thu, 01 Jan 1970 00:00:01 GMT";
                a += "; path=" + b;
                a += c ? ";domain=" + c : "";
                document.cookie = a
            },
            $a: function (a, b, c, d) {
                var f = {};
                return this.W(a, f) ? b == f.id && c == f.lv && d == f.ss ? 0 : 3 : 2
            },
            Xa: function () {
                var a = {};
                this.W(this.a.name, a);
                return a
            },
            Va: function () {
                if (j.cookie.indexOf("WTLOPTOUT=") == -1) if (this.d.ce = !this.a.enabled && !this.c.enabled ? "0" :
                        this.a.enabled && !this.c.enabled ? "1" : "2", this.a.enabled) {
                        var a = this.d,
                            b = this.a.name,
                            c = new Date,
                            e = c.getTimezoneOffset() * 6E4 + this.Bb * 36E5;
                        c.setTime(c.getTime() + e);
                        var f = new Date(c.getTime());
                        a.co_f = a.vtid = a.vtvs = a.vt_f = a.vt_f_a = a.vt_f_s = a.vt_f_d = a.vt_f_tlh = a.vt_f_tlv =
                            "";
                        var g = {};
                        if (this.W(b, g)) {
                            var h = g.id,
                                p = parseInt(g.lv),
                                i = parseInt(g.ss);
                            if (h == null || h == "null" || isNaN(p) || isNaN(i)) return;
                            a.co_f = h;
                            h = new Date(p);
                            a.vt_f_tlh = Math.floor((h.getTime() - e) / 1E3);
                            f.setTime(i);
                            if (c.getTime() > h.getTime() + 18E5 || c.getTime() > f.getTime() + 288E5) a.vt_f_tlv =
                                    Math.floor((f.getTime() - e) / 1E3), f.setTime(c.getTime()), a.vt_f_s = "1";
                            if (c.getDate() != h.getDate() || c.getMonth() != h.getMonth() || c.getFullYear() != h.getFullYear())
                                a.vt_f_d = "1"
                        } else {
                            if (this.X.length) a.co_f = d.f[this.domain].length ? d.f[this.domain] : this.X, a.vt_f =
                                    "1";
                            else if (d.f[this.domain].length) a.co_f = d.f[this.domain];
                            else {
                                a.co_f = "2";
                                i = c.getTime().toString();
                                for (h = 2; h <= 32 - i.length; h++) a.co_f += Math.floor(Math.random() * 16).toString(
                                        16);
                                a.co_f += i;
                                a.vt_f = "1"
                            }
                            this.oa.length == 0 && (a.vt_f_a = "1");
                            a.vt_f_s = a.vt_f_d = "1";
                            a.vt_f_tlh = a.vt_f_tlv = "0"
                        }
                        a.co_f = escape(a.co_f);
                        a.vtid = typeof this.M == "undefined" ? a.co_f : this.M || "";
                        a.vtvs = (f.getTime() - e).toString();
                        e = (this.a.wb ? "" : "; expires=" + this.a.kb.toGMTString()) + "; path=/" + (this.a.domain !=
                            "" ? "; domain=" + this.a.domain : "");
                        c = c.getTime().toString();
                        f = f.getTime().toString();
                        g.id = a.co_f;
                        g.lv = c;
                        g.ss = f;
                        this.cb(b, g, e);
                        b = this.$a(b, a.co_f, c, f);
                        var thisCookie = document.cookie;
                        var thisCookieArr = thisCookie.split(";");
                        var currentId = "";
                        var currentTime = "";
                        for (var i = 0; i < thisCookieArr.length; i++) {
                            if (thisCookieArr[i].indexOf("WT_FPC=") > -1) {
                                if (currentTime) {
                                    if (Number(currentTime) < Number(thisCookieArr[i].split(":")[1].split("=")[1])) {
                                        currentTime = thisCookieArr[i].split(":")[1].split("=")[1];
                                        currentId = thisCookieArr[i].split(":")[0].split("id=")[1]
                                    }
                                } else {
                                    currentTime = thisCookieArr[i].split(":")[1].split("=")[1];
                                    currentId = thisCookieArr[i].split(":")[0].split("id=")[1]
                                }
                            }
                        }
                        if (b != 0) {
                            a.co_f = currentId;
                            a.vtvs = a.vt_f_s = a.vt_f_d = a.vt_f_tlh = a.vt_f_tlv = "", typeof this.M == "undefined" &&
                                (a.vtid = ""), a.vt_f = a.vt_f_a = b
                        };
                    } else this.d.vtid = this.M ? this.M : "", this.Ta(this.a.name, "/", this.a.domain)
            },
            Cb: function () {
                try {
                    var a;
                    arguments && arguments.length > 1 ? a = {
                        argsa: Array.prototype.slice.call(arguments)
                    } : arguments.length === 1 && (a = arguments[0]);
                    typeof a === "undefined" && (a = {
                        element: n,
                        event: n,
                        Fb: []
                    });
                    typeof a.argsa === "undefined" && (a.argsa = []);
                    this.la("collect", a);
                    return this
                } catch (b) {
                    this.ma.push(b), this.I(b)
                }
            },
            ha: function (a) {
                a && a.length > 1 && (a = {
                    argsa: Array.prototype.slice.call(arguments)
                });
                this.ea(a)
            },
            ea: function (a) {
                try {
                    typeof a === "undefined" && (a = {});
                    this.la("multitrack", a);
                    if (a.delayTime) {
                        var b = Number(a.delayTime);
                        this.ya(isNaN(b) ? d.t : b)
                    } else this.ib && this.ya(d.t);
                    return !1
                } catch (c) {
                    this.ma.push(c), this.I(c)
                }
            },
            Ra: function () {
                this.j = {};
                this.d = {};
                this.q = {};
                arguments.length % 2 == 0 && this.U(arguments)
            },
            U: function (a) {
                if (a) for (var b = 0, c = a.length; b < c; b += 2) a[b].indexOf("WT.") == 0 ? this.d[a[b].substring(3)] =
                            a[b + 1] : a[b].indexOf("DCS.") == 0 ? this.j[a[b].substring(4)] = a[b + 1] : a[b].indexOf(
                            "DCSext.") == 0 && (this.q[a[b].substring(7)] = a[b + 1])
            },
            eb: function (a) {
                var b, c;
                if (this.K) {
                    this.C = [];
                    for (var d = 0, f = a.length; d < f; d += 2) c = a[d], c.indexOf("WT.") == 0 ? (b = c.substring(3),
                            this.C.push(c, this.d[b] || "")) : c.indexOf("DCS.") == 0 ? (b = c.substring(4), this.C.push(
                            c, this.j[b] || "")) : c.indexOf("DCSext.") == 0 && (b = c.substring(7), this.C.push(c,
                            this.q[b] || ""))
                }
            },
            bb: function () {
                if (this.K) this.U(this.C), this.C = []
            },
            fb: function () {
                var a = new Date,
                    b = this,
                    c = this.d,
                    e = this.j;
                c.tz = parseInt(a.getTimezoneOffset() / 60 * -1) || "0";
                c.bh = a.getHours() || "0";
                c.ul = k.language || k.userLanguage;
                if (typeof screen == "object") c.cd = k.appName == "Netscape" ? screen.pixelDepth : screen.colorDepth,
                        c.sr = screen.width + "x" + screen.height;
                typeof k.javaEnabled() == "boolean" && (c.jo = k.javaEnabled() ? "Yes" : "No");
                j.title && (c.ti = i.RegExp ? j.title.replace(RegExp("^" + l.protocol + "//" + l.hostname + "\\s-\\s"),
                    "") : j.title);
                c.js = "Yes";
                c.jv = function () {
                    var a = navigator.userAgent.toLowerCase(),
                        b = parseInt(navigator.appVersion),
                        c = a.indexOf("mac") != -1,
                        d = a.indexOf("firefox") != -1,
                        e = a.indexOf("firefox/0.") != -1,
                        f = a.indexOf("firefox/1.0") != -1,
                        g = a.indexOf("firefox/1.5") != -1,
                        h = a.indexOf("firefox/2.0") != -1,
                        j = !d && a.indexOf("mozilla") != -1 && a.indexOf("compatible") == -1,
                        i = a.indexOf("msie") != -1 && a.indexOf("opera") == -1,
                        k = i && b == 4 && a.indexOf("msie 4") != -1,
                        i = i && !k,
                        l = a.indexOf("opera 5") != -1 || a.indexOf("opera/5") != -1,
                        m = a.indexOf("opera 6") != -1 || a.indexOf("opera/6") != -1,
                        a = a.indexOf("opera") != -1 && !l && !m,
                        o = "1.1";
                    d && !e && !f & !g & !h ? o = "1.8" : h ? o = "1.7" : g ? o = "1.6" : e || f || j && b >= 5 || a ?
                        o = "1.5" : c && i || m ? o = "1.4" : i || j && b == 4 || l ? o = "1.3" : k && (o = "1.2");
                    return o
                }();
                c.ct = "unknown";
                if (j.body && j.body.addBehavior) try {
                        j.body.addBehavior("#default#clientCaps"), c.ct = j.body.Hb || "unknown", j.body.addBehavior(
                            "#default#homePage"), c.hp = j.body.Lb(location.href) ? "1" : "0"
                } catch (f) {
                    b.I(f)
                }
                var g = 0,
                    h = 0;
                if (typeof i.innerWidth == "number") g = i.innerWidth, h = i.innerHeight;
                else if (j.documentElement && (j.documentElement.clientWidth || j.documentElement.clientHeight)) g = j.documentElement
                        .clientWidth, h = j.documentElement.clientHeight;
                else if (j.body && (j.body.clientWidth || j.body.clientHeight)) g = j.body.clientWidth, h = j.body.clientHeight;
                c.bs = g + "x" + h;
                c.fv = function () {
                    var a;
                    if (i.ActiveXObject) for (a = 15; a > 0; a--) try {
                                return new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + a), a + ".0"
                    } catch (c) {
                        b.I(c)
                    } else if (k.plugins && k.plugins.length) for (a = 0; a < k.plugins.length; a++) if (k.plugins[a].name
                                .indexOf("Shockwave Flash") != -1) return k.plugins[a].description.split(" ")[2];
                    return "Not enabled"
                }();
                c.slv = function () {
                    var a = "Not enabled";
                    try {
                        k.userAgent.indexOf("MSIE") != -1 ? new ActiveXObject("AgControl.AgControl") && (a = "Unknown") :
                            k.plugins["Silverlight Plug-In"] && (a = "Unknown")
                    } catch (c) {
                        b.I(c)
                    }
                    if (a != "Not enabled") {
                        var d, e, f;
                        if (typeof Silverlight == "object" && typeof Silverlight.qa == "function") {
                            for (d = 9; d > 0; d--) {
                                e = d;
                                if (Silverlight.qa(e + ".0")) break;
                                if (a == e) break
                            }
                            for (d = 9; d >= 0; d--) {
                                f = e + "." + d;
                                if (Silverlight.qa(f)) {
                                    a = f;
                                    break
                                }
                                if (a == f) break
                            }
                        }
                    }
                    return a
                }();
                this.Z && (c.le = typeof j.defaultCharset == "string" ? j.defaultCharset : typeof j.characterSet ==
                    "string" ? j.characterSet : "unknown");
                c.tv = d.version;
                c.sp = this.yb;
                c.dl = "0";
                if (d.i && d.i.lb) c.fb_ref = d.i.lb;
                if (d.i && d.i.mb) c.fb_source = d.i.mb;
                c.ssl = l.protocol.indexOf("https:") == 0 ? "1" : "0";
                e.dcsdat = a.getTime();
                e.dcssip = l.hostname;
                e.dcsuri = l.pathname;
                c.es = l.href;
                if (l.search) e.dcsqry = (l.search);
                if (e.dcsqry) {
                    a = e.dcsqry.toLowerCase();
                    g = this.ua.length ? this.ua.toLowerCase().split(",") : [];
                    for (h = 0; h < g.length; h++) if (a.indexOf(g[h] + "=") != -1) {
                            c.srch = "1";
                            break
                        }
                }
                if (j.referrer != "" && j.referrer != "-" && !(k.appName == "Microsoft Internet Explorer" && parseInt(k
                    .appVersion) < 4)) e.dcsref = j.referrer;
                e.dcscfg = this.c.R
            },
            Ua: function (a, b) {
                if (b != "") {
                    if (a === null || a === n) return "";
                    var a = a.toString(),
                        c;
                    for (c in b) b[c] instanceof RegExp && (a = a.replace(b[c], c));
                    return a
                } else return escape(a)
            },
            S: function (a, b) {
                if (this.Z && this.na != "" && !this.na.test(a)) if (a == "dcsqry") {
                        for (var c = "", e = b.substring(1).split("&"), f = 0; f < e.length; f++) {
                            var g = e[f],
                                h = g.indexOf("=");
                            if (h != -1) {
                                var i = g.substring(0, h),
                                    g = g.substring(h + 1);
                                f != 0 && (c += "&");
                                c += i + "=" + d.fa(g)
                            }
                        }
                        b = b.substring(0, 1) + c
                    } else b = d.fa(b);
                return "&" + a + "=" + this.Ua(b, this.va)
            },
            Sa: function (a, b) {
                if (j.images) {
                    var c = new Image;
                    this.images.push(c);
                    if (true) {
                        var e = !1;
                        if (d.g(b.callback)) f = b.callback;
                        else f = function (a, b) {};
                        g = this;
                        c.onload = function () {
                            if (!e) return e = !0, f(g, b), !0
                        };
                        i.setTimeout(function () {
                            if (!e) {
                                c.removeAttribute("src");
                                return e = !0, f(g, b), !0
                            }
                        }, d.t)
                    }
                    c.src = a
                }
            },
            ab: function () {
                var a;
                j.documentElement ? a = j.getElementsByTagName("meta") : j.all && (a = j.all.Ob("meta"));
                if (typeof a != "undefined") for (var b = a.length, c = 0; c < b; c++) {
                        var d = a.item(c).name,
                            f = a.item(c).content;
                        a.item(c);
                        d.length > 0 && (d = d.toLowerCase(), d.toUpperCase().indexOf("WT.") == 0 ? this.d[d.substring(
                            3)] = f : d.toUpperCase().indexOf("DCSEXT.") == 0 ? this.q[d.substring(7)] = f : d.toUpperCase()
                            .indexOf("DCS.") == 0 ? this.j[d.substring(4)] = f : this.ra && this.ra.indexOf(d) != -1 &&
                            (this.q["meta_" + d] = f))
                }
            },
            ia: function (a) {
                if (j.cookie.indexOf("WTLOPTOUT=") == -1) {
                    var b = this.d,
                        c = this.j,
                        e = this.q,
                        f = this.i18n;
                    if (config.sdc_server != n && config.sdc_server instanceof Array) {
                        for (var i = 0; i < config.sdc_server.length; i++) {
                            if (typeof config.sdc_server[i] === "function" && this.d != n && this.j != n) {
                                var wx = config.sdc_server[i](this.d, this.j);
                                if (wx != n) {
                                    var domain = wx[0] || this.domain,
                                        dcsid = wx[1] || this.dcsid,
                                        b = wx[2] || this.d;
                                    c = wx[3] || this.j;
                                    e = this.q;
                                    f = this.i18n;
                                    if (domain != n && dcsid != n) {
                                        g = "http" + (l.protocol.indexOf("https:") == 0 ? "s" : "") + "://" + domain +
                                            (dcsid == "" ? "" : "/" + dcsid) + "/dcs.gif?";
                                        f && (b.dep = "");
                                        for (var h in c) {
                                            c[h] != "" && c[h] != n && typeof c[h] != "function" && (g += this.S(h, c[h]))
                                        }
                                        for (h in b) {
                                            b[h] != "" && b[h] != n && typeof b[h] != "function" && (g += this.S("WT." +
                                                h, b[h]))
                                        }
                                        for (h in e) {
                                            if (e[h] != "" && e[h] != n && typeof e[h] != "function") {
                                                f && (b.dep = b.dep.length == 0 ? h : b.dep + ";" + h), g += this.S(h,
                                                    e[h])
                                            }
                                        }
                                        f && b.dep.length > 0 && (g += this.S("WT.dep", b.dep));
                                        d.da && d.da < 9 && g.length > 2048 && (g = g.substring(0, 2040) + "&WT.tu=1");
                                        this.Sa(g, a);
                                        this.d.ad = ""
                                    }
                                }
                            }
                        }
                    }
                }
            },
            rb: function () {
                this.fb();
                this.ab();
                this.P && this.P.length > 0 && this.Qa();
                this.sb = !0
            },
            getTime: function () {
                return (new Date).getTime()
            },
            jb: 0,
            ya: function (a) {
                for (var b = this.getTime(); this.getTime() - b < a;) this.jb++
            },
            la: function (a, b) {
                a || (a = "collect");
                this.L.push({
                    action: a,
                    message: b
                })
            },
            ka: function (a) {
                var b = "action_" + a.action,
                    c = a.message;
                this.sb || this.rb();
                c.event && !c.element && (c.element = d.V(c.event, {
                    A: 1
                }));
                if (!d.g(c.filter) || !c.filter(this, c)) {
                    if (c.args) {
                        c.argsa = c.argsa || [];
                        for (var e in c.args) c.argsa.push(e, c.args[e])
                    }
                    c.element && c.element.getAttribute && c.element.getAttribute("data-wtmt") && (c.argsa = c.argsa.concat(
                        c.element.getAttribute("data-wtmt").split(",")));
                    q("transform." + a.action, this, c);
                    q("transform.all", this, c);
                    c.transform && d.g(c.transform) && c.transform(this, c);
                    if (this.enabled) {
                        this.Va();
                        if (d.g(this[b])) this[b](c);
                        q("finish." + a.action, this, c);
                        q("finish.all", this, c);
                        c.finish && d.g(c.finish) && c.finish(this, c)
                    }
                }
            },
            Ia: function (a) {
                var b = a && a.argsa && a.argsa.length % 2 == 0;
                b && (this.eb(a.argsa), this.U(a.argsa));
                this.j.dcsdat = this.getTime();
                this.ia(a);
                b && this.bb()
            },
            Ha: function (a) {
                a && a.argsa && a.argsa.length % 2 == 0 && this.U(a.argsa);
                this.ia(a)
            },
            J: function (a) {
                var b = document.createElement("a");
                b.href = a.href;
                a = {};
                a.H = b.hostname ? b.hostname.split(":")[0] : window.location.hostname;
                a.o = b.pathname ? b.pathname.indexOf("/") != 0 ? "/" + b.pathname : b.pathname : "/";
                a.m = b.search ? b.search.substring(b.search.indexOf("?") + 1, b.search.length) : "";
                a.G = i.location;
                return a
            },
            ga: function (a, b) {
                if (a.length > 0) {
                    a = a.toLowerCase();
                    if (a == window.location.hostname.toLowerCase()) return !0;
                    if (d.g(b.test)) return b.test(a);
                    else if (b.length > 0) for (var c = b.length, e = 0; e < c; e++) if (a == b[e]) return !0
                }
                return !1
            },
            ja: function (a, b) {
                for (var c = a.toLowerCase().substring(a.lastIndexOf(".") + 1, a.length), d = b.length, f = 0; f < d; f++)
                    if (c == b[f]) return !0;
                return !1
            },
            s: function (a, b) {
                var c = "",
                    e = "",
                    f = b.length,
                    g, h;
                for (g = 0; g < f; g++) if (h = b[g], h.length && (e = d.V(a, h), c = e.getAttribute && e.getAttribute(
                        "id") ? e.getAttribute("id") : "", e = e.className || "", c.length || e.length)) break;
                return c.length ? c : e
            },
            Y: function (a, b, c) {
                var e = j.all ? b.innerText : b.text,
                    a = d.V(a, {
                        IMG: 1
                    }),
                    f;
                if (a && a.alt) f = a.alt;
                else if (e) f = e;
                else if (b.innerHTML) f = b.innerHTML;
                return f ? f : c
            },
            B: function () {
                if (!this.K) this.Da = this.K = !0
            },
            z: function () {
                this.Da = this.K = !1
            },
            O: function (a) {
                var b = !1;
                if (!a) a = window.event;
                a.which ? b = a.which == 3 : a.button && (b = a.button == 2);
                return b
            },
            Ma: function () {
                this.r("a", {
                    filter: function (a, b) {
                        var c = b.element || {}, d = b.event || {};
                        return c.hostname && !a.ga(c.hostname, a.l) && !a.O(d) ? !1 : !0
                    },
                    transform: function (a, b) {
                        var c = b.event || {}, d = b.element || {};
                        a.B(b);
                        d = a.J(d);
                        b.argsa.push("DCS.dcssip", d.H, "DCS.dcsuri", d.o, "DCS.dcsqry", d.m, "DCS.dcsref", d.G,
                            "WT.ti", "Offsite:" + d.H + d.o + (d.m.length ? "?" + d.m : ""), "WT.dl", "24", "WT.nv", a.s(
                            c, a.w))
                    },
                    finish: function (a) {
                        a.z()
                    }
                })
            },
            Ja: function () {
                this.r("a", {
                    filter: function (a, b) {
                        var c = b.element || {}, d = b.event || {};
                        return a.ga(c.hostname, a.l) && c.hash && c.hash != "" && c.hash != "#" && !a.O(d) ? !1 : !0
                    },
                    transform: function (a, b) {
                        var c = b.event || {}, d = b.element || {};
                        a.B(b);
                        d = a.J(d);
                        b.argsa.push("DCS.dcssip", d.H, "DCS.dcsuri", escape(d.o + b.element.hash), "DCS.dcsqry", d.m,
                            "DCS.dcsref", d.G, "WT.ti", escape("Anchor:" + b.element.hash), "WT.nv", a.s(c, a.w),
                            "WT.dl", "21")
                    },
                    finish: function (a) {
                        a.z()
                    }
                })
            },
            Ka: function () {
                this.r("a", {
                    filter: function (a, b) {
                        var c = b.event || {};
                        return a.ja((b.element || {}).pathname, a.N) && !a.O(c) ? !1 : !0
                    },
                    transform: function (a, b) {
                        var c = b.event || {}, d = b.element || {};
                        a.B(b);
                        var f = a.J(d),
                            d = a.Y(c, d, f.o);
                        b.argsa.push("DCS.dcssip", f.H, "DCS.dcsuri", f.o, "DCS.dcsqry", f.m, "DCS.dcsref", f.G,
                            "WT.ti", "Download:" + d, "WT.nv", a.s(c, a.w), "WT.dl", "20")
                    },
                    finish: function (a) {
                        a.z()
                    }
                })
            },
            Na: function () {
                this.r("a", {
                    filter: function (a, b) {
                        var c = b.event || {};
                        return a.ja((b.element || {}).pathname, a.N) && a.O(c) ? !1 : !0
                    },
                    transform: function (a, b) {
                        var c = b.event || {}, d = b.element || {};
                        a.B(b);
                        var f = a.J(d),
                            d = a.Y(c, d, f.o);
                        b.argsa.push("DCS.dcssip", f.H, "DCS.dcsuri", f.o, "DCS.dcsqry", f.m, "DCS.dcsref", f.G,
                            "WT.ti", "RightClick:" + d, "WT.nv", a.s(c, a.w), "WT.dl", "25")
                    },
                    finish: function (a) {
                        a.z()
                    }
                })
            },
            La: function () {
                this.r("a", {
                    filter: function (a, b) {
                        var c = b.element || {};
                        return c.href && c.protocol && c.protocol.toLowerCase() === "javascript:" ? !1 : !0
                    },
                    transform: function (a, b) {
                        var c = b.event || {}, d = b.element || {};
                        a.B(b);
                        var f = a.J(d);
                        b.argsa.push("DCS.dcssip", i.location.hostname, "DCS.dcsuri", d.href, "DCS.dcsqry", f.m,
                            "DCS.dcsref", f.G, "WT.ti", "JavaScript:" + (d.innerHTML ? d.innerHTML : ""), "WT.dl", "22",
                            "WT.nv", a.s(c, a.w))
                    },
                    finish: function (a) {
                        a.z()
                    }
                })
            },
            Qa: function () {
                if (j.links) {
                    var a = this.P + "=",
                        b = a.length,
                        a = RegExp(a, "i"),
                        c = j.links.length,
                        d = end = -1,
                        f = urlp = value = "",
                        g, f = j.URL + "",
                        d = f.search(a);
                    d != -1 && (end = f.indexOf("&", d), urlp = f.substring(d, end != -1 ? end : f.length), g = RegExp(
                        urlp + "(&|#)", "i"));
                    for (var h = 0; h < c; h++) if (j.links[h].href && (f = j.links[h].href + "", urlp.length > 0 && (f =
                            f.replace(g, "$1")), d = f.search(a), d != -1)) d += b, end = f.indexOf("&", d), value = f.substring(
                                d, end != -1 ? end : f.length), this.d.ad = this.d.ad ? this.d.ad + ";" + value : value
                }
            }
        };
        d.b.prototype.action_multitrack = d.b.prototype.Ia;
        d.b.prototype.action_collect = d.b.prototype.Ha;
        i.dcsMultiTrack = function () {
            for (var a = [], b = 0; b < arguments.length; b++) a[b] = arguments[b];
            d.sa({
                argsa: a
            })
        };
        i.Webtrends = d;
        i.WebTrends = d;
        d.multiTrack = d.sa;
        d.dcs = d.b;
        d.dcss = d.e;
        d.addTransform = d.Q;
        d.bindEvent = d.D;
        d.getQryParams = d.pa;
        d.qryparams = d.i;
        d.dcsdelay = d.t;
        d.find = d.find;
        d.loadJS = d.aa;
        d.registerPlugin = d.ca;
        d.registerPluginCallback = d.vb;
        d.dcsGetCookie = d.T;
        d.b.prototype.init = d.b.prototype.$;
        d.b.prototype.dcsMultiTrack = d.b.prototype.ha;
        d.b.prototype.track = d.b.prototype.Cb;
        d.b.prototype.addSelector = d.b.prototype.r;
        d.b.prototype.dcsGetIdCallback = d.b.prototype.Za;
        d.b.prototype.dcsCleanUp = d.b.prototype.Ra;
        d.b.prototype.dcsGetFPC = d.b.prototype.Xa;
        d.b.prototype.addTransform = d.b.prototype.Q;
        d.b.prototype.dcsGetCookie = d.b.prototype.T;
        d.b.prototype.dcsNavigation = d.b.prototype.s;
        d.b.prototype.getTTL = d.b.prototype.Y;
        d.$()
    }
})(window, window.document, window.navigator, window.location);