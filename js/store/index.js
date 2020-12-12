import { actions, mutations } from './action.js';

import state from './state.js';
import Store from './store.js';

export default new Store({
  actions,
  mutations,
  state,
});
