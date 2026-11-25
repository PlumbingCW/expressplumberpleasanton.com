(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.remove("no-js");

  /* mobile drawer */
  var drawer = document.getElementById("mob-drawer");
  var overlay = document.getElementById("mob-overlay");
  var toggle = document.getElementById("menu-toggle");
  var closeBtn = document.getElementById("mob-close");
  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add("open");
    overlay.classList.add("show");
    toggle.setAttribute("aria-expanded", "true");
    doc.style.overflow = "hidden";
    if (closeBtn) closeBtn.focus();
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove("open");
    overlay.classList.remove("show");
    toggle.setAttribute("aria-expanded", "false");
    doc.style.overflow = "";
  }
  if (toggle) toggle.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (overlay) overlay.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeDrawer();
      var open = document.querySelectorAll(".has-drop.open");
      for (var i = 0; i < open.length; i++) {
        open[i].classList.remove("open");
        var b = open[i].querySelector(".nav-drop-btn");
        if (b) b.setAttribute("aria-expanded", "false");
      }
    }
  });
  var mq = window.matchMedia("(min-width: 769px)");
  function onMq(e) { if (e.matches) closeDrawer(); }
  if (mq.addEventListener) mq.addEventListener("change", onMq); else if (mq.addListener) mq.addListener(onMq);

  /* desktop dropdown buttons (hover and focus are handled in CSS, click helps touch laptops) */
  var dropBtns = document.querySelectorAll(".nav-drop-btn");
  for (var i = 0; i < dropBtns.length; i++) {
    dropBtns[i].addEventListener("click", function (e) {
      var li = e.currentTarget.parentNode;
      var isOpen = li.classList.toggle("open");
      e.currentTarget.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }
  document.addEventListener("click", function (e) {
    var open = document.querySelectorAll(".has-drop.open");
    for (var j = 0; j < open.length; j++) {
      if (!open[j].contains(e.target)) {
        open[j].classList.remove("open");
        var b = open[j].querySelector(".nav-drop-btn");
        if (b) b.setAttribute("aria-expanded", "false");
      }
    }
  });

  /* faq accordion (max-height) */
  var qs = document.querySelectorAll(".faq-q");
  for (var k = 0; k < qs.length; k++) {
    qs[k].addEventListener("click", function (e) {
      var btn = e.currentTarget;
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      var expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
      panel.style.maxHeight = expanded ? "0px" : panel.scrollHeight + "px";
    });
  }
  window.addEventListener("resize", function () {
    var open = document.querySelectorAll('.faq-q[aria-expanded="true"]');
    for (var m = 0; m < open.length; m++) {
      var p = document.getElementById(open[m].getAttribute("aria-controls"));
      p.style.maxHeight = p.scrollHeight + "px";
    }
  });

  /* hide floating call button when the footer is visible */
  var fc = document.querySelector(".float-call");
  var ft = document.querySelector(".site-footer");
  if (fc && ft && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      fc.classList.toggle("hide", entries[0].isIntersecting);
    }, { threshold: 0.05 }).observe(ft);
  }
})();
