const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com";

export const ApiService = {
  get(path) {
    return fetch(BASE_URL + path).then((res) => res.json());
  },
  post(path, data) {
    return fetch(BASE_URL + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    }).then((res) => res.json());
  },
};
