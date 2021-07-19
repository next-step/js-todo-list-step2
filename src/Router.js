const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/';

const USERS = `${BASE_URL}api/users`;
const USER = (userId) => `${BASE_URL}api/users/${userId}`;
const ITEM = (userId) => `${BASE_URL}api/users/${userId}/items/`;
const USER_ITEM = (userId, itemId) =>
  `${BASE_URL}api/users/${userId}/items/${itemId}`;
const ITEM_PRIORITY = (userId, itemId) =>
  `${BASE_URL}api/users/${userId}/items/${itemId}/priority`;
const ITEM_TOGGLE = (userId, itemId) =>
  `${BASE_URL}api/users/${userId}/items/${itemId}/toggle`;

const Router = {
  USERS,
  USER,
  ITEM,
  USER_ITEM,
  ITEM_PRIORITY,
  ITEM_TOGGLE,
};

export default Router;
