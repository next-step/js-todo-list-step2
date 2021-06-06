import { createStore } from './store.js';

export const ADD_TODO = 'ADD_TODO';

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    default:
      return state;
  }
};

const initialState = [];

const todoStore = createStore(initialState, reducer);

export default todoStore;
