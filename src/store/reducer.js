import { GET_USERS } from './action.js';
import { getUsers } from './dispatcher.js';

const initialState = {
  users: [],
};

const reducer = (state = initialState, { type: payload }) => {
  switch (type) {
    case GET_USERS:
      return {
        ...state,
        ...payload,
      };
  }
};

export default reducer;
