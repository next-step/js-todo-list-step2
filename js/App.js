import api from './api.js';
import TodoList from './components/TodoList.js';
import TodoInput from './components/TodoInput.js';
import TodoCount from './components/TodoCount.js';
import { $TODO_LIST, $TODO_INPUT, $TODO_COUNT } from './config/config.js';

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

    this.initTodoList().then(() => {
      this.todoCount = new TodoCount({
        $element: $TODO_COUNT,
        totalCount: this.todoItems.length,
        completeCount: this.todoItems.filter(item => item.isCompleted).length
      });
    });

    // this.initUserList();
  }

  async initTodoList() {
    this.todoInfo = await api.fetchTodoInfo(USER_NAME);
    this.todoItems = this.todoInfo.todoList;
    this.todoList = new TodoList({
      $element: $TODO_LIST,
      todoItems: this.todoItems,
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
    this.todoInfo = await api.fetchTodoInfo(USER_NAME);
    const { todoList } = this.todoInfo;
    this.todoList.setState(todoList);
    this.todoCount.setState({
      totalCount: todoList.length,
      completeCount: todoList.filter(item => item.isCompleted).length
    });
    this.todoItems = todoList;
  }
}

new App();
