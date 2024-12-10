import ProducData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const dataSource = new ProducData('tents');
const element = document.querySelector('.product-list');
const listing = new ProductList('Tents', dataSource, element);

listing.init();

