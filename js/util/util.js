export const qs = (selector, scope) => (scope || document).querySelector(selector);
export const qsa = (selector, scope) => (scope || document).querySelectorAll(selector);
export const getIndex = target => Array.from(target.parentNode.children).indexOf(target);
export const getLi = target => target.closest("li");