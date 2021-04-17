import * as API from '../utils/api.js';
import { ERROR_MESSAGE } from '../utils/constants.js';
export default class Model {
  constructor() {}

  createUser(userName) {
    return API.addUser(userName);
  }

  deleteUser(userId) {
    return API.deleteUser(userId);
  }

  getUser(userId) {
    return API.getUser(userId);
  }

  deleteAllTodoOfUser(userId) {
    return API.deleteAllTodoOfUser(userId);
  }

  updatePriority(userId, itemId, priority) {
    return API.updatePriority(userId, itemId, priority);
  }

  updateComplete(userId, itemId) {
    return API.updateComplete(userId, itemId);
  }

  updateContents(userId, itemId, contents) {
    if (!this._checkValidOfLength(contents)) {
      throw new Error(ERROR_MESSAGE.TODO_LENGTH);
    }
    return API.updateContents(userId, itemId, contents);
  }

  deleteItem(userId, itemId) {
    return API.deleteItem(userId, itemId);
  }

  createItem(userId, contents) {
    if (!this._checkValidOfLength(contents)) {
      throw new Error(ERROR_MESSAGE.TODO_LENGTH);
    }
    return API.createItem(userId, contents);
  }

  _checkValidOfLength(contents) {
    return contents.length >= 2;
  }
}
