import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

// Fuente de datos para los productos
const dataSource = new ProductData('tents');

// Selección del contenedor para la lista de productos
const element = document.querySelector('.product-list');

// Creación e inicialización de la lista de productos
const listing = new ProductList('Tents', dataSource, element);
listing.init();
