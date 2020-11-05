import { requestFetch } from "../../shared/utils/repository.js";
import { BASE_URL } from "../../shared/utils/constants.js";

class Api {
  static requestUser() {
    return requestFetch({
      url: BASE_URL,
      method: "GET",
      uri: "/api/users"
    });
  }

  static requestPersonalUser(_id) {
    return requestFetch({
      url: BASE_URL,
      method: "GET",
      uri: `/api/users/${_id}`
    });
  }

  static addUser(name) {
    return requestFetch({
      url: BASE_URL,
      method: "POST",
      uri: "/api/users",
      data: { name }
    });
  }

  static removeUser(id) {
    return requestFetch({
      url: BASE_URL,
      method: "DELETE",
      uri: `/api/users/${id}`
    });
  }

  static toggleTodo(_id, itemId) {
    return requestFetch({
      url: BASE_URL,
      method: "PUT",
      uri: `/api/users/${_id}/items/${itemId}/toggle`
    });
  }

  static deleteTodo(_id, itemId) {
    return requestFetch({
      url: BASE_URL,
      method: "DELETE",
      uri: `/api/users/${_id}/items/${itemId}`
    });
  }
}

export default Api;
