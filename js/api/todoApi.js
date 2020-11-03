import Api from "../utils/api.js";

export const addTodo = (contents, userId) => {
  return new Api().post(`/users/${userId}/items/`).data({ contents }).build();
};
