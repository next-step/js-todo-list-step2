import {
  onTodoItemClickHandler,
  onTodoItemDoubleClickHandler,
  onTodoItemEditKeyDown,
} from '../actions/index.js';
import DOM from '../core/createElement.js';
import TodoItem from './TodoItem.js';

export default class TodoList {
  constructor() {
    this.$main = DOM.section({ class: 'main' });
    this.$todoList = DOM.ul({
      class: 'todo-list',
      onclick: onTodoItemClickHandler,
      ondblclick: onTodoItemDoubleClickHandler,
      onkeydown: onTodoItemEditKeyDown,
    });

    this.render();
  }

  get $el() {
    return this.$main;
  }

  setState({ todoList }) {
    this.$main.innerHTML = '';
    this.$todoList.innerHTML = '';
    this.render(todoList.map((todo) => new TodoItem(todo)));
  }

  render(todos = []) {
    todos.forEach((todo) => {
      this.$todoList.appendChild(todo.$el);
      this.$main.appendChild(this.$todoList);
    });
  }
}
