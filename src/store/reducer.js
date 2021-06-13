import { GET_USERS, GET_USER, DELETE_USER } from './action.js';

const initialState = {
  users: [],
  selectedUser: {
    _id: '',
    name: '',
    todoList: [],
  },
  selectedAllTodos: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS:
      return {
        ...state,
        ...payload,
      };
    case GET_USER:
      return {
        ...state,
        selectedUser: state.userList.filter(
          (user) => user._id === payload.userId
        ),
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== payload.userId),
      };
  }
};

export default reducer;
