'use strict';

export class KeyValidator {
  static isEnter = keyCode => keyCode === 'Enter';
  static isNotEnter = keyCode => keyCode !== 'Enter';
  static isEsc = keyCode => keyCode === 'Escape';
  static isNotEsc = keyCode => keyCode !== 'Escape';
}

export class ElementValidator {
  static isEmpty = element => element.value.trim() === '';
  static isToggleBtn = target => target.matches('.toggle');
  static isNotToggleBtn = target => !target.matches('.toggle');
  static isDeleteBtn = target => target.matches('.destroy');
  static isNotDeleteBtn = target => !target.matches('.destroy');
}
