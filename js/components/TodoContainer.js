// core
import DOM from '../core/createElement.js';
import eventChannel from '../core/eventChannel.js';
const { when } = eventChannel;

// child components
import TodoInput from '../components/TodoInput.js';
import TodoList from '../components/TodoList.js';
import TodoFooter from '../components/TodoFooter.js';

// util & constants
import API from '../api/index.js';
import { filterTodoList } from '../utils/index.js';
import { ACTIONS } from '../constants/index.js';
const { STORE } = ACTIONS;

export default class TodoContainer {
  constructor() {
    this.$todoSection = DOM.section({ class: 'todo-section' });

    this.todoInput = TodoInput();
    this.todoList = new TodoList();
    this.todoFooter = new TodoFooter();

    this.render();
    this.connect();
  }

  get $el() {
    return this.$todoSection;
  }

  connect() {
    when(STORE.UPDATE_TODO, (props) => this.setState(props));
    when(STORE.REQUEST_ALL, () => this.setLoading());
    when(STORE.REQUEST_TODO, () => this.setLoading());
  }

  setLoading() {
    this.todoList.setLoading();
  }

  setState({ todoList, currentUser, currentFilter }) {
    const filteredTodoList = filterTodoList(todoList, currentFilter);
    const todoCount = filteredTodoList.length;

    this.$todoSection.innerHTML = '';
    this.$todoSection.dataset.userId = currentUser;

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
