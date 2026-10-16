(function () {
  "use strict";

  // Kopfzeile bekommt beim Scrollen eine feine Linie
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Videos laden erst nach einem Klick von YouTube (youtube-nocookie)
  document.querySelectorAll(".video__frame").forEach(function (frame) {
    var btn = frame.querySelector(".video__play");
    if (!btn || btn.tagName === "A") return; // Vorschau: Link öffnet YouTube direkt
    btn.addEventListener("click", function () {
      var id = frame.getAttribute("data-youtube");
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0&playsinline=1&modestbranding=1";
      iframe.title = "Video von " + frame.getAttribute("data-title");
      iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      iframe.allowFullscreen = true;
      frame.replaceChildren(iframe);
      iframe.focus();
    });
  });

  // Original-Screenshots der Bewertungen
  var dialog = document.getElementById("original");
  var dImg = document.getElementById("original-img");
  var dTitle = document.getElementById("original-title");
  var label = window.__ORIGINAL_OF || "Original von {name}";
  document.querySelectorAll("[data-original]").forEach(function (b) {
    b.addEventListener("click", function () {
      var name = b.getAttribute("data-name");
      dImg.src = b.getAttribute("data-original");
      dImg.width = +b.getAttribute("data-w");
      dImg.height = +b.getAttribute("data-h");
      dImg.alt = label.replace("{name}", name);
      dTitle.textContent = label.replace("{name}", name);
      if (dialog && typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        window.open(dImg.src, "_blank", "noopener");
      }
    });
  });
  if (dialog) {
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });
  }

  // Fester Buchungs-Balken auf dem Handy: erscheint nach dem Hero, verschwindet am Seitenende
  var bar = document.getElementById("mobile-bar");
  var heroActions = document.getElementById("hero-actions");
  var final = document.getElementById("kontakt");
  if (bar && heroActions && "IntersectionObserver" in window) {
    bar.hidden = false;
    var heroVisible = true;
    var finalVisible = false;
    var update = function () {
      bar.classList.toggle("is-visible", !heroVisible && !finalVisible);
    };
    new IntersectionObserver(function (entries) {
      heroVisible = entries[0].isIntersecting || entries[0].boundingClientRect.top > 0;
      update();
    }).observe(heroActions);
    if (final) {
      new IntersectionObserver(function (entries) {
        finalVisible = entries[0].isIntersecting;
        update();
      }, { rootMargin: "0px 0px -20% 0px" }).observe(final);
    }
  }
})();
