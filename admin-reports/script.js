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


// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {});