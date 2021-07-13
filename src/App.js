import Title from './components/Title.js';
import UserList from './components/UserList.js';
import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import TodoCount from './components/TodoCount.js';

export default class App {
  constructor($app) {
    new Title({ $target: $app });
    new UserList({ $target: $app });

    const todoApp = document.createElement('section');
    todoApp.className = 'todoapp';

    new TodoInput({ $target: todoApp });

    const main = document.createElement('section');
    main.className = 'main';

    new TodoList({ $target: main });
    new TodoCount({ $target: main });

    todoApp.appendChild(main);
    $app.appendChild(todoApp);
  }
}
