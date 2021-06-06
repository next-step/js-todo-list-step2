import { $, $$, addEvent, fetchApi } from "./utils/index.js";
import User from "./User.js";

export default function TodoApp() {
  this.users = [];
  this.activeUser = {};
  this.todoItems = [];
  const todoList = new TodoList();

  this.setState = (updatedItems) => {
    console.log({ updatedItems });
    todoList.setState(updatedItems);
  };

  this.fetchTodos = async (id) => {
    const todos = await fetchApi(`${id}/items/`);
    console.log({ todos });
    return todos;
  };

  this.hydrate = async () => {
    this.users = await fetchApi();
    const firstUserId = this.users?.[0]?._id;
    const fetchedTodos = await this.fetchTodos(firstUserId);

    this.activeUser = firstUserId;
    new User(this.activeUser, this.users);
    todoList.render(fetchedTodos);
    this.todoItems = fetchedTodos;
  };

  this.hydrate();

  new TodoInput({
    onAdd: (contents) => {
      const newTodoItem = new TodoItem(this.activeUser, contents);
      const newTodoList = [...this.todoItems, newTodoItem];
      this.todoItems = newTodoList;
      focusId = fetchApi(`${this.activeUser._id}/items`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ contents }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log({ newTodoList });
      this.setState(newTodoList);
    },
  });
}

function TodoItem(user, contents) {
  this._id = user._id;
  this.contents = contents;
  this.isCompleted = false;
  this.priority = "NONE";
}
// 입력 받는 컴포넌트
function TodoInput({ onAdd }) {
  const $todoInput = $(".new-todo");
  addEvent($todoInput, "keydown", (event) => this.addTodoItem(event));

  this.isValid = (e) => {
    if (e.key === "Enter") {
      return true;
    }
    return false;
  };

  this.addTodoItem = (event) => {
    const $newTodoTarget = event.target;
    if (this.isValid(event, $newTodoTarget.value)) {
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  };
}

// todoList 보여주는 컴포넌트
function TodoList(todoItems) {
  this.setState = (updatedTodoItems) => {
    this.render(updatedTodoItems);
  };

  const priorityClass = (priority) =>
    priority === "FIRST"
      ? "primary"
      : priority === "SECOND"
      ? "secondary"
      : "select";
  const priorityValue = (priority) =>
    priority === "FIRST" ? "1순위" : "2순위";

  const renderPriority = (priority) =>
    priority === "NONE"
      ? `<select class="chip select">
          <option value="0" selected>순위</option>
          <option value="1">1순위</option>
          <option value="2">2순위</option>
        </select>`
      : `<span class="chip ${priorityClass(priority)}">${priorityValue(
          priority
        )}</span>`;

  const todoItemTemplate = ({ contents, priority, isCompleted }) => `
    <li>
      <div class="view">
        <input class="toggle" type="checkbox" ${isCompleted && "checked"}/>
        <label class="label">
          ${renderPriority(priority)}
          ${contents}
        </label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="완료된 타이틀" />
    </li>`;

  this.render = (items) => {
    const template = items.map(todoItemTemplate);
    this.$todoList = $(".todo-list");
    this.$todoList.innerHTML = template.join("");
  };
}
