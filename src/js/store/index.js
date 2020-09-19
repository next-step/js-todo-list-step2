import {observable} from "../core/Observer";

const state = observable({
  userList: [],
  user: undefined
});

export const getters = Object.freeze({
  get userList () { return state.userList },
  get user() { return state.user },
  get userId() { return this.user._id },
  get userName() { return this.user.name },
  get userTodoList() { return this.user.todoList },
});

export const setter = Object.freeze({
  userList () {
    state.userList = [];
    observer.notify('userList');
  },
  user () {
    state.user = undefined;
    observer.notify('user');
  },
  userTodoList () {
    state.user.todoList = [];
    observer.notify('userTodoList');
  }
});

export const observer = {
  userList: [],
  user: [],
  userTodoList: [],

  addObserver(target, render) {
    this[target].push(render);
  },

  notify (target) {
    this[target].forEach(render => render());
  }
};
