const baseUrl = "https://js-todo-list-9ca3a.df.r.appspot.com";

const API_URL = {
  USERS: `${baseUrl}/api/users`,
  USER: (userId) => `${baseUrl}/api/users/${userId}`,
};

export { API_URL };
