import { SELECTOR, KEY_NAME } from '../utils/constant.js';
import { STATUS } from '../utils/constant.js';
import { isAvaliableTodo } from '../utils/validations.js';
import { ERROR_HANDLER } from '../utils/errors.js';
import { $ } from '../utils/dom.js';
import api from '../api/index.js';

class TodoInput {
  constructor(store) {
    this.container = $(SELECTOR.TODO_INPUT);
    this.store = store;
    this.bindEvent();
  }

  bindEvent() {
    this.container.addEventListener('keydown', (e) => this.onKeyDown(e));
  }

  async onKeyDown({ key }) {
    if (key === KEY_NAME.ENTER) {
      return await this.submitTodo();
    }
  }

  async submitTodo() {
    try {
      const value = this.container.value.trim();
      isAvaliableTodo(value);
      const newTodo = await api.addTodoItem(this.store.currentUserId, value);
      this.container.value = '';
      const todoData = [...this.store.originTodoList, newTodo];

      this.store.setOriginList(todoData);
      const status = this.store.status;

      if (status !== STATUS.COMPLETED) {
        const renderData = [...this.store.renderTodoList, newTodo];
        this.store.setRenderList(renderData);
      }
    } catch (error) {
      const hanlder = ERROR_HANDLER[error];
      return hanlder && hanlder();
    }
  }
}
export default TodoInput;
