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
        this.setState();
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
        this.setState();
      },
      onDeleteItem: async id => {
        await api.deleteItem(USER_NAME, id);
        this.setState();
      },
      onEditItem: async (id, saveContent) => {
        if (saveContent) {
          await api.modifyItem(USER_NAME, id, saveContent);
        }
        this.setState();
      }
    });
  }

  async initUserList() {
    await api.fetchUserList();
  }

  async setState() {
    const { todoList } = await api.fetchTodoList(USER_NAME);
    this.todoList.setState(todoList);
    this.todoItems = todoList;
  }
}

new App();
