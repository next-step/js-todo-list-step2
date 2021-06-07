const baseUrl = "https://js-todo-list-9ca3a.df.r.appspot.com";

const API_URL = {
  USERS: `${baseUrl}/api/users`,
  USER: (userId) => `${baseUrl}/api/users/${userId}`,
  ITEM: (userId) => `${baseUrl}/api/users/${userId}/items/`,
  USER_ITEM: (userId, itemId) => `${baseUrl}/api/users/${userId}/items/${itemId}`,
  ITEM_TOGGLE: (userId, itemId) => `${baseUrl}/api/users/${userId}/items/${itemId}/toggle`,
};

export { API_URL };
