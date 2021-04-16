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

  deleteItem(userId, itemId) {
    return API.deleteItem(userId, itemId);
  }

  createItem(userId, contents) {
    if (contents.length < 2) {
      throw new Error('길이는 2글자 이산!');
    }
    return API.createItem(userId, contents);
  }

  async updateContent(todoId, content, userName) {
    // return this._update({
    //   todoId,
    //   userName,
    //   content,
    //   cmd: 'updateContent',
    // });
  }

  _findTodoById(id, userName) {
    return this._todos[userName].find((todo) => todo.id === id);
  }

  _update(params) {
    const targetTodo = this._findTodoById(params.todoId, params.userName);
    if (!targetTodo) {
      throw new Error(ERROR_MESSAGE.UNEXPECTED);
    }
    if (hasKey(params, 'content') && !params.content) {
      throw targetTodo;
    }
    const obj = {
      remove: () => (targetTodo.removed = true),
      updateStatus: () => (targetTodo.completed = !targetTodo.completed),
      updateContent: () => (targetTodo.content = params.content),
    };
    obj[params.cmd]();
    this._setCurrentStorage(params.userName);
    this._currentStorage.save(this._todos[params.userName]);
    return targetTodo;
  }
}
