import { API } from '../../api/api.js';
import { ALL, ACTIVE, COMPLETED } from '../../constant/todo.js';
import { getCurrentUser } from '../../utils/localStorage.js';

const todoPriority = (priority) => {
  const priorityList = {
    FIRST: 'primary',
    SECOND: 'secondary',
  };

  return priorityList[priority];
};

const todoTemplate = (todo) => {
  return `<li id=${todo._id} class=${todo.isCompleted ? 'completed' : ''}>
            <div class="view">
              <input class="toggle" type="checkbox" ${
                todo.isCompleted ? 'checked' : ''
              }/>
              <label class="label">
                <span class="chip ${todoPriority(todo.priority)}"></span>
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
