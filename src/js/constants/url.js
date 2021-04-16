const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com";

export const API = {
  GET_USERS: BASE_URL + "/api/users",
  GET_USER: (_id) => BASE_URL + `/api/users/${_id}`,
  CREATE_USER: BASE_URL + "/api/users",
  DELETE_USER: (_id) => BASE_URL + `/api/users/${_id}`,
  ADD_TODO_ITEM: (_id) => BASE_URL + `/api/users/${_id}/items`,
  TOGGLE_TODO_ITEM: (_id) => BASE_URL + `/api/users/:userId/items/${_id}/toggle`,
};
