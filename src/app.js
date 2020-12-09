import { initStore } from './store/index.js';
import { Home } from './template/index.js';

const $app = document.getElementById('app');

initStore()
  .then(() => Home($app));



