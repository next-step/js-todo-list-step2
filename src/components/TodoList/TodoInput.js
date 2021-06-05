import { $, createUUID } from '../../utils/utils.js';
import { DOM_ID, KEY } from '../../constants/constants.js';
import TodoState from '../../store/todoState.js';
import { createTodoItem } from '../../api/todolist.js';
// import UserState from '../../store/userState.js';

export default class TodoInput {
  constructor({ setTodoList, userState }) {
    this.$target = $(DOM_ID.TODO_INPUT);

    this.setTodoList = setTodoList;
    this.todoState = TodoState;
    this.userState = userState;

    this._addEvent();
  }

  _addEvent() {
    this.$target.addEventListener('keyup', this._addTodo.bind(this));
  }

  async _addTodo({ code }) {
    if (code !== KEY.ENTER) return;

    const todoContents = this.$target.value;
    if (todoContents === '') return null;

    if (todoContents.length < 2) {
      alert('2글자 이상이어야 합니다.');
      return;
    }

    const { userId } = this.userState.get();
    const result = await createTodoItem(userId, { contents: todoContents });
    // console.log('result', result);

    // 상태 업데이트
    // const todoList = this.todoState.get();
    // createTodoItem()
    // const addedTodoList = todoList.concat(todoItem);
    // this.setTodoList(addedTodoList);

    this._initInput();
  }

  _initInput() {
    this.$target.value = '';
  }
}
