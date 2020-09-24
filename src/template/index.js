import UserTitle from './User/UserTitle.js';
import UserListContainer from './User/UserListContainer.js';
import TodoContainer from './Todo/TodoContainer.js';
import { showLoading } from '../utils.js';

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

  showLoading(false);
};




