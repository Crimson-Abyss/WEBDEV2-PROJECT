// ===== MENU DATA =====
const menuData = [
  {
    id: 1,
    name: "Classic Tuna Pastil",
    description:
      "Tuna flakes sauteed with peppers and spices, wrapped in banana leaves with steamed rice.",
    price: 75,
    category: "pastil",
    image: "images/tuna-pastil.png",
  },
  {
    id: 2,
    name: "Beef Pastil Special",
    description:
      "Tender shredded beef seasoned with local spices, served on rice and wrapped in banana leaves.",
    price: 95,
    category: "pastil",
    image: "images/beef-pastil.png",
  },
  {
    id: 3,
    name: "Chicken Adobo Pastil",
    description:
      "Classic Filipino-style chicken, shredded and seasoned with rice in banana leaf wrapping.",
    price: 95,
    category: "pastil",
    image: "images/chicken-pastil.png",
  },
  {
    id: 4,
    name: "Garlic Fried Rice",
    description:
      "Fragrant fried rice with garlic and seasoned with salt and pepper, a perfect side for any dish.",
    price: 45,
    category: "rice",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=200&fit=crop",
  },
  {
    id: 5,
    name: "Java Rice",
    description:
      "Yellow rice infused with tomato and garlic, a perfect side for any dish.",
    price: 55,
    category: "rice",
    image:
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=300&h=200&fit=crop",
  },
  {
    id: 6,
    name: "Atchara",
    description:
      "Sweet and sour pickled green papaya, a traditional Filipino side dish.",
    price: 35,
    category: "sides",
    image:
      "https://images.unsplash.com/photo-1534938665420-4ca8d3e48f84?w=300&h=200&fit=crop",
  },
  {
    id: 7,
    name: "Ensaladang Talong",
    description:
      "Grilled eggplant salad with tomatoes, onions, and vinegar dressing.",
    price: 65,
    category: "sides",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop",
  },
  {
    id: 8,
    name: "Calamansi Juice",
    description: "Refreshing Filipino citrus juice, sweetened to perfection.",
    price: 45,
    category: "drinks",
    image:
      "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300&h=200&fit=crop",
  },
  {
    id: 9,
    name: "Buko Juice",
    description: "Fresh coconut water served cold with coconut meat strips.",
    price: 55,
    category: "drinks",
    image:
      "https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=300&h=200&fit=crop",
  },
  {
    id: 10,
    name: "Halo-Halo",
    description:
      "Mixed Filipino dessert with shaved ice, sweet beans, fruits, and ice cream.",
    price: 85,
    category: "desserts",
    image: "images/halo-halo.png",
  },
  {
    id: 11,
    name: "Leche Flan",
    description:
      "Creamy Filipino caramel custard made with egg yolks and condensed milk.",
    price: 65,
    category: "desserts",
    image: "images/leche-flan.png",
  },
];

// ===== CART STATE =====
let cart = [];

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  // Load cart from localStorage
  const savedCart = localStorage.getItem("pastilan_cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }

  // Render menu if on menu page
  if (document.getElementById("menuItems")) {
    renderMenu("all");
    renderCart();
    setupCategoryTabs();
  }

  // Update cart badge everywhere
  updateCartBadge();

  // Setup scroll animations
  setupScrollAnimations();

  // Setup navbar scroll effect
  setupNavbarScroll();
});

// ===== MENU RENDERING =====
function renderMenu(category) {
  const container = document.getElementById("menuItems");
  if (!container) return;

  const filtered =
    category === "all"
      ? menuData
      : menuData.filter((item) => item.category === category);

  container.innerHTML = filtered
    .map((item) => {
      const inCart = cart.find((c) => c.id === item.id);
      const qty = inCart ? inCart.qty : 0;

      return `
      <div class="menu-item fade-in visible" data-category="${item.category}">
        <div class="menu-item-image">
          <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/100x80/236844/fff?text=🍚'">
        </div>
        <div class="menu-item-info">
          <h4>${item.name}</h4>
          <p>${item.description}</p>
        </div>
        <div class="menu-item-actions">
          <span class="menu-item-price">₱${item.price.toFixed(2)}</span>
          ${
            qty > 0
              ? `
            <div class="qty-controls">
              <button class="qty-btn minus" onclick="updateQty(${item.id}, -1)">−</button>
              <span class="qty-value">${qty}</span>
              <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
            </div>
          `
              : `
            <button class="btn-add-cart" onclick="addToCart(${item.id})">
              + Add to cart
            </button>
          `
          }
        </div>
      </div>
    `;
    })
    .join("");
}

// ===== CATEGORY TABS =====
function setupCategoryTabs() {
  document.querySelectorAll(".category-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document
        .querySelectorAll(".category-tab")
        .forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      renderMenu(tab.dataset.category);
    });
  });
}

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

// ===== CART RENDERING =====
function renderCart() {
  const container = document.getElementById("cartItems");
  const summary = document.getElementById("orderSummary");
  const payment = document.getElementById("paymentMethods");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML =
      '<p style="font-size: 0.85rem; color: #999; text-align: center; padding: 20px 0;">Your cart is empty</p>';
    if (summary) summary.style.display = "none";
    if (payment) payment.style.display = "none";
    return;
  }

  container.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item">
      <div class="cart-item-info">
        <span class="cart-item-dot"></span>
        <span>${item.name} ×${item.qty}</span>
      </div>
      <span class="cart-item-price">₱${(item.price * item.qty).toFixed(2)}</span>
      <button class="cart-item-delete" onclick="removeFromCart(${item.id})">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
      </button>
    </div>
  `,
    )
    .join("");

  // Update totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = 20;
  const total = subtotal + deliveryFee;

  if (summary) {
    summary.style.display = "block";
    document.getElementById("subtotal").textContent = `₱${subtotal.toFixed(2)}`;
    document.getElementById("total").textContent = `₱${total.toFixed(2)}`;
  }
  if (payment) payment.style.display = "block";
}

// ===== PLACE ORDER =====
function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty! Add some items first.");
    return;
  }
  // Clear cart and redirect
  cart = [];
  saveCart();
  window.location.href = "order-confirmation.html";
}

// ===== AUTH FUNCTIONS =====
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  if (email.includes("admin")) {
    window.location.href = "admin-menu.html";
  } else {
    window.location.href = "menu.html";
  }
}

function handleRegister(e) {
  e.preventDefault();
  alert("Registration successful! Please login.");
  window.location.href = "login.html";
}

function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
    btn.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
  } else {
    input.type = "password";
    btn.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
  }
}

// ===== ADMIN FUNCTIONS =====
function showTab(btn, tab) {
  // Update tabs
  document
    .querySelectorAll(".report-tab")
    .forEach((t) => t.classList.remove("active"));
  btn.classList.add("active");

  // Show/hide content
  document.getElementById("ordersTab").style.display =
    tab === "orders" ? "block" : "none";
  document.getElementById("customersTab").style.display =
    tab === "customers" ? "block" : "none";
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
