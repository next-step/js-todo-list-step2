import {DEFAULT_USER, FilterOptions} from './constants.js';
import TodoList from './TodoList.js';
import TodoInput from './TodoInput.js';
import TodoCount from './TodoCount.js';
// import TodoFilter from './TodoFilter.js';
import TodoUser from './TodoUser.js';

function App() {
  const $todoInput = document.querySelector('.new-todo');
  const $todoList = document.querySelector('.todo-list');
  const $todoCount = document.querySelector('.todo-count');
  // const $todoFilter = document.querySelector('.filters');
  const $userTitle = document.querySelector('#user-title');
  const $userList = document.querySelector('#user-list');
  const $userCreateButton = document.querySelector('.user-create-button');

  this.userId = DEFAULT_USER.ID;

  this.setState = (activeUserId) => {
    this.userId = activeUserId;
    todoList.setState(this.userId);
  };

  this.addItem = (text) => {
    todoList.post(text);

    this.filterItems(this.state.activeFilterType);
  };

  this.filterItems = (type) => {
    this.state.activeFilterType = type;
    todoList.updateItem(this.getFilteredItem());
    todoCount.render(this.getFilteredItem().length);
  };

  this.getFilteredItem = () =>
    this.state.data.filter(({isCompleted}) =>
      (this.state.activeFilterType === FilterOptions.ALL) ||
      (this.state.activeFilterType === FilterOptions.COMPLETED && isCompleted) ||
      (this.state.activeFilterType === FilterOptions.ACTIVE && !isCompleted));

  const todoList = new TodoList($todoList, this.userId);
  const todoInput = new TodoInput($todoInput, (text) => {
    this.addItem(text);
  });

  const todoCount = new TodoCount($todoCount);
  const todoUser = new TodoUser($userTitle, $userCreateButton, $userList, this.userId, (activeUserId) => {
    this.setState(activeUserId);
  });

  // this.todoFilter = new TodoFilter($todoFilter, this.state, (type) => {
  //   this.filterItems(type);
  // });
}

new App();
