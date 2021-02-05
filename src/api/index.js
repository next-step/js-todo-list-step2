import { HTTP_METHOD } from "./utils/constants.js";

const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com/api/";

const api = (() => {
  const request = (uri, config) =>
    fetch(BASE_URL + uri, config).catch(console.error);

  const requestWithJsonData = (uri, config) =>
    fetch(uri, config)
      .then((data) => data.json())
      .catch(console.error);

  const user = {
    getAll() {
      return requestWithJsonData(`users`);
    },
    create(data) {
      return requestWithJsonData(`users`, HTTP_METHOD.POST(data));
    },
    delete(id) {
      return request(`users/${id}`, HTTP_METHOD.DELETE());
    },
  };

  const todo = {
    getAll(userId) {
      return requestWithJsonData(`users/${userId}/items`);
    },
    create(userId, data) {
      return requestWithJsonData(
        `users/${userId}/items`,
        HTTP_METHOD.POST(data)
      );
    },
    delete(userId, todoId) {
      return requestWithJsonData(
        `users/${userId}/items/${todoId}`,
        HTTP_METHOD.DELETE()
      );
    },
    deleteAll(userId) {
      return requestWithJsonData(`users/${userId}/items`, HTTP_METHOD.DELETE());
    },
    toggle(userId, todoId) {
      return requestWithJsonData(
        `users/${userId}/items/${todoId}/toggle`,
        HTTP_METHOD.PUT()
      );
    },
    edit(userId, todoId, data) {
      return requestWithJsonData(
        `users/${userId}/items/${todoId}`,
        HTTP_METHOD.PUT(data)
      );
    },
    priority(userId, todoId, data) {
      return requestWithJsonData(
        `users/${userId}/items/${todoId}/priority`,
        HTTP_METHOD.PUT(data)
      );
    },
  };

  return {
    user,
    todo,
  };
})();

export default api;
