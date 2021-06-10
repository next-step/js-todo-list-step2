import { DOM_ID, KEY, MESSAGGE } from '@constants/constants.js';
import { $, isEmptyObject } from '@utils/utils.js';
import { todoListService } from '@api/todolist.js';

import todoState from '@store/todoState.js';
import userState from '@store/userState.js';

export default class TodoInput {
  constructor() {
    this.$target = $(DOM_ID.TODO_INPUT);

    this.todoState = todoState;
    this.userState = userState;

    this.addEvent();
  }

  addEvent() {
    this.$target.addEventListener('keypress', this.addTodo.bind(this));
  }

  async addTodo({ code }) {
    if (code !== KEY.ENTER) return;

    const todoContents = this.$target.value;
    if (todoContents.length < 2) {
      alert(MESSAGGE.CREATE_CONTENTS_VALIDATE_ERROR);
      return;
    }

    const { userId } = this.userState.get();
    const result = await todoListService.createTodoItem(userId, { contents: todoContents });
    if (isEmptyObject(result)) return;

    // 상태 업데이트
    const prevTodoList = this.todoState.get();
    const addedTodoList = prevTodoList.concat(result);
    this.todoState.set(addedTodoList);

    this.initInput();
  }

  initInput() {
    this.$target.value = '';
  }
}
