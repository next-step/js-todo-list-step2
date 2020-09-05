import { UserTitle } from "./components/UserTitle.js";
import { UserList } from "./components/UserList.js";
import { TodoInput } from "./components/TodoInput.js";
import { TodoList } from "./components/TodoList.js";
import { TodoFooter } from "./components/TodoFooter.js";
import { FETCH_USERS, userStore } from "./store/userStore.js";
import { FETCH_ITEMS, SET_LOADING, todoStore } from "./store/todoStore.js";
import LoadingTypes from "./constants/LoadingTypes.js";
import { ONE_FRAME } from "./constants/index.js";

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

    userStore.addObserve(userTitle, userList, todoList, todoFooter);
    todoStore.addObserve(todoList, todoFooter);

    this.load();
  }

  async load () {
    await Promise.all([
      userStore.dispatch(FETCH_USERS),
      todoStore.dispatch(FETCH_ITEMS, userStore.$getters.selectedUser.name),
      new Promise(resolve => setTimeout(resolve, ONE_FRAME)),
    ]);
    todoStore.commit(SET_LOADING, LoadingTypes.LOADED);
  }

}

new TodoApp({
  userTitleTarget: document.querySelector('#user-title'),
  userListTarget: document.querySelector('#user-list'),
  todoInputTarget: document.querySelector('.input-container'),
  todoListTarget: document.querySelector('.todo-list'),
  todoFooterTarget: document.querySelector('.count-container'),
})