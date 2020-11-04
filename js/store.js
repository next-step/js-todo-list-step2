import API from './api/index.js';
import eventChannel from './core/eventChannel.js';
import { VIEW, STORE } from './actions.js';
import { parseHash } from './utils/index.js';
import { FILTER } from './constants/index.js';

const { done, when } = eventChannel;

export default class Store {
  #state;

  constructor() {
    when(VIEW.INIT, (data) => this.init(data));
    when(VIEW.ADD_USER, (data) => this.addUser(data));
    when(VIEW.DELETE_USER, (data) => this.deleteUser(data));
    when(VIEW.CHANGE_USER, (data) => this.changeUser(data));
    when(VIEW.ADD_TODO, (data) => this.addTodo(data));
    when(VIEW.DELETE_TODO, (data) => this.deleteTodo(data));
    when(VIEW.DELETE_ALL_TODOS, (data) => this.deleteAllTodos(data));
    when(VIEW.TOGGLE_TODO, (data) => this.toggleTodo(data));
    when(VIEW.UPDATE_TODO, (data) => this.updateTodo(data));
    when(VIEW.SET_PRIORITY, (data) => this.setPriority(data));
    when(VIEW.CHANGE_FILTER, (data) => this.changeFilter(currentFilter));
  }

  get userId() {
    return this.#state.currentUser;
  }

  async init({ type }) {
    done(STORE.REQUEST);
    const users = await API.GET('/users');

    this.dispatch({
      type,
      payload: {
        users,
        currentUser: users[0]?._id,
        todoList: users[0]?.todoList || [],
        currentFilter: parseHash(location.hash) || FILTER.ALL,
      },
    });
  }

  async addUser({ name, type }) {
    done(STORE.REQUEST);
    const user = await API.POST('/users', { name });
    const users = await API.GET('/users');

    this.dispatch({
      type,
      payload: {
        users,
        currentUser: user._id,
        todoList: user.todoList,
      },
    });
  }

  async deleteUser({ type }) {
    done(STORE.REQUEST);
    const response = await API.DELETE('/users/' + this.userId);
    const users = await API.GET('/users');

    this.dispatch({
      type,
      payload: {
        users,
        currentUser: users[0]?._id,
        todoList: users[0]?.todoList || [],
      },
    });
  }

  async changeUser({ id, type }) {
    done(STORE.REQUEST);
    const todoList = await API.GET('/users/' + id + '/items');

    this.dispatch({
      type,
      payload: {
        currentUser: id,
        todoList,
      },
    });
  }

  async addTodo({ contents, type }) {
    done(STORE.REQUEST);
    const todoItem = await API.POST('/users/' + this.userId + '/items', {
      contents,
    });

    this.dispatch({
      type,
      payload: { todoItem },
    });
  }

  async deleteTodo({ id, type }) {
    done(STORE.REQUEST);
    const { todoList } = await API.DELETE('/users/' + this.userId + '/items/' + id);

    this.dispatch({
      type,
      payload: { todoList },
    });
  }

  async deleteAllTodos({ type }) {
    done(STORE.REQUEST);
    const response = await API.DELETE('/users/' + this.userId + '/items');

    this.dispatch({
      type,
      payload: {},
    });
  }

  async toggleTodo({ id, type }) {
    done(STORE.REQUEST);
    const todoItem = await API.PUT('/users/' + this.userId + '/items/' + id + '/toggle');

    this.dispatch({
      type,
      payload: { todoItem },
    });
  }

  async updateTodo({ id, contents, type }) {
    done(STORE.REQUEST);
    const todoItem = await API.PUT('/users/' + this.userId + '/items/' + id, {
      contents,
    });

    this.dispatch({
      type,
      payload: { todoItem },
    });
  }

  async setPriority({ id, priority, type }) {
    done(STORE.REQUEST);
    const todoItem = await API.PUT(
      '/users/' + this.userId + '/items/' + id + '/priority',
      {
        priority,
      }
    );

    this.dispatch({
      type,
      payload: { todoItem },
    });
  }

  changeFilter({ currentFilter, type }) {
    this.dispatch({
      type,
      payload: { currentFilter },
    });
  }

  dispatch(action) {
    this.#state = this.reducer(this.#state, action);
    console.info('current state', this.#state);
    done(STORE.UPDATE, this.#state);
  }

  reducer(state, action) {
    const { type, payload } = action;
    console.info('action', type);

    const { todoItem } = payload;

    switch (type) {
      case VIEW.ADD_TODO:
        return {
          ...state,
          todoList: [...state.todoList, todoItem],
        };
      case VIEW.DELETE_ALL_TODOS:
        return {
          ...state,
          todoList: [],
        };
      case VIEW.TOGGLE_TODO:
      case VIEW.UPDATE_TODO:
      case VIEW.SET_PRIORITY:
        return {
          ...state,
          todoList: state.todoList.map((todo) =>
            todo._id === todoItem._id ? todoItem : todo
          ),
        };
      default:
        return {
          ...state,
          ...payload,
        };
    }
  }
}
