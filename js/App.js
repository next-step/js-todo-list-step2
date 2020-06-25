import api from './api.js';
import TodoList from './components/TodoList.js';
import TodoInput from './components/TodoInput.js';
import { $TODO_LIST, $TODO_INPUT } from './config/config.js';

const USER_NAME = 'jeesoo';

class App {
  constructor() {
    new TodoInput({
      $element: $TODO_INPUT,
      onEnter: async content => {
        await api.addNewTodoItem(USER_NAME, content);
        const updatedData = await api.fetchTodoList(USER_NAME);
        this.setState(updatedData.todoList);
      }
    });
    this.initTodoList();
    // this.initUserList();
  }

  async initTodoList() {
    this.todoItems = await api.fetchTodoList(USER_NAME);
    this.todoList = new TodoList({
      $element: $TODO_LIST,
      todoItems: this.todoItems.todoList,
      onToggleItem: async id => {
        await api.toggleItem(USER_NAME, id);
        const updatedData = await api.fetchTodoList(USER_NAME);
        this.setState(updatedData.todoList);
      }
    });
  }

  async initUserList() {
    await api.fetchUserList();
  }

  setState(newItems) {
    this.todoList.setState(newItems);
    this.todoItems = newItems;
  }
}

new App();
