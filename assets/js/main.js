/* =========================================================
   Samer Tours — shared site behavior (nav, scroll reveal, header)
   ========================================================= */
(function () {
  var io = null;

  function observeReveal(el) {
    if (!el || el.classList.contains("in-view")) return;
    if (io) {
      io.observe(el);
    } else {
      // No IntersectionObserver support: just show it.
      el.classList.add("in-view");
    }
  }

  function setupRevealSystem() {
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
    }

    // Observe whatever .reveal elements already exist...
    document.querySelectorAll(".reveal").forEach(observeReveal);

    // ...and keep watching for more added later (e.g. destination cards,
    // the honeymoon quiz, or extra trip stops injected by other scripts —
    // regardless of <script> tag order relative to this file).
    if ("MutationObserver" in window) {
      var mo = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType !== 1) return;
            if (node.classList && node.classList.contains("reveal")) observeReveal(node);
            if (node.querySelectorAll) node.querySelectorAll(".reveal").forEach(observeReveal);
          });
        });
      });
      mo.observe(document.body, { childList: true, subtree: true });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    /* Mobile nav toggle */
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("mainNav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var isOpen = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
      nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          nav.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    /* Sticky header shadow */
    var header = document.querySelector(".site-header");
    if (header) {
      var onScroll = function () {
        header.classList.toggle("scrolled", window.scrollY > 8);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    setupRevealSystem();

    /* Footer year */
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* Mark active nav link */
    var path = (window.location.pathname.split("/").pop() || "index.html");
    document.querySelectorAll(".main-nav a").forEach(function (link) {
      var href = link.getAttribute("href").split("#")[0] || "index.html";
      if (href === path || (path === "" && href === "index.html")) {
        link.classList.add("active");
      }
    });
  });
})();
