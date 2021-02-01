import Store from '../store/Store.js';
import api from '../api/api.js';

export const GET_USER = 'GET_USER';
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const GET_TODO = 'GET_TODO';
export const EDIT_TODO_CONTENTS = 'EDIT_TODO_CONTENTS';
export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE';
export const FILTER_ACTIVE = 'FILTER_ACTIVE';
export const FILTER_COMPLETE = 'FILTER_COMPLETE';
export const DELETE_ALL = 'DELETE_ALL';
export const EDIT_PRIORITY = 'EDIT_PRIORITY';

const reducer = async (state, action) => {
  switch (action.type) {
    case GET_USER:
      return api.getUser(action.payload);
    case ADD_TODO:
      await api.addTodo(action.payload);
      return {
        ...state,
        todoList: await api.getTodo(action.payload),
      };
    case DELETE_TODO:
      await api.deleteTodo(action.payload);
      return {
        ...state,
        todoList: await api.getTodo(action.payload),
      };
    case GET_TODO:
      return {
        ...state,
        todoList: await api.getTodo(action.payload),
      };
    case EDIT_TODO_CONTENTS:
      await api.editTodoContents(action.payload);
      return {
        ...state,
        todoList: await api.getTodo(action.payload),
      };
    case TOGGLE_COMPLETE:
      await api.toggleComplete(action.payload);
      return {
        ...state,
        todoList: await api.getTodo(action.payload),
      };
    case FILTER_ACTIVE:
      return {
        ...state,
        todoList: (await api.getTodo(action.payload)).filter((todo) => !todo.isCompleted),
      };
    case FILTER_COMPLETE:
      return {
        ...state,
        todoList: (await api.getTodo(action.payload)).filter((todo) => todo.isCompleted),
      };
    case DELETE_ALL:
      await api.deleteAll(action.payload);
      return {
        ...state,
        todoList: [],
      };
    case EDIT_PRIORITY:
      await api.editPriority(action.payload);
      return {
        ...state,
        todoList: await api.getTodo(action.payload),
      };
    default:
      return state;
  }
};

const initialState = {
  _id: null,
  name: null,
  todolist: [],
};

const selectedUserStore = Store.createAsyncStore(initialState, reducer);

export default selectedUserStore;
