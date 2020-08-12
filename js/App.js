import api from './api.js';
import TodoApp from './components/TodoApp.js';
import Input from './components/Input.js';
import { $REGISTER_INPUT } from './config/htmlElement.js';

class App {
  constructor() {
    new Input({
      $element: $REGISTER_INPUT,
      onEnter: async userName => {
        const { _id } = await api.addNewTodoItem(userName, 'register');
        await api.deleteItem(userName, _id);

        new TodoApp(userName);
      }
    });
  }
}

new App();
