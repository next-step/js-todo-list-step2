export default class $ {

  static single(selector) {
    return document.querySelector(selector);
  }

  static multi(selector) {
    return [...document.querySelectorAll(selector)];
  }
}