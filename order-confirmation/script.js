// ===== NAVBAR SCROLL =====
function setupNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}


// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
  const elements = document.querySelectorAll(".fade-in, .slide-up");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 },
  );

  elements.forEach((el) => observer.observe(el));
}

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  if(typeof setupScrollAnimations === 'function') setupScrollAnimations();
  if(typeof setupNavbarScroll === 'function') setupNavbarScroll();
});