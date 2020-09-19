import {observable} from "../core/Observer.js";

const state = observable({
  userList: [],
  user: observable({
    _id: '12',
    name: 'gg',
    todoList: []
  }),
});

export const getters = Object.freeze({
  get userList () { return state.userList },
  get user () { return state.user },
  get userId () { return state.user._id },
  get userName () { return state.user.name },
  get userTodoList () { return state.user.todoList },
});

export const setter = Object.freeze({
  userList (userList) {
    state.userList = userList;
  },
  user (user) {
    state.user = user;
  },
  userName (userName) {
    state.user.name = userName;
  },
  userTodoList (userTodoList) {
    state.user.todoList = userTodoList;
  }
});