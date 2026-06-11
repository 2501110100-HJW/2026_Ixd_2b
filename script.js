const cursor = document.querySelector(".cursor");
const hoverTargets = document.querySelectorAll("a, button, .work-card, .hero-title span, .floating-chip");

window.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

hoverTargets.forEach((target) => {
  target.addEventListener("mouseenter", () => {
    cursor.classList.add("active");
  });

  target.addEventListener("mouseleave", () => {
    cursor.classList.remove("active");
  });
});

const sections = document.querySelectorAll(".section:not(#home)");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.25,
  }
);

sections.forEach((section) => {
  observer.observe(section);
});



/* HOME ONLY SCROLLMAGIC INTERACTION
  Updated flow:
  1. The title starts very small.
  2. Objects are invisible at the center.
  3. On scroll, the title expands and objects explode outward.
   This scene targets #home only, so the other sections stay unchanged. */
function initHomeScrollMagic() {
  const home = document.querySelector("#home");
  if (!home || typeof ScrollMagic === "undefined" || typeof TimelineMax === "undefined") return;

  if (window.innerWidth <= 768) {
    TweenMax.set(["#home .hero-title", "#home .hero-index", "#home .hero-eyebrow", "#home .hero-bottom", "#home .scroll-hint", "#home .floating-item", "#home .floating-chip", "#home .floating-blob"], { clearProps: "all" });
    return;
  }

  const controller = new ScrollMagic.Controller();
  const homeTimeline = new TimelineMax();
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const objects = ["#home .floating-item", "#home .floating-chip", "#home .floating-blob"];

  // Initial state: compact, invisible, gathered around the title.
  TweenMax.set("#home .hero-title", {
    scale: 0.075,
    opacity: 0.34,
    y: 8,
    letterSpacing: "-0.02em",
    transformOrigin: "50% 50%"
  });

  TweenMax.set("#home .hero-index", { opacity: 0, y: 22 });
  TweenMax.set("#home .hero-eyebrow", { opacity: 0, y: -16, scale: 0.86, rotation: -6 });
  TweenMax.set("#home .hero-bottom", { opacity: 0, y: 54 });
  TweenMax.set("#home .scroll-hint", { opacity: 0, y: 16 });

  TweenMax.set(objects, {
    xPercent: -50,
    yPercent: -50,
    x: 0,
    y: 0,
    scale: 0.05,
    opacity: 0,
    rotation: 0,
    transformOrigin: "50% 50%"
  });

  // Title grows first, then the objects burst outward.
  homeTimeline
    .to("#home .hero-title", 0.42, {
      scale: 1,
      opacity: 1,
      y: 0,
      letterSpacing: "-0.105em",
      ease: Power3.easeOut
    }, 0)

    .to("#home .hero-index", 0.34, {
      opacity: 1,
      y: 0,
      ease: Power2.easeOut
    }, 0.08)

    .to("#home .hero-eyebrow", 0.34, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotation: 0,
      ease: Back.easeOut.config(1.8)
    }, 0.12)

    // Main work thumbnails: big radial explosion from the center.
    .to("#home .item-01", 0.74, {
      x: -vw * 0.38,
      y: -vh * 0.25,
      rotation: -58,
      scale: 1.16,
      opacity: 1,
      ease: Power3.easeOut
    }, 0.2)

    .to("#home .item-02", 0.74, {
      x: vw * 0.34,
      y: -vh * 0.29,
      rotation: 54,
      scale: 1.08,
      opacity: 1,
      ease: Power3.easeOut
    }, 0.2)

    .to("#home .item-03", 0.74, {
      x: vw * 0.36,
      y: vh * 0.25,
      rotation: -46,
      scale: 1.14,
      opacity: 1,
      ease: Power3.easeOut
    }, 0.2)

    .to("#home .item-04", 0.74, {
      x: -vw * 0.34,
      y: vh * 0.28,
      rotation: 48,
      scale: 1.18,
      opacity: 1,
      ease: Power3.easeOut
    }, 0.2)

    // Chips: quicker, sharper movement to make the burst feel more explosive.
    .to("#home .item-05", 0.68, {
      x: -vw * 0.20,
      y: -vh * 0.39,
      rotation: 112,
      scale: 1.18,
      opacity: 1,
      ease: Back.easeOut.config(1.7)
    }, 0.22)

    .to("#home .item-06", 0.68, {
      x: vw * 0.18,
      y: -vh * 0.38,
      rotation: -104,
      scale: 1.12,
      opacity: 1,
      ease: Back.easeOut.config(1.7)
    }, 0.22)

    .to("#home .item-07", 0.68, {
      x: -vw * 0.13,
      y: vh * 0.39,
      rotation: 92,
      scale: 1.16,
      opacity: 1,
      ease: Back.easeOut.config(1.7)
    }, 0.22)

    .to("#home .item-08", 0.68, {
      x: vw * 0.21,
      y: vh * 0.36,
      rotation: -122,
      scale: 1.18,
      opacity: 1,
      ease: Back.easeOut.config(1.7)
    }, 0.22)

    // Blobs: large background objects to fill the remaining space.
    .to("#home .item-09", 0.72, {
      x: -vw * 0.29,
      y: -vh * 0.36,
      rotation: 130,
      scale: 1.08,
      opacity: 0.82,
      ease: Power3.easeOut
    }, 0.19)

    .to("#home .item-10", 0.72, {
      x: vw * 0.28,
      y: vh * 0.36,
      rotation: -128,
      scale: 1.12,
      opacity: 0.72,
      ease: Power3.easeOut
    }, 0.19)

    // Mid-scroll: keep the expanded composition alive and reveal the bottom copy.
    .to("#home .scroll-hint", 0.32, {
      opacity: 1,
      y: 0,
      ease: Power2.easeOut
    }, 0.36)

    .to("#home .hero-bottom", 0.42, {
      opacity: 1,
      y: 0,
      ease: Power2.easeOut
    }, 0.48)

    .to("#home .hero-title", 0.28, {
      scale: 1.045,
      ease: Power1.easeInOut
    }, 0.55)

    // Hold the fully expanded composition instead of fading it out.
    // The pinned scene releases while the objects remain vivid, so the next
    // section follows naturally without a dimming transition.
    .to("#home .hero-title", 0.32, {
      scale: 1.07,
      y: -vh * 0.025,
      opacity: 1,
      ease: Power1.easeInOut
    }, 1.45)

    .to("#home .floating-item, #home .floating-chip, #home .floating-blob", 0.32, {
      opacity: 1,
      ease: Power1.easeInOut
    }, 1.45);

  // Keep a quiet scroll range after the explosion, so objects can keep floating
  // at full visibility before the scene releases into the next section.
  homeTimeline.to({}, 0.62, {}, 1.96);

  const floatingTargets = Array.prototype.slice.call(
    document.querySelectorAll("#home .floating-item, #home .floating-chip, #home .floating-blob")
  );

  let floatTweens = [];
  let isFloating = false;

  function startFloatingObjects() {
    if (isFloating) return;
    isFloating = true;

    floatTweens = floatingTargets.map(function (target, index) {
      const ampY = index % 2 === 0 ? 18 + index * 2 : -(16 + index * 2);
      const ampX = index % 3 === 0 ? 10 : -8;
      const rot = index % 2 === 0 ? 2.8 : -2.4;
      const duration = 1.9 + (index % 4) * 0.28;

      return TweenMax.to(target, duration, {
        y: "+=" + ampY,
        x: "+=" + ampX,
        rotation: "+=" + rot,
        repeat: -1,
        yoyo: true,
        ease: Sine.easeInOut,
        delay: index * 0.05
      });
    });
  }

  function stopFloatingObjects() {
    if (!isFloating) return;
    isFloating = false;

    floatTweens.forEach(function (tween) {
      tween.kill();
    });
    floatTweens = [];

    // Re-sync with the ScrollMagic timeline so reverse scrolling does not leave
    // the objects with the temporary floating offset.
    homeTimeline.progress(homeScene.progress());
  }

  const homeScene = new ScrollMagic.Scene({
    triggerElement: "#home",
    triggerHook: 0,
    // A shorter pinned range makes one mouse-wheel action push the
    // composition close to its maximum state instead of requiring long scrolling.
    duration: "120%"
  })
    .setPin("#home")
    .setTween(homeTimeline)
    .addTo(controller);

  homeScene.on("progress", function (event) {
    // The objects reach their expanded position early.
    // As soon as that point is reached, connect directly to the floating loop.
    if (event.progress >= 0.28 && event.progress <= 0.98) {
      startFloatingObjects();
    } else {
      stopFloatingObjects();
    }
  });

  // One-wheel acceleration: the first downward wheel gesture on Home
  // automatically advances the pinned hero to the fully expanded composition.
  let homeAutoExpanded = false;

  window.addEventListener("wheel", function (event) {
    const sceneProgress = homeScene.progress();
    const homeTop = home.offsetTop;
    const inHomeRange = window.scrollY >= homeTop - 2 && window.scrollY < homeTop + window.innerHeight * 1.15;

    if (!homeAutoExpanded && inHomeRange && event.deltaY > 0 && sceneProgress < 0.18) {
      event.preventDefault();
      homeAutoExpanded = true;

      window.scrollTo({
        top: homeTop + window.innerHeight * 0.72,
        behavior: "smooth"
      });

      // Start the floating feeling immediately, even while the browser
      // is smoothly scrolling to the target progress.
      setTimeout(startFloatingObjects, 520);
    }

    if (window.scrollY < homeTop + 4 && event.deltaY < 0) {
      homeAutoExpanded = false;
    }
  }, { passive: false });

  homeScene.on("leave", function () {
    stopFloatingObjects();
  });
}

