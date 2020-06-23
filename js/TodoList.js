import api from './util/api.js';
import { KEY_NAME, ERROR_TYPE } from './util/constants.js';

export default class TodoList {
  constructor({ data, username, $targetTodoList, onToggle, onRemove, onEdit }) {
    this.data = data;
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
    // this.data = nextData;
    // console.log(this.data)
    this.render();
  }

  async render() {
    console.log(this.username);
    const response = await api.fetchUserTodo(this.username);
    this.data = response.todoList;
    this.$targetTodoList.innerHTML = this.data
      .map((todo) => {
        return `
            <li ${todo.isCompleted ? 'class=completed' : ''} data-id=${
          todo._id
        }>
              <div class="view">
                <input class="toggle" type="checkbox" ${
                  todo.isCompleted ? 'checked' : ''
                } />
                <label class="label">${todo.contents}</label>
                <button class="delete"></button>
              </div>
              <input class="edit" placeholder=${todo.contents} value="" />
            </li>
      `;
      })
      .join('');
  }
}
