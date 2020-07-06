import { MESSAGE } from './util/constants.js';

export default class UserRegister {
  constructor({ username, $targetUserRegister, onClickRegister }) {
    this.username = username;
    this.$targetUserRegister = $targetUserRegister;

    this.$targetUserRegister.addEventListener('click', () => {
      const newUsername = window.prompt(MESSAGE.WELCOME);
      newUsername && onClickRegister(newUsername);
    });
  }
}
