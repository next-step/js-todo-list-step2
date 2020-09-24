import { initStore } from './store/index.js';
import { Home } from './template/index.js';

const $app = document.getElementById('app');

(async () => await initStore())()
  .then(() => Home($app));



