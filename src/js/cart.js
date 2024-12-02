import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  if (!cartItems) {
    return;
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
  updateCartTotal(cartItems);
}

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p></li>`;  return newItem;}function updateCartTotal(cartItems) {  const cartFooter = document.querySelector('.cart-footer');  const cartTotalElement = document.querySelector('.cart-total');  if (!cartItems || cartItems.length === 0) {    cartFooter.classList.add('hide');    return;  }  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);  cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
  cartFooter.classList.remove('hide');
}

renderCartContents();