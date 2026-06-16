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
function initHomeIntroAnimation() {
  const home = document.querySelector("#home");
  if (!home || typeof TweenMax === "undefined" || typeof TimelineMax === "undefined") return;

  const intro = document.querySelector("#homeIntro");
  const introText01 = document.querySelector(".intro-text-01");
  const introText02 = document.querySelector(".intro-text-02");
  const heroTitle = document.querySelector("#home .hero-title");
  const heroMeta = ["#home .hero-eyebrow", "#home .hero-bottom", "#home .scroll-hint"];
  const floatingTargets = Array.prototype.slice.call(
    document.querySelectorAll("#home .floating-item, #home .floating-chip, #home .floating-blob")
  );

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  TweenMax.set("body", { backgroundColor: "#050505" });
  TweenMax.set(heroTitle, {
    opacity: 0,
    scale: 0.72,
    y: 34,
    letterSpacing: "-0.08em",
    transformOrigin: "50% 50%"
  });
  TweenMax.set(heroMeta, { opacity: 0, y: 28 });
  TweenMax.set(floatingTargets, {
    xPercent: -50,
    yPercent: -50,
    x: 0,
    y: 0,
    scale: 0.05,
    opacity: 0,
    rotation: 0,
    transformOrigin: "50% 50%"
  });

  function startFloatingObjects() {
    floatingTargets.forEach(function (target, index) {
      const ampY = index % 2 === 0 ? 18 + index * 2 : -(16 + index * 2);
      const ampX = index % 3 === 0 ? 10 : -8;
      const rot = index % 2 === 0 ? 2.8 : -2.4;
      const duration = 2.1 + (index % 4) * 0.32;

      TweenMax.to(target, duration, {
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

  const introTimeline = new TimelineMax({ delay: 0.25 });

  introTimeline
    .to(introText01, 0.72, {
      opacity: 1,
      y: 0,
      scale: 1,
      ease: Power3.easeOut
    })
    .to(introText01, 0.45, {
      opacity: 0,
      y: -26,
      scale: 1.02,
      ease: Power2.easeIn
    }, "+=0.48")
    .to(introText02, 0.84, {
      opacity: 1,
      y: 0,
      scale: 1,
      ease: Power3.easeOut
    })
    .to(introText02, 0.5, {
      opacity: 0,
      y: -24,
      scale: 1.015,
      ease: Power2.easeIn
    }, "+=0.72")
    .to(intro, 0.86, {
      opacity: 0,
      ease: Power2.easeInOut,
      onStart: function () {
        home.classList.add("intro-complete");
        TweenMax.to("body", 0.5, { backgroundColor: "#f4efe4" });
      },
      onComplete: function () {
        intro.style.display = "none";
      }
    })
    .to(heroTitle, 0.9, {
      opacity: 1,
      scale: 1,
      y: 0,
      letterSpacing: "-0.105em",
      ease: Back.easeOut.config(1.25)
    }, "-=0.28")
    .to("#home .hero-eyebrow", 0.48, {
      opacity: 1,
      y: 0,
      ease: Power2.easeOut
    }, "-=0.56")
    .to("#home .item-01", 0.82, { x: -vw * 0.38, y: -vh * 0.25, rotation: -58, scale: 1.16, opacity: 1, ease: Power3.easeOut }, "burst")
    .to("#home .item-02", 0.82, { x:  vw * 0.34, y: -vh * 0.29, rotation: 54,  scale: 1.08, opacity: 1, ease: Power3.easeOut }, "burst")
    .to("#home .item-03", 0.82, { x:  vw * 0.36, y:  vh * 0.25, rotation: -46, scale: 1.14, opacity: 1, ease: Power3.easeOut }, "burst")
    .to("#home .item-04", 0.82, { x: -vw * 0.34, y:  vh * 0.28, rotation: 48,  scale: 1.18, opacity: 1, ease: Power3.easeOut }, "burst")
    .to("#home .item-05", 0.72, { x: -vw * 0.20, y: -vh * 0.39, rotation: 112,  scale: 1.18, opacity: 1, ease: Back.easeOut.config(1.7) }, "burst+=0.03")
    .to("#home .item-06", 0.72, { x:  vw * 0.18, y: -vh * 0.38, rotation: -104, scale: 1.12, opacity: 1, ease: Back.easeOut.config(1.7) }, "burst+=0.03")
    .to("#home .item-07", 0.72, { x: -vw * 0.13, y:  vh * 0.39, rotation: 92,   scale: 1.16, opacity: 1, ease: Back.easeOut.config(1.7) }, "burst+=0.03")
    .to("#home .item-08", 0.72, { x:  vw * 0.21, y:  vh * 0.36, rotation: -122, scale: 1.18, opacity: 1, ease: Back.easeOut.config(1.7) }, "burst+=0.03")
    .to("#home .item-09", 0.82, { x: -vw * 0.29, y: -vh * 0.36, rotation: 130,  scale: 1.08, opacity: 0.82, ease: Power3.easeOut }, "burst")
    .to("#home .item-10", 0.82, { x:  vw * 0.28, y:  vh * 0.36, rotation: -128, scale: 1.12, opacity: 0.72, ease: Power3.easeOut }, "burst")
    .to("#home .hero-bottom", 0.52, {
      opacity: 1,
      y: 0,
      ease: Power2.easeOut
    }, "burst+=0.28")
    .to("#home .scroll-hint", 0.38, {
      opacity: 1,
      y: 0,
      ease: Power2.easeOut,
      onComplete: startFloatingObjects
    }, "burst+=0.38");
}

window.addEventListener("load", initHomeIntroAnimation);

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
