import { API } from '../../api/api.js';

const todoPriority = (priority) => {
  const priorityList = {
    FIRST: 'primary',
    SECOND: 'secondary',
  };

  return priorityList[priority];
};

const todoTemplate = (todo) => {
  return `<li class=${todo.isCompleted ? 'completed' : ''}>
            <div class="view">
              <input class="toggle" type="checkbox" />
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

export const loadTodos = (userId) => {
  const user = API.getUser(userId);

  user.then((user) => {
    renderTitle(user.name);
    renderTodos(user.todoList);
  });
};
