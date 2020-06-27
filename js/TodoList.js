import api from './util/api.js';
import { KEY_NAME, ERROR_TYPE } from './util/constants.js';
import * as templates from './util/templates.js';
import * as functions from './util/functions.js';

export default class TodoList {
  constructor({
    username,
    storeClassType,
    $targetTodoList,
    onToggle,
    onRemove,
    onEdit,
    onPriority,
  }) {
    this.username = username;
    this.storeClassType = storeClassType;
    this.$targetTodoList = $targetTodoList;

    this.$targetTodoList.addEventListener('click', (e) => {
      const { className } = e.target;
      const { id } = e.target.closest('li').dataset;
      console.log(className);
      const selectAction = {
        toggle: (id) => onToggle(id),
        destroy: (id) => onRemove(id),
      };
      selectAction[className]
        ? selectAction[className](id)
        : console.error(ERROR_TYPE.NO_MATCH_CLASS);
    });

    this.$targetTodoList.addEventListener('change', (e) => {
      const { className } = e.target;
      const { id } = e.target.closest('li').dataset;
      if(className === 'chip select'){
        onPriority(id, e.target.value)
      }
    })

    this.$targetTodoList.addEventListener('dblclick', (e) => {
      const { className } = e.target;
      console.log(e.target);
      if (className === 'label') {
        const $targetLi = e.target.closest('li');
        this.storeClassType = $targetLi.className;
        $targetLi.className = 'editing';
        $targetLi.querySelector('.edit').focus();
      }
    });

    this.$targetTodoList.addEventListener('focusout', (e) => {
      const { className } = e.target;
      if (className === 'edit') {
        e.target.closest('li').className = this.storeClassType;
      }
    });

    this.$targetTodoList.addEventListener('keyup', (e) => {
      const { className } = e.target;
      if (className === 'edit') {
        const $targetLi = e.target.closest('li');
        if (e.key === KEY_NAME.ESC) {
          e.target.value = '';
          functions.toggleTarget($targetLi);
        } else if (e.key === KEY_NAME.ENTER && e.target.value !== '') {
          const { id } = $targetLi.dataset;
          const text = e.target.value;
          onEdit(id, text);
          functions.toggleTarget($targetLi);
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
