import { GET_USERS, DELETE_USER, GET_USER } from './action.js';

export const getUserList = (userList) => {
  return {
    type: GET_USERS,
    payload: {
      userList,
    },
  };
};

export const getUserItem = (userId) => {
  return {
    type: GET_USER,
    payload: {
      userId,
    },
  };
};
export const deleteUser = (userId) => {
  return {
    type: DELETE_USER,
    payload: {
      userId,
    },
  };
};
