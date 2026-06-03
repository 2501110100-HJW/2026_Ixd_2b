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
   Reference structure: pinned hero + floating digital objects.
   This scene targets #home only, so About / Skills / Works / Contact stay unchanged. */
function initHomeScrollMagic() {
  const home = document.querySelector("#home");
  if (!home || typeof ScrollMagic === "undefined" || typeof TimelineMax === "undefined") return;

  // Keep mobile light and readable. The desktop version uses pinning.
  if (window.innerWidth <= 768) {
    TweenMax.set([".floating-item", ".floating-chip", ".floating-blob"], { clearProps: "all" });
    return;
  }

  const controller = new ScrollMagic.Controller();
  const homeTimeline = new TimelineMax();

  homeTimeline
    .to("#home .hero-title", 1, {
      scale: 1.08,
      y: -34,
      letterSpacing: "-0.115em",
      ease: Power2.easeOut
    }, 0)

    .to("#home .hero-eyebrow", 0.8, {
      x: -36,
      rotation: -4,
      ease: Power2.easeOut
    }, 0)

    .to("#home .hero-bottom p", 0.9, {
      y: -24,
      opacity: 0.92,
      ease: Power2.easeOut
    }, 0.32)

    .to("#home .round-link", 0.9, {
      rotation: -18,
      scale: 1.04,
      ease: Power2.easeOut
    }, 0.22)

    // Portfolio thumbnails: rotate and float outward while the home section is pinned.
    .to("#home .item-01", 1, {
      x: -165,
      y: -105,
      rotation: -34,
      scale: 1.12,
      ease: Power2.easeOut
    }, 0)

    .to("#home .item-02", 1, {
      x: 130,
      y: -90,
      rotation: 38,
      scale: 1.08,
      ease: Power2.easeOut
    }, 0)

    .to("#home .item-03", 1, {
      x: 150,
      y: 92,
      rotation: -32,
      scale: 1.12,
      ease: Power2.easeOut
    }, 0)

    .to("#home .item-04", 1, {
      x: -135,
      y: 128,
      rotation: 28,
      scale: 1.1,
      ease: Power2.easeOut
    }, 0)

    // Text/object chips: smaller fast-rotating elements like a digital collage.
    .to("#home .item-05", 1, {
      x: -110,
      y: -72,
      rotation: 50,
      ease: Power2.easeOut
    }, 0)

    .to("#home .item-06", 1, {
      x: 96,
      y: -116,
      rotation: -46,
      ease: Power2.easeOut
    }, 0)

    .to("#home .item-07", 1, {
      x: -40,
      y: 132,
      rotation: 42,
      ease: Power2.easeOut
    }, 0)

    .to("#home .item-08", 1, {
      x: 112,
      y: 92,
      rotation: -56,
      ease: Power2.easeOut
    }, 0)

    .to("#home .item-09", 1, {
      x: -90,
      y: -140,
      rotation: 80,
      scale: 0.86,
      ease: Power2.easeOut
    }, 0)

    .to("#home .item-10", 1, {
      x: 120,
      y: 118,
      rotation: -75,
      scale: 1.12,
      ease: Power2.easeOut
    }, 0)

    .to("#home .floating-item", 0.7, {
      opacity: 0.82,
      ease: Power2.easeOut
    }, 0.72)

    .to("#home .floating-chip", 0.7, {
      opacity: 0.88,
      ease: Power2.easeOut
    }, 0.72)

    .to("#home .scroll-hint", 0.5, {
      opacity: 0,
      y: 18,
      ease: Power2.easeOut
    }, 0.2);

  new ScrollMagic.Scene({
    triggerElement: "#home",
    triggerHook: 0,
    duration: "185%"
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