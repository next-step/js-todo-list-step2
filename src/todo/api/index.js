import { requestFetch } from "../../shared/utils/repository.js";
import { BASE_URL, API_METHOD } from "../../shared/utils/constants.js";

class Api {
  static requestUser() {
    return requestFetch({
      baseUrl: BASE_URL,
      method: API_METHOD.GET,
      uri: "/api/users"
    });
  }

  static requestPersonalUser(_id) {
    return requestFetch({
      baseUrl: BASE_URL,
      method: API_METHOD.GET,
      uri: `/api/users/${_id}`
    });
  }

  static addUser(name) {
    return requestFetch({
      baseUrl: BASE_URL,
      method: API_METHOD.POST,
      uri: "/api/users",
      data: { name }
    });
  }

  static removeUser(id) {
    return requestFetch({
      baseUrl: BASE_URL,
      method: API_METHOD.DELETE,
      uri: `/api/users/${id}`
    });
  }

  static addTodo(_id, contents) {
    return requestFetch({
      baseUrl: BASE_URL,
      method: API_METHOD.POST,
      uri: `/api/users/${_id}/items/`,
      data: {
        contents
      }
    });
  }

  static toggleTodo(_id, itemId) {
    return requestFetch({
      baseUrl: BASE_URL,
      method: API_METHOD.PUT,
      uri: `/api/users/${_id}/items/${itemId}/toggle`
    });
  }

  static editContents(_id, itemId, contents) {
    return requestFetch({
      baseUrl: BASE_URL,
      method: API_METHOD.PUT,
      uri: `/api/users/${_id}/items/${itemId}`,
      data: { contents }
    });
  }

  static editPriority(_id, itemId, priority) {
    return requestFetch({
      baseUrl: BASE_URL,
      method: API_METHOD.PUT,
      uri: `/api/users/${_id}/items/${itemId}/priority`,
      data: { priority }
    });
  }

  static deleteTodo(_id, itemId) {
    return requestFetch({
      baseUrl: BASE_URL,
      method: API_METHOD.DELETE,
      uri: `/api/users/${_id}/items/${itemId}`
    });
  }

  static deleteAllTodos(_id) {
    return requestFetch({
      baseUrl: BASE_URL,
      method: API_METHOD.DELETE,
      uri: `/api/users/${_id}/items/`
    });
  }
}

export default Api;
