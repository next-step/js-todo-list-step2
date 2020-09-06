import { Store } from '../core/Store.js';
import TodoService from "../services/TodoService.js";
import FilterTypes from '../constants/FilterTypes.js';
import LoadingTypes from "../constants/LoadingTypes.js";

export const SET_TODO_ITEMS = 'SET_TODO_ITEMS';
export const SET_EDITING = 'SET_EDITING';
export const SET_FILTER_TYPE = 'SET_FILTER_TYPE';
export const SET_LOADING_TYPE = 'SET_LOADING_TYPE';
export const SET_ADD_LOADING_ITEM = 'SET_ADD_LOADING_ITEM';
export const SET_LOADING_ITEM = 'SET_LOADING_ITEM';
export const SET_LOADING_ALL = 'SET_LOADING_ALL';
export const FETCH_ITEMS = 'FETCH_ITEMS';
export const ADD_ITEM = 'ADD_ITEM';
export const PUT_ITEM = 'PUT_ITEM';
export const PUT_PRIORITY_ITEM = 'PUT_PRIORITY_ITEM';
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
    [SET_FILTER_TYPE] (state, filterType) {
      state.filterType = filterType;
    },
    [SET_ADD_LOADING_ITEM] (state) {
      state.todoItems.push({ isLoading: true });
    },
    [SET_LOADING_ITEM] (state, id) {
      const index = state.todoItems.findIndex(item => item._id === id);
      state.todoItems[index] = { isLoading: true };
    },
    [SET_LOADING_ALL] (state) {
      state.todoItems = state.todoItems.map(item => ({
        ...item,
        isLoading: true
      }));
    },
    [SET_LOADING_TYPE] (state, loading) {
      state.loading = loading;
    },
  },

  getters: {
    editingItem: ({ todoItems, editingIndex }) => todoItems[editingIndex],
    filteredItems: ({ todoItems, filterType }) =>
      Object.entries(todoItems)
            .filter(([ , { isCompleted } ]) => (filterType === FilterTypes.ALL) ||
                                               (isCompleted && filterType === FilterTypes.COMPLETED) ||
                                               (!isCompleted && filterType === FilterTypes.ACTIVE))
  },

  actions: {
    async [FETCH_ITEMS] ({ commit }, user) {
      const result = await TodoService.fetchItems(user);
      try {
        if (result.message) throw `${result.message}: ${user}`;
        const todoItems = result.todoList || [];
        return commit(SET_TODO_ITEMS, todoItems);
      } catch (e) {
        console.error(e);
      }
    },

    async [ADD_ITEM] ({ dispatch, commit }, { user, contents }) {
      commit(SET_ADD_LOADING_ITEM);
      await TodoService.addItem(user, contents);
      return await dispatch(FETCH_ITEMS, user);
    },

    async [PUT_ITEM] ({ dispatch, commit }, { user, item }) {
      commit(SET_LOADING_ITEM, item._id);
      commit(SET_EDITING, -1);
      await TodoService.putItem(user, item);
      return dispatch(FETCH_ITEMS, user);
    },

    async [PUT_PRIORITY_ITEM] ({ dispatch, commit }, { user, item }) {
      console.log(item);
      commit(SET_LOADING_ITEM, item._id);
      await TodoService.putPriorityItem(user, item);
      return dispatch(FETCH_ITEMS, user);
    },

    async [TOGGLE_ITEM] ({ dispatch, commit }, { user, id }) {
      commit(SET_LOADING_ITEM, id);
      await TodoService.toggleItem(user, id);
      return dispatch(FETCH_ITEMS, user);
    },

    async [REMOVE_ITEM] ({ dispatch, commit }, { user, id }) {
      commit(SET_LOADING_ITEM, id);
      await TodoService.removeItem(user, id);
      return dispatch(FETCH_ITEMS, user);
    },

    async [REMOVE_ALL_ITEM] ({ dispatch, commit }, user) {
      commit(SET_LOADING_ALL);
      await TodoService.removeAllItem(user);
      return dispatch(FETCH_ITEMS, user);
    }
  }
})