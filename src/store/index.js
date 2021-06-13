import reducer from './reducer.js';
import { createStore, createAction } from './createStore.js';
export const store = createStore(reducer);
