import api from './util/api.js';
import { KEY_NAME, ERROR_TYPE } from './util/constants.js';
import * as templates from './util/templates.js';

export default class TodoList {
  constructor({ username, $targetTodoList, onToggle, onRemove, onEdit }) {
    this.username = username;
    this.$targetTodoList = $targetTodoList;

    this.$targetTodoList.addEventListener('click', (e) => {
      const { className } = e.target;
      const { id } = e.target.closest('li').dataset;
      switch (className) {
        case 'toggle':
          onToggle(id);
          break;
        case 'delete':
          onRemove(id);
          break;
        default:
          console.error(ERROR_TYPE.NO_MATCH_CLASS);
          break;
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

    this.$targetTodoList.addEventListener('keyup', (e) => {
      const { className } = e.target;
      if (className === 'edit') {
        const $targetLi = e.target.closest('li');
        if (e.key === KEY_NAME.ESC) {
          e.target.value = '';
          if ($targetLi.querySelector('.toggle').checked) {
            $targetLi.className = 'completed';
          } else {
            $targetLi.className = '';
          }
        } else if (e.key === KEY_NAME.ENTER && e.target.value !== '') {
          const id = $targetLi.dataset.id;
          const text = e.target.value;
          onEdit(id, text);
          if ($targetLi.querySelector('.toggle').checked) {
            $targetLi.className = 'completed';
          } else {
            $targetLi.className = '';
          }
        }
      }
    });
  }

  setState(selectedUsername) {
    this.username = selectedUsername;
    this.render();
  }

  async render() {
    this.$targetTodoList.insertAdjacentHTML('beforeend', templates.LOADING);
    const response = await api.fetchUserTodo(this.username);
    const data = response.todoList;
    this.$targetTodoList.innerHTML = templates.TODOLIST(data);
  }
}
