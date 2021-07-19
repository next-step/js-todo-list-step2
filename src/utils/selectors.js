export const $ = node => document.querySelector(node);
export const $all = node => document.querySelectorAll(node);
export const isClassContains = (eventTarget, tagName) => eventTarget.classList.contains(tagName);
