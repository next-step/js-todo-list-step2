import hermes from './index.js';

/**
 * @namespace TodoService at your service!
 */
class TodoService {
  static fetchAll = async userId => await hermes.get(userId + '/items/');

  static add = async (userId, payload) =>
    await hermes.post(userId + '/items/', payload);

  static updateOne = async (userId, itemId, payload) =>
    await hermes.put(userId + '/items/' + itemId, payload);

  static deleteAll = async userId => await hermes.delete(userId + '/items/');

  static deleteOne = async (userId, itemId) =>
    await hermes.delete(userId + '/items/' + itemId);

  static setPriority = async (userId, itemId, payload) =>
    await hermes.put(userId + '/items/' + itemId + '/priority', payload);

  static toggleOne = async (userId, itemId) =>
    await hermes.put(userId + '/items/' + itemId + '/toggle');
}

export default TodoService;
