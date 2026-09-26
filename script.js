(function () {
  "use strict";

  /* ---------- Dark / light theme toggle ---------- */
  var root = document.documentElement;
  var toggleBtn = document.getElementById("themeToggle");
  var STORAGE_KEY = "cop4813-theme";

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
      if (toggleBtn) {
        toggleBtn.textContent = "Light Mode";
        toggleBtn.setAttribute("aria-pressed", "true");
      }
    } else {
      root.removeAttribute("data-theme");
      if (toggleBtn) {
        toggleBtn.textContent = "Dark Mode";
        toggleBtn.setAttribute("aria-pressed", "false");
      }
    }
  }

  var saved = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    /* localStorage unavailable; fall back to system preference below */
  }

  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      var isDark = root.getAttribute("data-theme") === "dark";
      var next = isDark ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {
        /* ignore; theme just won't persist across visits */
      }
    });
  }

  /* ---------- Back-to-top button ---------- */
  var backBtn = document.getElementById("backToTop");
  if (backBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backBtn.classList.add("visible");
      } else {
        backBtn.classList.remove("visible");
      }
    });
    backBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
