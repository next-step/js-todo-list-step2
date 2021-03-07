const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com";

export const api = {
  get(path) {
    return request(path);
  },
  post(path, data) {
    return request(path, METHOD.POST(data));
  },
  delete(path) {
    return request(path, METHOD.DELETE());
  },
};

const request = (path, config) =>
  fetch(BASE_URL + path, config).then((res) => res.json());

const METHOD = {
  POST(data) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    };
  },
  DELETE() {
    return {
      method: "DELETE",
    };
  },
};
