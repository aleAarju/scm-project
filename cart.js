

function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// id        -> product id (number)
// name      -> product name (string)
// price     -> plain number, e.g. 1200 (NOT "Rs. 1200")
// image     -> image filename, e.g. "cleanser1.avif"
// qty       -> how many to add (default 1)
function addToCart(id, name, price, image, qty = 1) {
  const cart = getCart();
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, name, price, image, qty });
  }
  saveCart(cart);

  // little visual confirmation
  showAddedToast(name);
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  if (typeof renderCart === "function") renderCart();
}

function changeCartQty(id, delta) {
  const cart = getCart();
  const item = cart.find(item => item.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty < 1) item.qty = 1;
  saveCart(cart);
  if (typeof renderCart === "function") renderCart();
}

function updateCartCount() {
  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll(".cart-count").forEach(el => el.textContent = totalQty);
}

// Small temporary confirmation message when something is added
function showAddedToast(name) {
  let toast = document.getElementById("cartToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "cartToast";
    toast.style.cssText = `
      position:fixed; bottom:24px; right:24px;
      background:#ff4d88; color:white;
      padding:12px 20px; border-radius:8px;
      font-size:14px; box-shadow:0 4px 12px rgba(0,0,0,0.2);
      z-index:99999; opacity:0; transition:opacity 0.3s;
      max-width:280px;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = `Added "${name}" to cart`;
  toast.style.opacity = "1";
  clearTimeout(window._cartToastTimer);
  window._cartToastTimer = setTimeout(() => {
    toast.style.opacity = "0";
  }, 1800);
}

// Run automatically as soon as this script loads on any page
updateCartCount();