import {KEY} from './constants.js';
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

  this.setState = async (activeUserId) => {
      this.userId = activeUserId;
      this.data = await API.GetTodoItems(this.userId);
      this.render();
      this.bindEvents();
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

      $item.querySelector('button.destroy').addEventListener('click', ({target}) => {
        const _id = target.closest('.todo-item').id;
        this.delete(_id);
      });

      $item.querySelector('label').addEventListener('dblclick', ({target}) => {
        const $todoItem = target.closest('.todo-item');
        const {index} = target.closest('.todo-item').dataset;
        const oldValue = target.innerText;

        $todoItem.classList.add('editing');
        $todoItem.addEventListener('keyup', ({key, target}) => {
          if (key === KEY.ESC) {
            $todoItem.classList.remove('editing');
            target.value = oldValue;
          } else if (key === KEY.ENTER) {
            this.editItem(index, target.value);
            this.edit($todoItem.id, target.value);
          }
        });
      });
    });
  };

  this.post = async (text) => {
    await API.AddItem(this.userId, text);
    this.data = await API.GetTodoItems(this.userId);
    this.setState(this.userId);
  };

  this.delete = async (_id) => {
    await API.DeleteItem(this.userId, _id);
    this.data = await API.GetTodoItems(this.userId);
    this.setState(this.userId);
  };

  this.toggle = async (_id) => {
    await API.ToggleItem(this.userId, _id);
  };

  this.edit = async (_id, text) => {
    await API.EditItem(this.userId, _id, text);
    this.data = await API.GetTodoItems(this.userId);
    this.setState(this.userId);
  };

  this.render = () => {
    this.$todoList.innerHTML = this.data.map(({_id, contents, isCompleted, priority}, index) => 
      `<li class="todo-item ${isCompleted ? 'completed' : ''}" data-index="${index}" id="${_id}">
        <div class="view">
        <input class="toggle" type="checkbox" ${isCompleted ? 'checked' : ''} />
        <label class="label">
        <select class="chip select">
          <option value="0" ${priority === 'NONE' ? 'selected' : ''}>순위</option>
          <option value="1" ${priority === '1' ? 'selected' : ''}>1순위</option>
          <option value="2" ${priority === '2' ? 'selected' : ''}>2순위</option>
        </select>
        ${contents}</label>
        <button class="destroy"></button>
        </div>
        <input class="edit" value="${contents}" />
        </li>`
    ).join('');
  };

  this.setState(this.userId);
}
