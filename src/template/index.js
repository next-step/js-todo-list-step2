import UserTitle from './User/UserTitle.js';
import UserListContainer from './User/UserListContainer.js';
import TodoContainer from './Todo/TodoContainer.js';
import { showLoading } from '../utils.js';

export const Home = ($target) => {
  $target.append(
    UserTitle(),
    UserListContainer(),
    TodoContainer(),
  );
  showLoading(false);
};




