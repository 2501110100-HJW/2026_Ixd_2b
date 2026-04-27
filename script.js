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

/* TOP BUTTON */
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  if(window.scrollY > window.innerHeight * 0.7){
    topBtn.classList.add("show");
  }else{
    topBtn.classList.remove("show");
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top:0,
    behavior:"smooth"
  });
});