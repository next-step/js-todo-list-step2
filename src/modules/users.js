import Store from '../store/Store.js';
import api from '../api/api.js';

export const ADD_USER = 'ADD_USER';
export const GET_USERS = 'GET_USERS';
export const DELETE_USER = 'DELETE_USER';

const reducer = async (state, action) => {
  switch (action.type) {
    case ADD_USER:
      await api.addUser(action.payload);
      return api.getUsers();
    case GET_USERS:
      return api.getUsers();
    case DELETE_USER:
      await api.deleteUser(action.payload);
      return api.getUsers();
    default:
      return state;
  }
};

const initialState = [];

const usersStore = Store.createAsyncStore(initialState, reducer);

export default usersStore;
