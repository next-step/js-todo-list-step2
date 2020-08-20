import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";

function TodoApp($target, activeUser) {
  this.$target = $target;
  this.activeUser = activeUser;
  this.state = {
    todoItems: [
      { _id: "1234", contents: "hello", isCompleted: false },
      { _id: "12345", contents: "world", isCompleted: true },
      { _id: "12346", contents: "js", isCompleted: false },
    ],
  };

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
    this.todoInput = new TodoInput({
      $target: document.querySelector("#todo-input"),
      addTodo: this.addTodo.bind(this),
    });
    this.todoList = new TodoList(
      document.querySelector("#todo-list"),
      this.state.todoItems
    );
  };

  this.addTodo = (textContents) => {
    const todo = {
      _id: Date.now().valueOf().toString(),
      contents: textContents,
      isCompleted: false,
    };
    this.state.todoItems = [...this.state.todoItems, todo];
    this.setState();
  };

  this.setState = () => {
    this.todoList.setState(this.state.todoItems);
  };

  this.render();
  this.initComponents();
}

export default TodoApp;
