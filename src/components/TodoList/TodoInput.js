import { $, isEmptyObject } from '../../utils/utils.js';
import { DOM_ID, KEY } from '../../constants/constants.js';
import TodoState from '../../store/todoState.js';
import { todoListService } from '../../api/todolist.js';

export default class TodoInput {
  constructor({ userState }) {
    this.$target = $(DOM_ID.TODO_INPUT);

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
    const result = await todoListService.createTodoItem(userId, { contents: todoContents });
    if (isEmptyObject(result)) return;

    // 상태 업데이트
    const prevTodoList = this.todoState.get();
    const addedTodoList = prevTodoList.concat(result);
    this.todoState.set(addedTodoList);

    this._initInput();
  }

  _initInput() {
    this.$target.value = '';
  }
}
