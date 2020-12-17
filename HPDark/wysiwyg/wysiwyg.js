/* SCEditor v2.1.3 | (C) 2017, Sam Clarke | sceditor.com/license */

!function() {
    "use strict";
    function e(e, t) {
        return typeof t === e
    }
    var be = e.bind(null, "string")
      , xe = e.bind(null, "undefined")
      , we = e.bind(null, "function")
      , o = e.bind(null, "number");
    function t(e) {
        return !Object.keys(e).length
    }
    function Ce(e, t) {
        for (var n = e === !!e, o = n ? 2 : 1, r = n ? t : e, i = !!n && e; o < arguments.length; o++) {
            var a = arguments[o];
            for (var l in a) {
                var c = a[l];
                if (!xe(c)) {
                    var s = null !== c && "object" == typeof c && Object.getPrototypeOf(c) === Object.prototype
                      , u = Array.isArray(c);
                    r[l] = i && (s || u) ? Ce(!0, r[l] || (u ? [] : {}), c) : c
                }
            }
        }
        return r
    }
    function ke(e, t) {
        var n = e.indexOf(t);
        -1 < n && e.splice(n, 1)
    }
    function Se(t, n) {
        if (Array.isArray(t) || "length"in t && o(t.length))
            for (var e = 0; e < t.length; e++)
                n(e, t[e]);
        else
            Object.keys(t).forEach(function(e) {
                n(e, t[e])
            })
    }
    var i = {}
      , Ee = 1
      , Te = 3;
    function a(e) {
        return e = parseFloat(e),
        isFinite(e) ? e : 0
    }
    function De(e, t, n) {
        var o = (n || document).createElement(e);
        return Se(t || {}, function(e, t) {
            "style" === e ? o.style.cssText = t : e in o ? o[e] = t : o.setAttribute(e, t)
        }),
        o
    }
    function Me(e, t) {
        for (var n = e || {}; (n = n.parentNode) && !/(9|11)/.test(n.nodeType); )
            if (!t || We(n, t))
                return n
    }
    function Ne(e, t) {
        return We(e, t) ? e : Me(e, t)
    }
    function Re(e) {
        e.parentNode && e.parentNode.removeChild(e)
    }
    function Fe(e, t) {
        e.appendChild(t)
    }
    function He(e, t) {
        return e.querySelectorAll(t)
    }
    var _e = !0;
    function ze(n, e, o, r, i) {
        e.split(" ").forEach(function(e) {
            var t;
            be(o) ? (t = r["_sce-event-" + e + o] || function(e) {
                for (var t = e.target; t && t !== n; ) {
                    if (We(t, o))
                        return void r.call(t, e);
                    t = t.parentNode
                }
            }
            ,
            r["_sce-event-" + e + o] = t) : (t = o,
            i = r),
            n.addEventListener(e, t, i || !1)
        })
    }
    function Oe(n, e, o, r, i) {
        e.split(" ").forEach(function(e) {
            var t;
            be(o) ? t = r["_sce-event-" + e + o] : (t = o,
            i = r),
            n.removeEventListener(e, t, i || !1)
        })
    }
    function Ae(e, t, n) {
        if (arguments.length < 3)
            return e.getAttribute(t);
        null == n ? r(e, t) : e.setAttribute(t, n)
    }
    function r(e, t) {
        e.removeAttribute(t)
    }
    function Be(e) {
        Pe(e, "display", "none")
    }
    function Ie(e) {
        Pe(e, "display", "")
    }
    function Le(e) {
        Je(e) ? Be(e) : Ie(e)
    }
    function Pe(n, e, t) {
        if (arguments.length < 3) {
            if (be(e))
                return 1 === n.nodeType ? getComputedStyle(n)[e] : null;
            Se(e, function(e, t) {
                Pe(n, e, t)
            })
        } else {
            var o = (t || 0 === t) && !isNaN(t);
            n.style[e] = o ? t + "px" : t
        }
    }
    function Ve(e, t, n) {
        var o = arguments.length
          , r = {};
        if (e.nodeType === Ee) {
            if (1 === o)
                return Se(e.attributes, function(e, t) {
                    /^data\-/i.test(t.name) && (r[t.name.substr(5)] = t.value)
                }),
                r;
            if (2 === o)
                return Ae(e, "data-" + t);
            Ae(e, "data-" + t, String(n))
        }
    }
    function We(e, t) {
        var n = !1;
        return e && e.nodeType === Ee && (n = (e.matches || e.msMatchesSelector || e.webkitMatchesSelector).call(e, t)),
        n
    }
    function je(e, t) {
        return t.parentNode.insertBefore(e, t)
    }
    function l(e) {
        return e.className.trim().split(/\s+/)
    }
    function qe(e, t) {
        return We(e, "." + t)
    }
    function Ue(e, t) {
        var n = l(e);
        n.indexOf(t) < 0 && n.push(t),
        e.className = n.join(" ")
    }
    function $e(e, t) {
        var n = l(e);
        ke(n, t),
        e.className = n.join(" ")
    }
    function Ye(e, t, n) {
        (n = xe(n) ? !qe(e, t) : n) ? Ue(e, t) : $e(e, t)
    }
    function Ke(e, t) {
        if (xe(t)) {
            var n = getComputedStyle(e)
              , o = a(n.paddingLeft) + a(n.paddingRight)
              , r = a(n.borderLeftWidth) + a(n.borderRightWidth);
            return e.offsetWidth - o - r
        }
        Pe(e, "width", t)
    }
    function Xe(e, t) {
        if (xe(t)) {
            var n = getComputedStyle(e)
              , o = a(n.paddingTop) + a(n.paddingBottom)
              , r = a(n.borderTopWidth) + a(n.borderBottomWidth);
            return e.offsetHeight - o - r
        }
        Pe(e, "height", t)
    }
    function Ge(e, t, n) {
        var o;
        we(window.CustomEvent) ? o = new CustomEvent(t,{
            bubbles: !0,
            cancelable: !0,
            detail: n
        }) : (o = e.ownerDocument.createEvent("CustomEvent")).initCustomEvent(t, !0, !0, n),
        e.dispatchEvent(o)
    }
    function Je(e) {
        return !!e.getClientRects().length
    }
    function Qe(e, t, n, o, r) {
        for (e = r ? e.lastChild : e.firstChild; e; ) {
            var i = r ? e.previousSibling : e.nextSibling;
            if (!n && !1 === t(e) || !o && !1 === Qe(e, t, n, o, r) || n && !1 === t(e))
                return !1;
            e = i
        }
    }
    function Ze(e, t, n, o) {
        Qe(e, t, n, o, !0)
    }
    function et(e, t) {
        var n = (t = t || document).createDocumentFragment()
          , o = De("div", {}, t);
        for (o.innerHTML = e; o.firstChild; )
            Fe(n, o.firstChild);
        return n
    }
    function tt(e) {
        return e && (!We(e, "p,div") || e.className || Ae(e, "style") || !t(Ve(e)))
    }
    function nt(e, t) {
        var n = De(t, {}, e.ownerDocument);
        for (Se(e.attributes, function(e, t) {
            try {
                Ae(n, t.name, t.value)
            } catch (e) {}
        }); e.firstChild; )
            Fe(n, e.firstChild);
        return e.parentNode.replaceChild(n, e),
        n
    }
    var c = "|body|hr|p|div|h1|h2|h3|h4|h5|h6|address|pre|form|table|tbody|thead|tfoot|th|tr|td|li|ol|ul|blockquote|center|";
    function ot(e) {
        return !!/11?|9/.test(e.nodeType) && "|iframe|area|base|basefont|br|col|frame|hr|img|input|wbr|isindex|link|meta|param|command|embed|keygen|source|track|object|".indexOf("|" + e.nodeName.toLowerCase() + "|") < 0
    }
    function rt(e, t) {
        var n, o = (e || {}).nodeType || Te;
        return o !== Ee ? o === Te : "code" === (n = e.tagName.toLowerCase()) ? !t : c.indexOf("|" + n + "|") < 0
    }
    function s(e, t) {
        t.style.cssText = e.style.cssText + t.style.cssText
    }
    function it(e) {
        Qe(e, function(e) {
            var t, n, o = !rt(e, !0);
            if (o && rt(e.parentNode, !0)) {
                var r = function(e) {
                    for (; rt(e.parentNode, !0); )
                        e = e.parentNode;
                    return e
                }(e)
                  , i = u(r, e)
                  , a = e;
                s(r, a),
                je(i, r),
                je(a, r)
            }
            if (o && We(e, "ul,ol") && We(e.parentNode, "ul,ol")) {
                var l = (t = "li",
                n = e.previousElementSibling,
                t && n ? We(n, t) ? n : null : n);
                l || je(l = De("li"), e),
                Fe(l, e)
            }
        })
    }
    function d(e, t) {
        return e ? (t ? e.previousSibling : e.nextSibling) || d(e.parentNode, t) : null
    }
    function at(e) {
        var t, n, o, r, i, a, l, c = Pe(e, "whiteSpace"), s = /line$/i.test(c), u = e.firstChild;
        if (!/pre(\-wrap)?$/i.test(c))
            for (; u; ) {
                if (a = u.nextSibling,
                t = u.nodeValue,
                (n = u.nodeType) === Ee && u.firstChild && at(u),
                n === Te) {
                    for (o = d(u),
                    r = d(u, !0),
                    l = !1; qe(r, "sceditor-ignore"); )
                        r = d(r, !0);
                    if (rt(u) && r) {
                        for (i = r; i.lastChild; )
                            for (i = i.lastChild; qe(i, "sceditor-ignore"); )
                                i = d(i, !0);
                        l = i.nodeType === Te ? /[\t\n\r ]$/.test(i.nodeValue) : !rt(i)
                    }
                    t = t.replace(/\u200B/g, ""),
                    r && rt(r) && !l || (t = t.replace(s ? /^[\t ]+/ : /^[\t\n\r ]+/, "")),
                    o && rt(o) || (t = t.replace(s ? /[\t ]+$/ : /[\t\n\r ]+$/, "")),
                    t.length ? u.nodeValue = t.replace(s ? /[\t ]+/g : /[\t\n\r ]+/g, " ") : Re(u)
                }
                u = a
            }
    }
    function u(e, t) {
        var n = e.ownerDocument.createRange();
        return n.setStartBefore(e),
        n.setEndAfter(t),
        n.extractContents()
    }
    function lt(e) {
        for (var t = 0, n = 0; e; )
            t += e.offsetLeft,
            n += e.offsetTop,
            e = e.offsetParent;
        return {
            left: t,
            top: n
        }
    }
    function f(e, t) {
        var n, o, r = e.style;
        if (i[t] || (i[t] = t.replace(/^-ms-/, "ms-").replace(/-(\w)/g, function(e, t) {
            return t.toUpperCase()
        })),
        o = r[t = i[t]],
        "textAlign" === t) {
            if (n = r.direction,
            o = o || Pe(e, t),
            Pe(e.parentNode, t) === o || "block" !== Pe(e, "display") || We(e, "hr,th"))
                return "";
            if (/right/i.test(o) && "rtl" === n || /left/i.test(o) && "ltr" === n)
                return ""
        }
        return o
    }
    var n, p, m, ct = {
        toolbar: "bold,italic,underline,strike|left,center,right|font,size,color,removeformat|bulletlist|code,quote|image,email,link,unlink|emoticon,youtube,date,time|ltr,rtl|source",
        toolbarExclude: null,
        style: "jquery.sceditor.default.css",
        fonts: "Arial,Arial Black,Comic Sans MS,Courier New,Georgia,Impact,Sans-serif,Serif,Times New Roman,Trebuchet MS,Verdana",
        colors: "ggsgrrgr,red,purple,orange|yellow,gray,green,indigo|DarkBlue,Brown,Silver,Gold|HotPink,Cyan,YellowGreen,White",
        locale: Ae(document.documentElement, "lang") || "en",
        charset: "utf-8",
        emoticonsCompat: !1,
        emoticonsEnabled: !0,
        emoticonsRoot: "",
        emoticons: {
            dropdown: {
                ":-)": "https://hportal.co.il/html//emoticons/smile.gif ",
                ":כועס:": "https://hportal.co.il/html//emoticons/angry2.gif",
                ":חםלי:": "https://hportal.co.il/html//emoticons/64caf316.gif",
                "מלווו": "https://hportal.co.il/html//emoticons/mellow.gif",
                ":P": "https://hportal.co.il/html//emoticons/tongue.gif",
                "=/": "https://hportal.co.il/html//emoticons/ohhh.gif",
                ":שאלה:": "https://hportal.co.il/html//emoticons/huh2.gif",
                ":מאושר:": "https://hportal.co.il/html//emoticons/d16c4689.gif",
                ":אוהב:": "https://hportal.co.il/html//emoticons/inlove.gif",
                ":חכם:": "https://hportal.co.il/html//emoticons/dodrjmkhnmcz.gif",
                ":צוחק:": "https://hportal.co.il/html//emoticons/XD.gif",
                ":שורק:": "https://hportal.co.il/html//emoticons/da4c2d5e.gif"
            },
            more: {
                ":חכהחכה:": "https://hportal.co.il/html//emoticons/wait.gif",
                ":עף:": "https://hportal.co.il/html//emoticons/06.gif",
                ":משתחווה:": "https://hportal.co.il/html//emoticons/s17.gif",
                ":רגוע:": "https://hportal.co.il/html//emoticons/423523.gif",
                ":><:": "https://hportal.co.il/html//emoticons/zftkodrmmjfi.gif",
                "מוחעחע": "https://hportal.co.il/html//emoticons/evil.gif",
                ":מכריז:": "https://hportal.co.il/html//emoticons/onion28.gif",
                ":לילהטוב:": "https://hportal.co.il/html//emoticons/goon.gif",
                ":חולה:": "https://hportal.co.il/html//emoticons/12.gif",
                ":כדורגל:": "https://hportal.co.il/html//emoticons/f5f49335.gif",
                ":למה:": "https://hportal.co.il/html//emoticons/why.gif",
                ":נבוך:": "https://hportal.co.il/html//emoticons/onion52.gif",
                ":רוחרפאים:": "https://hportal.co.il/html//emoticons/died.gif",
                ":משעמם:": "https://hportal.co.il/html//emoticons/boring.gif",
                ":לחץ:": "https://hportal.co.il/html//emoticons/1875cee9.gif",
                ":פגוע:": "https://hportal.co.il/html//emoticons/s15.gif",
                ":דם:": "https://hportal.co.il/html//emoticons/cfed93e2.gif",
                "-_-": "https://hportal.co.il/html//emoticons/closedeyes.gif",
                ":כדורגלן:": "https://hportal.co.il/html//emoticons/860e2a45.gif",
                ":מתחנן:": "https://hportal.co.il/html//emoticons/fadeba25z.gif",
                "<<": "https://hportal.co.il/html//emoticons/disgust.gif",
                ":מעשן:": "https://hportal.co.il/html//emoticons/27.gif",
                ":<_<:": "https://hportal.co.il/html//emoticons/dry.gif",
                ":בוכה:": "https://hportal.co.il/html//emoticons/11111.gif",
                ":היי2:": "https://hportal.co.il/html//emoticons/girl.gif",
                ":מגולגל:": "https://hportal.co.il/html//emoticons/d4e4b46b.gif",
                ":בוכהמאד:": "https://hportal.co.il/html//emoticons/crying.gif",
                ":קר:": "https://hportal.co.il/html//emoticons/cold.gif",
                ":8": "https://hportal.co.il/html//emoticons/cool.gif",
                ":D": "https://hportal.co.il/html//emoticons/biggrin.gif",
                ":בבקשה:": "https://hportal.co.il/html//emoticons/please.gif",
                ":מת:": "https://hportal.co.il/html//emoticons/485c3a61.gif",
                ":נהדר:": "https://hportal.co.il/html//emoticons/finger.gif",
                ":נאנח:": "https://hportal.co.il/html//emoticons/1b38f9e2.gif",
                ":רטוב:": "https://hportal.co.il/html//emoticons/fadeba1b-1.gif",
                ":מגשש:": "https://hportal.co.il/html//emoticons/098eb4a5.gif",
                ":ביי:": "https://hportal.co.il/html//emoticons/bye.gif",
                ";:(": "https://hportal.co.il/html//emoticons/mad.gif",
                ")-:": "https://hportal.co.il/html//emoticons/sad.gif",
                ":!": "https://hportal.co.il/html//emoticons/sick.gif",
                ":O": "https://hportal.co.il/html//emoticons/ohmy.gif",
                "@_@": "https://hportal.co.il/html//emoticons/confused.gif",
                ":יא:": "https://hportal.co.il/html//emoticons/stars.gif",
                ":הא:": "https://hportal.co.il/html//emoticons/huh.gif",
                ":יאי:": "https://hportal.co.il/html//emoticons/af48944b.gif",
                ":נעלבלב:": "https://hportal.co.il/html//emoticons/s118.gif",
                ":O_O:": "https://hportal.co.il/html//emoticons/blink.gif",
                ":צוהל:": "https://hportal.co.il/html//emoticons/3ca8b998.gif",
                ":תמים:": "https://hportal.co.il/html//emoticons/whistle.gif",
                ":בעד:": "https://hportal.co.il/html//emoticons/cooli.gif",
                "לאאאאאאאאא": "https://hportal.co.il/html//emoticons/mmgjznxegm0u.gif",
                ":היי:": "https://hportal.co.il/html//emoticons/hi.gif",
                "דאא": "https://hportal.co.il/html//emoticons/da.gif",
                ":חכם:": "https://hportal.co.il/html//emoticons/dodrjmkhnmcz.gif",
                ":מטורף:": "https://hportal.co.il/html//emoticons/63d4808b.gif",
                ":שיניים:": "https://hportal.co.il/html//emoticons/f6eb47d3.gif",
                ":נעלב:": "https://hportal.co.il/html//emoticons/offenced.gif",
                ":שבע:": "https://hportal.co.il/html//emoticons/48.gif",
                ":בשוםאופן:": "https://hportal.co.il/html//emoticons/6184ceba.gif",
                ":תןלי:": "https://hportal.co.il/html//emoticons/comeon.gif",
                ":לאולא:": "https://hportal.co.il/html//emoticons/df13952b.gif",
                ":חם:": "https://hportal.co.il/html//emoticons/hot.gif",
                ":מאוהב:": "https://hportal.co.il/html//emoticons/6f428754.gif",
                ":גיבור:": "https://hportal.co.il/html//emoticons/hero.gif",
                "^_^": "https://hportal.co.il/html//emoticons/happy.gif",
                ":מסמיק:": "https://hportal.co.il/html//emoticons/embarced.gif",
                ":מבוהל:": "https://hportal.co.il/html//emoticons/spooky.gif",
                ":זועם:": "https://hportal.co.il/html//emoticons/215ad82f.gif",
                ":WTF:": "https://hportal.co.il/html//emoticons/WTF.gif",
                ":ארגג:": "https://hportal.co.il/html//emoticons/th_116_.gif",
                ":וואו:": "https://hportal.co.il/html//emoticons/th_117_.gif",
                ":מרושע:": "https://hportal.co.il/html//emoticons/65ac83c9d212051924a6c2462ae9a509.gif",
                ":שנון:": "https://hportal.co.il/html//emoticons/cc51e6846ba3d7c11fde90aa07f63ca9.gif",
                ":רותח:": "https://hportal.co.il/html//emoticons/hot2-onion-head-emoticon.gif",
                ":מובס:": "https://hportal.co.il/html//emoticons/th_015_orz-v2.gif",
                ":$": "https://hportal.co.il/html//emoticons/blush.gif",
                ":עושהעיניים:": "https://hportal.co.il/html//emoticons/big-eye-onion-head-emoticon.gif",
                ":מסמיק1:": "https://hportal.co.il/html//emoticons/61.gif",
                ":מאסטרשיפו:": "https://hportal.co.il/html//emoticons/6167963.png"
            },
            hidden: {
                ":whistling:": "emoticons/whistling.png",
                ":love:": "emoticons/wub.png"
            }
        },
        width: null,
        height: null,
        resizeEnabled: !0,
        resizeMinWidth: null,
        resizeMinHeight: null,
        resizeMaxHeight: null,
        resizeMaxWidth: null,
        resizeHeight: !0,
        resizeWidth: !0,
        dateFormat: "year-month-day",
        toolbarContainer: null,
        enablePasteFiltering: !1,
        disablePasting: !1,
        readOnly: !1,
        rtl: !1,
        autofocus: !1,
        autofocusEnd: !0,
        autoExpand: !1,
        autoUpdate: !1,
        spellcheck: !0,
        runWithoutWysiwygSupport: !1,
        startInSourceMode: !1,
        id: null,
        plugins: "",
        zIndex: null,
        bbcodeTrim: !1,
        disableBlockRemove: !1,
        parserOptions: {},
        dropDownCss: {}
    }, g = navigator.userAgent, h = function() {
        for (var e = 3, t = document, n = t.createElement("div"), o = n.getElementsByTagName("i"); n.innerHTML = "\x3c!--[if gt IE " + ++e + "]><i></i><![endif]--\x3e",
        o[0]; )
            ;
        return t.documentMode && t.all && window.atob && (e = 10),
        4 === e && t.documentMode && (e = 11),
        4 < e ? e : void 0
    }(), st = "-ms-ime-align"in document.documentElement.style, ut = /iPhone|iPod|iPad| wosbrowser\//i.test(g), dt = ((m = document.createElement("div")).contentEditable = !0,
    "contentEditable"in document.documentElement && "true" === m.contentEditable && (p = /Opera Mobi|Opera Mini/i.test(g),
    /Android/i.test(g) && (p = !0,
    /Safari/.test(g) && (p = !(n = /Safari\/(\d+)/.exec(g)) || !n[1] || n[1] < 534)),
    / Silk\//i.test(g) && (p = !(n = /AppleWebKit\/(\d+)/.exec(g)) || !n[1] || n[1] < 534),
    ut && (p = /OS [0-4](_\d)+ like Mac/i.test(g)),
    /Firefox/i.test(g) && (p = !1),
    /OneBrowser/i.test(g) && (p = !1),
    "UCWEB" === navigator.vendor && (p = !1),
    h <= 9 && (p = !0),
    !p)), v = /^(https?|s?ftp|mailto|spotify|skype|ssh|teamspeak|tel):|(\/\/)|data:image\/(png|bmp|gif|p?jpe?g);/i;
    function ft(e) {
        return e.replace(/([\-.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
    }
    function pt(e, t) {
        if (!e)
            return e;
        var n = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "  ": "&nbsp; ",
            "\r\n": "<br />",
            "\r": "<br />",
            "\n": "<br />"
        };
        return !1 !== t && (n['"'] = "&#34;",
        n["'"] = "&#39;",
        n["`"] = "&#96;"),
        e = e.replace(/ {2}|\r\n|[&<>\r\n'"`]/g, function(e) {
            return n[e] || e
        })
    }
    var y = {
        html: '<!DOCTYPE html><html{attrs}><head><style>.ie * {min-height: auto !important} .ie table td {height:15px} @supports (-ms-ime-align:auto) { * { min-height: auto !important; } }</style><meta http-equiv="Content-Type" content="text/html;charset={charset}" /></head><body contenteditable="true" id="wysiwygDivContent" {spellcheck}><p></p></body></html>',
        toolbarButton: '<a class="sceditor-button sceditor-button-{name}" data-sceditor-command="{name}" unselectable="on"><div unselectable="on">{dispName}</div></a>',
        emoticon: '<img src="{url}" data-sceditor-emoticon="{key}" alt="{key}" title="{tooltip}" />',
        fontOpt: '<a class="sceditor-font-option" href="#" data-font="{font}"><font face="{font}">{font}</font></a>',
        sizeOpt: '<a class="sceditor-fontsize-option" data-size="{size}" href="#"><font size="{size}">{size}</font></a>',
        pastetext: '<div><label for="txt">{label}</label> <textarea cols="20" rows="7" id="txt"></textarea></div><div><input type="button" class="button" value="{insert}" /></div>',
        table: '<div><label for="rows">{rows}</label><input type="text" id="rows" value="2" /></div><div><label for="cols">{cols}</label><input type="text" id="cols" value="2" /></div><div><input type="button" class="button" value="{insert}" /></div>',
        image: '<div><label for="link">{url}</label> <input type="text" id="image" dir="ltr" placeholder="https://" /></div><div><label for="width">{width}</label> <input type="text" id="width" size="2" dir="ltr" /></div><div><label for="height">{height}</label> <input type="text" id="height" size="2" dir="ltr" /></div><div><input type="button" class="button" value="{insert}" /></div>',
        email: '<div><label for="email">{label}</label> <input type="text" id="email" dir="ltr" /></div><div><label for="des">{desc}</label> <input type="text" id="des" /></div><div><input type="button" class="button" value="{insert}" /></div>',
        link: '<div><label for="link">{url}</label> <input type="text" id="link" dir="ltr" placeholder="https://" /></div><div><label for="des">{desc}</label> <input type="text" id="des" /></div><div><input type="button" class="button" value="{ins}" /></div>',
        youtubeMenu: '<div><label for="link">{label}</label> <input type="text" id="link" dir="ltr" placeholder="https://" /></div><div><input type="button" class="button" value="{insert}" /></div>',
        youtube: '<iframe width="560" height="315" frameborder="0" allowfullscreen src="https://www.youtube.com/embed/{id}?wmode=opaque&start={time}" data-youtube-id="{id}"></iframe>'
    };
    function mt(e, t, n) {
        var o = y[e];
        return Object.keys(t).forEach(function(e) {
            o = o.replace(new RegExp(ft("{" + e + "}"),"g"), t[e])
        }),
        n && (o = et(o)),
        o
    }
    var b = h && h < 11;
    function x(e) {
        if ("mozHidden"in document)
            for (var t, n = e.getBody(); n; ) {
                if ((t = n).firstChild)
                    t = t.firstChild;
                else {
                    for (; t && !t.nextSibling; )
                        t = t.parentNode;
                    t && (t = t.nextSibling)
                }
                3 === n.nodeType && /[\n\r\t]+/.test(n.nodeValue) && (/^pre/.test(Pe(n.parentNode, "whiteSpace")) || Re(n)),
                n = t
            }
    }
    var gt = {
        bold: {
            exec: "bold",
            tooltip: "Bold",
            shortcut: "Ctrl+B"
        },
        italic: {
            exec: "italic",
            tooltip: "Italic",
            shortcut: "Ctrl+I"
        },
        underline: {
            exec: "underline",
            tooltip: "Underline",
            shortcut: "Ctrl+U"
        },
        strike: {
            exec: "strikethrough",
            tooltip: "Strikethrough"
        },
        subscript: {
            exec: "subscript",
            tooltip: "Subscript"
        },
        superscript: {
            exec: "superscript",
            tooltip: "Superscript"
        },
        left: {
            state: function(e) {
                if (e && 3 === e.nodeType && (e = e.parentNode),
                e) {
                    var t = "ltr" === Pe(e, "direction")
                      , n = Pe(e, "textAlign");
                    return "left" === n || n === (t ? "start" : "end")
                }
            },
            exec: "justifyleft",
            tooltip: "Align left"
        },
        center: {
            exec: "justifycenter",
            tooltip: "Center"
        },
        right: {
            state: function(e) {
                if (e && 3 === e.nodeType && (e = e.parentNode),
                e) {
                    var t = "ltr" === Pe(e, "direction")
                      , n = Pe(e, "textAlign");
                    return "right" === n || n === (t ? "end" : "start")
                }
            },
            exec: "justifyright",
            tooltip: "Align right"
        },
        justify: {
            exec: "justifyfull",
            tooltip: "Justify"
        },
        font: {
            _dropDown: function(t, e, n) {
                var o = De("div");
                ze(o, "click", "a", function(e) {
                    n(Ve(this, "font")),
                    t.closeDropDown(!0),
                    e.preventDefault()
                }),
                t.opts.fonts.split(",").forEach(function(e) {
                    Fe(o, mt("fontOpt", {
                        font: e
                    }, !0))
                }),
                t.createDropDown(e, "font-picker", o)
            },
            exec: function(e) {
                var t = this;
                gt.font._dropDown(t, e, function(e) {
                    t.execCommand("fontname", e)
                })
            },
            tooltip: "Font Name"
        },
        size: {
            _dropDown: function(t, e, n) {
                var o = De("div");
                ze(o, "click", "a", function(e) {
                    n(Ve(this, "size")),
                    t.closeDropDown(!0),
                    e.preventDefault()
                });
                for (var r = 1; r <= 7; r++)
                    Fe(o, mt("sizeOpt", {
                        size: r
                    }, !0));
                t.createDropDown(e, "fontsize-picker", o)
            },
            exec: function(e) {
                var t = this;
                gt.size._dropDown(t, e, function(e) {
                    t.execCommand("fontsize", e)
                })
            },
            tooltip: "Font Size"
        },
        color: {
            _dropDown: function(t, e, n) {
                var o = De("div")
                  , r = ""
                  , i = gt.color;
                i._htmlCache || (t.opts.colors.split("|").forEach(function(e) {
                    r += '<div class="sceditor-color-column">',
                    e.split(",").forEach(function(e) {
                        console.log(e);
                        r += '<a href="#" class="sceditor-color-option" style="background-color: ' + e + '" data-color="' + e + '"></a>'
                    }),
                    r += "</div>"
                }),
                i._htmlCache = r),
                Fe(o, et(i._htmlCache)),
                ze(o, "click", "a", function(e) {
                    n(Ve(this, "color")),
                    t.closeDropDown(!0),
                    e.preventDefault()
                }),
                t.createDropDown(e, "color-picker", o)
            },
            exec: function(e) {
                var t = this;
                gt.color._dropDown(t, e, function(e) {
                    t.execCommand("forecolor", e)
                })
            },
            tooltip: "Font Color"
        },
        removeformat: {
            exec: "removeformat",
            tooltip: "Remove Formatting"
        },
        cut: {
            exec: "cut",
            tooltip: "Cut",
            errorMessage: "Your browser does not allow the cut command. Please use the keyboard shortcut Ctrl/Cmd-X"
        },
        copy: {
            exec: "copy",
            tooltip: "Copy",
            errorMessage: "Your browser does not allow the copy command. Please use the keyboard shortcut Ctrl/Cmd-C"
        },
        paste: {
            exec: "paste",
            tooltip: "Paste",
            errorMessage: "Your browser does not allow the paste command. Please use the keyboard shortcut Ctrl/Cmd-V"
        },
        pastetext: {
            exec: function(e) {
                var t, n = De("div"), o = this;
                Fe(n, mt("pastetext", {
                    label: o._("Paste your text inside the following box:"),
                    insert: o._("Insert")
                }, !0)),
                ze(n, "click", ".button", function(e) {
                    (t = He(n, "#txt")[0].value) && o.wysiwygEditorInsertText(t),
                    o.closeDropDown(!0),
                    e.preventDefault()
                }),
                o.createDropDown(e, "pastetext", n)
            },
            tooltip: "Paste Text"
        },
        bulletlist: {
            exec: function() {
                x(this),
                this.execCommand("insertunorderedlist")
            },
            tooltip: "Bullet list"
        },
        orderedlist: {
            exec: function() {
                x(this),
                this.execCommand("insertorderedlist")
            },
            tooltip: "Numbered list"
        },
        indent: {
            state: function(e, t) {
                var n, o, r;
                return We(t, "li") ? 0 : We(t, "ul,ol,menu") && (o = (n = this.getRangeHelper().selectedRange()).startContainer.parentNode,
                r = n.endContainer.parentNode,
                o !== o.parentNode.firstElementChild || We(r, "li") && r !== r.parentNode.lastElementChild) ? 0 : -1
            },
            exec: function() {
                var e = this.getRangeHelper().getFirstBlockParent();
                this.focus(),
                Ne(e, "ul,ol,menu") && this.execCommand("indent")
            },
            tooltip: "Add indent"
        },
        outdent: {
            state: function(e, t) {
                return Ne(t, "ul,ol,menu") ? 0 : -1
            },
            exec: function() {
                Ne(this.getRangeHelper().getFirstBlockParent(), "ul,ol,menu") && this.execCommand("outdent")
            },
            tooltip: "Remove one indent"
        },
        table: {
            exec: function(e) {
                var r = this
                  , i = De("div");
                Fe(i, mt("table", {
                    rows: r._("Rows:"),
                    cols: r._("Cols:"),
                    insert: r._("Insert")
                }, !0)),
                ze(i, "click", ".button", function(e) {
                    var t = Number(He(i, "#rows")[0].value)
                      , n = Number(He(i, "#cols")[0].value)
                      , o = "<table>";
                    0 < t && 0 < n && (o += Array(t + 1).join("<tr>" + Array(n + 1).join("<td>" + (b ? "" : "<br />") + "</td>") + "</tr>"),
                    o += "</table>",
                    r.wysiwygEditorInsertHtml(o),
                    r.closeDropDown(!0),
                    e.preventDefault())
                }),
                r.createDropDown(e, "inserttable", i)
            },
            tooltip: "Insert a table"
        },
        horizontalrule: {
            exec: "inserthorizontalrule",
            tooltip: "Insert a horizontal rule"
        },
        code: {
            exec: function() {
                this.wysiwygEditorInsertHtml("<code>", (b ? "" : "<br />") + "</code>")
            },
            tooltip: "Code"
        },
        image: {
            _dropDown: function(t, e, n, o) {
                var r = De("div");
                Fe(r, mt("image", {
                    url: t._("URL:"),
                    width: t._("Width (optional):"),
                    height: t._("Height (optional):"),
                    insert: t._("Insert")
                }, !0));
                var i = He(r, "#image")[0];
                i.value = n,
                ze(r, "click", ".button", function(e) {
                    i.value && o(i.value, He(r, "#width")[0].value, He(r, "#height")[0].value),
                    t.closeDropDown(!0),
                    e.preventDefault()
                }),
                t.createDropDown(e, "insertimage", r)
            },
            exec: function(e) {
                var r = this;
                gt.image._dropDown(r, e, "", function(e, t, n) {
                    var o = "";
                    t && (o += ' width="' + t + '"'),
                    n && (o += ' height="' + n + '"'),
                    r.wysiwygEditorInsertHtml("<img" + o + ' src="' + e + '" />')
                })
            },
            tooltip: "Insert an image"
        },
        email: {
            _dropDown: function(n, e, o) {
                var r = De("div");
                Fe(r, mt("email", {
                    label: n._("E-mail:"),
                    desc: n._("Description (optional):"),
                    insert: n._("Insert")
                }, !0)),
                ze(r, "click", ".button", function(e) {
                    var t = He(r, "#email")[0].value;
                    t && o(t, He(r, "#des")[0].value),
                    n.closeDropDown(!0),
                    e.preventDefault()
                }),
                n.createDropDown(e, "insertemail", r)
            },
            exec: function(e) {
                var n = this;
                gt.email._dropDown(n, e, function(e, t) {
                    n.focus(),
                    !n.getRangeHelper().selectedHtml() || t ? n.wysiwygEditorInsertHtml('<a href="mailto:' + e + '">' + (t || e) + "</a>") : n.execCommand("createlink", "mailto:" + e)
                })
            },
            tooltip: "Insert an email"
        },
        link: {
            _dropDown: function(t, e, n) {
                var o = De("div");
                Fe(o, mt("link", {
                    url: t._("URL:"),
                    desc: t._("Description (optional):"),
                    ins: t._("Insert")
                }, !0));
                var r = He(o, "#link")[0];
                function i(e) {
                    r.value && n(r.value, He(o, "#des")[0].value),
                    t.closeDropDown(!0),
                    e.preventDefault()
                }
                ze(o, "click", ".button", i),
                ze(o, "keypress", function(e) {
                    13 === e.which && r.value && i(e)
                }, _e),
                t.createDropDown(e, "insertlink", o)
            },
            exec: function(e) {
                var n = this;
                gt.link._dropDown(n, e, function(e, t) {
                    n.focus(),
                    t || !n.getRangeHelper().selectedHtml() ? (t = t || e,
                    n.wysiwygEditorInsertHtml('<a href="' + e + '">' + t + "</a>")) : n.execCommand("createlink", e)
                })
            },
            tooltip: "Insert a link"
        },
        unlink: {
            state: function() {
                return Ne(this.currentNode(), "a") ? 0 : -1
            },
            exec: function() {
                var e = Ne(this.currentNode(), "a");
                if (e) {
                    for (; e.firstChild; )
                        je(e.firstChild, e);
                    Re(e)
                }
            },
            tooltip: "Unlink"
        },
        quote: {
            exec: function(e, t, n) {
                var o = "<blockquote>"
                  , r = "</blockquote>";
                t ? (o = o + (n = n ? "<cite>" + n + "</cite>" : "") + t + r,
                r = null) : "" === this.getRangeHelper().selectedHtml() && (r = (b ? "" : "<br />") + r),
                this.wysiwygEditorInsertHtml(o, r)
            },
            tooltip: "Insert a Quote"
        },
        emoticon: {
            exec: function(f) {
                var p = this
                  , m = function(e) {
                    var t, n, o = p.opts, r = o.emoticonsRoot || "", i = o.emoticonsCompat, a = p.getRangeHelper(), l = i && " " !== a.getOuterText(!0, 1) ? " " : "", c = i && " " !== a.getOuterText(!1, 1) ? " " : "", s = De("div"), u = De("div"), d = Ce({}, o.emoticons.dropdown, e ? o.emoticons.more : {});
                    return Fe(s, u),
                    n = Math.sqrt(Object.keys(d).length),
                    ze(s, "click", "img", function(e) {
                        p.insert(l + Ae(this, "alt") + c, null, !1).closeDropDown(!0),
                        e.preventDefault()
                    }),
                    Se(d, function(e, t) {
                        Fe(u, De("img", {
                            src: r + (t.url || t),
                            alt: e,
                            title: t.tooltip || e
                        })),
                        u.children.length >= n && (u = De("div"),
                        Fe(s, u))
                    }),
                    !e && o.emoticons.more && (Fe(t = De("a", {
                        className: "sceditor-more"
                    }), document.createTextNode(p._("More"))),
                    ze(t, "click", function(e) {
                        p.createDropDown(f, "more-emoticons", m(!0)),
                        e.preventDefault()
                    }),
                    Fe(s, t)),
                    s
                };
                p.createDropDown(f, "emoticons", m(!1))
            },
            txtExec: function(e) {
                gt.emoticon.exec.call(this, e)
            },
            tooltip: "Insert an emoticon"
        },
        youtube: {
            _dropDown: function(i, e, a) {
                var l = De("div");
                Fe(l, mt("youtubeMenu", {
                    label: i._("Video URL:"),
                    insert: i._("Insert")
                }, !0)),
                ze(l, "click", ".button", function(e) {
                    var t = He(l, "#link")[0].value
                      , n = t.match(/(?:v=|v\/|embed\/|youtu.be\/)(.{11})/)
                      , o = t.match(/[&|?](?:star)?t=((\d+[hms]?){1,3})/)
                      , r = 0;
                    o && Se(o[1].split(/[hms]/), function(e, t) {
                        "" !== t && (r = 60 * r + Number(t))
                    }),
                    n && /^[a-zA-Z0-9_\-]{11}$/.test(n[1]) && a(n[1], r),
                    i.closeDropDown(!0),
                    e.preventDefault()
                }),
                i.createDropDown(e, "insertlink", l)
            },
            exec: function(e) {
                var n = this;
                gt.youtube._dropDown(n, e, function(e, t) {
                    n.wysiwygEditorInsertHtml(mt("youtube", {
                        id: e,
                        time: t
                    }))
                })
            },
            tooltip: "Insert a YouTube video"
        },
        date: {
            _date: function(e) {
                var t = new Date
                  , n = t.getYear()
                  , o = t.getMonth() + 1
                  , r = t.getDate();
                return n < 2e3 && (n = 1900 + n),
                o < 10 && (o = "0" + o),
                r < 10 && (r = "0" + r),
                e.opts.dateFormat.replace(/year/i, n).replace(/month/i, o).replace(/day/i, r)
            },
            exec: function() {
                this.insertText(gt.date._date(this))
            },
            txtExec: function() {
                this.insertText(gt.date._date(this))
            },
            tooltip: "Insert current date"
        },
        time: {
            _time: function() {
                var e = new Date
                  , t = e.getHours()
                  , n = e.getMinutes()
                  , o = e.getSeconds();
                return t < 10 && (t = "0" + t),
                n < 10 && (n = "0" + n),
                o < 10 && (o = "0" + o),
                t + ":" + n + ":" + o
            },
            exec: function() {
                this.insertText(gt.time._time())
            },
            txtExec: function() {
                this.insertText(gt.time._time())
            },
            tooltip: "Insert current time"
        },
        ltr: {
            state: function(e, t) {
                return t && "ltr" === t.style.direction
            },
            exec: function() {
                var e = this.getRangeHelper()
                  , t = e.getFirstBlockParent();
                (this.focus(),
                t && !We(t, "body") || (this.execCommand("formatBlock", "p"),
                (t = e.getFirstBlockParent()) && !We(t, "body"))) && Pe(t, "direction", "ltr" === Pe(t, "direction") ? "" : "rtl")
            },
            tooltip: "Left-to-Right"
        },
        rtl: {
            state: function(e, t) {
                return t && "rtl" === t.style.direction
            },
            exec: function() {
                var e = this.getRangeHelper()
                  , t = e.getFirstBlockParent();
                (this.focus(),
                t && !We(t, "body") || (this.execCommand("formatBlock", "p"),
                (t = e.getFirstBlockParent()) && !We(t, "body"))) && Pe(t, "direction", "rtl" === Pe(t, "direction") ? "" : "rtl")
            },
            tooltip: "Right-to-Left"
        },
        print: {
            exec: "print",
            tooltip: "Print"
        },
        maximize: {
            state: function() {
                return this.maximize()
            },
            exec: function() {
                this.maximize(!this.maximize())
            },
            txtExec: function() {
                this.maximize(!this.maximize())
            },
            tooltip: "Maximize",
            shortcut: "Ctrl+Shift+M"
        },
        source: {
            state: function() {
                return this.sourceMode()
            },
            exec: function() {
                this.toggleSourceMode()
            },
            txtExec: function() {
                this.toggleSourceMode()
            },
            tooltip: "View source",
            shortcut: "Ctrl+Shift+S"
        },
        ignore: {}
    }
      , w = {};
    function ht(i) {
        var r = this
          , a = []
          , l = function(e) {
            return "signal" + e.charAt(0).toUpperCase() + e.slice(1)
        }
          , e = function(e, t) {
            e = [].slice.call(e);
            var n, o, r = l(e.shift());
            for (n = 0; n < a.length; n++)
                if (r in a[n] && (o = a[n][r].apply(i, e),
                t))
                    return o
        };
        r.call = function() {
            e(arguments, !1)
        }
        ,
        r.callOnlyFirst = function() {
            return e(arguments, !0)
        }
        ,
        r.hasHandler = function(e) {
            var t = a.length;
            for (e = l(e); t--; )
                if (e in a[t])
                    return !0;
            return !1
        }
        ,
        r.exists = function(e) {
            return e in w && ("function" == typeof (e = w[e]) && "object" == typeof e.prototype)
        }
        ,
        r.isRegistered = function(e) {
            if (r.exists(e))
                for (var t = a.length; t--; )
                    if (a[t]instanceof w[e])
                        return !0;
            return !1
        }
        ,
        r.register = function(e) {
            return !(!r.exists(e) || r.isRegistered(e)) && (e = new w[e],
            a.push(e),
            "init"in e && e.init.call(i),
            !0)
        }
        ,
        r.deregister = function(e) {
            var t, n = a.length, o = !1;
            if (!r.isRegistered(e))
                return o;
            for (; n--; )
                a[n]instanceof w[e] && (o = !0,
                "destroy"in (t = a.splice(n, 1)[0]) && t.destroy.call(i));
            return o
        }
        ,
        r.destroy = function() {
            for (var e = a.length; e--; )
                "destroy"in a[e] && a[e].destroy.call(i);
            a = [],
            i = null
        }
    }
    ht.plugins = w;
    var C = h && h < 11
      , k = function(e, t, n) {
        var o, r, i, a, l, c = "", s = e.startContainer, u = e.startOffset;
        for (s && 3 !== s.nodeType && (s = s.childNodes[u],
        u = 0),
        i = a = u; n > c.length && s && 3 === s.nodeType; )
            o = s.nodeValue,
            r = n - c.length,
            l && (a = o.length,
            i = 0),
            l = s,
            t ? (u = i = Math.max(a - r, 0),
            c = o.substr(i, a - i) + c,
            s = l.previousSibling) : (u = i + (a = Math.min(r, o.length)),
            c += o.substr(i, a),
            s = l.nextSibling);
        return {
            node: l || s,
            offset: u,
            text: c
        }
    };
    function vt(i, e) {
        var a, l, c = e || i.contentDocument || i.document, s = "sceditor-start-marker", u = "sceditor-end-marker", y = this;
        y.insertHTML = function(e, t) {
            var n, o;
            if (!y.selectedRange())
                return !1;
            for (t && (e += y.selectedHtml() + t),
            o = De("p", {}, c),
            n = c.createDocumentFragment(),
            o.innerHTML = e; o.firstChild; )
                Fe(n, o.firstChild);
            y.insertNode(n)
        }
        ,
        l = function(e, t, n) {
            var o, r = c.createDocumentFragment();
            if ("string" == typeof e ? (t && (e += y.selectedHtml() + t),
            r = et(e)) : (Fe(r, e),
            t && (Fe(r, y.selectedRange().extractContents()),
            Fe(r, t))),
            o = r.lastChild) {
                for (; !rt(o.lastChild, !0); )
                    o = o.lastChild;
                if (ot(o) ? o.lastChild || Fe(o, document.createTextNode("​")) : o = r,
                y.removeMarkers(),
                Fe(o, a(s)),
                Fe(o, a(u)),
                n) {
                    var i = De("div");
                    return Fe(i, r),
                    i.innerHTML
                }
                return r
            }
        }
        ,
        y.insertNode = function(e, t) {
            var n = l(e, t)
              , o = y.selectedRange()
              , r = o.commonAncestorContainer;
            if (!n)
                return !1;
            o.deleteContents(),
            r && 3 !== r.nodeType && !ot(r) ? je(n, r) : o.insertNode(n),
            y.restoreRange()
        }
        ,
        y.cloneSelected = function() {
            var e = y.selectedRange();
            if (e)
                return e.cloneRange()
        }
        ,
        y.selectedRange = function() {
            var e, t, n = i.getSelection();
            if (n) {
                if (n.rangeCount <= 0) {
                    for (t = c.body; t.firstChild; )
                        t = t.firstChild;
                    (e = c.createRange()).setStartBefore(t),
                    n.addRange(e)
                }
                return 0 < n.rangeCount && (e = n.getRangeAt(0)),
                e
            }
        }
        ,
        y.hasSelection = function() {
            var e = i.getSelection();
            return e && 0 < e.rangeCount
        }
        ,
        y.selectedHtml = function() {
            var e, t = y.selectedRange();
            return t ? (Fe(e = De("p", {}, c), t.cloneContents()),
            e.innerHTML) : ""
        }
        ,
        y.parentNode = function() {
            var e = y.selectedRange();
            if (e)
                return e.commonAncestorContainer
        }
        ,
        y.getFirstBlockParent = function(e) {
            var t = function(e) {
                return rt(e, !0) && (e = e ? e.parentNode : null) ? t(e) : e
            };
            return t(e || y.parentNode())
        }
        ,
        y.insertNodeAt = function(e, t) {
            var n = y.selectedRange()
              , o = y.cloneSelected();
            if (!o)
                return !1;
            o.collapse(e),
            o.insertNode(t),
            y.selectRange(n)
        }
        ,
        a = function(e) {
            y.removeMarker(e);
            var t = De("span", {
                id: e,
                className: "sceditor-selection sceditor-ignore",
                style: "display:none;line-height:0"
            }, c);
            return t.innerHTML = " ",
            t
        }
        ,
        y.insertMarkers = function() {
            var e = y.selectedRange()
              , t = a(s);
            y.removeMarkers(),
            y.insertNodeAt(!0, t),
            e && e.collapsed ? t.parentNode.insertBefore(a(u), t.nextSibling) : y.insertNodeAt(!1, a(u))
        }
        ,
        y.getMarker = function(e) {
            return c.getElementById(e)
        }
        ,
        y.removeMarker = function(e) {
            var t = y.getMarker(e);
            t && Re(t)
        }
        ,
        y.removeMarkers = function() {
            y.removeMarker(s),
            y.removeMarker(u)
        }
        ,
        y.saveRange = function() {
            y.insertMarkers()
        }
        ,
        y.selectRange = function(e) {
            var t, n = i.getSelection(), o = e.endContainer;
            if (!C && e.collapsed && o && !rt(o, !0)) {
                for (t = o.lastChild; t && We(t, ".sceditor-ignore"); )
                    t = t.previousSibling;
                if (We(t, "br")) {
                    var r = c.createRange();
                    r.setEndAfter(t),
                    r.collapse(!1),
                    y.compare(e, r) && (e.setStartBefore(t),
                    e.collapse(!0))
                }
            }
            n && (y.clear(),
            n.addRange(e))
        }
        ,
        y.restoreRange = function() {
            var e, t = y.selectedRange(), n = y.getMarker(s), o = y.getMarker(u);
            if (!n || !o || !t)
                return !1;
            e = n.nextSibling === o,
            (t = c.createRange()).setStartBefore(n),
            t.setEndAfter(o),
            e && t.collapse(!0),
            y.selectRange(t),
            y.removeMarkers()
        }
        ,
        y.selectOuterText = function(e, t) {
            var n, o, r = y.cloneSelected();
            if (!r)
                return !1;
            r.collapse(!1),
            n = k(r, !0, e),
            o = k(r, !1, t),
            r.setStart(n.node, n.offset),
            r.setEnd(o.node, o.offset),
            y.selectRange(r)
        }
        ,
        y.getOuterText = function(e, t) {
            var n = y.cloneSelected();
            return n ? (n.collapse(!e),
            k(n, e, t).text) : ""
        }
        ,
        y.replaceKeyword = function(e, t, n, o, r, i) {
            n || e.sort(function(e, t) {
                return e[0].length - t[0].length
            });
            var a, l, c, s, u, d, f, p, m = "(^|[\\s    ])", g = e.length, h = r ? 1 : 0, v = o || e[g - 1][0].length;
            for (r && v++,
            i = i || "",
            u = (a = y.getOuterText(!0, v)).length,
            a += i,
            t && (a += y.getOuterText(!1, v)); g--; )
                if (p = (f = e[g][0]).length,
                s = Math.max(0, u - p - h),
                c = -1,
                r ? (l = a.substr(s).match(new RegExp(m + ft(f) + m))) && (c = l.index + s + l[1].length) : c = a.indexOf(f, s),
                -1 < c && c <= u && u <= c + p + h)
                    return d = u - c,
                    y.selectOuterText(d, p - d - (/^\S/.test(i) ? 1 : 0)),
                    y.insertHTML(e[g][1]),
                    !0;
            return !1
        }
        ,
        y.compare = function(e, t) {
            return t || (t = y.selectedRange()),
            e && t ? 0 === e.compareBoundaryPoints(Range.END_TO_END, t) && 0 === e.compareBoundaryPoints(Range.START_TO_START, t) : !e && !t
        }
        ,
        y.clear = function() {
            var e = i.getSelection();
            e && (e.removeAllRanges ? e.removeAllRanges() : e.empty && e.empty())
        }
    }
    var yt = window
      , bt = document
      , xt = h
      , wt = xt && xt < 11
      , Ct = /^image\/(p?jpe?g|gif|png|bmp)$/i;
    function kt(l, e) {
        var a, w, u, c, i, m, d, textareaValue, f, p, g, h, t, v, r, y, b, x, C, n, o, k, S, E, T, D, M, N, R, F, H, _, z, O, A, B, I, L, P, V, W, j, q, U, $, Y, K, X, G, J, Q, Z, ee, te, ne, oe, re, ie, ae, le, ce, se, ue, de = this, fe = {}, pe = [], me = [], ge = {}, he = {}, ve = {};
        de.commands = Ce(!0, {}, e.commands || gt);
        var ye = de.opts = Ce(!0, {}, ct, e);
        de.opts.emoticons = e.emoticons || ct.emoticons,
        M = function() {
            l._sceditor = de,
            ye.locale && "en" !== ye.locale && z(),
            je(w = De("div", {
                className: "sceditor-container"
            }), l),
            Pe(w, "z-index", ye.zIndex),
            xt && Ue(w, "ie ie" + xt),
            n = l.required,
            l.required = !1;
            var e = kt.formats[ye.format];
            "init"in (a = e ? new e : {}) && a.init.call(de),
            _(),
            L(),
            O(),
            H(),
            A(),
            B(),
            dt || de.toggleSourceMode(),
            J();
            var t = function() {
                Oe(yt, "load", t),
                ye.autofocus && ne(),
                ue(),
                Z(),
                r.call("ready"),
                "onReady"in a && a.onReady.call(de)
            };
            ze(yt, "load", t),
            "complete" === bt.readyState && t()
        }
        ,
        _ = function() {
            var e = ye.plugins;
            e = e ? e.toString().split(",") : [],
            r = new ht(de),
            e.forEach(function(e) {
                r.register(e.trim())
            })
        }
        ,
        z = function() {
            var e;
            (t = kt.locale[ye.locale]) || (e = ye.locale.split("-"),
            t = kt.locale[e[0]]),
            t && t.dateFormat && (ye.dateFormat = t.dateFormat)
        }
        ,
        H = function() {
            textareaValue = De("textarea"),
            // textareaValue.setAttribute("name", "Post"),
            textareaValue.setAttribute("id", "textareaValue"),
            c = De("iframe", {
                frameborder: 0,
                allowfullscreen: !0
            }),
            c.setAttribute("id", "WYSIWYGiframe"),
            ye.startInSourceMode ? (Ue(w, "sourceMode"),
            Be(c)) : (Ue(w, "wysiwygMode"),
            Be(textareaValue)),
            ye.spellcheck || Ae(w, "spellcheck", "false"),
            "https:" === yt.location.protocol && Ae(c, "src", "javascript:false"),
            Fe(w, c),
            Fe(w, textareaValue),
            de.dimensions(ye.width || Ke(l), ye.height || Xe(l));
            var e = xt ? "ie ie" + xt : "";
            e += ut ? " ios" : "",
            (d = c.contentDocument).open(),
            d.write(mt("html", {
                attrs: ' class="' + e + '"',
                spellcheck: ye.spellcheck ? "" : 'spellcheck="false"',
                charset: ye.charset,
                style: ye.style
            })),
            d.close(),
            m = d.body,
            i = c.contentWindow,
            de.readOnly(!!ye.readOnly),
            (ut || st || xt) && (Xe(m, "100%"),
            xt || ze(m, "touchend", de.focus));
            var t = Ae(l, "tabindex");
            Ae(textareaValue, "tabindex", t),
            Ae(c, "tabindex", t),
            v = new vt(i),
            Be(l),
            de.val(l.value);
            var n = ye.placeholder || Ae(l, "placeholder");
            n && (textareaValue.placeholder = n,
            Ae(m, "placeholder", n));
            document.getElementById("WYSIWYGiframe").contentWindow.document.getElementById("wysiwygDivContent").addEventListener("keydown", function () {
                document.getElementsByName("Post")[0].value = de.getWysiwygEditorValue();
            });
        }
        ,
        A = function() {
            ye.autoUpdate && (ze(m, "blur", se),
            ze(textareaValue, "blur", se)),
            null === ye.rtl && (ye.rtl = "rtl" === Pe(textareaValue, "direction")),
            de.rtl(!!ye.rtl),
            ye.autoExpand && (ze(m, "load", ue, _e),
            ze(m, "input keyup", ue)),
            ye.resizeEnabled && I(),
            Ae(w, "id", ye.id),
            de.emoticons(ye.emoticonsEnabled)
        }
        ,
        B = function() {
            var e = l.form
              , t = "compositionstart compositionend"
              , n = "keydown keyup keypress focus blur contextmenu"
              , o = "onselectionchange"in d ? "selectionchange" : "keyup focus blur contextmenu mouseup touchend click";
            ze(bt, "click", X),
            e && (ze(e, "reset", U),
            ze(e, "submit", de.updateOriginal, _e)),
            ze(m, "keypress", q),
            ze(m, "keydown", W),
            ze(m, "keydown", j),
            ze(m, "keyup", Z),
            ze(m, "blur", le),
            ze(m, "keyup", ce),
            ze(m, "paste", P),
            ze(m, t, Y),
            ze(m, o, ee),
            ze(m, n, K),
            ye.emoticonsCompat && yt.getSelection && ze(m, "keyup", re),
            ze(m, "blur", function() {
                de.val() || Ue(m, "placeholder")
            }),
            ze(m, "focus", function() {
                $e(m, "placeholder")
            }),
            ze(textareaValue, "blur", le),
            ze(textareaValue, "keyup", ce),
            ze(textareaValue, "keydown", W),
            ze(textareaValue, t, Y),
            ze(textareaValue, n, K),
            ze(d, "mousedown", $),
            ze(d, o, ee),
            ze(d, "beforedeactivate keyup mouseup", F),
            ze(d, "keyup", Z),
            ze(d, "focus", function() {
                p = null
            }),
            ze(w, "selectionchanged", te),
            ze(w, "selectionchanged", J),
            ze(w, "selectionchanged valuechanged nodechanged pasteraw paste", K)
        }
        ,
        O = function() {
            var i, a = de.commands, l = (ye.toolbarExclude || "").split(","), e = ye.toolbar.split("|");
            u = De("div", {
                className: "sceditor-toolbar",
                unselectable: "on"
            }),
            ye.icons in kt.icons && (D = new kt.icons[ye.icons]),
            Se(e, function(e, t) {
                i = De("div", {
                    className: "sceditor-group"
                }),
                Se(t.split(","), function(e, t) {
                    var n, o, r = a[t];
                    if (r && !(-1 < l.indexOf(t))) {
                        if (o = r.shortcut,
                        n = mt("toolbarButton", {
                            name: t,
                            dispName: de._(r.name || r.tooltip || t)
                        }, !0).firstChild,
                        D && D.create)
                            D.create(t) && (je(D.create(t), n.firstChild),
                            Ue(n, "has-icon"));
                        n._sceTxtMode = !!r.txtExec,
                        n._sceWysiwygMode = !!r.exec,
                        Ye(n, "disabled", !r.exec),
                        ze(n, "click", function(e) {
                            qe(n, "disabled") || R(n, r),
                            J(),
                            e.preventDefault()
                        }),
                        ze(n, "mousedown", function(e) {
                            de.closeDropDown(),
                            e.preventDefault()
                        }),
                        r.tooltip && Ae(n, "title", de._(r.tooltip) + (o ? " (" + o + ")" : "")),
                        o && de.addShortcut(o, t),
                        r.state ? me.push({
                            name: t,
                            state: r.state
                        }) : be(r.exec) && me.push({
                            name: t,
                            state: r.exec
                        }),
                        Fe(i, n),
                        he[t] = n
                    }
                }),
                i.firstChild && Fe(u, i)
            }),
            Fe(ye.toolbarContainer || w, u)
        }
        ,
        I = function() {
            var o, r, i, a, t, n, e = De("div", {
                className: "sceditor-grip"
            }), l = De("div", {
                className: "sceditor-resize-cover"
            }), c = "touchmove mousemove", s = "touchcancel touchend mouseup", u = 0, d = 0, f = 0, p = 0, m = 0, g = 0, h = Ke(w), v = Xe(w), y = !1, b = de.rtl();
            if (o = ye.resizeMinHeight || v / 1.5,
            r = ye.resizeMaxHeight || 2.5 * v,
            i = ye.resizeMinWidth || h / 1.25,
            a = ye.resizeMaxWidth || 1.25 * h,
            t = function(e) {
                "touchmove" === e.type ? (e = yt.event,
                f = e.changedTouches[0].pageX,
                p = e.changedTouches[0].pageY) : (f = e.pageX,
                p = e.pageY);
                var t = g + (p - d)
                  , n = b ? m - (f - u) : m + (f - u);
                0 < a && a < n && (n = a),
                0 < i && n < i && (n = i),
                ye.resizeWidth || (n = !1),
                0 < r && r < t && (t = r),
                0 < o && t < o && (t = o),
                ye.resizeHeight || (t = !1),
                (n || t) && de.dimensions(n, t),
                e.preventDefault()
            }
            ,
            n = function(e) {
                y && (y = !1,
                Be(l),
                $e(w, "resizing"),
                Oe(bt, c, t),
                Oe(bt, s, n),
                e.preventDefault())
            }
            ,
            D && D.create) {
                var x = D.create("grip");
                x && (Fe(e, x),
                Ue(e, "has-icon"))
            }
            Fe(w, e),
            Fe(w, l),
            Be(l),
            ze(e, "touchstart mousedown", function(e) {
                "touchstart" === e.type ? (e = yt.event,
                u = e.touches[0].pageX,
                d = e.touches[0].pageY) : (u = e.pageX,
                d = e.pageY),
                m = Ke(w),
                g = Xe(w),
                y = !0,
                Ue(w, "resizing"),
                Ie(l),
                ze(bt, c, t),
                ze(bt, s, n),
                e.preventDefault()
            })
        }
        ,
        L = function() {
            var e = ye.emoticons
              , n = ye.emoticonsRoot || "";
            e && (ve = Ce({}, e.more, e.dropdown, e.hidden)),
            Se(ve, function(e, t) {
                ve[e] = mt("emoticon", {
                    key: e,
                    url: n + (t.url || t),
                    tooltip: t.tooltip || e
                }),
                ye.emoticonsEnabled && pe.push(De("img", {
                    src: n + (t.url || t)
                }))
            })
        }
        ,
        ne = function() {
            var e, t, n = m.firstChild, o = !!ye.autofocusEnd;
            if (Je(w)) {
                if (de.sourceMode())
                    return t = o ? textareaValue.value.length : 0,
                    void textareaValue.setSelectionRange(t, t);
                if (at(m),
                o)
                    for ((n = m.lastChild) || (n = De("p", {}, d),
                    Fe(m, n)); n.lastChild; )
                        n = n.lastChild,
                        !wt && We(n, "br") && n.previousSibling && (n = n.previousSibling);
                e = d.createRange(),
                ot(n) ? e.selectNodeContents(n) : (e.setStartBefore(n),
                o && e.setStartAfter(n)),
                e.collapse(!o),
                v.selectRange(e),
                x = e,
                o && (m.scrollTop = m.scrollHeight),
                de.focus()
            }
        }
        ,
        de.readOnly = function(e) {
            return "boolean" != typeof e ? !textareaValue.readonly : (m.contentEditable = !e,
            textareaValue.readonly = !e,
            G(e),
            de)
        }
        ,
        de.rtl = function(e) {
            var t = e ? "rtl" : "ltr";
            return "boolean" != typeof e ? "rtl" === Ae(textareaValue, "dir") : (Ae(m, "dir", t),
            Ae(textareaValue, "dir", t),
            $e(w, "rtl"),
            $e(w, "ltr"),
            Ue(w, t),
            D && D.rtl && D.rtl(e),
            de)
        }
        ,
        G = function(n) {
            var o = de.inSourceMode() ? "_sceTxtMode" : "_sceWysiwygMode";
            Se(he, function(e, t) {
                Ye(t, "disabled", n || !t[o])
            })
        }
        ,
        de.width = function(e, t) {
            return e || 0 === e ? (de.dimensions(e, null, t),
            de) : Ke(w)
        }
        ,
        de.dimensions = function(e, t, n) {
            return t = !(!t && 0 !== t) && t,
            !1 === (e = !(!e && 0 !== e) && e) && !1 === t ? {
                width: de.width(),
                height: de.height()
            } : (!1 !== e && (!1 !== n && (ye.width = e),
            Ke(w, e)),
            !1 !== t && (!1 !== n && (ye.height = t),
            Xe(w, t)),
            de)
        }
        ,
        de.height = function(e, t) {
            return e || 0 === e ? (de.dimensions(null, e, t),
            de) : Xe(w)
        }
        ,
        de.maximize = function(e) {
            var t = "sceditor-maximize";
            return xe(e) ? qe(w, t) : ((e = !!e) && (E = yt.pageYOffset),
            Ye(bt.documentElement, t, e),
            Ye(bt.body, t, e),
            Ye(w, t, e),
            de.width(e ? "100%" : ye.width, !1),
            de.height(e ? "100%" : ye.height, !1),
            e || yt.scrollTo(0, E),
            ue(),
            de)
        }
        ,
        ue = function() {
            ye.autoExpand && !S && (S = setTimeout(de.expandToContent, 200))
        }
        ,
        de.expandToContent = function(e) {
            if (!de.maximize()) {
                if (clearTimeout(S),
                S = !1,
                !k) {
                    var t = ye.resizeMinHeight || ye.height || Xe(l);
                    k = {
                        min: t,
                        max: ye.resizeMaxHeight || 2 * t
                    }
                }
                var n = bt.createRange();
                n.selectNodeContents(m);
                var o = n.getBoundingClientRect()
                  , r = d.documentElement.clientHeight - 1
                  , i = o.bottom - o.top
                  , a = de.height() + 1 + (i - r);
                e || -1 === k.max || (a = Math.min(a, k.max)),
                de.height(Math.ceil(Math.max(a, k.min)))
            }
        }
        ,
        de.destroy = function() {
            if (r) {
                r.destroy(),
                r = p = v = null,
                f && Re(f),
                Oe(bt, "click", X);
                var e = l.form;
                e && (Oe(e, "reset", U),
                Oe(e, "submit", de.updateOriginal)),
                Re(textareaValue),
                Re(u),
                Re(w),
                delete l._sceditor,
                Ie(l),
                l.required = n
            }
        }
        ,
        de.createDropDown = function(e, t, n, o) {
            var r, i = "sceditor-" + t;
            de.closeDropDown(!0),
            f && qe(f, i) || (!1 !== o && Se(He(n, ":not(input):not(textarea)"), function(e, t) {
                t.nodeType === Ee && Ae(t, "unselectable", "on")
            }),
            r = Ce({
                top: e.offsetTop,
                left: e.offsetLeft,
                marginTop: e.clientHeight
            }, ye.dropDownCss),
            Pe(f = De("div", {
                className: "sceditor-dropdown " + i
            }), r),
            Fe(f, n),
            Fe(w, f),
            ze(f, "click focusin", function(e) {
                e.stopPropagation()
            }),
            setTimeout(function() {
                if (f) {
                    var e = He(f, "input,textarea")[0];
                    e && e.focus()
                }
            }))
        }
        ,
        X = function(e) {
            3 !== e.which && f && !e.defaultPrevented && (se(),
            de.closeDropDown())
        }
        ,
        P = function(e) {
            var t, n, o = xt || st, r = m, i = e.clipboardData;
            if (i && !o) {
                var a = {}
                  , l = i.types
                  , c = i.items;
                e.preventDefault();
                for (var s = 0; s < l.length; s++) {
                    if (yt.FileReader && c && Ct.test(c[s].type))
                        return t = i.items[s].getAsFile(),
                        n = void 0,
                        (n = new FileReader).onload = function(e) {
                            V({
                                html: '<img src="' + e.target.result + '" />'
                            })
                        }
                        ,
                        void n.readAsDataURL(t);
                    a[l[s]] = i.getData(l[s])
                }
                a.text = a["text/plain"],
                a.html = a["text/html"],
                V(a)
            } else if (!T) {
                var u = r.scrollTop;
                for (v.saveRange(),
                T = bt.createDocumentFragment(); r.firstChild; )
                    Fe(T, r.firstChild);
                setTimeout(function() {
                    var e = r.innerHTML;
                    r.innerHTML = "",
                    Fe(r, T),
                    r.scrollTop = u,
                    T = !1,
                    v.restoreRange(),
                    V({
                        html: e
                    })
                }, 0)
            }
        }
        ,
        V = function(e) {
            var t = De("div", {}, d);
            r.call("pasteRaw", e),
            Ge(w, "pasteraw", e),
            e.html ? (t.innerHTML = e.html,
            it(t)) : t.innerHTML = pt(e.text || "");
            var n = {
                val: t.innerHTML
            };
            "fragmentToSource"in a && (n.val = a.fragmentToSource(n.val, d, y)),
            r.call("paste", n),
            Ge(w, "paste", n),
            "fragmentToHtml"in a && (n.val = a.fragmentToHtml(n.val, y)),
            r.call("pasteHtml", n),
            de.wysiwygEditorInsertHtml(n.val, null, !0)
        }
        ,
        de.closeDropDown = function(e) {
            f && (Re(f),
            f = null),
            !0 === e && de.focus()
        }
        ,
        de.wysiwygEditorInsertHtml = function(e, t, n) {
            var o, r, i, a = Xe(c);
            de.focus(),
            !n && Ne(b, "code") || (v.insertHTML(e, t),
            v.saveRange(),
            N(),
            Ie(o = He(m, "#sceditor-end-marker")[0]),
            r = m.scrollTop,
            i = lt(o).top + 1.5 * o.offsetHeight - a,
            Be(o),
            (r < i || i + a < r) && (m.scrollTop = i),
            ae(!1),
            v.restoreRange(),
            Z())
        }
        ,
        de.wysiwygEditorInsertText = function(e, t) {
            de.wysiwygEditorInsertHtml(pt(e), pt(t))
        }
        ,
        de.insertText = function(e, t) {
            return de.inSourceMode() ? de.sourceEditorInsertText(e, t) : de.wysiwygEditorInsertText(e, t),
            de
        }
        ,
        de.sourceEditorInsertText = function(e, t) {
            var n, o, r = textareaValue.selectionStart, i = textareaValue.selectionEnd;
            n = textareaValue.scrollTop,
            textareaValue.focus(),
            o = textareaValue.value,
            t && (e += o.substring(r, i) + t),
            textareaValue.value = o.substring(0, r) + e + o.substring(i, o.length),
            textareaValue.selectionStart = r + e.length - (t ? t.length : 0),
            textareaValue.selectionEnd = textareaValue.selectionStart,
            textareaValue.scrollTop = n,
            textareaValue.focus(),
            ae()
        }
        ,
        de.getRangeHelper = function() {
            return v
        }
        ,
        de.sourceEditorCaret = function(e) {
            return textareaValue.focus(),
            e ? (textareaValue.selectionStart = e.start,
            textareaValue.selectionEnd = e.end,
            this) : {
                start: textareaValue.selectionStart,
                end: textareaValue.selectionEnd
            }
        }
        ,
        de.val = function(e, t) {
            return be(e) ? (de.inSourceMode() ? de.setSourceEditorValue(e) : (!1 !== t && "toHtml"in a && (e = a.toHtml(e)),
            de.setWysiwygEditorValue(e)),
            de) : de.inSourceMode() ? de.getSourceEditorValue(!1) : de.getWysiwygEditorValue(t)
        }
        ,
        de.insert = function(e, t, n, o, r) {
            if (de.inSourceMode())
                return de.sourceEditorInsertText(e, t),
                de;
            if (t) {
                var i = v.selectedHtml();
                !1 !== n && "fragmentToSource"in a && (i = a.fragmentToSource(i, d, y)),
                e += i + t
            }
            return !1 !== n && "fragmentToHtml"in a && (e = a.fragmentToHtml(e, y)),
            !1 !== n && !0 === r && (e = e.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")),
            de.wysiwygEditorInsertHtml(e),
            de
        }
        ,
        de.getWysiwygEditorValue = function(e) {
            for (var t, n = De("div", {}, d), o = m.childNodes, r = 0; r < o.length; r++)
                Fe(n, o[r].cloneNode(!0));
            return Fe(m, n),
            it(n),
            Re(n),
            t = n.innerHTML,
            !1 !== e && a.hasOwnProperty("toSource") && (t = a.toSource(t, d)),
            t
        }
        ,
        de.getBody = function() {
            return m
        }
        ,
        de.getContentAreaContainer = function() {
            return c
        }
        ,
        de.getSourceEditorValue = function(e) {
            var t = textareaValue.value;
            return !1 !== e && "toHtml"in a && (t = a.toHtml(t)),
            t
        }
        ,
        de.setWysiwygEditorValue = function(e) {
            e || (e = "<p>" + (xt ? "" : "<br />") + "</p>"),
            m.innerHTML = e,
            N(),
            Z(),
            ae(),
            ue()
        }
        ,
        de.setSourceEditorValue = function(e) {
            document.getElementsByName("Post")[0].value = e;
            textareaValue.value = e,
            ae()
        }
        ,
        de.updateOriginal = function() {
            l.value = de.val()
        }
        ,
        N = function() {
            var e, s, u, d, t, f, p;
            ye.emoticonsEnabled && (e = m,
            s = ve,
            u = ye.emoticonsCompat,
            d = e.ownerDocument,
            t = "(^|\\s| | | | |$)",
            f = [],
            p = {},
            Me(e, "code") || (Se(s, function(e) {
                p[e] = new RegExp(t + ft(e) + t),
                f.push(e)
            }),
            f.sort(function(e, t) {
                return t.length - e.length
            }),
            function e(t) {
                for (t = t.firstChild; t; ) {
                    if (t.nodeType !== Ee || We(t, "code") || e(t),
                    t.nodeType === Te)
                        for (var n = 0; n < f.length; n++) {
                            var o = t.nodeValue
                              , r = f[n]
                              , i = u ? o.search(p[r]) : o.indexOf(r);
                            if (-1 < i) {
                                var a = o.indexOf(r, i)
                                  , l = et(s[r], d)
                                  , c = o.substr(a + r.length);
                                l.appendChild(d.createTextNode(c)),
                                t.nodeValue = o.substr(0, a),
                                t.parentNode.insertBefore(l, t.nextSibling)
                            }
                        }
                    t = t.nextSibling
                }
            }(e)))
        }
        ,
        de.inSourceMode = function() {
            return qe(w, "sourceMode")
        }
        ,
        de.sourceMode = function(e) {
            var t = de.inSourceMode();
            return "boolean" != typeof e ? t : ((t && !e || !t && e) && de.toggleSourceMode(),
            de)
        }
        ,
        de.toggleSourceMode = function() {
            var e = de.inSourceMode();
            !dt && e || (e || (v.saveRange(),
            v.clear()),
            de.blur(),
            e ? de.setWysiwygEditorValue(de.getSourceEditorValue()) : de.setSourceEditorValue(de.getWysiwygEditorValue()),
            p = null,
            // de.getWysiwygEditorValue() IS THE PLACE WHERE THE VALUE OF THE BBCODE IS SET TO THE TEAXTAREA'S VALUE AHHHHHHHHHHHHHHHHHHHHHHH =============================================================================================================================================================================================================================================================================================================================================
            Le(textareaValue),
            Le(c),
            Ye(w, "wysiwygMode", e),
            Ye(w, "sourceMode", !e),
            G(),
            J())
        }
        ,
        Q = function() {
            return textareaValue.focus(),
            textareaValue.value.substring(textareaValue.selectionStart, textareaValue.selectionEnd)
        }
        ,
        R = function(e, t) {
            de.inSourceMode() ? t.txtExec && (Array.isArray(t.txtExec) ? de.sourceEditorInsertText.apply(de, t.txtExec) : t.txtExec.call(de, e, Q())) : t.exec && (we(t.exec) ? t.exec.call(de, e) : de.execCommand(t.exec, t.hasOwnProperty("execParam") ? t.execParam : null))
        }
        ,
        F = function() {
            xt && (p = v.selectedRange())
        }
        ,
        de.execCommand = function(e, t) {
            var n = !1
              , o = de.commands[e];
            if (de.focus(),
            !Ne(v.parentNode(), "code")) {
                try {
                    n = d.execCommand(e, !1, t)
                } catch (e) {}
                !n && o && o.errorMessage && alert(de._(o.errorMessage)),
                J()
            }
        }
        ,
        ee = function() {
            function e() {
                if (i.getSelection() && i.getSelection().rangeCount <= 0)
                    x = null;
                else if (v && !v.compare(x)) {
                    if ((x = v.cloneSelected()) && x.collapsed) {
                        var e = x.startContainer
                          , t = x.startOffset;
                        for (t && e.nodeType !== Te && (e = e.childNodes[t]); e && e.parentNode !== m; )
                            e = e.parentNode;
                        e && rt(e, !0) && (v.saveRange(),
                        n = d,
                        Qe(m, function(e) {
                            rt(e, !0) ? (o || je(o = De("p", {}, n), e),
                            e.nodeType === Te && "" === e.nodeValue || Fe(o, e)) : o = null
                        }, !1, !0),
                        v.restoreRange())
                    }
                    Ge(w, "selectionchanged")
                }
                var n, o;
                C = !1
            }
            C || (C = !0,
            "onselectionchange"in d ? e() : setTimeout(e, 100))
        }
        ,
        te = function() {
            var e, t = v.parentNode();
            y !== t && (e = y,
            y = t,
            b = v.getFirstBlockParent(t),
            Ge(w, "nodechanged", {
                oldNode: e,
                newNode: y
            }))
        }
        ,
        de.currentNode = function() {
            return y
        }
        ,
        de.currentBlockNode = function() {
            return b
        }
        ,
        J = function() {
            var e, t, n = "active", o = d, r = de.sourceMode();
            if (de.readOnly())
                Se(He(u, n), function(e, t) {
                    $e(t, n)
                });
            else {
                r || (t = v.parentNode(),
                e = v.getFirstBlockParent(t));
                for (var i = 0; i < me.length; i++) {
                    var a = 0
                      , l = he[me[i].name]
                      , c = me[i].state
                      , s = r && !l._sceTxtMode || !r && !l._sceWysiwygMode;
                    if (be(c)) {
                        if (!r)
                            try {
                                -1 < (a = o.queryCommandEnabled(c) ? 0 : -1) && (a = o.queryCommandState(c) ? 1 : 0)
                            } catch (e) {}
                    } else
                        s || (a = c.call(de, t, e));
                    Ye(l, "disabled", s || a < 0),
                    Ye(l, n, 0 < a)
                }
                D && D.update && D.update(r, t, e)
            }
        }
        ,
        q = function(e) {
            if (!e.defaultPrevented && (de.closeDropDown(),
            13 === e.which)) {
                if (!We(b, "li,ul,ol") && tt(b)) {
                    p = null;
                    var t = De("br", {}, d);
                    if (v.insertNode(t),
                    !wt) {
                        var n = t.parentNode
                          , o = n.lastChild;
                        o && o.nodeType === Te && "" === o.nodeValue && (Re(o),
                        o = n.lastChild),
                        !rt(n, !0) && o === t && rt(t.previousSibling) && v.insertHTML("<br>")
                    }
                    e.preventDefault()
                }
            }
        }
        ,
        Z = function() {
            Ze(m, function(e) {
                if (e.nodeType === Ee && !/inline/.test(Pe(e, "display")) && !We(e, ".sceditor-nlf") && tt(e)) {
                    var t = De("p", {}, d);
                    return t.className = "sceditor-nlf",
                    t.innerHTML = wt ? "" : "<br />",
                    Fe(m, t),
                    !1
                }
                if (3 === e.nodeType && !/^\s*$/.test(e.nodeValue) || We(e, "br"))
                    return !1
            })
        }
        ,
        U = function() {
            de.val(l.value)
        }
        ,
        $ = function() {
            de.closeDropDown(),
            p = null
        }
        ,
        de._ = function() {
            var n = arguments;
            return t && t[n[0]] && (n[0] = t[n[0]]),
            n[0].replace(/\{(\d+)\}/g, function(e, t) {
                return void 0 !== n[t - 0 + 1] ? n[t - 0 + 1] : "{" + t + "}"
            })
        }
        ,
        K = function(t) {
            r && r.call(t.type + "Event", t, de);
            var e = (t.target === textareaValue ? "scesrc" : "scewys") + t.type;
            fe[e] && fe[e].forEach(function(e) {
                e.call(de, t)
            })
        }
        ,
        de.bind = function(e, t, n, o) {
            for (var r = (e = e.split(" ")).length; r--; )
                if (we(t)) {
                    var i = "scewys" + e[r]
                      , a = "scesrc" + e[r];
                    n || (fe[i] = fe[i] || [],
                    fe[i].push(t)),
                    o || (fe[a] = fe[a] || [],
                    fe[a].push(t)),
                    "valuechanged" === e[r] && (ae.hasHandler = !0)
                }
            return de
        }
        ,
        de.unbind = function(e, t, n, o) {
            for (var r = (e = e.split(" ")).length; r--; )
                we(t) && (n || ke(fe["scewys" + e[r]] || [], t),
                o || ke(fe["scesrc" + e[r]] || [], t));
            return de
        }
        ,
        de.blur = function(e, t, n) {
            return we(e) ? de.bind("blur", e, t, n) : de.sourceMode() ? textareaValue.blur() : m.blur(),
            de
        }
        ,
        de.focus = function(e, t, n) {
            if (we(e))
                de.bind("focus", e, t, n);
            else if (de.inSourceMode()) {
                textareaValue.focus();
            } else {
                if (He(d, ":focus").length)
                    return;
                var o, r = v.selectedRange();
                x || ne(),
                !wt && r && 1 === r.endOffset && r.collapsed && (o = r.endContainer) && 1 === o.childNodes.length && We(o.firstChild, "br") && (r.setStartBefore(o.firstChild),
                r.collapse(!0),
                v.selectRange(r)),
                i.focus(),
                m.focus(),
                p && (v.selectRange(p),
                p = null)
            }
            return J(),
            de
        }
        ,
        de.keyDown = function(e, t, n) {
            return de.bind("keydown", e, t, n)
        }
        ,
        de.keyPress = function(e, t, n) {
            return de.bind("keypress", e, t, n)
        }
        ,
        de.keyUp = function(e, t, n) {
            return de.bind("keyup", e, t, n)
        }
        ,
        de.nodeChanged = function(e) {
            return de.bind("nodechanged", e, !1, !0)
        }
        ,
        de.selectionChanged = function(e) {
            return de.bind("selectionchanged", e, !1, !0)
        }
        ,
        de.valueChanged = function(e, t, n) {
            return de.bind("valuechanged", e, t, n)
        }
        ,
        oe = function(e) {
            var n = 0
              , o = de.emoticonsCache
              , t = String.fromCharCode(e.which);
            Ne(b, "code") || (o || (o = [],
            Se(ve, function(e, t) {
                o[n++] = [e, t]
            }),
            o.sort(function(e, t) {
                return e[0].length - t[0].length
            }),
            de.emoticonsCache = o,
            de.longestEmoticonCode = o[o.length - 1][0].length),
            v.replaceKeyword(de.emoticonsCache, !0, !0, de.longestEmoticonCode, ye.emoticonsCompat, t) && (ye.emoticonsCompat && /^\s$/.test(t) || e.preventDefault()))
        }
        ,
        re = function() {
            !function(e, t) {
                var n = /[^\s\xA0\u2002\u2003\u2009\u00a0]+/
                  , o = e && He(e, "img[data-sceditor-emoticon]");
                if (e && o.length)
                    for (var r = 0; r < o.length; r++) {
                        var i = o[r]
                          , a = i.parentNode
                          , l = i.previousSibling
                          , c = i.nextSibling;
                        if (l && n.test(l.nodeValue.slice(-1)) || c && n.test((c.nodeValue || "")[0])) {
                            var s = t.cloneSelected()
                              , u = -1
                              , d = s.startContainer
                              , f = l.nodeValue;
                            null === f && (f = l.innerText || ""),
                            f += Ve(i, "sceditor-emoticon"),
                            d === c && (u = f.length + s.startOffset),
                            d === e && e.childNodes[s.startOffset] === c && (u = f.length),
                            d === l && (u = s.startOffset),
                            c && c.nodeType === Te || (c = a.insertBefore(a.ownerDocument.createTextNode(""), c)),
                            c.insertData(0, f),
                            Re(l),
                            Re(i),
                            -1 < u && (s.setStart(c, u),
                            s.collapse(!0),
                            t.selectRange(s))
                        }
                    }
            }(b, v)
        }
        ,
        de.emoticons = function(e) {
            if (!e && !1 !== e)
                return ye.emoticonsEnabled;
            (ye.emoticonsEnabled = e) ? (ze(m, "keypress", oe),
            de.sourceMode() || (v.saveRange(),
            N(),
            ae(!1),
            v.restoreRange())) : (Se(He(m, "img[data-sceditor-emoticon]"), function(e, t) {
                var n = Ve(t, "sceditor-emoticon")
                  , o = d.createTextNode(n);
                t.parentNode.replaceChild(o, t)
            }),
            Oe(m, "keypress", oe),
            ae());
            return de
        }
        ,
        de.css = function(e) {
            return o || (o = De("style", {
                id: "inline"
            }, d),
            Fe(d.head, o)),
            be(e) ? (o.styleSheet ? o.styleSheet.cssText = e : o.innerHTML = e,
            de) : o.styleSheet ? o.styleSheet.cssText : o.innerHTML
        }
        ,
        W = function(e) {
            var t = []
              , n = {
                "`": "~",
                1: "!",
                2: "@",
                3: "#",
                4: "$",
                5: "%",
                6: "^",
                7: "&",
                8: "*",
                9: "(",
                0: ")",
                "-": "_",
                "=": "+",
                ";": ": ",
                "'": '"',
                ",": "<",
                ".": ">",
                "/": "?",
                "\\": "|",
                "[": "{",
                "]": "}"
            }
              , o = {
                109: "-",
                110: "del",
                111: "/",
                96: "0",
                97: "1",
                98: "2",
                99: "3",
                100: "4",
                101: "5",
                102: "6",
                103: "7",
                104: "8",
                105: "9"
            }
              , r = e.which
              , i = {
                8: "backspace",
                9: "tab",
                13: "enter",
                19: "pause",
                20: "capslock",
                27: "esc",
                32: "space",
                33: "pageup",
                34: "pagedown",
                35: "end",
                36: "home",
                37: "left",
                38: "up",
                39: "right",
                40: "down",
                45: "insert",
                46: "del",
                91: "win",
                92: "win",
                93: "select",
                96: "0",
                97: "1",
                98: "2",
                99: "3",
                100: "4",
                101: "5",
                102: "6",
                103: "7",
                104: "8",
                105: "9",
                106: "*",
                107: "+",
                109: "-",
                110: ".",
                111: "/",
                112: "f1",
                113: "f2",
                114: "f3",
                115: "f4",
                116: "f5",
                117: "f6",
                118: "f7",
                119: "f8",
                120: "f9",
                121: "f10",
                122: "f11",
                123: "f12",
                144: "numlock",
                145: "scrolllock",
                186: ";",
                187: "=",
                188: ",",
                189: "-",
                190: ".",
                191: "/",
                192: "`",
                219: "[",
                220: "\\",
                221: "]",
                222: "'"
            }[r] || String.fromCharCode(r).toLowerCase();
            (e.ctrlKey || e.metaKey) && t.push("ctrl"),
            e.altKey && t.push("alt"),
            e.shiftKey && (t.push("shift"),
            o[r] ? i = o[r] : n[i] && (i = n[i])),
            i && (r < 16 || 18 < r) && t.push(i),
            t = t.join("+"),
            ge[t] && !1 === ge[t].call(de) && (e.stopPropagation(),
            e.preventDefault())
        }
        ,
        de.addShortcut = function(e, t) {
            return e = e.toLowerCase(),
            be(t) ? ge[e] = function() {
                return R(he[t], de.commands[t]),
                !1
            }
            : ge[e] = t,
            de
        }
        ,
        de.removeShortcut = function(e) {
            return delete ge[e.toLowerCase()],
            de
        }
        ,
        j = function(e) {
            var t, n, o;
            if (!ye.disableBlockRemove && 8 === e.which && (n = v.selectedRange()) && (t = n.startContainer,
            0 === n.startOffset && (o = ie()) && !We(o, "body"))) {
                for (; t !== o; ) {
                    for (; t.previousSibling; )
                        if ((t = t.previousSibling).nodeType !== Te || t.nodeValue)
                            return;
                    if (!(t = t.parentNode))
                        return
                }
                de.clearBlockFormatting(o),
                e.preventDefault()
            }
        }
        ,
        ie = function() {
            for (var e = b; !tt(e) || rt(e, !0); )
                if (!(e = e.parentNode) || We(e, "body"))
                    return;
            return e
        }
        ,
        de.clearBlockFormatting = function(e) {
            return !(e = e || ie()) || We(e, "body") || (v.saveRange(),
            e.className = "",
            p = null,
            Ae(e, "style", ""),
            We(e, "p,div,td") || nt(e, "p"),
            v.restoreRange()),
            de
        }
        ,
        ae = function(e) {
            if (r && (r.hasHandler("valuechangedEvent") || ae.hasHandler)) {
                var t, n = de.sourceMode(), o = !n && v.hasSelection();
                e = (g = !1) !== e && !d.getElementById("sceditor-start-marker"),
                h && (clearTimeout(h),
                h = !1),
                o && e && v.saveRange(),
                (t = n ? textareaValue.value : m.innerHTML) !== ae.lastVal && (ae.lastVal = t,
                Ge(w, "valuechanged", {
                    rawValue: n ? de.val() : t
                })),
                o && e && v.removeMarkers()
            }
        }
        ,
        le = function() {
            h && ae()
        }
        ,
        ce = function(e) {
            var t = e.which
              , n = ce.lastChar
              , o = 13 === n || 32 === n
              , r = 8 === n || 46 === n;
            ce.lastChar = t,
            g || (13 === t || 32 === t ? o ? ce.triggerNext = !0 : ae() : 8 === t || 46 === t ? r ? ce.triggerNext = !0 : ae() : ce.triggerNext && (ae(),
            ce.triggerNext = !1),
            clearTimeout(h),
            h = setTimeout(function() {
                g || ae()
            }, 1500))
        }
        ,
        Y = function(e) {
            (g = /start/i.test(e.type)) || ae()
        }
        ,
        se = function() {
            de.updateOriginal()
        }
        ,
        M()
    }
    kt.locale = {},
    kt.formats = {},
    kt.icons = {},
    kt.command = {
        get: function(e) {
            return gt[e] || null
        },
        set: function(e, t) {
            return !(!e || !t) && ((t = Ce(gt[e] || {}, t)).remove = function() {
                kt.command.remove(e)
            }
            ,
            gt[e] = t,
            this)
        },
        remove: function(e) {
            return gt[e] && delete gt[e],
            this
        }
    },
    window.sceditor = {
        command: kt.command,
        commands: gt,
        defaultOptions: ct,
        ie: h,
        ios: ut,
        isWysiwygSupported: dt,
        regexEscape: ft,
        escapeEntities: pt,
        escapeUriScheme: function(e) {
            var t, n = window.location;
            return e && /^[^\/]*:/i.test(e) && !v.test(e) ? ((t = n.pathname.split("/")).pop(),
            n.protocol + "//" + n.host + t.join("/") + "/" + e) : e
        },
        dom: {
            css: Pe,
            attr: Ae,
            removeAttr: r,
            is: We,
            closest: Ne,
            width: Ke,
            height: Xe,
            traverse: Qe,
            rTraverse: Ze,
            parseHTML: et,
            hasStyling: tt,
            convertElement: nt,
            blockLevelList: c,
            canHaveChildren: ot,
            isInline: rt,
            copyCSS: s,
            fixNesting: it,
            findCommonAncestor: function(e, t) {
                for (; e = e.parentNode; )
                    if ((n = e) !== (o = t) && n.contains && n.contains(o))
                        return e;
                var n, o
            },
            getSibling: d,
            removeWhiteSpace: at,
            extractContents: u,
            getOffset: lt,
            getStyle: f,
            hasStyle: function(e, t, n) {
                var o = f(e, t);
                return !!o && (!n || o === n || Array.isArray(n) && -1 < n.indexOf(o))
            }
        },
        locale: kt.locale,
        icons: kt.icons,
        utils: {
            each: Se,
            isEmptyObject: t,
            extend: Ce
        },
        plugins: ht.plugins,
        formats: kt.formats,
        create: function(e, t) {
            t = t || {},
            Me(e, ".sceditor-container") || (t.runWithoutWysiwygSupport || dt) && new kt(e,t)
        },
        instance: function(e) {
            return e._sceditor
        }
    }
}();


!function(h, a) {
    "use strict";
    var c = a.dom
      , v = {
        bold: '<text x="50%" y="50%" text-anchor="middle" dy=".5ex" font-family="Dejavu Sans, Helvetica, Arial, sans-serif" font-size="15" font-weight="bold">B</text>',
        bulletlist: '<path d="M6 2h9v2H6zm0 5h9v2H6zm0 5h9v2H6z"/><circle cx="3" cy="3" r="1.75"/><circle cx="3" cy="8" r="1.75"/><circle cx="3" cy="13" r="1.75"/>',
        center: '<path d="M1 1h14v2H1zm2 4h10v2H3zM1 9h14v2H1zm2 4h10v2H3z"/>',
        code: '<path d="M7 6L4 9l3 3v-1.5L5.5 9 7 7.5zm2 0v1.5L10.5 9 9 10.5V12l3-3zM2.406 1A.517.517 0 0 0 2 1.5v13c0 .262.238.5.5.5h11a.52.52 0 0 0 .5-.5V4.375c.002-.102-.13-.193-.156-.219l-3-3A.506.506 0 0 0 10.5 1zM3 2h7v2.5c0 .262.238.5.5.5H13v9H3zm8 .688L12.313 4H11z"/>',
        color: '<text x="50%" y="8" text-anchor="middle" dy=".5ex" font-family="Dejavu Sans, Helvetica, Arial, sans-serif" font-size="13" font-weight="bold">A</text><path class="sce-color" d="M2 13h12v2H2z"/>',
        copy: '<path d="M6.404 5.002a.5.5 0 0 0-.406.5v10a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V8.596a.492.492 0 0 0 0-.094.662.662 0 0 0 0-.063v-.063l-.031-.063v-.031a.557.557 0 0 0-.094-.094l-.031-.031-2.875-2.844a.498.498 0 0 0-.125-.156.5.5 0 0 0-.344-.156h-5a.59.59 0 0 0-.094.001c-.239.046.031-.003 0 0zm.594 1h4v2.5a.5.5 0 0 0 .5.5h2.5v6h-7v-9zm5 .687l1.313 1.313h-1.313V6.689zM1.406.002a.517.517 0 0 0-.406.5v10c0 .262.238.5.5.5H7V6l3-.063V3.596a.492.492 0 0 0 0-.094.331.331 0 0 0 0-.063v-.063c-.009-.021-.02-.041-.031-.062v-.031a.597.597 0 0 0-.094-.094l-.031-.031L6.969.314a.484.484 0 0 0-.125-.156A.506.506 0 0 0 6.5.002h-5a.492.492 0 0 0-.094 0c-.229.044.032-.003 0 0zm.594 1h4v2.5c0 .262.238.5.5.5H9v1.029L7 5 6 6v4l-4 .002v-9zm5 .687l1.313 1.313H7V1.689z"/>',
        cut: '<path d="M3 .5c0 2.936 3.774 7.73 3.938 7.938l-1.813 2.844A2.46 2.46 0 0 0 4 11c-1.375 0-2.5 1.125-2.5 2.5S2.625 16 4 16s2.5-1.125 2.5-2.5c0-.444-.138-.856-.344-1.22L8 9.845l1.844 2.438A2.473 2.473 0 0 0 9.5 13.5c0 1.375 1.125 2.5 2.5 2.5s2.5-1.125 2.5-2.5S13.375 11 12 11a2.46 2.46 0 0 0-1.125.28L9.062 8.439C9.226 8.232 13 3.437 13 .5h-1L8 6.78 4 .5H3zM4 12c.834 0 1.5.666 1.5 1.5S4.834 15 4 15s-1.5-.666-1.5-1.5S3.166 12 4 12zm8 0c.834 0 1.5.666 1.5 1.5S12.834 15 12 15s-1.5-.666-1.5-1.5.666-1.5 1.5-1.5z"/>',
        date: '<path d="M8.1 7v1h2.7v1H8.094v3H11.7v-1H9v-1h2.7V7zM4.5 7v1h.8v3h-.8v1h2.7v-1h-.9V7zM.9 1v14h14.4V1h-1.8v2h-2.7V1H5.4v2H2.7V1zm.9 4h12.6v9H1.8z"/>',
        email: '<path d="M1 4.5v8c0 .262.238.5.5.5h13a.52.52 0 0 0 .5-.5V4.594C15 4 15 4 14.5 4H1.563C1 4 1 4 1 4.5zM2 5h12v7H2V5zm-.187-.906l-.625.812 6.5 5 .312.219.313-.219 6.5-5-.625-.813L8 8.844l-6.187-4.75z"/>',
        emoticon: '<path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 1a6 6 0 1 1 0 12A6 6 0 0 1 8 2zM6 5c-.546 0-1 .454-1 1s.454 1 1 1 1-.454 1-1-.454-1-1-1zm4 0c-.547 0-1 .454-1 1s.453 1 1 1c.547 0 1-.454 1-1s-.453-1-1-1zM4.5 9.5s-.002.652.469 1.281C5.44 11.409 6.389 12 8 12c1.611 0 2.561-.591 3.031-1.219.47-.629.469-1.281.469-1.281h-1s-.002.314-.281.688c-.279.374-.83.813-2.219.813-1.389 0-1.94-.44-2.219-.813C5.502 9.814 5.5 9.5 5.5 9.5z"/>',
        font: '<path d="M7.953 9.75h-4.06l-.395 1.141c-.132.381-.254.752-.368 1.109H.7c.391-1.119.762-2.154 1.113-3.105a104.642 104.642 0 0 1 2.024-5.079 52.23 52.23 0 0 1 1.016-2.212h2.218a80.63 80.63 0 0 1 2.011 4.605c.337.84.105.338.458 1.288s-1.455 2.63-1.587 2.253zM5.912 3.959c-.052.151-.129.357-.229.616-.1.26-.215.56-.343.901-.129.341-.273.716-.431 1.125-.159.409-.32.839-.484 1.288h2.972c-.159-.45-.312-.882-.461-1.292a46.81 46.81 0 0 0-.425-1.127c-.135-.34-.252-.641-.354-.9-.1-.26-.182-.463-.245-.611zm6.949 10.042a36.325 36.325 0 0 0-.35-1.037l-.371-1.063H8.352l-.368 1.064A41.69 41.69 0 0 0 7.64 14H5.373c.365-1.045.711-2.01 1.039-2.896.328-.886.648-1.723.962-2.506.313-.786.623-1.53.927-2.235.305-.705.62-1.393.948-2.065h2.069c.318.672.634 1.36.941 2.065.311.705.621 1.449.936 2.235.314.783.636 1.619.964 2.506.327.888.676 1.853 1.041 2.896l-2.339.001zm-2.625-7.504c-.049.141-.118.333-.213.576-.094.242-.2.521-.319.84-.121.317-.254.668-.402 1.051-.147.382-.299.783-.45 1.201h2.772c-.147-.42-.291-.822-.433-1.205a43.073 43.073 0 0 0-.396-1.053c-.125-.317-.233-.598-.33-.84a13.884 13.884 0 0 0-.229-.57z"/>',
        format: '<path d="M10.5 2v1.5H12c.235 0 .401-.009.5 0 .008.088 0 .279 0 .5v2H14V3.437c0-.237-.01-.409-.031-.593-.022-.185-.067-.42-.25-.594s-.407-.2-.594-.219A5.693 5.693 0 0 0 12.5 2zm0-2L7.187 2.5 10.5 5zm.5 5.187L13.5 8.5 16 5.187zm-.958-.339h-2.03l-3.234 8.456c-.154.392-.336.994-.854 1.022v.518h2.744v-.518c-.644-.168-.658-.462-.434-1.036l.784-2.086h3.43l.854 2.086c.238.574.308.924-.406 1.036v.518h3.276v-.518c-.434-.056-.546-.364-.686-.728l-3.444-8.75M7.424 10l1.26-3.318L10 10H7.424M4.912.975h-1.63L.686 7.764c-.124.314-.27.798-.686.82V9h2.203v-.416c-.517-.135-.528-.37-.348-.832l.629-1.674h2.754l.685 1.674c.192.461.248.742-.325.832V9c1.73.137 1.837-.002 2.079-1L4.912.975M2.81 5.11l1.012-2.664L4.878 5.11H2.81"/>',
        grip: '<path d="M14.656 5.156l-10 10 .688.688 10-10-.688-.688zm0 3l-7 7 .688.688 7-7-.688-.688zm0 3l-4 4 .688.688 4-4-.688-.688z"/>',
        horizontalrule: '<path d="M2 2v1h12V2H2zm0 2v1h9V4H2zm0 2v1h12V6H2zm0 2v2h12V8H2z"/>',
        image: '<path d="M.5 2.5v11h15v-11H.5zm1 1h13v9h-13v-9z"/><circle cx="4" cy="6" r="1.25"/><path d="M1 11h14v2H1z"/><path d="M5 12l2-4 2 4z"/><path d="M7 12l4-7 4 7z"/>',
        indent: '<path d="M1 1h14v2H1zm5 4h9v2H6zm0 4h9v2H6zm-5 4h14v2H1zm4-5L1 5v6z"/>',
        italic: '<text x="50%" y="50%" text-anchor="middle" dy=".5ex" font-family="Dejavu Sans, Helvetica, Arial, sans-serif" font-weight="bold" font-size="15" font-style="italic">i</text>',
        justify: '<path d="M1 1h14v2H1zm0 4h14v2H1zm0 4h14v2H1zm0 4h14v2H1z"/>',
        left: '<path d="M1 1h14v2H1zm0 4h10v2H1zm0 4h14v2H1zm0 4h10v2H1z"/>',
        link: '<path d="M2 4c-.625 0-1.009.438-1.188.75s-.269.63-.344.969c-.15.677-.219 1.476-.219 2.28s.068 1.605.219 2.282c.075.339.165.625.344.938s.563.78 1.188.78h4v-2H2.469c-.022-.065-.042-.06-.063-.155-.1-.447-.156-1.15-.156-1.844s.057-1.396.156-1.844c.02-.088.042-.092.063-.156H6V4H2zm8 0v2h3.531c.021.064.043.068.063.156.1.448.156 1.149.156 1.844s-.057 1.396-.156 1.844c-.021.096-.041.09-.063.156H10v2h4c.625 0 1.009-.47 1.188-.781s.269-.6.344-.938c.15-.678.219-1.476.219-2.281s-.068-1.604-.219-2.281c-.075-.34-.165-.656-.344-.97S14.625 4 14 4h-4zM5.719 7c-.523.074-.949.602-.875 1.125S5.477 9.074 6 9h4c.528.01 1-.472 1-1s-.472-1.007-1-1H6a.593.593 0 0 0-.188 0h-.093z"/>',
        ltr: '<path d="M10.313 1.937c-.98 0-1.752.284-2.344.813-.592.529-.906 1.228-.906 2.094 0 .811.275 1.467.781 1.969.506.497 1.227.792 2.156.906V14h2V3h1v11h1V1.939zM2 4v8l4-4z"/>',
        maximize: '<path d="M2 7l1.75-1.75-2-2L0 5V0h5L3.25 1.75l2 2L7 2v5H2zm9 9l1.75-1.75-2-2L9 14V9h5l-1.75 1.75 2 2L16 11v5h-5zm-6 0l-1.75-1.75 2-2L7 14V9H2l1.75 1.75-2 2L0 11v5h5zm6-16l1.75 1.75-2 2L9 2v5h5l-1.75-1.75 2-2L16 5V0h-5z"/>',
        orderedlist: '<path d="M6 2h9v2H6zm0 5h9v2H6zm0 5h9v2H6zm-2.799.846q.392.1.594.352.205.25.205.636 0 .576-.441.877-.441.298-1.287.298-.298 0-.599-.05-.298-.046-.591-.142v-.77q.28.14.555.212.277.07.545.07.396 0 .607-.137.212-.138.212-.394 0-.265-.218-.4-.215-.137-.638-.137h-.4v-.644h.421q.376 0 .56-.116.185-.12.185-.36 0-.224-.18-.346-.178-.122-.505-.122-.242 0-.488.055-.246.054-.49.16v-.731q.295-.083.586-.125.29-.041.57-.041.756 0 1.13.249.375.246.375.744 0 .34-.179.558-.179.215-.529.304zm-.905-3.609H4v.734H1.186v-.734L2.599 7.99q.19-.172.28-.335.091-.163.091-.34 0-.272-.184-.438-.182-.166-.485-.166-.234 0-.511.101-.278.099-.594.296v-.851q.337-.112.667-.169.329-.06.645-.06.696 0 1.08.307.386.306.386.853 0 .317-.163.592-.164.272-.688.731l-.827.726zM1.228 4.276h.903V1.714l-.927.19V1.21l.922-.191h.971v3.258H4v.706H1.228v-.706z"/>',
        outdent: '<path d="M1 1h14v2H1zm0 4h9v2H1zm0 4h9v2H1zm0 4h14v2H1zm10-5l4-3v6z"/>',
        paste: '<path d="M4.406 0A.5.5 0 0 0 4 .5V1H1.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5H6v2.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V7.594a.492.492 0 0 0 0-.094.436.436 0 0 0 0-.125.916.916 0 0 0-.031-.063v-.031a.749.749 0 0 0-.063-.063.749.749 0 0 0-.063-.063l-2.875-2.844a.498.498 0 0 0-.125-.156A.498.498 0 0 0 11.5 4H10V1.5a.5.5 0 0 0-.5-.5H7V.5a.5.5 0 0 0-.5-.5h-2a.492.492 0 0 0-.094 0c-.239.045.032-.003 0 0zM2 2h1v.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V2h1v2H6.5a.64.64 0 0 0-.062 0 .493.493 0 0 0-.094.031.474.474 0 0 0-.125.063l-.031.031-.031.031a.916.916 0 0 0-.063.031.47.47 0 0 0-.031.094l-.031.031A.506.506 0 0 0 6 4.5V11H2V2zm5 3h4v2.5a.5.5 0 0 0 .5.5H14v6H7v-2.406a.492.492 0 0 0 0-.094V5zm5 .688L13.313 7H12V5.688zM4.406 0A.5.5 0 0 0 4 .5V1H1.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5V5h2.5a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5H7V.5a.5.5 0 0 0-.5-.5h-2a.492.492 0 0 0-.094 0c-.239.045.032-.003 0 0zM2 2h1v.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V2h1v2H6.5a.5.5 0 0 0-.5.5V11H2V2zm4.406 2A.5.5 0 0 0 6 4.5v10a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V7.594a.492.492 0 0 0 0-.094.331.331 0 0 0 0-.063v-.063a.916.916 0 0 0-.031-.063V7.28a.523.523 0 0 0-.094-.094l-.031-.031-2.875-2.844a.498.498 0 0 0-.125-.156A.503.503 0 0 0 11.5 4h-5a.492.492 0 0 0-.094 0c-.239.045.032-.003 0 0zM7 5h4v2.5a.5.5 0 0 0 .5.5H14v6H7V5zm5 .688L13.313 7H12V5.688zM8 12h5v1H8v-1zm0-2h5v1H8v-1zm0-2h5v1H8V8zm0-2h3v1H8V6z"/>',
        pastetext: '<path d="M4.406 0A.5.5 0 0 0 4 .5V1H1.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5H6v2.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V7.594a.492.492 0 0 0 0-.094.436.436 0 0 0 0-.125.916.916 0 0 0-.031-.063v-.031a.749.749 0 0 0-.063-.063.749.749 0 0 0-.063-.063l-2.875-2.844a.498.498 0 0 0-.125-.156A.498.498 0 0 0 11.5 4H10V1.5a.5.5 0 0 0-.5-.5H7V.5a.5.5 0 0 0-.5-.5h-2a.492.492 0 0 0-.094 0zM2 2h1v.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V2h1v2H6.5a.64.64 0 0 0-.062 0 .493.493 0 0 0-.094.031.474.474 0 0 0-.125.063l-.031.031-.031.031a.916.916 0 0 0-.063.031.47.47 0 0 0-.031.094l-.031.031A.506.506 0 0 0 6 4.5V11H2V2zm5 3h4v2.5a.5.5 0 0 0 .5.5H14v6H7v-2.406a.492.492 0 0 0 0-.094V5zm5 .688L13.313 7H12V5.688zM4.406 0A.5.5 0 0 0 4 .5V1H1.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5V5h2.5a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5H7V.5a.5.5 0 0 0-.5-.5h-2a.492.492 0 0 0-.094 0zM2 2h1v.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V2h1v2H6.5a.5.5 0 0 0-.5.5V11H2V2zm4.406 2A.5.5 0 0 0 6 4.5v10a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V7.594a.492.492 0 0 0 0-.094.331.331 0 0 0 0-.063v-.062a.916.916 0 0 0-.031-.063v-.031a.523.523 0 0 0-.094-.094l-.031-.031-2.875-2.844a.498.498 0 0 0-.125-.156A.5.5 0 0 0 11.5 4h-5a.492.492 0 0 0-.094 0zM7 5h4v2.5a.5.5 0 0 0 .5.5H14v6H7V5zm5 .688L13.313 7H12V5.688z"/>',
        print: '<path d="M4 1v3H1v8h2V6h10v6h2V4h-3V1zm1 1h6v2H5zM4 7v8h8V7zm1 1h6v6H5zm1 1v1h4V9zm0 2v1h4v-1z"/><path d="M4 1v3H1v8h2V6h10v6h2V4h-3V1zm1 1h6v2H5zM4 7v8h8V7zm1 1h6v6H5zm1 1v1h4V9zm0 2v1h4v-1z"/>',
        quote: '<path d="M8 2.013c-1.998 0-3.818.382-5.188 1.125S.499 5.054.499 6.513c0 1.237.926 2.345 2.281 3.156s3.197 1.344 5.219 1.344c.344 0 .563.019.906 0l5.875 2.938c.377.18.854-.32.656-.688l-1.813-3.656c1.242-.79 1.875-2.014 1.875-3.094 0-1.46-.943-2.632-2.313-3.375S9.998 2.013 8 2.013z"/>',
        redo: '<path d="M9 7l5-5v5z"/><path d="M9.553 2.205c1 .268 1.932.796 2.69 1.553l.706.707-1.414 1.414-.707-.707a3.995 3.995 0 0 0-3.863-1.035 3.995 3.995 0 0 0-2.828 2.828 3.995 3.995 0 0 0 1.035 3.863l.707.707-1.414 1.414-.707-.707a6.003 6.003 0 0 1-1.553-5.795 6.003 6.003 0 0 1 7.348-4.242z"/>',
        removeformat: '<path d="M8.781 2l-.125.125L3.781 7l-.125.125-3 3-.313.313.25.344 3 4 .156.219h2.47l.125-.156 3-3 .313-.313 4.688-4.688.313-.313-.25-.344-3-4-.156-.188H8.781zm.407 1h.594l-4 4h-.594l4-4zm1.75.25l2.406 3.188-4.281 4.28-2.406-3.187 4.281-4.281z"/>',
        right: '<path d="M1 1h14v2H1zm4 4h10v2H5zM1 9h14v2H1zm4 4h10v2H5z"/>',
        rtl: '<path d="M5.344 2.001c-.98 0-1.783.284-2.375.813-.592.529-.875 1.227-.875 2.093 0 .811.244 1.467.75 1.969.506.497 1.227.792 2.156.906V14h2V3.001L8 3v11h1V2zM14 4l-4 4 4 4z"/>',
        size: '<path d="M12.5.656L10 4h5L12.5.656zM4.594 4.5a49.476 49.476 0 0 0-.875 1.906c-.277.65-.581 1.334-.875 2.063-.286.729-.572 1.52-.875 2.344S1.338 12.53 1 13.5h2.094c.095-.313.2-.64.313-.97.121-.328.262-.64.375-.968h3.5c.113.329.231.64.344.969.121.329.217.656.313.969h2.188c-.338-.971-.666-1.864-.969-2.688s-.611-1.615-.906-2.344a56.045 56.045 0 0 0-.844-2.063c-.286-.66-.581-1.282-.875-1.906H4.594zM10 6l2.5 3.313L15 6h-5zm-4.5.53c.052.13.132.307.219.532.086.225.2.486.313.78.121.296.245.614.375.97s.268.734.406 1.125H4.25c.139-.391.245-.77.375-1.125.139-.355.293-.674.406-.97s.194-.555.281-.78c.087-.224.145-.401.188-.531z"/>',
        source: '<path d="M4.937 3.939L1 8.499l3.937 4.564L6 12 3 8.499 6 5zm6.126 0L10 5.002l3 3.503-3 3.497 1.063 1.063L15 8.505z"/>',
        strike: '<text x="50%" y="50%" text-anchor="middle" dy=".5ex" font-family="Dejavu Sans, Helvetica, Arial, sans-serif" font-size="15" font-weight="bold">S</text><path d="M1 7v1h14V7H1z"/>',
        subscript: '<path d="M11 10v1h3v1h-3v3h4v-1h-3v-1h3v-3zM1 3l3 5-3 5h2l3-5H4l3 5h2L6 8l3-5H7L4 8h2L3 3z"/>',
        superscript: '<path d="M11 1v1h3v1h-3v3h4V5h-3V4h3V1zM1 3l3 5-3 5h2l3-5H4l3 5h2L6 8l3-5H7L4 8h2L3 3z"/>',
        table: '<path d="M1 2h14v2H1zm0 2v10h14V4H1zm1 1h3.5v2H2V5zm4.5 0h3v2h-3V5zm4 0H14v2h-3.5V5zM2 8h3.5v2H2V8zm4.5 0h3v2h-3V8zm4 0H14v2h-3.5V8zM2 11h3.5v2H2v-2zm4.5 0h3v2h-3v-2zm4 0H14v2h-3.5v-2z"/>',
        time: '<path d="M8 0C3 0 0 4 0 8s3 8 8 8 8-4 8-8-3-8-8-8zm0 2c3.461 0 6 2.539 6 6s-2.539 6-6 6c-3.46 0-6-2.539-6-6s2.54-6 6-6zM7 3v6l2.5 2L11 9.5 9 8V3z"/>',
        underline: '<text x="50%" y="50%" text-anchor="middle" dy=".5ex" font-family="Dejavu Sans, Helvetica, Arial, sans-serif" font-weight="bold" font-size="15" text-decoration="underline">U</text>',
        undo: '<path d="M2 7h5L2 2z"/><path d="M6.447 2.205c-1 .268-1.932.796-2.69 1.553l-.706.707 1.414 1.414.707-.707a3.995 3.995 0 0 1 3.863-1.035 3.995 3.995 0 0 1 2.828 2.828 3.995 3.995 0 0 1-1.035 3.863l-.707.707 1.414 1.414.707-.707a6.003 6.003 0 0 0 1.553-5.795 6.003 6.003 0 0 0-7.348-4.242z"/>',
        unlink: '<path d="M2 4c-.625 0-1.009.438-1.188.75s-.269.63-.344.969c-.15.677-.219 1.476-.219 2.28s.068 1.605.219 2.282c.075.339.165.625.344.938s.563.78 1.188.78h4v-2H2.469c-.022-.065-.042-.06-.063-.155-.1-.447-.156-1.15-.156-1.844s.057-1.396.156-1.844c.02-.088.042-.092.063-.156H6V4H2zm8 0v2h3.531c.021.064.043.068.063.156.1.448.156 1.149.156 1.844s-.057 1.396-.156 1.844c-.021.095-.041.09-.063.156H10v2h4c.625 0 1.009-.47 1.188-.781s.269-.6.344-.938c.15-.678.219-1.476.219-2.281s-.068-1.604-.219-2.281c-.075-.34-.165-.656-.344-.97S14.625 4 14 4h-4z"/>',
        youtube: '<path d="M2 2C1 2 0 3 0 4v8c0 1 1 2 2 2h12c1 0 2-1 2-2V4c0-1-1-2-2-2H2zm4 3l6 3-6 3V5z"/>'
    };
    a.icons.monocons = function() {
        var z, t = {};
        return {
            create: function(h) {
                return h in v && (t[h] = a.dom.parseHTML('<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 16 16" unselectable="on">' + v[h] + "</svg>").firstChild,
                "color" === h && (z = t[h].querySelector(".sce-color"))),
                t[h]
            },
            /* update: function(h, a) {
                if (z) {
                    var v = "inherit";
                    !h && a && (v = a.ownerDocument.queryCommandValue("forecolor"),
                    parseInt(v) === v && (v = "#" + ("000000" + (v = (255 & v) << 16 | 65280 & v | (16711680 & v) >>> 16).toString(16)).slice(-6))),
                    c.css(z, "fill", v)
                }
            }, */
            rtl: function(h) {
                var a = t.grip;
                if (a) {
                    var v = h ? "scaleX(-1)" : "";
                    c.css(a, "transform", v),
                    c.css(a, "msTransform", v),
                    c.css(a, "webkitTransform", v)
                }
            }
        }
    }
    ,
    a.icons.monocons.icons = v
}(document, sceditor);


!function(t) {
    "use strict";
    var h = t.escapeEntities
      , a = t.escapeUriScheme
      , m = t.dom
      , e = t.utils
      , p = m.css
      , g = m.attr
      , v = m.is
      , n = e.extend
      , s = e.each
      , r = t.ie
      , b = r && r < 11
      , y = "data-sceditor-emoticon"
      , l = t.command.get
      , x = {
        always: 1,
        never: 2,
        auto: 3
    }
      , i = {
        bold: {
            txtExec: ["[b]", "[/b]"]
        },
        italic: {
            txtExec: ["[i]", "[/i]"]
        },
        underline: {
            txtExec: ["[u]", "[/u]"]
        },
        strike: {
            txtExec: ["[s]", "[/s]"]
        },
        subscript: {
            txtExec: ["[sub]", "[/sub]"]
        },
        superscript: {
            txtExec: ["[sup]", "[/sup]"]
        },
        left: {
            txtExec: ["[left]", "[/left]"]
        },
        center: {
            txtExec: ["[center]", "[/center]"]
        },
        right: {
            txtExec: ["[right]", "[/right]"]
        },
        justify: {
            txtExec: ["[justify]", "[/justify]"]
        },
        font: {
            txtExec: function(t) {
                var e = this;
                l("font")._dropDown(e, t, function(t) {
                    e.insertText("[font=" + t + "]", "[/font]")
                })
            }
        },
        size: {
            txtExec: function(t) {
                var e = this;
                l("size")._dropDown(e, t, function(t) {
                    e.insertText("[size=" + t + "]", "[/size]")
                })
            }
        },
        color: {
            txtExec: function(t) {
                var e = this;
                l("color")._dropDown(e, t, function(t) {
                    e.insertText("[color=" + t + "]", "[/color]")
                })
            }
        },
        bulletlist: {
            txtExec: function(t, e) {
                var n = "";
                s(e.split(/\r?\n/), function() {
                    n += (n ? "\n" : "") + "[li]" + this + "[/li]"
                }),
                this.insertText("[ul]\n" + n + "\n[/ul]")
            }
        },
        orderedlist: {
            txtExec: function(t, e) {
                var n = "";
                s(e.split(/\r?\n/), function() {
                    n += (n ? "\n" : "") + "[li]" + this + "[/li]"
                }),
                this.insertText("[ol]\n" + n + "\n[/ol]")
            }
        },
        table: {
            txtExec: ["[table][tr][td]", "[/td][/tr][/table]"]
        },
        horizontalrule: {
            txtExec: ["[hr]"]
        },
        code: {
            txtExec: ["[code]", "[/code]"]
        },
        image: {
            txtExec: function(t, e) {
                var i = this;
                l("image")._dropDown(i, t, e, function(t, e, n) {
                    var r = "";
                    e && (r += " width=" + e),
                    n && (r += " height=" + n),
                    i.insertText("[img" + r + "]" + t + "[/img]")
                })
            }
        },
        email: {
            txtExec: function(t, n) {
                var r = this;
                l("email")._dropDown(r, t, function(t, e) {
                    r.insertText("[email=" + t + "]" + (e || n || t) + "[/email]")
                })
            }
        },
        link: {
            txtExec: function(t, n) {
                var r = this;
                l("link")._dropDown(r, t, function(t, e) {
                    r.insertText("[url=" + t + "]" + (e || n || t) + "[/url]")
                })
            }
        },
        quote: {
            txtExec: ["[quote]", "[/quote]"]
        },
        youtube: {
            txtExec: function(t) {
                var e = this;
                l("youtube")._dropDown(e, t, function(t) {
                    e.insertText("[youtube]" + t + "[/youtube]")
                })
            }
        },
        rtl: {
            txtExec: ["[rtl]", "[/rtl]"]
        },
        ltr: {
            txtExec: ["[ltr]", "[/ltr]"]
        }
    }
      , k = {
        b: {
            tags: {
                b: null,
                strong: null
            },
            styles: {
                "font-weight": ["bold", "bolder", "401", "700", "800", "900"]
            },
            format: "[b]{0}[/b]",
            html: "<strong>{0}</strong>"
        },
        i: {
            tags: {
                i: null,
                em: null
            },
            styles: {
                "font-style": ["italic", "oblique"]
            },
            format: "[i]{0}[/i]",
            html: "<em>{0}</em>"
        },
        u: {
            tags: {
                u: null
            },
            styles: {
                "text-decoration": ["underline"]
            },
            format: "[u]{0}[/u]",
            html: "<u>{0}</u>"
        },
        s: {
            tags: {
                s: null,
                strike: null
            },
            styles: {
                "text-decoration": ["line-through"]
            },
            format: "[s]{0}[/s]",
            html: "<s>{0}</s>"
        },
        sub: {
            tags: {
                sub: null
            },
            format: "[sub]{0}[/sub]",
            html: "<sub>{0}</sub>"
        },
        sup: {
            tags: {
                sup: null
            },
            format: "[sup]{0}[/sup]",
            html: "<sup>{0}</sup>"
        },
        font: {
            tags: {
                font: {
                    face: null
                }
            },
            styles: {
                "font-family": null
            },
            quoteType: x.never,
            format: function(t, e) {
                var n;
                return v(t, "font") && (n = g(t, "face")) || (n = p(t, "font-family")),
                "[font=" + E(n) + "]" + e + "[/font]"
            },
            html: '<font face="{defaultattr}">{0}</font>'
        },
        size: {
            tags: {
                font: {
                    size: null
                }
            },
            styles: {
                "font-size": null
            },
            format: function(t, e) {
                var n = g(t, "size")
                  , r = 2;
                return n || (n = p(t, "fontSize")),
                -1 < n.indexOf("px") ? ((n = n.replace("px", "") - 0) < 12 && (r = 1),
                15 < n && (r = 3),
                17 < n && (r = 4),
                23 < n && (r = 5),
                31 < n && (r = 6),
                47 < n && (r = 7)) : r = n,
                "[size=" + r + "]" + e + "[/size]"
            },
            html: '<font size="{defaultattr}">{!0}</font>'
        },
        color: {
            tags: {
                font: {
                    color: null
                }
            },
            styles: {
                color: null
            },
            quoteType: x.never,
            format: function(t, e) {
                var n;
                return v(t, "font") && (n = g(t, "color")) || (n = t.style.color || p(t, "color")),
                "[color=" + c(n) + "]" + e + "[/color]"
            },
            html: function(t, e, n) {
                return '<font color="' + h(c(e.defaultattr), !0) + '">' + n + "</font>"
            }
        },
        ul: {
            tags: {
                ul: null
            },
            breakStart: !0,
            isInline: !1,
            skipLastLineBreak: !0,
            format: "[ul]{0}[/ul]",
            html: "<ul>{0}</ul>"
        },
        list: {
            breakStart: !0,
            isInline: !1,
            skipLastLineBreak: !0,
            html: "<ul>{0}</ul>"
        },
        ol: {
            tags: {
                ol: null
            },
            breakStart: !0,
            isInline: !1,
            skipLastLineBreak: !0,
            format: "[ol]{0}[/ol]",
            html: "<ol>{0}</ol>"
        },
        li: {
            tags: {
                li: null
            },
            isInline: !1,
            closedBy: ["/ul", "/ol", "/list", "*", "li"],
            format: "[li]{0}[/li]",
            html: "<li>{0}</li>"
        },
        "*": {
            isInline: !1,
            closedBy: ["/ul", "/ol", "/list", "*", "li"],
            html: "<li>{0}</li>"
        },
        table: {
            tags: {
                table: null
            },
            isInline: !1,
            isHtmlInline: !0,
            skipLastLineBreak: !0,
            format: "[table]{0}[/table]",
            html: "<table>{0}</table>"
        },
        tr: {
            tags: {
                tr: null
            },
            isInline: !1,
            skipLastLineBreak: !0,
            format: "[tr]{0}[/tr]",
            html: "<tr>{0}</tr>"
        },
        th: {
            tags: {
                th: null
            },
            allowsEmpty: !0,
            isInline: !1,
            format: "[th]{0}[/th]",
            html: "<th>{0}</th>"
        },
        td: {
            tags: {
                td: null
            },
            allowsEmpty: !0,
            isInline: !1,
            format: "[td]{0}[/td]",
            html: "<td>{0}</td>"
        },
        emoticon: {
            allowsEmpty: !0,
            tags: {
                img: {
                    src: null,
                    "data-sceditor-emoticon": null
                }
            },
            format: function(t, e) {
                return g(t, y) + e
            },
            html: "{0}"
        },
        hr: {
            tags: {
                hr: null
            },
            allowsEmpty: !0,
            isSelfClosing: !0,
            isInline: !1,
            format: "[hr]{0}",
            html: "<hr />"
        },
        img: {
            allowsEmpty: !0,
            tags: {
                img: {
                    src: null
                }
            },
            allowedChildren: ["#"],
            quoteType: x.never,
            format: function(e, t) {
                var n, r, i = "", l = function(t) {
                    return e.style ? e.style[t] : null
                };
                return g(e, y) ? t : (n = g(e, "width") || l("width"),
                r = g(e, "height") || l("height"),
                (e.complete && (n || r) || n && r) && (i = "=" + m.width(e) + "x" + m.height(e)),
                "[img" + i + "]" + g(e, "src") + "[/img]")
            },
            html: function(t, e, n) {
                var r, i, l, o = "";
                return r = e.width,
                i = e.height,
                e.defaultattr && (r = (l = e.defaultattr.split(/x/i))[0],
                i = 2 === l.length ? l[1] : l[0]),
                void 0 !== r && (o += ' width="' + h(r, !0) + '"'),
                void 0 !== i && (o += ' height="' + h(i, !0) + '"'),
                "<img" + o + ' src="' + a(n) + '" />'
            }
        },
        url: {
            allowsEmpty: !0,
            tags: {
                a: {
                    href: null
                }
            },
            quoteType: x.never,
            format: function(t, e) {
                var n = g(t, "href");
                return "mailto:" === n.substr(0, 7) ? '[email="' + n.substr(7) + '"]' + e + "[/email]" : "[url=" + n + "]" + e + "[/url]"
            },
            html: function(t, e, n) {
                return e.defaultattr = h(e.defaultattr, !0) || n,
                '<a href="' + a(e.defaultattr) + '">' + n + "</a>"
            }
        },
        email: {
            quoteType: x.never,
            html: function(t, e, n) {
                return '<a href="mailto:' + (h(e.defaultattr, !0) || n) + '">' + n + "</a>"
            }
        },
        quote: {
            tags: {
                blockquote: null
            },
            isInline: !1,
            quoteType: x.never,
            format: function(t, e) {
                for (var n, r = "data-author", i = "", l = t.children, o = 0; !n && o < l.length; o++)
                    v(l[o], "cite") && (n = l[o]);
                return (n || g(t, r)) && (i = n && n.textContent || g(t, r),
                g(t, r, i),
                n && t.removeChild(n),
                e = this.elementToBbcode(t),
                i = "=" + i.replace(/(^\s+|\s+$)/g, ""),
                n && t.insertBefore(n, t.firstChild)),
                "[quote" + i + "]" + e + "[/quote]"
            },
            html: function(t, e, n) {
                return e.defaultattr && (n = "<cite>" + h(e.defaultattr) + "</cite>" + n),
                "<blockquote>" + n + "</blockquote>"
            }
        },
        code: {
            tags: {
                code: null
            },
            isInline: !1,
            allowedChildren: ["#", "#newline"],
            format: "[code]{0}[/code]",
            html: "<code>{0}</code>"
        },
        left: {
            styles: {
                "text-align": ["left", "-webkit-left", "-moz-left", "-khtml-left"]
            },
            isInline: !1,
            format: "[left]{0}[/left]",
            html: '<div align="left">{0}</div>'
        },
        center: {
            styles: {
                "text-align": ["center", "-webkit-center", "-moz-center", "-khtml-center"]
            },
            isInline: !1,
            format: "[center]{0}[/center]",
            html: '<div align="center">{0}</div>'
        },
        right: {
            styles: {
                "text-align": ["right", "-webkit-right", "-moz-right", "-khtml-right"]
            },
            isInline: !1,
            format: "[right]{0}[/right]",
            html: '<div align="right">{0}</div>'
        },
        justify: {
            styles: {
                "text-align": ["justify", "-webkit-justify", "-moz-justify", "-khtml-justify"]
            },
            isInline: !1,
            format: "[justify]{0}[/justify]",
            html: '<div align="justify">{0}</div>'
        },
        youtube: {
            allowsEmpty: !0,
            tags: {
                iframe: {
                    "data-youtube-id": null
                }
            },
            format: function(t, e) {
                return (t = g(t, "data-youtube-id")) ? "[youtube]" + t + "[/youtube]" : e
            },
            html: '<iframe width="560" height="315" frameborder="0" src="https://www.youtube.com/embed/{0}?wmode=opaque" data-youtube-id="{0}" allowfullscreen></iframe>'
        },
        rtl: {
            styles: {
                direction: ["rtl"]
            },
            isInline: !1,
            format: "[rtl]{0}[/rtl]",
            html: '<div style="direction: rtl">{0}</div>'
        },
        ltr: {
            styles: {
                direction: ["ltr"]
            },
            isInline: !1,
            format: "[ltr]{0}[/ltr]",
            html: '<div style="direction: ltr">{0}</div>'
        },
        ignore: {}
    };
    function w(t, r) {
        return t.replace(/\{([^}]+)\}/g, function(t, e) {
            var n = !0;
            return "!" === e.charAt(0) && (n = !1,
            e = e.substring(1)),
            "0" === e && (n = !1),
            void 0 === r[e] ? t : n ? h(r[e], !0) : r[e]
        })
    }
    function B(t) {
        return "function" == typeof t
    }
    function E(t) {
        return t ? t.replace(/\\(.)/g, "$1").replace(/^(["'])(.*?)\1$/, "$2") : t
    }
    function C(t) {
        var n = arguments;
        return t.replace(/\{(\d+)\}/g, function(t, e) {
            return void 0 !== n[e - 0 + 1] ? n[e - 0 + 1] : "{" + e + "}"
        })
    }
    var I = "open"
      , T = "content"
      , S = "newline"
      , L = "close";
    function u(t, e, n, r, i, l) {
        var o = this;
        o.type = t,
        o.name = e,
        o.val = n,
        o.attrs = r || {},
        o.children = i || [],
        o.closing = l || null
    }
    function q(t) {
        var m = this;
        function o(t, e) {
            var n, r, i;
            return t === I && (n = e.match(/\[([^\]\s=]+)(?:([^\]]+))?\]/)) && (i = l(n[1]),
            n[2] && (n[2] = n[2].trim()) && (r = function(t) {
                var e, n = /([^\s=]+)=(?:(?:(["'])((?:\\\2|[^\2])*?)\2)|((?:.(?!\s\S+=))*.))/g, r = {};
                if ("=" === t.charAt(0) && t.indexOf("=", 1) < 0)
                    r.defaultattr = E(t.substr(1));
                else
                    for ("=" === t.charAt(0) && (t = "defaultattr" + t); e = n.exec(t); )
                        r[l(e[1])] = E(e[3]) || e[4];
                return r
            }(n[2]))),
            t === L && (n = e.match(/\[\/([^\[\]]+)\]/)) && (i = l(n[1])),
            t === S && (i = "#newline"),
            i && (t !== I && t !== L || k[i]) || (t = T,
            i = "#"),
            new u(t,i,e,r)
        }
        function d(t, e, n) {
            for (var r = n.length; r--; )
                if (n[r].type === e && n[r].name === t)
                    return !0;
            return !1
        }
        function p(t, e) {
            var n = (t ? k[t.name] : {}).allowedChildren;
            return !m.opts.fixInvalidChildren || !n || -1 < n.indexOf(e.name || "#")
        }
        function g(t, e, n) {
            var r = /\s|=/.test(t);
            return B(e) ? e(t, n) : e === x.never || e === x.auto && !r ? t : '"' + t.replace("\\", "\\\\").replace('"', '\\"') + '"'
        }
        function v(t) {
            return t.length ? t[t.length - 1] : null
        }
        function l(t) {
            return t.toLowerCase()
        }
        m.opts = n({}, q.defaults, t),
        m.tokenize = function(t) {
            var e, n, r, i = [], l = [{
                type: T,
                regex: /^([^\[\r\n]+|\[)/
            }, {
                type: S,
                regex: /^(\r\n|\r|\n)/
            }, {
                type: I,
                regex: /^\[[^\[\]]+\]/
            }, {
                type: L,
                regex: /^\[\/[^\[\]]+\]/
            }];
            t: for (; t.length; ) {
                for (r = l.length; r--; )
                    if (n = l[r].type,
                    (e = t.match(l[r].regex)) && e[0]) {
                        i.push(o(n, e[0])),
                        t = t.substr(e[0].length);
                        continue t
                    }
                t.length && i.push(o(T, t)),
                t = ""
            }
            return i
        }
        ,
        m.parse = function(t, e) {
            var n = function(t) {
                var e, n, r, i, l, o, a = [], s = [], u = [], c = function() {
                    return v(u)
                }, f = function(t) {
                    c() ? c().children.push(t) : s.push(t)
                }, h = function(t) {
                    return c() && (n = k[c().name]) && n.closedBy && -1 < n.closedBy.indexOf(t)
                };
                for (; e = t.shift(); )
                    switch (o = t[0],
                    p(c(), e) || e.type === L && c() && e.name === c().name || (e.name = "#",
                    e.type = T),
                    e.type) {
                    case I:
                        h(e.name) && u.pop(),
                        f(e),
                        (n = k[e.name]) && !n.isSelfClosing && (n.closedBy || d(e.name, L, t)) ? u.push(e) : n && n.isSelfClosing || (e.type = T);
                        break;
                    case L:
                        if (c() && e.name !== c().name && h("/" + e.name) && u.pop(),
                        c() && e.name === c().name)
                            c().closing = e,
                            u.pop();
                        else if (d(e.name, I, u)) {
                            for (; r = u.pop(); ) {
                                if (r.name === e.name) {
                                    r.closing = e;
                                    break
                                }
                                i = r.clone(),
                                a.length && i.children.push(v(a)),
                                a.push(i)
                            }
                            for (o && o.type === S && (n = k[e.name]) && !1 === n.isInline && (f(o),
                            t.shift()),
                            f(v(a)),
                            l = a.length; l--; )
                                u.push(a[l]);
                            a.length = 0
                        } else
                            e.type = T,
                            f(e);
                        break;
                    case S:
                        c() && o && h((o.type === L ? "/" : "") + o.name) && (o.type === L && o.name === c().name || ((n = k[c().name]) && n.breakAfter ? u.pop() : n && !1 === n.isInline && m.opts.breakAfterBlock && !1 !== n.breakAfter && u.pop())),
                        f(e);
                        break;
                    default:
                        f(e)
                    }
                return s
            }(m.tokenize(t))
              , r = m.opts;
            return r.fixInvalidNesting && function t(e, n, r, i) {
                var l, o, a, s, u, c;
                var f = function(t) {
                    var e = k[t.name];
                    return !e || !1 !== e.isInline
                };
                n = n || [];
                i = i || e;
                for (o = 0; o < e.length; o++)
                    if ((l = e[o]) && l.type === I) {
                        if (r && !f(l)) {
                            if (a = v(n),
                            c = a.splitAt(l),
                            u = 1 < n.length ? n[n.length - 2].children : i,
                            p(l, a)) {
                                var h = a.clone();
                                h.children = l.children,
                                l.children = [h]
                            }
                            if (-1 < (s = u.indexOf(a))) {
                                c.children.splice(0, 1),
                                u.splice(s + 1, 0, l, c);
                                var d = c.children[0];
                                return void (d && d.type === S && (f(l) || (c.children.splice(0, 1),
                                u.splice(s + 2, 0, d))))
                            }
                        }
                        n.push(l),
                        t(l.children, n, r || f(l), i),
                        n.pop()
                    }
            }(n),
            function t(e, n, r) {
                var i, l, o, a, s, u, c, f;
                var h = e.length;
                n && (a = k[n.name]);
                var d = h;
                for (; d--; )
                    if (i = e[d])
                        if (i.type === S) {
                            if (l = 0 < d ? e[d - 1] : null,
                            o = d < h - 1 ? e[d + 1] : null,
                            f = !1,
                            !r && a && !0 !== a.isSelfClosing && (l ? u || o || (!1 === a.isInline && m.opts.breakEndBlock && !1 !== a.breakEnd && (f = !0),
                            a.breakEnd && (f = !0),
                            u = f) : (!1 === a.isInline && m.opts.breakStartBlock && !1 !== a.breakStart && (f = !0),
                            a.breakStart && (f = !0))),
                            l && l.type === I && (s = k[l.name]) && (r ? !1 === s.isInline && (f = !0) : (!1 === s.isInline && m.opts.breakAfterBlock && !1 !== s.breakAfter && (f = !0),
                            s.breakAfter && (f = !0))),
                            !r && !c && o && o.type === I && (s = k[o.name]) && (!1 === s.isInline && m.opts.breakBeforeBlock && !1 !== s.breakBefore && (f = !0),
                            s.breakBefore && (f = !0),
                            c = f)) {
                                e.splice(d, 1);
                                continue
                            }
                            f && e.splice(d, 1),
                            c = !1
                        } else
                            i.type === I && t(i.children, i, r)
            }(n, null, e),
            r.removeEmptyTags && function t(e) {
                var n, r;
                var i = function(t) {
                    for (var e = t.length; e--; ) {
                        var n = t[e].type;
                        if (n === I || n === L)
                            return !1;
                        if (n === T && /\S|\u00A0/.test(t[e].val))
                            return !1
                    }
                    return !0
                };
                var l = e.length;
                for (; l--; )
                    (n = e[l]) && n.type === I && (r = k[n.name],
                    t(n.children),
                    i(n.children) && r && !r.isSelfClosing && !r.allowsEmpty && e.splice.apply(e, [l, 1].concat(n.children)))
            }(n),
            n
        }
        ,
        m.toHTML = function(t, e) {
            return function t(e, n) {
                var r, i, l, o, a, s, u, c, f = [];
                u = function(t) {
                    return !1 !== (!t || (void 0 !== t.isHtmlInline ? t.isHtmlInline : t.isInline))
                }
                ;
                for (; 0 < e.length; )
                    if (r = e.shift()) {
                        if (r.type === I)
                            c = r.children[r.children.length - 1] || {},
                            i = k[r.name],
                            a = n && u(i),
                            l = t(r.children, !1),
                            i && i.html ? (u(i) || !u(k[c.name]) || i.isPreFormatted || i.skipLastLineBreak || b || (l += "<br />"),
                            B(i.html) ? o = i.html.call(m, r, r.attrs, l) : (r.attrs[0] = l,
                            o = w(i.html, r.attrs))) : o = r.val + l + (r.closing ? r.closing.val : "");
                        else {
                            if (r.type === S) {
                                if (!n) {
                                    f.push("<br />");
                                    continue
                                }
                                s || f.push("<div>"),
                                b || f.push("<br />"),
                                e.length || f.push("<br />"),
                                f.push("</div>\n"),
                                s = !1;
                                continue
                            }
                            a = n,
                            o = h(r.val, !0)
                        }
                        a && !s ? (f.push("<div>"),
                        s = !0) : !a && s && (f.push("</div>\n"),
                        s = !1),
                        f.push(o)
                    }
                s && f.push("</div>\n");
                return f.join("")
            }(m.parse(t, e), !0)
        }
        ,
        m.toBBCode = function(t, e) {
            return function t(e) {
                var n, r, i, l, o, a, s, u, c, f, h = [];
                for (; 0 < e.length; )
                    if (n = e.shift())
                        if (i = k[n.name],
                        l = !(!i || !1 !== i.isInline),
                        o = i && i.isSelfClosing,
                        s = l && m.opts.breakBeforeBlock && !1 !== i.breakBefore || i && i.breakBefore,
                        u = l && !o && m.opts.breakStartBlock && !1 !== i.breakStart || i && i.breakStart,
                        c = l && m.opts.breakEndBlock && !1 !== i.breakEnd || i && i.breakEnd,
                        f = l && m.opts.breakAfterBlock && !1 !== i.breakAfter || i && i.breakAfter,
                        a = (i ? i.quoteType : null) || m.opts.quoteType || x.auto,
                        i || n.type !== I)
                            if (n.type === I) {
                                if (s && h.push("\n"),
                                h.push("[" + n.name),
                                n.attrs)
                                    for (r in n.attrs.defaultattr && (h.push("=", g(n.attrs.defaultattr, a, "defaultattr")),
                                    delete n.attrs.defaultattr),
                                    n.attrs)
                                        n.attrs.hasOwnProperty(r) && h.push(" ", r, "=", g(n.attrs[r], a, r));
                                h.push("]"),
                                u && h.push("\n"),
                                n.children && h.push(t(n.children)),
                                o || i.excludeClosing || (c && h.push("\n"),
                                h.push("[/" + n.name + "]")),
                                f && h.push("\n"),
                                n.closing && o && h.push(n.closing.val)
                            } else
                                h.push(n.val);
                        else
                            h.push(n.val),
                            n.children && h.push(t(n.children)),
                            n.closing && h.push(n.closing.val);
                return h.join("")
            }(m.parse(t, e))
        }
    }
    function o(t) {
        return t = parseInt(t, 10),
        isNaN(t) ? "00" : (t = Math.max(0, Math.min(t, 255)).toString(16)).length < 2 ? "0" + t : t
    }
    function c(t) {
        var e;
        return (e = (t = t || "#000").match(/rgb\((\d{1,3}),\s*?(\d{1,3}),\s*?(\d{1,3})\)/i)) ? "#" + o(e[1]) + o(e[2]) + o(e[3]) : (e = t.match(/#([0-f])([0-f])([0-f])\s*?$/i)) ? "#" + e[1] + e[1] + e[2] + e[2] + e[3] + e[3] : t
    }
    function f() {
        var u = this;
        u.stripQuotes = E;
        var o = {}
          , a = {}
          , c = {
            ul: ["li", "ol", "ul"],
            ol: ["li", "ol", "ul"],
            table: ["tr"],
            tr: ["td", "th"],
            code: ["br", "p", "div"]
        };
        function f(n, r, t) {
            var i, l, o = m.getStyle;
            return a[t = !!t] && s(a[t], function(t, e) {
                (i = o(n, t)) && o(n.parentNode, t) !== i && s(e, function(t, e) {
                    (!e || -1 < e.indexOf(i.toString())) && (l = k[t].format,
                    r = B(l) ? l.call(u, n, r) : C(l, r))
                })
            }),
            r
        }
        function h(n, r, t) {
            var i, l, e = n.nodeName.toLowerCase();
            return t = !!t,
            o[e] && o[e][t] && s(o[e][t], function(t, e) {
                e && (i = !1,
                s(e, function(t, e) {
                    if (g(n, t) && !(e && e.indexOf(g(n, t)) < 0))
                        return !(i = !0)
                }),
                !i) || (l = k[t].format,
                r = B(l) ? l.call(u, n, r) : C(l, r))
            }),
            r
        }
        function d(t) {
            var u = function(t, a) {
                var s = "";
                return m.traverse(t, function(t) {
                    var e = ""
                      , n = t.nodeType
                      , r = t.nodeName.toLowerCase()
                      , i = c[r]
                      , l = t.firstChild
                      , o = !0;
                    if ("object" == typeof a && (o = -1 < a.indexOf(r),
                    v(t, "img") && g(t, y) && (o = !0),
                    o || (i = a)),
                    3 === n || 1 === n)
                        if (1 === n) {
                            if (v(t, ".sceditor-nlf") && (!l || !b && 1 === t.childNodes.length && /br/i.test(l.nodeName)))
                                return;
                            "iframe" !== r && (e = u(t, i)),
                            o ? ("code" !== r && (e = f(t, e = h(t, e = f(t, e)), !0)),
                            e = h(t, e, !0),
                            s += function(t, e) {
                                var n = t.nodeName.toLowerCase()
                                  , r = m.isInline;
                                if (!r(t, !0) || "br" === n) {
                                    for (var i, l, o = t.previousSibling; o && 1 === o.nodeType && !v(o, "br") && r(o, !0) && !o.firstChild; )
                                        o = o.previousSibling;
                                    for (; i = ((l = t.parentNode) && l.lastChild) === t,
                                    (t = l) && i && r(l, !0); )
                                        ;
                                    (!i || "li" === n || "br" === n && b) && (e += "\n"),
                                    "br" !== n && o && !v(o, "br") && r(o, !0) && (e = "\n" + e)
                                }
                                return e
                            }(t, e)) : s += e
                        } else
                            s += t.nodeValue
                }, !1, !0),
                s
            };
            return u(t)
        }
        function t(t, e, n) {
            var r, i, l, o, a, s = new q(u.opts.parserOptions).toHTML(u.opts.bbcodeTrim ? e.trim() : e);
            return t || n ? (r = s,
            a = document.createElement("div"),
            o = function(t, e) {
                if (!m.hasStyling(t)) {
                    if (b || 1 !== t.childNodes.length || !v(t.firstChild, "br"))
                        for (; l = t.firstChild; )
                            a.insertBefore(l, t);
                    if (e) {
                        var n = a.lastChild;
                        t !== n && v(n, "div") && t.nextSibling === n && a.insertBefore(document.createElement("br"), t)
                    }
                    a.removeChild(t)
                }
            }
            ,
            p(a, "display", "none"),
            a.innerHTML = r.replace(/<\/div>\n/g, "</div>"),
            (i = a.firstChild) && v(i, "div") && o(i, !0),
            (i = a.lastChild) && v(i, "div") && o(i),
            a.innerHTML) : s
        }
        function e(t, e, n, r) {
            var i, l, o = (n = n || document).createElement("div"), a = n.createElement("div"), s = new q(u.opts.parserOptions);
            for (a.innerHTML = e,
            p(o, "visibility", "hidden"),
            o.appendChild(a),
            o.id = "RANDOM",
            n.body.appendChild(o),
            t && (o.insertBefore(n.createTextNode("#"), o.firstChild),
            o.appendChild(n.createTextNode("#"))),
            r && p(a, "whiteSpace", p(r, "whiteSpace")),
            l = a.getElementsByClassName("sceditor-ignore"); l.length; )
                l[0].parentNode.removeChild(l[0]);
            return m.removeWhiteSpace(o),
            i = d(a),
            n.body.removeChild(o),
            i = s.toBBCode(i, !0),
            u.opts.bbcodeTrim && (i = i.trim()),
            i
        }
        u.init = function() {
            u.opts = this.opts,
            u.elementToBbcode = d,
            s(k, function(n) {
                var r, t = k[n].tags, e = k[n].styles;
                t && s(t, function(t, e) {
                    r = !1 === k[n].isInline,
                    o[t] = o[t] || {},
                    o[t][r] = o[t][r] || {},
                    o[t][r][n] = e
                }),
                e && s(e, function(t, e) {
                    r = !1 === k[n].isInline,
                    a[r] = a[r] || {},
                    a[r][t] = a[r][t] || {},
                    a[r][t][n] = e
                })
            }),
            this.commands = n(!0, {}, i, this.commands),
            this.toBBCode = u.toSource,
            this.fromBBCode = u.toHtml
        }
        ,
        u.toHtml = t.bind(null, !1),
        u.fragmentToHtml = t.bind(null, !0),
        u.toSource = e.bind(null, !1),
        u.fragmentToSource = e.bind(null, !0)
    }
    u.prototype = {
        clone: function() {
            var t = this;
            return new u(t.type,t.name,t.val,n({}, t.attrs),[],t.closing ? t.closing.clone() : null)
        },
        splitAt: function(t) {
            var e, n = this.clone(), r = this.children.indexOf(t);
            return -1 < r && (e = this.children.length - r,
            n.children = this.children.splice(r, e)),
            n
        }
    },
    q.QuoteType = x,
    q.defaults = {
        breakBeforeBlock: !1,
        breakStartBlock: !1,
        breakEndBlock: !1,
        breakAfterBlock: !0,
        removeEmptyTags: !0,
        fixInvalidNesting: !0,
        fixInvalidChildren: !0,
        quoteType: x.auto
    },
    f.get = function(t) {
        return k[t] || null
    }
    ,
    f.set = function(t, e) {
        return t && e && ((e = n(k[t] || {}, e)).remove = function() {
            delete k[t]
        }
        ,
        k[t] = e),
        this
    }
    ,
    f.rename = function(t, e) {
        return t in k && (k[e] = k[t],
        delete k[t]),
        this
    }
    ,
    f.remove = function(t) {
        return t in k && delete k[t],
        this
    }
    ,
    f.formatBBCodeString = w,
    t.formats.bbcode = f,
    t.BBCodeParser = q;
}(sceditor);