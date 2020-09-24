import { initStore } from './store/index.js';
import { initRender } from './render.js';

(async () => await initStore())()
  .then(() => initRender());



