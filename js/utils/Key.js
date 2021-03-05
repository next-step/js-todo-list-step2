export default class Key {
  static isEnter = keyCode => Number(keyCode) === 13;
  static isNotEnter = keyCode => Number(keyCode) !== 13;
  static isEsc = keyCode => Number(keyCode) === 27;
}