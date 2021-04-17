import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import { TodoFilter } from './TodoFilter.js';

export default class TodoApp {
  constructor() {
    this.todoCount = document.querySelector('.todo-count strong');
    this.todoFilterButton = document.querySelectorAll('.filters li a');
    this.todoLocalData = localStorage.getItem('item');
    this.todoData = this.todoLocalData ? JSON.parse(this.todoLocalData) : [];

    this.init();
    this.render(this.todoData);
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

  setItem() {
    if (this.filter === 'active')
      return this.render(this.todoData.filter((data) => !data.completed));
    if (this.filter === 'completed')
      return this.render(this.todoData.filter((data) => data.completed));

    localStorage.setItem('item', JSON.stringify(this.todoData));
    this.render(this.todoData);
  }

  handleCreateItem(title) {
    this.todoData.push({
      id: new Date().getTime(),
      completed: false,
      title,
    });
    this.setItem();
  }

  handleCheckItem(id) {
    const item = this.todoData.find((data) => data.id.toString() === id);
    item.completed = !item.completed;
    this.setItem();
  }

  handleEditItem(id, title) {
    const item = this.todoData.find((data) => data.id.toString() === id);
    item.title = title;
    this.setItem();
  }

  handleDeleteItem(id) {
    this.todoData = this.todoData.filter((data) => data.id != id);
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
