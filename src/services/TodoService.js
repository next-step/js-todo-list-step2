import { typeChecks } from 'utils';
import errorHandler from './errorHandler';
import hermes from './index';

/**
 * @namespace TodoService at your service!
 */
const TodoService = {
  async fetchAll(userId) {
    return await errorHandler(hermes.get, getTodoUrl(userId));
  },

  async add(userId, payload) {
    return await errorHandler(hermes.post, getTodoUrl(userId), payload);
  },

  async updateOne(userId, itemId, payload) {
    return await errorHandler(hermes.put, getTodoUrl(userId, itemId), payload);
  },

  async deleteAll(userId) {
    return await errorHandler(hermes.delete, getTodoUrl(userId));
  },

  async deleteOne(userId, itemId) {
    return await errorHandler(hermes.delete, getTodoUrl(userId, itemId));
  },

  async setPriority(userId, itemId, payload) {
    return await errorHandler(
      hermes.put,
      getTodoUrl(userId, itemId) + '/priority',
      payload
    );
  },

  async toggleOne(userId, itemId) {
    return await errorHandler(
      hermes.put,
      getTodoUrl(userId, itemId) + '/toggle'
    );
  },
};

function getTodoUrl(userId, itemId) {
  itemId = itemId ? itemId : '';
  if (!typeChecks.isString(userId) && !typeChecks.isString(itemId))
    throw new Error('invalid query string');
  return userId + '/items/' + itemId;
}

export default TodoService;
