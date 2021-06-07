import { combineReducers } from '../lib/Redux';
import { todoReducer } from './todos';
import { userReducer } from './user';

const rootReducer = combineReducers({ todo: todoReducer, user: userReducer });
export default rootReducer;