window.addEventListener("load", initHomeScrollMagic);

/* TOP BUTTON */
const topBtn = document.getElementById("topBtn");
const progressLine = document.querySelector(".progress-line");

const radius = 52;
const circumference = 2 * Math.PI * radius;

progressLine.style.strokeDasharray = circumference;
progressLine.style.strokeDashoffset = circumference;

function updateTopButton() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? scrollTop / docHeight : 0;

  const offset = circumference - progress * circumference;
  progressLine.style.strokeDashoffset = offset;

  if (scrollTop > window.innerHeight * 0.55) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
}

window.addEventListener("scroll", updateTopButton);
window.addEventListener("load", updateTopButton);

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
/* WORKS CARD POPUP MODAL */
const workCards = document.querySelectorAll(".work-card");
const workModal = document.getElementById("workModal");
const modalClose = document.getElementById("modalClose");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");

function openWorkModal(card) {
  const title = card.dataset.title || card.querySelector("h3")?.textContent || "Work";
  const desc = card.dataset.desc || card.querySelector("p")?.textContent || "";
  const imgSrc = card.dataset.img;

  modalTitle.textContent = title;
  modalDesc.textContent = desc;

  if (imgSrc) {
    modalImg.style.backgroundImage = `url("${imgSrc}")`;
  } else {
    const cardImg = card.querySelector(".work-img");
    modalImg.style.backgroundImage = window.getComputedStyle(cardImg).backgroundImage;
  }

  workModal.classList.add("show");
  workModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeWorkModal() {
  workModal.classList.remove("show");
  workModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

workCards.forEach((card) => {
  card.addEventListener("click", () => openWorkModal(card));
});

modalClose.addEventListener("click", closeWorkModal);

workModal.addEventListener("click", (e) => {
  if (e.target === workModal) {
    closeWorkModal();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && workModal.classList.contains("show")) {
    closeWorkModal();
  }
});
