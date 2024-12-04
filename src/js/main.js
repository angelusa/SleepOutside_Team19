import ExternalService from './ExternalServices.mjs';
import ProductList  from './ProductList.mjs';

const dataSource = new ExternalService('tent');
const element = document.querySelector('.product-list');
const listing = new ProductList('Tents', dataSource, element);

listing.init();
