const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com";

export const ApiService = {
  get(path) {
    return fetch(BASE_URL + path);
  },
};
