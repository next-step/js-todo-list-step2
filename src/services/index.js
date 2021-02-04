import Hermes from '../lib/hermes/Hermes';
import LocalStorage from './LocalStorage';
import TodoService from './TodoService';
import UserService from './UserService';

export const SERVER_URI =
  'https://js-todo-list-9ca3a.df.r.appspot.com/api/users/';

export default Hermes.create({
  baseURL: SERVER_URI,
  timeout: 2000,
});

export { LocalStorage, TodoService, UserService };
