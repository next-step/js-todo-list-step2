import TodoList from './components/TodoList.js';
import TodoInput from './components/TodoInput.js';
import TodoItem from './components/TodoItem.js';
import TodoFilter from './components/TodoFilter.js';
import { FILTER_TYPE } from './constants.js';

function TodoApp() {
  this.todoList = [];
  this.activeList = () => this.todoList.filter(item => !item.completed);
  this.completedList = () => this.todoList.filter(item => item.completed);
  this.mode = FILTER_TYPE.ALL;

  this.findIndexById = id => {
    return this.todoList.findIndex(item => item.id.toString() === id.toString());
  };

  this.setState = updatedItems => {
    this.todoList = updatedItems;
    this.TodoList.setState(this.todoList);
    this.$todoCount.innerHTML = `총 <strong>${this.todoList.length}</strong> 개`;
  };

  this.init = () => {
    const list = localStorage.getItem('todo-list');
    this.todoList = JSON.parse(list);
    this.setState(this.todoList);
  }

  this.TodoList = new TodoList({
    deleteTodo: id => {
      const index = this.findIndexById(id);
      this.todoList = [...this.todoList.slice(0, index), ...this.todoList.slice(index + 1)];
      this.setState(this.todoList);
    },
    toggleTodo: id => {
      const index = this.findIndexById(id);
      this.todoList[index].completed = !this.todoList[index].completed;
      this.setState(this.todoList);
    },
    toggleEditMode: id => {
      const index = this.findIndexById(id);
      this.todoList[index].editing = !this.todoList[index].editing;
      this.setState(this.todoList);
    },
    editTodo: (id, value) => {
      const index = this.findIndexById(id);
      this.todoList[index].text = value;
      this.toggleEditMode(id);
      this.setState(this.todoList);
    }
  });
  this.TodoInput = new TodoInput({
    addTodo: value => {
      this.todoList = [new TodoItem(value), ...this.todoList];
      this.setState(this.todoList);
    }
  });
  this.$todoCount = document.getElementsByClassName('todo-count')[0];
  this.TodoFilter = new TodoFilter({
    filterTodo: mode => {
      this.mode = mode;
      const renderList = {
        [FILTER_TYPE.ALL]: this.todoList,
        [FILTER_TYPE.ACTIVE]: this.activeList(),
        [FILTER_TYPE.COMPLETED]: this.completedList(),
      };
      this.TodoList.setState(renderList[this.mode]);
    }
  });
}

new TodoApp();