import { API } from '../../api/api.js';

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

const renderCount = () => {
  const $todoCount = document.querySelector('.todo-count > strong');
  $todoCount.innerText = document.querySelectorAll('.todo-list > li').length;
};

export const loadTodos = async (userId) => {
  const user = await API.getUser(userId);

  renderTitle(user.name);
  renderTodos(user.todoList);
  renderCount();
};
