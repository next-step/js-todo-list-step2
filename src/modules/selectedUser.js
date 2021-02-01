import Store from '../store/Store.js';
import api from '../api/api.js';

export const GET_USER = 'GET_USER';

const reducer = async (state, action) => {
  switch (action.type) {
    case GET_USER:
      return api.getUser(action.payload);
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
