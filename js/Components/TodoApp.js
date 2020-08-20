import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";

function TodoApp($target, activeUser) {
  this.$target = $target;
  this.activeUser = activeUser;
  this.todoItems = [
    { _id: "1234", contents: "hello", isCompleted: false },
    { _id: "12345", contents: "world", isCompleted: true },
    { _id: "12346", contents: "js", isCompleted: false },
  ];

  this.render = () => {
    this.$target.innerHTML = `
        <section id="todo-input" class="input-container"></section>
        <section class="main">
        <ul id="todo-list" class="todo-list"></ul>
        </section>
        <div id="todo-count" class="count-container"></div>
    `;
  };

  this.initComponents = () => {
    this.todoInput = new TodoInput(document.querySelector("#todo-input"));
    this.todoList = new TodoList(
      document.querySelector("#todo-list"),
      this.todoItems
    );
  };

  this.render();
  this.initComponents();
}

export default TodoApp;
