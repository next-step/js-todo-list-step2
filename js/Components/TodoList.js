import { todoItemHTML } from '../utils/template.js';

function TodoList({ $target, todoListState }) {
  this.init = () => {
    this.$target = $target;

    const { name, todos, selectedTab } = todoListState;
    this.name = name;
    this.todos = todos;
    this.selectedTab = selectedTab;

    this.bindEvents();
    this.render();
  };

  this.bindEvents = () => {};

  this.setState = (nextState) => {
    const { name, todos, selectedTab } = nextState;

    this.name = name;
    this.todos = todos;
    this.selectedTab = selectedTab;

    console.log(this.todos);

    this.render();
  };

  this.createTodoListHTML = (todos) => {
    return todos.reduce((html, todo) => {
      html += todoItemHTML(todo);
      return html;
    }, '');
  };

  this.render = () => {
    this.$target.innerHTML = this.createTodoListHTML(this.todos);
  };

  this.init();
}

export default TodoList;
