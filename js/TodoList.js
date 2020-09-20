import {KEY, ADDRESS} from './constants.js';
import {API} from './API.js';

export default function TodoList($todoList, userId) {
  this.$todoList = $todoList;
  this.userId = userId;
  this.data = [];

  this.editItem = (index, text) => {
    this.data[index].text = text;
    this.render();
    this.bindEvents();
  };

  this.setState = (activeUserId) => {
    this.userId = activeUserId;
    this.getTodoItems();
  };

  this.bindEvents = () => {
    document.querySelectorAll('.todo-item').forEach(($item) => {
      $item.querySelector('input.toggle').addEventListener('click', (e) => {
        e.stopPropagation();
        const $todoItem = e.target.closest('.todo-item');
        const {index} = $todoItem.dataset;

        if ($todoItem.classList.contains('completed')) {
          $todoItem.classList.remove('completed');
          this.data[index].isCompleted = false;
        } else {
          $todoItem.classList.add('completed');
          this.data[index].isCompleted = true;
        }
        this.toggle($todoItem.id);
      });

      $item.querySelector('button.destroy').addEventListener('click', (e) => {
        e.stopPropagation();
        const _id = e.target.closest('.todo-item').id;
        this.delete(_id);
      });

      $item.querySelector('label').addEventListener('dblclick', (e) => {
        e.stopPropagation();
        const $todoItem = e.target.closest('.todo-item');
        const {index} = e.target.closest('.todo-item').dataset;
        const oldValue = e.target.innerText;

        $todoItem.classList.add('editing');
        $todoItem.addEventListener('keyup', (e) => {
          if (e.key === KEY.ESC) {
            $todoItem.classList.remove('editing');
            e.target.value = oldValue;
          } else if (e.key === KEY.ENTER) {
            this.editItem(index, e.target.value);

            this.edit($todoItem.id, e.target.value);
          }
        });
      });
    });
  };

  this.getTodoItems = async () => {
    const response = await fetch(`${ADDRESS.BASE_URL}/api/users/${this.userId}/items`, API.GET);
    // TODO: user validation
    this.data = await response.json();

    this.render();
    this.bindEvents();
  };

  this.post = async (text) => {
    await fetch(`${ADDRESS.BASE_URL}/api/u/${this.userId}/item/`, API.POST( {contents: text} ));
    this.getTodoItems();
  };

  this.delete = async (_id) => {
    await fetch(`${ADDRESS.BASE_URL}/api/u/${this.userId}/item/${_id}`, API.DELETE);
    this.getTodoItems();
  };

  this.toggle = async (_id) => {
    await fetch(`${ADDRESS.BASE_URL}/api/u/${this.userId}/item/${_id}/toggle`, API.TOGGLE);
  };

  this.edit = async (_id, text) => {
    await fetch(`${ADDRESS.BASE_URL}/api/u/${this.userId}/item/${_id}/`, API.EDIT({contents: text}));
    this.getTodoItems();
  };

  this.render = () => {
    if (this.data) {
      this.$todoList.innerHTML = this.data.map(({_id, contents, isCompleted, priority}, index) => {
        `<li class="todo-item ${isCompleted ? 'completed' : ''}" data-index="${index}" id="${_id}">
          <div class="view">
          <input class="toggle" type="checkbox" ${isCompleted ? 'checked' : ''} />
          <label class="label">
          <select class="chip select">
            <option value="0" ${priority == 0 ? 'selected' : ''}>순위</option>
            <option value="1" ${priority == 1 ? 'selected' : ''}>1순위</option>
            <option value="2" ${priority == 2 ? 'selected' : ''}>2순위</option>
          </select>
          ${contents}</label>
          <button class="destroy"></button>
          </div>
          <input class="edit" value="${contents}" />
          </li>`;
      }).join('');
    }
  };

  this.getTodoItems();
}
