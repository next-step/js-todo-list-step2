import UserTitle from './template/User/UserTitle.js';
import UserListContainer from './template/User/UserListContainer.js';
import TodoContainer from './template/Todo/TodoContainer.js';

const $app = document.getElementById('app');

let components = {};

export const initRender = () => {
  components = {
    UserTitle: UserTitle(),
    UserListContainer: UserListContainer(),
    TodoContainer: TodoContainer(),
  };

  const fragment = new DocumentFragment();
  fragment.appendChild(components.UserTitle.dom);
  fragment.appendChild(components.UserListContainer.dom);
  fragment.appendChild(components.TodoContainer.dom);

  $app.appendChild(fragment);

  components.UserTitle.render();

  loadingRender(false);
};

export const loadingRender = (boolean) => {
  const display = (boolean ? 'block' : 'none');
  const $loading = document.querySelector('.loading');
  $loading && ($loading.style.display = display);
};


