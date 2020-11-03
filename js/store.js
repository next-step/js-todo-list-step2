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
    when(VIEW.ADD_USER, (props) => this.addUser(props));
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

  async addUser({ name }) {
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
      default:
        return state;
    }
  }
}
