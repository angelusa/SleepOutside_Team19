import { getLocalStorage, setLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  if (!cartItems || cartItems.length === 0) {
    document.querySelector('.product-list').innerHTML = '<li class="empty-cart">Your cart is empty</li>';
    hideCartTotal();
    return;
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
  addRemoveButtonListeners(); // Add this line to attach event listeners
  calculateAndDisplayTotal(cartItems);
}

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
    <button class="remove-item" data-id="${item.Id}">❌</button>
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

function addRemoveButtonListeners() {
  const removeButtons = document.querySelectorAll('.remove-item');
  removeButtons.forEach(button => {
    button.addEventListener('click', removeFromCart);
  });
}

function removeFromCart(e) {
  const productId = e.target.getAttribute('data-id');
  let cartItems = getLocalStorage('so-cart');
  
  // Remove the item with matching ID
  cartItems = cartItems.filter(item => item.Id !== productId);
  
  // Update localStorage
  setLocalStorage('so-cart', cartItems);
  
  // Re-render the cart
  renderCartContents();
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