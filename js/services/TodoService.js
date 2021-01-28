import Hermes from "../lib/hermes/Hermes.js";

const TODO_SERVER_URI = "https://jsonplaceholder.typicode.com/todos";

const hermes = Hermes.create({
  baseURL: TODO_SERVER_URI,
  timeout: 3000
});

/**
 * @namespace TodoService at your service!
 */
class TodoService {
  static async read(url) {
    try {
      const { data } = await hermes.get(url);
      return data;
    } catch (error) {
      console.warn(error);
    }
  }
  static async add(url, payload) {
    return await hermes.post(url, payload);
  }
  static async update(url, payload) {
    return await hermes.patch(url, payload);
  }
  static async delete(url) {
    return await hermes.delete(url);
  }
}

export default TodoService;
