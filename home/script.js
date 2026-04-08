// ===== CART STATE =====
let cart = [];


// ===== CART FUNCTIONS =====
function addToCart(id) {
  const item = menuData.find((m) => m.id === id);
  if (!item) return;

  const existing = cart.find((c) => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: item.id, name: item.name, price: item.price, qty: 1 });
  }

  saveCart();
  renderMenu(getActiveCategory());
  renderCart();
  updateCartBadge();
}

function updateQty(id, delta) {
  const item = cart.find((c) => c.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter((c) => c.id !== id);
  }

  saveCart();
  renderMenu(getActiveCategory());
  renderCart();
  updateCartBadge();
}

function removeFromCart(id) {
  cart = cart.filter((c) => c.id !== id);
  saveCart();
  renderMenu(getActiveCategory());
  renderCart();
  updateCartBadge();
}

function saveCart() {
  localStorage.setItem("pastilan_cart", JSON.stringify(cart));
}

function getActiveCategory() {
  const active = document.querySelector(".category-tab.active");
  return active ? active.dataset.category : "all";
}

function updateCartBadge() {
  const badges = document.querySelectorAll("#cartBadge, .cart-icon .badge");
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  badges.forEach((badge) => {
    badge.textContent = total;
    badge.style.display = total > 0 ? "flex" : "none";
  });
}


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
  const savedCart = localStorage.getItem("pastilan_cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
  if(typeof updateCartBadge === 'function') updateCartBadge();
  if(typeof setupScrollAnimations === 'function') setupScrollAnimations();
  if(typeof setupNavbarScroll === 'function') setupNavbarScroll();
});