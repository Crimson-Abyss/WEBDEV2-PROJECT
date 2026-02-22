# 🍚 Pastil-an — Filipino Comfort Food Website

A multi-page restaurant website for **Pastil-an**, serving authentic Filipino chicken pastil and more. Built with vanilla HTML, CSS, and JavaScript.

![Status](https://img.shields.io/badge/status-complete-brightgreen) ![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JS](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## ✨ Features

### Customer-Facing

- **Landing Page** — Hero section with animated elements, Our Story section, footer
- **Menu & Ordering** — Browse 11 menu items across 5 categories with a live cart
- **Cart System** — Add/remove items, quantity controls, persisted via `localStorage`
- **Payment Options** — Cash on Delivery, Credit/Debit Card, E-Wallet
- **Order Confirmation** — Detailed receipt with order items, totals, delivery info
- **Authentication** — Login & registration pages with password visibility toggle

### Admin Dashboard

- **Menu Management** — View, add, edit, and delete menu items with availability status
- **Orders** — View pending customer orders
- **Reports** — Order history and customer data with tab navigation

### Design & UX

- Scroll-triggered fade-in and slide-up animations
- Floating hero image with decorative stars and sparkle effects
- Responsive layout (desktop, tablet, mobile)
- Google Fonts (Inter + Playfair Display)

---

## 📁 Project Structure

```
WEBDEV2/
├── index.html              # Landing page
├── menu.html               # Menu & ordering
├── login.html              # User login
├── register.html           # User registration
├── order-confirmation.html # Post-order receipt
├── admin-menu.html         # Admin: Menu management
├── admin-orders.html       # Admin: Pending orders
├── admin-reports.html      # Admin: Reports & analytics
├── style.css               # All styles
├── script.js               # All functionality
├── images/                 # Food images
│   ├── chicken-pastil.png
│   ├── tuna-pastil.png
│   ├── beef-pastil.png
│   ├── halo-halo.png
│   └── leche-flan.png
└── README.md
```

---

## 🎨 Design Tokens

| Token       | Value     | Usage                |
| ----------- | --------- | -------------------- |
| Primary Red | `#E62E2E` | Branding, CTAs       |
| Dark Red    | `#9F1A1A` | Hover states         |
| Green       | `#236844` | Primary actions, nav |
| Yellow      | `#FACC15` | Badges, accents      |
| Cream       | `#FFF8F0` | Page backgrounds     |

---

## 🚀 Getting Started

1. **Clone or download** this repository
2. **Open `index.html`** in any modern browser — no build tools needed

> **Tip:** To access the admin dashboard, navigate to `admin-menu.html` directly, or type an email containing "admin" on the login page.

---

## 🛠️ Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)** — DOM manipulation, localStorage, IntersectionObserver
- **Google Fonts** — Inter, Playfair Display
- **Icons** — Inline SVGs (Feather-style)

---

## 📱 Menu Categories

| Category | Items                                     |
| -------- | ----------------------------------------- |
| Pastil   | Classic Tuna, Beef Special, Chicken Adobo |
| Rice     | Garlic Fried Rice, Java Rice              |
| Sides    | Atchara, Ensaladang Talong                |
| Drinks   | Calamansi Juice, Buko Juice               |
| Desserts | Halo-Halo, Leche Flan                     |

---

## 📄 License

© 2025 Pastil-an. All rights reserved.
