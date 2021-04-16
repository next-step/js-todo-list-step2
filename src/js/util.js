export const getEl = (selector, parent = document) => parent.querySelector(selector);
export const pipe = (...fns) => (args) => fns.reduce((arg, nextFn) => nextFn(arg), args);
