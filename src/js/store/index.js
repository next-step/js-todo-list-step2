import {observable} from "../core/Observer";

const state = observable({
  userList: [],
  user: undefined
});

export const getters = Object.freeze({
  get userList () { return state.userList },
  get user () { return state.user },
  get userId () { return this.user._id },
  get userName () { return this.user.name },
  get userTodoList () { return this.user.todoList },
});

export const setter = Object.freeze({
  userList (userList) {
    state.userList = userList;
  },
  user (user) {
    state.user = user;
  },
  userTodoList (userTodoList) {
    state.user.todoList = userTodoList;
  }
});