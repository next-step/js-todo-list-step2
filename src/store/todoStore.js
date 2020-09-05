import { Store } from '../core/Store.js';
import TodoService from "../services/TodoService.js";

const SET_TODO_ITEMS = 'SET_TODO_ITEMS';
const FETCH_ITEMS = 'FETCH_ITEMS';
const ADD_ITEM = 'ADD_ITEM';
const PUT_ITEM = 'PUT_ITEM';
const TOGGLE_ITEM = 'TOGGLE_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const REMOVE_ALL_ITEM = 'REMOVE_ALL_ITEM';

export const todoStore = new Store({
  state: {
    todoItems: [],
  },

  mutations: {
    [SET_TODO_ITEMS] (state, todoItems) {
      state.todoItems = todoItems;
    }
  },

  actions: {
    async [FETCH_ITEMS] ({ commit }, user) {
      commit(SET_TODO_ITEMS, await TodoService.fetchItems(user));
    },

    async [ADD_ITEM] ({ dispatch }, { user, items }) {
      await TodoService.addItem(user, items);
      return dispatch(FETCH_ITEMS, user);
    },

    async [PUT_ITEM] ({ dispatch }, { user, item }) {
      await TodoService.(user, items);
      return dispatch(FETCH_ITEMS, user);
    },

    async [REMOVE_ITEM] ({ dispatch }, { user, items }) {
      await TodoService.addItem(user, items);
      return dispatch(FETCH_ITEMS, user);
    }
  }
})