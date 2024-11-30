import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="../product-listing/index.html?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}


export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category; // La categoría se usa para obtener productos de la API
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // Ahora pasamos la categoría al método getData
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

  renderList(list) {
    // Stretch #2 - Remove extra products
    const arr = ["880RR", "985RF", "985PR", "344YJ"];
    const res = list.filter((x) => arr.includes(x.Id));
    renderListWithTemplate(productCardTemplate, this.listElement, res);
  }
}

import ProductData from './ProductData.mjs';
import ProductList from './ProductList.js';
import { loadHeaderFooter, getParam } from './utils.mjs';

// Cargar el encabezado y pie de página
loadHeaderFooter();

// Obtener la categoría de los parámetros de la URL
const category = getParam('category');

// Crear una instancia de la clase ProductData
const dataSource = new ProductData();

// Seleccionar el elemento en el que queremos renderizar la lista de productos
const listElement = document.querySelector('.product-list');

// Crear una instancia de ProductList con la información adecuada
const myList = new ProductList(category, dataSource, listElement);

// Llamar al método init para mostrar los productos
myList.init();
