import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  let cart = getLocalStorage("so-cart") || [];
  if (!Array.isArray(cart)) {
    cart = [];
  }
  cart.push(product);
  setLocalStorage("so-cart", cart);
  updateCartCount(); // Update the cart count after adding a product
}

async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

function updateCartCount() {
  const cart = getLocalStorage("so-cart") || [];
  const cartCountElement = document.querySelector(".cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = cart.length;
  }
}
// Agrega el evento "click" al botón "Add to Cart"
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
updateCartCount(); // Ensure count is updated when page loads
