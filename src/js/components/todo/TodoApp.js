import { todoApi } from '../../api/api.js';
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import { TodoFilter } from './TodoFilter.js';

export default class TodoApp {
  constructor({ userId }) {
    this.todoCount = document.querySelector('.todo-count strong');
    this.todoFilterButton = document.querySelectorAll('.filters li a');
    this.userId = userId;
    this.todoData = [];

    this.init();
  }

  init() {
    this.todoInput = new TodoInput({
      onCreateItem: this.handleCreateItem.bind(this),
    });

    this.todoList = new TodoList({
      todoData: this.todoData,
      onCheckItem: this.handleCheckItem.bind(this),
      onEditItem: this.handleEditItem.bind(this),
      onDeleteItem: this.handleDeleteItem.bind(this),
    });

    this.todoFilter = new TodoFilter({
      onFilterItem: this.handleFilterItem.bind(this),
    });

    this.getTodoData();
  }

  setUserId(userId) {
    this.userId = userId;
    this.getTodoData();
  }

  getTodoData = async () => {
    this.todoList.isLoading();
    await todoApi.getItem(this.userId).then((data) => {
      this.setState(data);
    });
  };

  setState(todoData) {
    this.todoData = todoData;
    this.setItem();
  }

  setItem() {
    if (this.filter === 'active')
      return this.render(this.todoData.filter((data) => !data.isCompleted));
    if (this.filter === 'completed')
      return this.render(this.todoData.filter((data) => data.isCompleted));

    localStorage.setItem('item', JSON.stringify(this.todoData));
    this.render(this.todoData);
  }

  handleCreateItem = async (contents) => {
    await todoApi.setItem(this.userId, contents);
    this.getTodoData();
  };

  handleCheckItem = async (itemId) => {
    await todoApi.toggleItem(this.userId, itemId);
    this.getTodoData();
  };

  handleEditItem = async (itemId, contents) => {
    await todoApi.putItem(this.userId, itemId, contents);
    this.getTodoData();
  };

  handleDeleteItem = async (itemId) => {
    await todoApi.deleteItem(this.userId, itemId);
    this.getTodoData();
  };

  handleFilterItem(filter) {
    this.filter = filter;
    this.setItem();
  }

  render(todoData) {
    this.todoCount.innerHTML = todoData.length;
    this.todoList.setState(todoData);
  }
}
