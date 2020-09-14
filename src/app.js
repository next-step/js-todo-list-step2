import { setApi } from './endpoint/api.js';
import { initStore } from './store/index.js';
import { render } from './render.js';
import { setEvent } from './event.js';

setApi('https://js-todo-list-9ca3a.df.r.appspot.com');
(async () => await initStore())()
  .then(() => {
    render();
    setEvent();
  });


