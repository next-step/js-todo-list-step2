import { UserTitle } from "./components/UserTitle.js";
import { UserList } from "./components/UserList.js";
import { TodoInput } from "./components/TodoInput.js";
import { TodoList } from "./components/TodoList.js";
import { TodoFooter } from "./components/TodoFooter.js";

const TodoApp = class {

  constructor({
    userTitleTarget,
    userListTarget,
    todoInputTarget,
    todoListTarget,
    todoFooterTarget
  }) {
    new UserTitle(userTitleTarget);
    new UserList(userListTarget);
    new TodoInput(todoInputTarget);
    new TodoList(todoListTarget);
    new TodoFooter(todoFooterTarget);
  }

}

new TodoApp({
  userTitleTarget: document.querySelector('#user-title'),
  userListTarget: document.querySelector('#user-list'),
  todoInputTarget: document.querySelector('.input-container'),
  todoListTarget: document.querySelector('.todo-list'),
  todoFooterTarget: document.querySelector('.count-container'),
})