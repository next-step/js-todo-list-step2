import { KEY_NAME, MESSAGE } from './util/constants.js';

export default class TodoInput {
  constructor({ $targetUserList, $targetTodoInput, onInput }) {
    this.$targetUserList = $targetUserList;
    this.$targetTodoInput = $targetTodoInput;

    this.$targetTodoInput.addEventListener('click', (e) => {
      e.target.value = '';
    });

    this.$targetTodoInput.addEventListener('keyup', (e) => {
      if (e.key !== KEY_NAME.ENTER || e.target.value === '') return;
      const userList = this.$targetUserList.querySelector('.ripple');
      if (!userList) {
        alert(MESSAGE.REGISTER_USER);
        return;
      }
      const selectedUser = this.$targetUserList.querySelector('.ripple.active');
      if (!selectedUser) {
        alert(MESSAGE.SELECT_USER);
        return;
      }
      e.target.value && onInput(e.target.value);
      e.target.value = '';
    });
  }
}
