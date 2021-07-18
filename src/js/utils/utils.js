const $ = (selector, el = document) => el.querySelector(selector);
const $$ = (selector, el = document) => el.querySelectorAll(selector);

const confirmAlert = (message) => {
  return confirm(message);
};

const promtAlert = (message, defaultMessage = "") => {
  return prompt(message, defaultMessage);
};

export { $, $$, confirmAlert, promtAlert };
