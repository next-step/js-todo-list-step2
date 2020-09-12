import { Store } from '../core/Store.js';
import TodoService from "../services/TodoService.js";

export const SET_USERS = 'SET_USERS';
export const SET_USER = 'SET_USER';
export const FETCH_USERS = 'FETCH_USERS';

export const userStore = new Store({
  state: {
    users: [],
    selectedIndex: 0,
  },

  getters: {
    selectedUser: ({ users, selectedIndex }) => users[selectedIndex],
  },

  mutations: {
    [SET_USERS] (state, users) {
      state.users = users;
    },
    [SET_USER] (state, selectedIndex) {
      state.selectedIndex = selectedIndex;
    },
  },

  actions: {
    async [FETCH_USERS] ({ commit }) {
      commit(SET_USERS, await TodoService.fetchUsers());
    },
  }
})