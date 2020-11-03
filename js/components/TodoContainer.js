import TodoInput from '../components/TodoInput.js';
import TodoList from '../components/TodoList.js';
import TodoFooter from '../components/TodoFooter.js';
import DOM from '../core/createElement.js';
import API from '../api/index.js';
import { filterTodoList } from '../utils/index.js';

export default class TodoContainer {
  constructor() {
    this.$todoSection = DOM.section({ class: 'todo-section' });

    this.todoInput = TodoInput();
    this.todoList = new TodoList();
    this.todoFooter = new TodoFooter();

    this.render();
  }

  get $el() {
    return this.$todoSection;
  }

  setLoading() {
    this.todoList.setLoading();
  }

  setState({ todoList, currentFilter }) {
    const filteredTodoList = filterTodoList(todoList, currentFilter);
    const todoCount = filteredTodoList.length;

    this.$todoSection.innerHTML = '';

    this.todoList.setState({ todoList: filteredTodoList });
    this.todoFooter.setState({ todoCount, currentFilter });

    this.render();
  }

  render() {
    this.$todoSection.appendChild(this.todoInput);
    this.$todoSection.appendChild(this.todoList.$el);
    this.$todoSection.appendChild(this.todoFooter.$el);
  }
}
