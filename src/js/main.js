import ProductData from './ProductData.mjs';
import ProductList  from './ProductList.mjs';

const dataSource = new ProductData('tent');
const element = document.querySelector('.product-list');
const listing = new ProductList('Tents', dataSource, element);

listing.init();
