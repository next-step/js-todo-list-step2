const baseUrl = "https://js-todo-list-9ca3a.df.r.appspot.com";

const API_URL = {
  USERS: `${baseUrl}/api/users`,
  USER: (userId) => `${baseUrl}/api/users/${userId}`,
  ITEM: (userId) => `${baseUrl}/api/users/${userId}/items/`,
};

export { API_URL };
