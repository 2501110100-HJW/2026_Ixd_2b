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

    // End of pinned scene: everything drifts slightly outward and fades,
    // so the next section connects naturally instead of feeling abruptly cut.
    .to("#home .hero-title", 0.36, {
      y: -vh * 0.12,
      opacity: 0.18,
      scale: 1.12,
      ease: Power2.easeInOut
    }, 0.78)

    .to("#home .floating-item", 0.36, {
      opacity: 0.38,
      scale: 1.26,
      ease: Power2.easeInOut
    }, 0.78)

    .to("#home .floating-chip", 0.36, {
      opacity: 0.42,
      scale: 1.28,
      ease: Power2.easeInOut
    }, 0.78)

    .to("#home .floating-blob", 0.36, {
      opacity: 0.22,
      scale: 1.34,
      ease: Power2.easeInOut
    }, 0.78)

    .to("#home .hero-bottom", 0.34, {
      opacity: 0,
      y: -38,
      ease: Power2.easeInOut
    }, 0.83)

    .to("#home .hero-eyebrow", 0.34, {
      opacity: 0,
      y: -30,
      ease: Power2.easeInOut
    }, 0.84)

    .to("#home .hero-index", 0.34, {
      opacity: 0,
      y: -22,
      ease: Power2.easeInOut
    }, 0.84)

    .to("#home .scroll-hint", 0.26, {
      opacity: 0,
      y: 20,
      ease: Power2.easeInOut
    }, 0.76);

  new ScrollMagic.Scene({
    triggerElement: "#home",
    triggerHook: 0,
    duration: "260%"
  })
    .setPin("#home")
    .setTween(homeTimeline)
    .addTo(controller);
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