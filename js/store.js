import {
  init,
  addUser,
  deleteUser,
  changeUser,
  addTodo,
  deleteTodo,
  deleteAllTodos,
  toggleTodo,
  updateTodo,
  setPriority,
} from './api/apis.js';
import eventChannel from './core/eventChannel.js';
import { ACTIONS } from './constants/index.js';

const { done, when } = eventChannel;
const { VIEW, STORE } = ACTIONS;

export default class Store {
  #state;

  constructor() {
    [
      VIEW.INIT, 
      VIEW.ADD_USER, 
      VIEW.DELETE_USER
    ].forEach((action) => when(action, (data) => this.requestAll(data)));

    [
      VIEW.CHANGE_USER,
      VIEW.ADD_TODO,
      VIEW.DELETE_TODO,
      VIEW.DELETE_ALL_TODOS,
      VIEW.TOGGLE_TODO,
      VIEW.UPDATE_TODO,
      VIEW.SET_PRIORITY,
    ].forEach((action) => when(action, (data) => this.requestTodo(data)));

    when(VIEW.CHANGE_FILTER, (data) => this.changeFilter(data));
  }

  get userId() {
    return this.#state?.currentUser || -1;
  }

  async requestAll(data) {
    done(STORE.REQUEST_ALL);
    await this.fetch({ ...data, userId: this.userId });
  }

  async requestTodo(data) {
    done(STORE.REQUEST_TODO);
    await this.fetch({ ...data, userId: this.userId });
  }

  async fetch({ type, ...data }) {
    switch (type) {
      case VIEW.INIT:
        this.dispatch({ type, payload: await init() });
        return;
      case VIEW.ADD_USER:
        this.dispatch({ type, payload: await addUser(data) });
        return;
      case VIEW.DELETE_USER:
        this.dispatch({ type, payload: await deleteUser(data) });
        return;
      case VIEW.CHANGE_USER:
        this.dispatch({ type, payload: await changeUser(data) });
        return;
      case VIEW.ADD_TODO:
        this.dispatch({ type, payload: await addTodo(data) });
        return;
      case VIEW.DELETE_TODO:
        this.dispatch({ type, payload: await deleteTodo(data) });
        return;
      case VIEW.DELETE_ALL_TODOS:
        this.dispatch({ type, payload: await deleteAllTodos(data) });
        return;
      case VIEW.TOGGLE_TODO:
        this.dispatch({ type, payload: await toggleTodo(data) });
        return;
      case VIEW.UPDATE_TODO:
        this.dispatch({ type, payload: await updateTodo(data) });
        return;
      case VIEW.SET_PRIORITY:
        this.dispatch({ type, payload: await setPriority(data) });
        return;
      default:
        return;
    }
  }

  changeFilter({ currentFilter, type }) {
    this.dispatch({
      type,
      payload: { currentFilter },
    });
  }

  dispatch(action) {
    const { type, state } = this.reducer(this.#state, action);
    this.#state = state;
    console.info('current state', this.#state);
    done(type, this.#state);
  }

  reducer(state, action) {
    const { type, payload } = action;
    console.info('action', type);

    const { todoItem } = payload;

    switch (type) {
      case VIEW.ADD_TODO:
        return {
          type: STORE.UPDATE_TODO,
          state: {
            ...state,
            todoList: [...state.todoList, todoItem],
          },
        };
      case VIEW.DELETE_TODO:
        return {
          type: STORE.UPDATE_TODO,
          state: {
            ...state,
            ...payload,
          },
        };
      case VIEW.DELETE_ALL_TODOS:
        return {
          type: STORE.UPDATE_TODO,
          state: {
            ...state,
            todoList: [],
          },
        };
      case VIEW.TOGGLE_TODO:
      case VIEW.UPDATE_TODO:
      case VIEW.SET_PRIORITY:
        return {
          type: STORE.UPDATE_TODO,
          state: {
            ...state,
            todoList: state.todoList.map((todo) =>
              todo._id === todoItem._id ? todoItem : todo
            ),
          },
        };
      case VIEW.CHANGE_FILTER:
        return {
          type: STORE.UPDATE_TODO,
          state: {
            ...state,
            ...payload,
          },
        };
      case VIEW.INIT:
      case VIEW.ADD_USER:
      case VIEW.DELETE_USER:
      default:
        return {
          type: STORE.UPDATE_ALL,
          state: {
            ...state,
            ...payload,
          },
        };
    }
  }
}
