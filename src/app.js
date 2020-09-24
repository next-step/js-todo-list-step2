import { initStore } from './store/index.js';
import { initRender } from './template/index.js';
(async () => await initStore())()
  .then(() => initRender());



