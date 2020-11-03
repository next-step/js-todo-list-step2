import API from './api/index.js';
import eventChannel from './core/eventChannel.js';
import { ACTION } from './actions/index.js';
import { parseHash } from './utils/index.js';
import { FILTER } from './constants/index.js';

const { done, when } = eventChannel;

export default class Store {
  #state;

  constructor() {
    when(ACTION.VIEW_INIT, () => this.init());
    when(ACTION.ADD_USER, (props) => this.addUser(props));
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
    done(action.type, this.#state);
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
