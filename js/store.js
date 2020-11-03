import API from './api/index.js';
import eventChannel from './core/eventChannel.js';
import { VIEW, STORE } from './actions/index.js';
import { parseHash } from './utils/index.js';
import { FILTER } from './constants/index.js';

const { done, when } = eventChannel;

export default class Store {
  #state;

  constructor() {
    when(VIEW.INIT, () => this.init());
    when(VIEW.ADD_USER, ({ name }) => this.addUser(name));
    when(VIEW.DELETE_USER, ({ id }) => this.deleteUser(id));
    when(VIEW.CHANGE_USER, ({ id }) => this.changeUser(id));
    when(VIEW.ADD_TODO, ({ contents }) => this.addTodo(contents));
  }

  get userId() {
    return this.#state.currentUser;
  }

  async init() {
    const users = await API.GET('/users');

    this.dispatch({
      type: VIEW.INIT,
      payload: {
        users,
        currentUser: users[0]?._id,
        todoList: users[0]?.todoList || [],
        currentFilter: parseHash(location.hash) || FILTER.ALL,
      },
    });
  }

  async addUser(name) {
    const user = await API.POST('/users', { name });
    const users = await API.GET('/users');

    this.dispatch({
      type: VIEW.ADD_USER,
      payload: {
        users,
        currentUser: user._id,
        todoList: user.todoList,
      },
    });
  }

  async deleteUser() {
    const response = await API.DELETE('/users/' + this.userId);
    const users = await API.GET('/users');

    this.dispatch({
      type: VIEW.DELETE_USER,
      payload: {
        users,
        currentUser: users[0]?._id,
        todoList: users[0]?.todoList || [],
      },
    });
  }

  async changeUser(id) {
    const todoList = await API.GET('/users/' + id + '/items');

    this.dispatch({
      type: VIEW.CHANGE_USER,
      payload: {
        currentUser: id,
        todoList,
      },
    });
  }

  async addTodo(contents) {
    const todoItem = await API.POST('/users/' + this.userId + '/items', {
      contents,
    });
    const todoList = await API.GET('/users/' + this.userId + '/items');

    this.dispatch({
      type: VIEW.ADD_TODO,
      payload: {
        todoList,
      },
    });
  }

  dispatch(action) {
    this.#state = this.reducer(this.#state, action);
    console.info(this.#state);
    done(STORE.UPDATE, this.#state);
  }

  reducer(state, action) {
    const { type, payload } = action;

    switch (type) {
      case VIEW.INIT:
        return payload;
      case VIEW.ADD_USER:
        return {
          ...state,
          ...payload,
        };
      case VIEW.DELETE_USER:
        return {
          ...state,
          ...payload,
        };
      case VIEW.CHANGE_USER:
        return {
          ...state,
          ...payload,
        };
      case VIEW.ADD_TODO:
        return {
          ...state,
          ...payload,
        };
      default:
        return state;
    }
  }
}
