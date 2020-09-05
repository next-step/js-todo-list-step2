import { Store } from '../core/Store.js';
import TodoService from "../services/TodoService.js";
import FilterTypes from '../constants/FilterTypes.js';
import LoadingTypes from "../constants/LoadingTypes.js";

export const SET_TODO_ITEMS = 'SET_TODO_ITEMS';
export const SET_EDITING = 'SET_EDITING';
export const SET_LOADING = 'SET_LOADING';
export const SET_ADD_LOADING_ITEM = 'SET_ADD_LOADING_ITEM';
export const FETCH_ITEMS = 'FETCH_ITEMS';
export const ADD_ITEM = 'ADD_ITEM';
export const PUT_ITEM = 'PUT_ITEM';
export const TOGGLE_ITEM = 'TOGGLE_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const REMOVE_ALL_ITEM = 'REMOVE_ALL_ITEM';

export const todoStore = new Store({
  state: {
    todoItems: [],
    editingIndex: -1,
    filterType: FilterTypes.ALL,
    loading: LoadingTypes.INIT
  },

  mutations: {
    [SET_TODO_ITEMS] (state, todoItems) {
      state.todoItems = todoItems;
    },
    [SET_EDITING] (state, editingIndex) {
      state.editingIndex = editingIndex;
    },
    [SET_ADD_LOADING_ITEM] (state) {
      state.todoItems = [ ...state.todoItems, { isLoading: true } ];
    },
    [SET_LOADING] (state, loading) {
      state.loading = loading;
    },
  },

  getters: {
    editingItem: ({ todoItems, editingIndex }) => todoItems[editingIndex],
  },

  actions: {
    async [FETCH_ITEMS] ({ commit }, user) {
      const result = await TodoService.fetchItems(user);
      console.log(result);
      try {
        if (result.message) throw `${result.message}: ${user}`;
        return commit(SET_TODO_ITEMS, result.todoList);
      } catch (e) {
        console.error(e);
      }
    },

    async [ADD_ITEM] ({ dispatch, commit }, { user, contents }) {
      commit(SET_ADD_LOADING_ITEM);
      await TodoService.addItem(user, contents);
      return dispatch(FETCH_ITEMS, user);
    },

    async [PUT_ITEM] ({ dispatch }, { user, item }) {
      await TodoService.putItem(user, item);
      return dispatch(FETCH_ITEMS, user);
    },

    async [TOGGLE_ITEM] ({ dispatch }, { user, id }) {
      await TodoService.toggleItem(user, id);
      return dispatch(FETCH_ITEMS, user);
    },

    async [REMOVE_ITEM] ({ dispatch }, { user, id }) {
      await TodoService.removeItem(user, id);
      return dispatch(FETCH_ITEMS, user);
    },

    async [REMOVE_ALL_ITEM] ({ dispatch }, user) {
      await TodoService.removeAllItem(user);
      return dispatch(FETCH_ITEMS, user);
    }
  }
})