import API from './api/index.js';
import eventChannel, { ACTION } from './core/eventChannel.js';
import { parseHash } from './utils/index.js';
import { FILTER } from './constants/index.js';

export default class Store {
  #state;

  constructor() {
    eventChannel.subscribe(ACTION.VIEW_INIT, () => this.init());
  }

  async init() {
    const users = await API.GET('/users');

    this.dispatch({
      type: ACTION.INIT,
      payload: {
        users,
        currentUser: users.length ? 0 : -1,
        todoList: users[0]?.todoList || [],
        currentFilter: parseHash(location.hash) || FILTER.ALL,
      },
    });
  }

  dispatch(action) {
    this.#state = this.reducer(this.#state, action);
    console.info(this.#state);
    this.publish(action);
  }

  publish(action) {
    eventChannel.publish(action.type, this.#state);
  }

  reducer(state, action) {
    switch (action.type) {
      case ACTION.INIT:
        return action.payload;
      default:
        return state;
    }
  }
}
