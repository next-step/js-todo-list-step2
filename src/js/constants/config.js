const baseUrl = "https://js-todo-list-9ca3a.df.r.appspot.com";

const API_URL = {
  USERS: `${baseUrl}/api/users`,
  USER: (userId) => `${baseUrl}/api/users/${userId}`,
  ITEM: (userId) => `${baseUrl}/api/users/${userId}/items/`,
  USER_ITEM: (userId, itemId) => `${baseUrl}/api/users/${userId}/items/${itemId}`,
  ITEM_TOGGLE: (userId, itemId) => `${baseUrl}/api/users/${userId}/items/${itemId}/toggle`,
  ITEM_PRIORITY: (userId, itemId) => `${baseUrl}/api/users/${userId}/items/${itemId}/priority`,
};

const METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export { API_URL, METHOD };
