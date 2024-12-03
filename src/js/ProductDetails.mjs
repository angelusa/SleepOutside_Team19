import { setLocalStorage, getLocalStorage } from './utils.mjs';

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        // Use our datasource to get the details for the current product
        this.product = await this.dataSource.findProductById(this.productId);
        // Render the product details
        this.renderProductDetails('main');
        // Add a listener to the Add to Cart button
        document
            .getElementById('addToCart')
            .addEventListener('click', this.addToCart.bind(this));
    }

    addToCart() {
        // Retrieve the current cart from local storage
        let cart = getLocalStorage('so-cart') || [];

        // Add the current product to the cart
        cart.push(this.product);

        // Save the updated cart back to local storage
        setLocalStorage('so-cart', cart);

        // Provide feedback to the user
        alert('Product added to cart!');
    }

    renderProductDetails(selector) {
        const element = document.querySelector(selector);
        element.insertAdjacentHTML(
            'afterBegin',
            productDetailsTemplate(this.product)
        );
    }
}

function productDetailsTemplate(product) {
    return `<section class="product-detail">
        <h3>${product.Brand.Name}</h3>

        <h2 class="divider">${product.NameWithoutBrand}</h2>

        <img
          class="divider"
          src="${product.Image}"
          alt="${product.NameWithoutBrand}"
        />

        <p class="product-card__price">$${product.FinalPrice}</p>

        <p class="product__color">${product.Colors[0].ColorName}</p>

        <p class="product__description">
          ${product.DescriptionHtmlSimple}
        </p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
      </section>`;
}