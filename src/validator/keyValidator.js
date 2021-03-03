'use strict';

class KeyValidator {
  static isEnter = keyCode => keyCode === 'Enter';
  static isNotEnter = keyCode => keyCode !== 'Enter';
  static isEsc = keyCode => keyCode === 'Escape';
  static isNotEsc = keyCode => keyCode !== 'Escape';
}

export default KeyValidator;
