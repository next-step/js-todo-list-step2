import { getters } from '../js/store/index.js';
import { observe } from '../js/core/Observer.js';

const title = () => {
  const $dom = document.querySelector('#user-title');
  $dom.innerHTML = getters.userName;
};
observe(title);

export default title;