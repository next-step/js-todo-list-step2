import { UserTitle } from "./components/UserTitle.js";
import { UserList } from "./components/UserList.js";
import { TodoInput } from "./components/TodoInput.js";
import { TodoList } from "./components/TodoList.js";
import { TodoFooter } from "./components/TodoFooter.js";
import { FETCH_USERS, userStore } from "./store/userStore.js";
import {FETCH_ITEMS, todoStore} from "./store/todoStore.js";

const TodoApp = class {

  constructor({
    userTitleTarget,
    userListTarget,
    todoInputTarget,
    todoListTarget,
    todoFooterTarget
  }) {
    const userTitle = new UserTitle(userTitleTarget);
    const userList = new UserList(userListTarget);
    const todoInput = new TodoInput(todoInputTarget);
    const todoList = new TodoList(todoListTarget);
    const todoFooter = new TodoFooter(todoFooterTarget);

    userStore.addObserve(userTitle, userList);
    todoStore.addObserve(todoInput, todoList, todoFooter);

    userStore.dispatch(FETCH_USERS);
  }

}

new TodoApp({
  userTitleTarget: document.querySelector('#user-title'),
  userListTarget: document.querySelector('#user-list'),
  todoInputTarget: document.querySelector('.input-container'),
  todoListTarget: document.querySelector('.todo-list'),
  todoFooterTarget: document.querySelector('.count-container'),
})