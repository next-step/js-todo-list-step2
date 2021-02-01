import Store from '../store/Store.js';
import api from '../api/api.js';

export const GET_USER = 'GET_USER';
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';

const reducer = async (state, action) => {
  switch (action.type) {
    case GET_USER:
      return api.getUser(action.payload);
    case ADD_TODO:
      const result = await api.addTodo(action.payload);
      return {
        ...state,
        todoList: [...state.todoList, result],
      };
    case DELETE_TODO:
      await api.deleteTodo(action.payload);
      return {
        ...state,
        todoList: state.todoList.filter((todo) => todo._id !== action.payload.itemId),
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
