import { SELECTOR, KEY_NAME } from '../utils/constant.js';
import { STATUS } from '../utils/constant.js';
import { isAvaliableTodo } from '../utils/validations.js';
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
      if (!isAvaliableTodo(value)) {
        return alert('2글자 이상 입력해주세요');
      }
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
      return alert(error);
    }
  }
}
export default TodoInput;
