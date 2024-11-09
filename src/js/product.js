import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Intenta obtener el carrito actual de localStorage o usa un array vacío si no existe
  let cart = getLocalStorage("so-cart") || [];

  // Me aseguro que cart es un array
  if (!Array.isArray(cart)) {
    cart = [];
  }

  // Agrega el producto al carrito
  cart.push(product);

  // Guarda el carrito actualizado en localStorage
  setLocalStorage("so-cart", cart);
}

// Manejador para el botón "Add to Cart"
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// Agrega el evento "click" al botón "Add to Cart"
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
