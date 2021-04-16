import { ERROR_MESSAGE } from '../utils/constants.js';
import { hasKey } from '../utils/utils.js';
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
