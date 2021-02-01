import UserItem from './components/UserItem.js';
import UserList from './components/UserList.js';
import Title from './components/Title.js';
import Todolist from './components/Todolist.js';
import TodoInput from './components/TodoInput.js';
import TodolistFooter from './components/TodolistFooter.js';
import usersStore, { GET_USERS } from './modules/users.js';

const App = async () => {
  await usersStore.dispatch({ type: GET_USERS });
  UserList();
  Title();
  TodoInput();
  Todolist();
  TodolistFooter();
};

export default App;
