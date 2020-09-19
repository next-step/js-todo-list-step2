window.qs = (selector, scope) => {
    return (scope || document).querySelector(selector);
};
window.qsa = (selector, scope) => {
    return (scope || document).querySelectorAll(selector);
};
window.getIndex = (target) => {
    return Array.from(target.parentNode.children).indexOf(target)
}
window.getLi = (target) => {
    return target.closest("li");
}
export * from "./util.js";
