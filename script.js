const cursor = document.querySelector(".cursor");
const hoverTargets = document.querySelectorAll("a, button, .work-card, .hero-title span");

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

const sections = document.querySelectorAll(".section");

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



/* WORKS MODAL */
const workCards = document.querySelectorAll(".work-card");
const workModal = document.getElementById("workModal");
const modalClose = document.getElementById("modalClose");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");

workCards.forEach((card) => {
  card.addEventListener("click", () => {
    const img = card.querySelector(".work-img");
    const style = window.getComputedStyle(img).backgroundImage;

    modalImg.style.backgroundImage = style;
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;

    workModal.classList.add("show");
    document.body.classList.add("modal-open");
  });
});

modalClose.addEventListener("click", closeWorkModal);

workModal.addEventListener("click", (e) => {
  if (e.target === workModal) {
    closeWorkModal();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeWorkModal();
  }
});

function closeWorkModal() {
  workModal.classList.remove("show");
  document.body.classList.remove("modal-open");
}

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