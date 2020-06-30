import api from './util/api.js';
import { ERROR_TYPE } from './util/constants.js';
import { TodoListTemplate, LoadingTemplate } from './util/templates.js';
import * as functions from './util/functions.js';

export default class TodoList {
  constructor({
    username,
    $targetTodoList,
    onToggle,
    onRemove,
    onEdit,
    onPriority,
    onInitializePriority,
  }) {
    this.username = username;
    this.$targetTodoList = $targetTodoList;

    this.$targetTodoList.addEventListener('click', (e) => {
      const { className } = e.target;
      const { id } = e.target.closest('li').dataset;
      const selectAction = {
        toggle: (id) => onToggle(id),
        destroy: (id) => onRemove(id),
        delete: (id) => onInitializePriority(id),
      };
      selectAction[className]
        ? selectAction[className](id)
        : console.error(ERROR_TYPE.NO_MATCH_CLASS);
    });

    this.$targetTodoList.addEventListener('change', (e) => {
      const { className } = e.target;
      const { id } = e.target.closest('li').dataset;
      if (className === 'chip select') {
        onPriority(id, e.target.value);
      }
    });

    this.$targetTodoList.addEventListener('dblclick', (e) => {
      const { className } = e.target;
      if (className === 'label') {
        const $targetLi = e.target.closest('li');
        $targetLi.className = 'editing';
        $targetLi.querySelector('.edit').focus();
      }
    });

    this.$targetTodoList.addEventListener('focusout', (e) => {
      const { className } = e.target;
      if (className === 'edit') {
        const $targetLi = e.target.closest('li');
        functions.backToOriginalToggle($targetLi);
      }
    });

    this.$targetTodoList.addEventListener('keyup', (e) => {
      const { className } = e.target;
      if (className === 'edit') {
        const $targetLi = e.target.closest('li');
        const selectAction = {
          Escape: () => {
            e.target.value = '';
            functions.backToOriginalToggle($targetLi);
          },
          Enter: () => {
            const { id } = $targetLi.dataset;
            const text = e.target.value;
            text && onEdit(id, text);
            functions.backToOriginalToggle($targetLi);
          },
        };
        selectAction[e.key]
          ? selectAction[e.key]()
          : console.error(ERROR_TYPE.NO_MATCH_KEY);
      }
    });
  }

  setState(selectedUsername) {
    this.username = selectedUsername;
    this.render();
  }

  async render() {
    this.$targetTodoList.insertAdjacentHTML('beforeend', LoadingTemplate);
    try {
      const response = await api.fetchUserTodo(this.username);
      const data = response.todoList;
      this.$targetTodoList.innerHTML = TodoListTemplate(data);
    } catch (e) {
      this.$targetTodoList.innerHTML = '';
      console.error(ERROR_TYPE.CAN_NOT_LOAD);
    }
  }
}
