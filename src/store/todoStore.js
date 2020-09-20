import {Store} from '../core/Store.js';
import TodoService from "../services/TodoService.js";
import FilterTypes from '../constants/FilterTypes.js';
import LoadingTypes from "../constants/LoadingTypes.js";
import PriorityTypes from "../constants/PriorityTypes.js";

export const SET_TODO_ITEMS = 'SET_TODO_ITEMS';
export const SET_EDITING = 'SET_EDITING';
export const SET_FILTER_TYPE = 'SET_FILTER_TYPE';
export const SET_LOADING_TYPE = 'SET_LOADING_TYPE';
export const SET_ADD_LOADING_ITEM = 'SET_ADD_LOADING_ITEM';
export const SET_LOADING_ITEM = 'SET_LOADING_ITEM';
export const SET_LOADING_ALL = 'SET_LOADING_ALL';
export const SET_PRIORITY = 'SET_PRIORITY';

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
    loading: LoadingTypes.LOADED
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
      state.todoItems = [...state.todoItems, { isLoading: true }];
    },
    [SET_LOADING_ITEM] (state, id) {
      const todoItems = [ ...state.todoItems ];
      const index = todoItems.findIndex(item => item._id === id);
      todoItems[index] = { isLoading: true };
      state.todoItems = todoItems;
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
    [SET_PRIORITY] (state, index) {
      const todoItems = [ ...state.todoItems ];
      todoItems[index] = {
        ...todoItems[index],
        priority: PriorityTypes.NONE
      };
      state.todoItems = todoItems;
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
    async [FETCH_ITEMS] ({ commit }, userId) {
      const result = await TodoService.fetchItems(userId);
      try {
        if (result.message) throw `${result.message}: ${userId}`;
        const todoItems = result || [];
        commit(SET_TODO_ITEMS, todoItems);
      } catch (e) {
        commit(SET_TODO_ITEMS, []);
        console.error(e);
      }
    },

    async [ADD_ITEM] ({ dispatch, commit }, { userId, contents }) {
      commit(SET_ADD_LOADING_ITEM);
      await TodoService.addItem(userId, contents);
      return await dispatch(FETCH_ITEMS, userId);
    },

    async [PUT_ITEM] ({ dispatch, commit }, { userId, item }) {
      commit(SET_LOADING_ITEM, item._id);
      commit(SET_EDITING, -1);
      await TodoService.putItem(userId, item);
      return dispatch(FETCH_ITEMS, userId);
    },

    async [PUT_PRIORITY_ITEM] ({ dispatch, commit }, { userId, item }) {
      commit(SET_LOADING_ITEM, item._id);
      await TodoService.putPriorityItem(userId, item);
      return dispatch(FETCH_ITEMS, userId);
    },

    async [TOGGLE_ITEM] ({ dispatch, commit }, { userId, itemId }) {
      commit(SET_LOADING_ITEM, itemId);
      await TodoService.toggleItem(userId, itemId);
      return dispatch(FETCH_ITEMS, userId);
    },

    async [REMOVE_ITEM] ({ dispatch, commit }, { userId, itemId }) {
      commit(SET_LOADING_ITEM, itemId);
      await TodoService.removeItem(userId, itemId);
      return dispatch(FETCH_ITEMS, userId);
    },

    async [REMOVE_ALL_ITEM] ({ dispatch, commit }, userId) {
      commit(SET_LOADING_ALL);
      await TodoService.removeAllItem(userId);
      return dispatch(FETCH_ITEMS, userId);
    }
  }
})
