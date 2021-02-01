import Store from '../store/Store.js';
import api from '../api/api.js';

export const ADD_USER = 'ADD_USER';
export const GET_USERS = 'GET_USERS';

const userReducer = async (state, action) => {
  switch (action.type) {
    case ADD_USER:
      await api.addUser(action.payload);
      return api.getUsers();
    case GET_USERS:
      return api.getUsers();
    default:
      return state;
  }
};

const usersStore = Store.createAsyncStore([], userReducer);

export default usersStore;