import { HTTP_METHOD } from "./utils/constant.js";

const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api/users';

const $api = (() => {
  const request = (uri, config) => fetch(BASE_URL + uri, config);
  
  const requestJsonData = (uri, config) => 
    fetch(BASE_URL + uri, config).then(data => data.json());

  const user = {
    getAll() {
      return requestJsonData('');
    },
    create(data) {
      return requestJsonData('',HTTP_METHOD.POST(data));
    },
    delete(userId) {
      return request(`/${userId}`, HTTP_METHOD.DELETE());
    },
  };

  const todo = {
    getAll(userId) {
      return requestJsonData(`/${userId}/items`);
    },
    create(userId, data) {
      return requestJsonData(`/${userId}/items`, HTTP_METHOD.POST(data));
    },
    removeAll(userId) {
      return request(`/${userId}/items`, HTTP_METHOD.DELETE());
    },
    remove(userId, todoId) {
      return request(`/${userId}/items/${todoId}`, HTTP_METHOD.DELETE());
    },
    update(userId, todoId, data) {
      return requestJsonData(
        `/${userId}/items/${todoId}`,
        HTTP_METHOD.PUT(data)
      );
    },
    priority(userId, todoId, data) {
      return requestJsonData(
        `/${userId}/items/${todoId}/priority`,
        HTTP_METHOD.PUT(data)
      );
    },
    toggle(userId, todoId) {
      return requestJsonData(
        `/${userId}/items/${todoId}/toggle`,
        HTTP_METHOD.PUT()
      );
    },
  }
  return {
    user,
    todo,
  };
})();

export default $api;