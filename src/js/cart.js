import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  if (!cartItems || cartItems.length === 0) {
    document.querySelector('.product-list').innerHTML = '<li class="empty-cart">Your cart is empty</li>';
    hideCartTotal();
    return;
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
  calculateAndDisplayTotal(cartItems);
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
  <p class='cart-card__price'>$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function calculateAndDisplayTotal(cartItems) {
  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  document.getElementById('cart-total-amount').textContent = total.toFixed(2);
  document.querySelector('.cart-footer').classList.remove('hide');
}

function hideCartTotal() {
  const cartFooter = document.querySelector('.cart-footer');
  if (cartFooter) {
    cartFooter.classList.add('hide');
  }
}

renderCartContents();