import TodoInput from '../components/TodoInput.js';
import TodoList from '../components/TodoList.js';
import TodoFooter from '../components/TodoFooter.js';
import DOM from '../core/createElement.js';
import API from '../api/index.js';

export default class TodoContainer {
  constructor() {
    this.$todoSection = DOM.section({ class: 'todo-section' });

    this.todoInput = new TodoInput();
    this.todoList = new TodoList();
    this.todoFooter = new TodoFooter();

    this.render();
  }

  get $el() {
    return this.$todoSection;
  }

  setState({ todoList, currentFilter }) {
    this.$todoSection.innerHTML = '';
    this.todoList.setState({ todoList, currentFilter });
    this.todoFooter.setState({ todoCount: todoList.length, currentFilter });
    this.render();
  }

  render() {
    this.$todoSection.appendChild(this.todoInput.$el);
    this.$todoSection.appendChild(this.todoList.$el);
    this.$todoSection.appendChild(this.todoFooter.$el);
  }
}
