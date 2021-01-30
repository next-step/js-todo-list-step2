import { API } from '../../api/api.js';
import { ALL } from '../../constant/todo.js';

const priorityTemplate = (priority) => {
  const priorityClassList = {
    FIRST: 'primary',
    SECOND: 'secondary',
  };

  return `<select class="chip select ${priorityClassList[priority]}" >
            <option value="0" ${priority === 'NONE' && 'selected'}>순위</option>
            <option value="1" ${
              priority === 'FIRST' && 'selected'
            }>1순위</option>
            <option value="2" ${
              priority === 'SECOND' && 'selected'
            }>2순위</option>
          </select>`;
};

const todoTemplate = (todo) => {
  return `<li id=${todo._id} class=${todo.isCompleted ? 'completed' : ''}>
            <div class="view">
              <input class="toggle" type="checkbox" ${
                todo.isCompleted ? 'checked' : ''
              }/>
              <label class="label">
                ${priorityTemplate(todo.priority)}
                ${todo.contents}
              </label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="${todo.contents}" />
          </li>`;
};

const renderTitle = (name) => {
  const $userName = document.querySelector('#user-title strong');
  $userName.innerText = name;
};

const renderTodos = (todos) => {
  const $todoList = document.querySelector('.todo-list');
  $todoList.innerHTML = todos.map((todo) => todoTemplate(todo)).join('');
};

const filterTodos = (todos, option) => {
  const filters = {
    all: () => todos,
    active: () => todos.filter((todo) => todo.isCompleted === false),
    completed: () => todos.filter((todo) => todo.isCompleted === true),
  };

  return filters[option]();
};

const renderCount = () => {
  const $todoCount = document.querySelector('.todo-count > strong');
  $todoCount.innerText = document.querySelectorAll('.todo-list > li').length;
};

export const loadTodos = async (userId, option = ALL) => {
  const user = await API.getUser(userId);
  const currentTodoList = filterTodos(user.todoList, option);

  renderTitle(user.name);
  renderTodos(currentTodoList);
  renderCount();
};
