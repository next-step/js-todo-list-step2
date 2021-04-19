import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import { TodoFilter } from './TodoFilter.js';

export default class TodoApp {
  constructor({ todoData }) {
    this.todoCount = document.querySelector('.todo-count strong');
    this.todoFilterButton = document.querySelectorAll('.filters li a');
    this.todoData = todoData;

    this.init();
  }

  init() {
    this.todoInput = new TodoInput({
      todoData: this.todoData,
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
  }

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

  handleCreateItem(contents) {
    this.todoData.push({
      _id: new Date().getTime(),
      isCompleted: false,
      contents,
    });
    this.setItem();
  }

  handleCheckItem(id) {
    const item = this.todoData.find((data) => data._id === id);
    item.isCompleted = !item.isCompleted;
    this.setItem();
  }

  handleEditItem(id, title) {
    const item = this.todoData.find((data) => data._id === id);
    item.title = title;
    this.setItem();
  }

  handleDeleteItem(id) {
    this.todoData = this.todoData.filter((data) => data._id != id);
    this.setItem();
  }

  handleFilterItem(filter) {
    this.filter = filter;
    this.setItem();
  }

  render(todoData) {
    this.todoCount.innerHTML = todoData.length;
    this.todoList.setState(todoData);
  }
}
