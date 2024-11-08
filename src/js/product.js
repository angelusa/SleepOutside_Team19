import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // setLocalStorage("so-cart", product);

  // call the array info from LocalStorage using and utils function.
  let cart = getLocalStorage("so-cart");

  if (!Array.isArray(cart)) {
    cart = [];
  }
  
  // const inCarProd = cart.find((item) => item.Id === product.Id);

  // if (inCarProd) {
  //   inCarProd.Quantity += 1;
  // } else {
  //   product.Quantity = 1;

  //   cart.push(product);
  // }

  cart.push(product); // add individual products 

  setLocalStorage("so-cart", cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
