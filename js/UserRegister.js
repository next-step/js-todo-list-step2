import { WELCOME_MESSAGE } from './util/constants.js';

export default class UserRegister {
  constructor({ username, $targetUserRegister, onClickRegister }) {
    this.username = username;
    this.$targetUserRegister = $targetUserRegister;

    this.$targetUserRegister.addEventListener('click', (e) => {
      const newUsername = window.prompt(WELCOME_MESSAGE);
      newUsername && onClickRegister(newUsername);
    });
  }
}
