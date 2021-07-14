const $ = (selector, el = document) => el.querySelector(selector);
const $$ = (selector, el = document) => el.querySelectorAll(selector);

export { $, $$ };
