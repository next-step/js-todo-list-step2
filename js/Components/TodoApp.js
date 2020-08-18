import TodoInput from "./TodoInput.js";

function TodoApp($target, activeUser) {
  this.$target = $target;
  this.activeUser = activeUser;
  this.todoItems = [];

  this.render = () => {
    this.$target.innerHTML = `
        <section id="todo-input" class="input-container"></section>
        <section class="main">
        <ul id="todo-list" class="todo-list"></ul>
        </section>
        <div id="todo-count" class="count-container"></div>
    `;
  };

  this.render();

  this.todoInput = new TodoInput(document.querySelector("#todo-input"));
}

export default TodoApp;
