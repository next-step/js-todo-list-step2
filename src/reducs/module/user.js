import { createAction } from '../../lib/reducs';
import { TodoService, UserService } from '../../services';
import { User } from '../../types';
import { FETCH_TODOS } from './todo';

export const START_LOAD_USERS = 'START_LOAD_USERS';
export const LOAD_USERS = 'LOAD_USERS';
export const FAIL_LOAD_USERS = 'FAIL_LOAD_USERS';
export const START_LOAD_USER = 'START_LOAD_USER';
export const LOAD_USER = 'LOAD_USER';
export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const USER_ERROR = 'USER_ERROR';

const initialState = {
  isUsersLoading: false,
  user: null,
  users: [],
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOAD_USERS:
      return { ...state, isUsersLoading: true };
    case LOAD_USERS:
      return { ...state, isUsersLoading: false, users: action.payload };
    case FAIL_LOAD_USERS:
      return { ...state, isUsersLoading: false };
    case LOAD_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        user: action.payload,
        users: [action.payload, ...state.users],
      };
    case DELETE_USER:
      return {
        ...state,
        user: null,
        users: state.users?.filter(({ _id }) => _id !== action.payload),
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const fetchUsersAsync = () => async dispatch => {
  dispatch(createAction(START_LOAD_USER));
  try {
    const users = await UserService.fetchUsers();
    dispatch(createAction(LOAD_USERS, users));
  } catch (error) {
    dispatch(createAction(FAIL_LOAD_USERS, error));
  }
};

export const fetchUserAsync = id => async (dispatch, getState) => {
  try {
    const user = await UserService.fetchUser(id);
    const todoList = await TodoService.fetchAll(user._id);
    dispatch(createAction(LOAD_USER, user));
    dispatch(createAction(FETCH_TODOS, todoList));
  } catch (error) {
    dispatch(createAction(USER_ERROR, error));
  }
};

export const createUserAsync = name => async (dispatch, getState) => {
  try {
    const user = await UserService.add(new User({ name }));
    dispatch(createAction(ADD_USER, user));
  } catch (error) {
    dispatch(createAction(USER_ERROR, error));
  }
};

export const deleteUserAsync = id => (dispatch, getState) => {
  try {
    UserService.delete(id);
    dispatch(createAction(DELETE_USER, id));
  } catch (error) {
    dispatch(createAction(USER_ERROR, error));
  }
};

export default userReducer;
