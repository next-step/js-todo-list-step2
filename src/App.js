// components
import UserList from './components/UesrList/UserList.js';
import TodoApp from './components/TodoApp.js';

function handleLoadAfter() {
  // new UserList();
  new TodoApp();
}

window.addEventListener('load', handleLoadAfter);
