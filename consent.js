(() => {
  var A = Object.create;
  var x = Object.defineProperty;
  var L = Object.getOwnPropertyDescriptor;
  var T = Object.getOwnPropertyNames;
  var I = Object.getPrototypeOf,
    N = Object.prototype.hasOwnProperty;
  var q = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
  var B = (t, e, n, a) => {
    if ((e && typeof e == "object") || typeof e == "function")
      for (let r of T(e))
        !N.call(t, r) &&
          r !== n &&
          x(t, r, {
            get: () => e[r],
            enumerable: !(a = L(e, r)) || a.enumerable,
          });
    return t;
  };
  var j = (t, e, n) => (
    (n = t != null ? A(I(t)) : {}),
    B(
      e || !t || !t.__esModule
        ? x(n, "default", { value: t, enumerable: !0 })
        : n,
      t
    )
  );
  var y = q((ne, S) => {
    "use strict";
    var D = function (e) {
      return R(e) && !P(e);
    };
    function R(t) {
      return !!t && typeof t == "object";
    }
    function P(t) {
      var e = Object.prototype.toString.call(t);
      return e === "[object RegExp]" || e === "[object Date]" || $(t);
    }
    var z = typeof Symbol == "function" && Symbol.for,
      H = z ? Symbol.for("react.element") : 60103;
    function $(t) {
      return t.$$typeof === H;
    }
    function F(t) {
      return Array.isArray(t) ? [] : {};
    }
    function g(t, e) {
      return e.clone !== !1 && e.isMergeableObject(t) ? d(F(t), t, e) : t;
    }
    function _(t, e, n) {
      return t.concat(e).map(function (a) {
        return g(a, n);
      });
    }
    function J(t, e) {
      if (!e.customMerge) return d;
      var n = e.customMerge(t);
      return typeof n == "function" ? n : d;
    }
    function K(t) {
      return Object.getOwnPropertySymbols
        ? Object.getOwnPropertySymbols(t).filter(function (e) {
            return Object.propertyIsEnumerable.call(t, e);
          })
        : [];
    }
    function O(t) {
      return Object.keys(t).concat(K(t));
    }
    function M(t, e) {
      try {
        return e in t;
      } catch {
        return !1;
      }
    }
    function Y(t, e) {
      return (
        M(t, e) &&
        !(
          Object.hasOwnProperty.call(t, e) &&
          Object.propertyIsEnumerable.call(t, e)
        )
      );
    }
    function Q(t, e, n) {
      var a = {};
      return (
        n.isMergeableObject(t) &&
          O(t).forEach(function (r) {
            a[r] = g(t[r], n);
          }),
        O(e).forEach(function (r) {
          Y(t, r) ||
            (M(t, r) && n.isMergeableObject(e[r])
              ? (a[r] = J(r, n)(t[r], e[r], n))
              : (a[r] = g(e[r], n)));
        }),
        a
      );
    }
    function d(t, e, n) {
      (n = n || {}),
        (n.arrayMerge = n.arrayMerge || _),
        (n.isMergeableObject = n.isMergeableObject || D),
        (n.cloneUnlessOtherwiseSpecified = g);
      var a = Array.isArray(e),
        r = Array.isArray(t),
        o = a === r;
      return o ? (a ? n.arrayMerge(t, e, n) : Q(t, e, n)) : g(e, n);
    }
    d.all = function (e, n) {
      if (!Array.isArray(e))
        throw new Error("first argument should be an array");
      return e.reduce(function (a, r) {
        return d(a, r, n);
      }, {});
    };
    var W = d;
    S.exports = W;
  });
  function m(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var a in n) t[a] = n[a];
    }
    return t;
  }
  var U = {
    read: function (t) {
      return (
        t[0] === '"' && (t = t.slice(1, -1)),
        t.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
      );
    },
    write: function (t) {
      return encodeURIComponent(t).replace(
        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
        decodeURIComponent
      );
    },
  };
  function v(t, e) {
    function n(r, o, s) {
      if (!(typeof document > "u")) {
        (s = m({}, e, s)),
          typeof s.expires == "number" &&
            (s.expires = new Date(Date.now() + s.expires * 864e5)),
          s.expires && (s.expires = s.expires.toUTCString()),
          (r = encodeURIComponent(r)
            .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
            .replace(/[()]/g, escape));
        var i = "";
        for (var c in s)
          s[c] &&
            ((i += "; " + c), s[c] !== !0 && (i += "=" + s[c].split(";")[0]));
        return (document.cookie = r + "=" + t.write(o, r) + i);
      }
    }
    function a(r) {
      if (!(typeof document > "u" || (arguments.length && !r))) {
        for (
          var o = document.cookie ? document.cookie.split("; ") : [],
            s = {},
            i = 0;
          i < o.length;
          i++
        ) {
          var c = o[i].split("="),
            u = c.slice(1).join("=");
          try {
            var l = decodeURIComponent(c[0]);
            if (((s[l] = t.read(u, l)), r === l)) break;
          } catch {}
        }
        return r ? s[r] : s;
      }
    }
    return Object.create(
      {
        set: n,
        get: a,
        remove: function (r, o) {
          n(r, "", m({}, o, { expires: -1 }));
        },
        withAttributes: function (r) {
          return v(this.converter, m({}, this.attributes, r));
        },
        withConverter: function (r) {
          return v(m({}, this.converter, r), this.attributes);
        },
      },
      {
        attributes: { value: Object.freeze(e) },
        converter: { value: Object.freeze(t) },
      }
    );
  }
  var p = v(U, { path: "/" });
  var w = j(y());
  function k(t) {
    return Object.prototype.toString.call(t) === "[object Object]";
  }
  function C(t) {
    var e, n;
    return k(t) === !1
      ? !1
      : ((e = t.constructor),
        e === void 0
          ? !0
          : ((n = e.prototype),
            !(k(n) === !1 || n.hasOwnProperty("isPrototypeOf") === !1)));
  }
  var X = (t) =>
      !(
        !C(t) ||
        Object.keys(t)
          .sort((e, n) => e.localeCompare(n, "en"))
          .join(",") !== "grants,version" ||
        typeof t.version != "string" ||
        !C(t.grants) ||
        Object.keys(t.grants).length === 0 ||
        !Object.values(t.grants).every((e) => typeof e == "boolean")
      ),
    Z = {
      version: "1",
      cookieName: "consent-manager",
      expires: 365,
      categories: [],
    },
    f = class {
      constructor(e) {
        this.isCustomized = !1;
        this.eventListeners = {};
        (this.config = (0, w.default)(Z, e)), this.parseCookie();
      }
      parseCookie() {
        let e = {};
        for (let a of this.config.categories) {
          let r = (a.required || a.default) ?? !1;
          e[a.id] = r;
        }
        let n =
          p.get("consent-manager") && JSON.parse(p.get("consent-manager"));
        if (n && X(n)) {
          if (n.version === this.config.version) {
            this.isCustomized = !0;
            for (let a of this.config.categories)
              a.required || (e[a.id] = n.grants[a.id]);
          }
        } else
          console.warn(
            `Cookie "${this.config.cookieName}" is not a valid object.`
          );
        this.grants = e;
      }
      writeCookie() {
        let e = { version: this.config.version, grants: this.grants };
        p.set(this.config.cookieName, JSON.stringify(e), {
          expires:
            this.config.expires !== "session" ? this.config.expires : null,
        });
      }
      setGrant(e, n) {
        if (e === "*") {
          for (let o of Object.keys(this.grants)) this.setGrant(o, n);
          return;
        }
        if (
          !(e in this.grants) ||
          this.config.categories.find((o) => o.id === e)?.required
        )
          return;
        this.grants[e] = n;
        let r = n ? "grant" : "revoke";
        this.dispatch("update", e),
          this.dispatch(r, e),
          (this.isCustomized = !0),
          this.writeCookie();
      }
      on(e, n) {
        e in this.eventListeners || (this.eventListeners[e] = []),
          this.eventListeners[e].push(n);
      }
      off(e, n) {
        if (!(e in this.eventListeners) || this.eventListeners[e].length === 0)
          return;
        let a = this.eventListeners[e].indexOf(n);
        this.eventListeners[e].splice(a, 1);
      }
      dispatch(e, n) {
        if (e in this.eventListeners)
          for (let a of this.eventListeners[e]) a(n);
      }
    };
  var b = class {
    constructor(e) {
      this.client = e;
      this.updateDOM(), e.on("update", this.updateDOM.bind(this));
    }
    isElementGranted(e) {
      if (!("cmCategories" in e.dataset))
        return console.warn("Element %d is missing cookie category!", e), !1;
      let n = e.dataset.cmCategories.split(",").map((o) => o.trim()),
        a = !1;
      for (let o of n)
        if (this.client.grants[o]) {
          a = !0;
          break;
        }
      return "cmInverted" in e.dataset ? !a : a;
    }
    updateDOM() {
      document.querySelectorAll("[data-consent-manager]").forEach((n) => {
        if (!n.dataset.cmAttribute) {
          console.warn("Element %d is missing data-cm-attribute attribute!", n);
          return;
        }
        if (!n.dataset.cmValue) {
          console.warn("Element %d is missing data-cm-value attribute!", n);
          return;
        }
        this.isElementGranted(n)
          ? n.setAttribute(n.dataset.cmAttribute, n.dataset.cmValue)
          : n.removeAttribute(n.dataset.cmAttribute);
      });
    }
  };
  var G = j(y()),
    V = {
      autoShow: !0,
      languageStrings: {
        banner: {
          infoText:
            "This website uses cookies to ensure you get the best experience on our website.",
          accept: "Accept All",
          reject: "Only required",
          options: "More options",
        },
        modal: {
          title: "Consent options",
          accept: "Accept All",
          reject: "Only required",
        },
      },
    },
    h = class {
      constructor(e, n) {
        this.client = e;
        (this.config = (0, G.default)(V, n ?? {})),
          this.config.autoShow && !e.isCustomized && this.showBanner();
      }
      showBanner() {
        if (document.querySelector(".consent-manager--banner-wrapper")) return;
        let n = document.createElement("span");
        n.textContent = this.config.languageStrings.banner.infoText;
        let a = document.createElement("div");
        (a.className = "consent-manager--banner-info"), a.append(n);
        let r = document.createElement("button");
        (r.className = "consent-manager--banner-accept"),
          (r.textContent = this.config.languageStrings.banner.accept),
          r.addEventListener("click", () => this.client.setGrant("*", !0));
        let o = document.createElement("button");
        (o.className = "consent-manager--banner-reject"),
          (o.textContent = this.config.languageStrings.banner.reject),
          o.addEventListener("click", () => this.client.setGrant("*", !1));
        let s = document.createElement("button");
        (s.className = "consent-manager--banner-more"),
          (s.textContent = this.config.languageStrings.banner.options),
          s.addEventListener(
            "click",
            () => {
              this.showModal(), this.hideBanner();
            },
            { once: !0 }
          );
        let i = document.createElement("div");
        (i.className = "consent-manager--banner-actions"), i.append(r, o, s);
        let c = document.createElement("aside");
        (c.className = "consent-manager--banner-wrapper"),
          c.append(a, i),
          document.body.append(c),
          this.client.on("update", () => {
            this.client.isCustomized && this.hideBanner();
          });
      }
      hideBanner() {
        let e = document.querySelector(".consent-manager--banner-wrapper");
        e && e.remove();
      }
      generateConsentTable(e = !1) {
        let n = document.createElement("table");
        n.className = "consent-manager--table";
        for (let [a, r] of Object.entries(this.client.config.categories)) {
          let o = document.createElement("tr");
          o.className = "consent-manager--row";
          let s = this.client.grants[r.id],
            i = r.required ? "disabled" : "",
            c = r.required || s ? "checked" : "";
          if (
            ((o.innerHTML = `<td class="consent-manager--table-toggle-col">  <input id="consent-manager--table-toggle-${a}" class="consent-manager--table-toggle" type="checkbox" ${c} ${i} /></td><td class="consent-manager--table-label-col">  <label for="consent-manager--table-toggle-${a}">    <span class="consent-manager--table-label"></span>    <sub class="consent-manager--table-description"></sub>  </label></td>`),
            (o.querySelector(".consent-manager--table-label").textContent =
              r.label),
            (o.querySelector(
              ".consent-manager--table-description"
            ).textContent = r.description),
            !r.required)
          ) {
            let u = o.querySelector('input[type="checkbox"]');
            u.addEventListener("change", (l) => {
              this.client.setGrant(r.id, l.target.checked);
            }),
              e &&
                this.client.on("update", (l) => {
                  r.id === l && (u.checked = this.client.grants[l]);
                });
          }
          n.appendChild(o);
        }
        return n;
      }
      showModal() {
        if (document.querySelector(".consent-manager--modal-backdrop")) return;
        let n = document.createElement("h2");
        (n.className = "consent-manager--modal-title"),
          (n.textContent = this.config.languageStrings.modal.title);
        let a = document.createElement("span");
        (a.className = "consent-manager--modal-close"),
          (a.innerHTML = "&#x2715;"),
          a.addEventListener("click", () => this.hideModal(), { once: !0 });
        let r = document.createElement("header");
        (r.className = "consent-manager--modal-header"), r.append(n, a);
        let o = this.generateConsentTable(!0),
          s = document.createElement("button");
        (s.className = "consent-manager--modal-accept"),
          (s.textContent = this.config.languageStrings.modal.accept),
          s.addEventListener("click", () => this.client.setGrant("*", !0));
        let i = document.createElement("button");
        (i.className = "consent-manager--modal-reject"),
          (i.textContent = this.config.languageStrings.modal.reject),
          i.addEventListener("click", () => this.client.setGrant("*", !1));
        let c = document.createElement("footer");
        (c.className = "consent-manager--modal-actions"), c.append(s, i);
        let u = document.createElement("aside");
        (u.className = "consent-manager--modal-container"), u.append(r, o, c);
        let l = document.createElement("div");
        (l.className = "consent-manager--modal-backdrop"),
          l.append(u),
          document.body.append(l),
          l.addEventListener(
            "click",
            (E) => {
              E.target === l && this.hideModal();
            },
            { once: !0 }
          );
      }
      hideModal() {
        let e = document.querySelector(".consent-manager--modal-backdrop");
        e && e.remove();
      }
    };
  var ue = f;
})();
/*! Bundled license information:

js-cookie/dist/js.cookie.mjs:
  (*! js-cookie v3.0.5 | MIT *)

is-plain-object/dist/is-plain-object.mjs:
  (*!
   * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)
*/
//# sourceMappingURL=consent-manager.min.js.map
