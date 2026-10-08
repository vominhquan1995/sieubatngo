/* Siêu Bất Ngờ — landing interactions: i18n toggle, theme, scroll reveal */
(function () {
  "use strict";
  var root = document.documentElement;

  /* ---- safe storage helpers ---- */
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  /* ---- language (vi | en) ---- */
  function applyLang(lang) {
    root.setAttribute("lang", lang);
    set("sbn-lang", lang);
  }
  var savedLang = get("sbn-lang");
  if (savedLang === "vi" || savedLang === "en") applyLang(savedLang);

  var langBtn = document.getElementById("langToggle");
  if (langBtn) {
    langBtn.addEventListener("click", function () {
      applyLang(root.getAttribute("lang") === "en" ? "vi" : "en");
    });
  }

  /* ---- theme (light | dark), defaults to OS preference ---- */
  function applyTheme(mode) {
    if (mode === "light" || mode === "dark") {
      root.setAttribute("data-theme", mode);
      set("sbn-theme", mode);
    }
    var tb = document.getElementById("themeToggle");
    if (tb) tb.firstElementChild.textContent = isDark() ? "☀" : "☾";
  }
  function isDark() {
    var t = root.getAttribute("data-theme");
    if (t) return t === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  var savedTheme = get("sbn-theme");
  if (savedTheme) applyTheme(savedTheme); else applyTheme();

  var themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      applyTheme(isDark() ? "light" : "dark");
    });
  }

  /* ---- sticky header shadow ---- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- footer year ---- */
  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
})();
