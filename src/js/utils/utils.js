const $ = (selector, el = document) => el.querySelector(selector);
const $$ = (selector, el = document) => el.querySelectorAll(selector);

const confirmAlert = (message) => {
  return confirm(message);
};

export { $, $$, confirmAlert };
