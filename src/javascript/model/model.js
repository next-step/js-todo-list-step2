import * as API from '../utils/api.js';
export default class Model {
  constructor(data) {
    this.data = data;
  }

  async createUser(userName) {
    return await API.addUser(userName);
  }

  async deleteUser(userId) {
    return await API.deleteUser(userId);
  }

  async getUser(userId) {
    return await API.getUser(userId);
  }

  async deleteAllTodoOfUser(userId) {
    return await API.deleteAllTodoOfUser(userId);
  }

  updatePriority(userId, itemId, priority) {
    return API.updatePriority(userId, itemId, priority);
  }

  updateComplete(userId, itemId) {
    return API.updateComplete(userId, itemId);
  }

  updateContents(userId, itemId, contents) {
    if (contents.length < 2) {
      throw new Error('길이는 2글자 이산!');
    }
    return API.updateContents(userId, itemId, contents);
  }

  deleteItem(userId, itemId) {
    return API.deleteItem(userId, itemId);
  }

  createItem(userId, contents) {
    if (contents.length < 2) {
      throw new Error('길이는 2글자 이산!');
    }
    return API.createItem(userId, contents);
  }
}
