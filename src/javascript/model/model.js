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

  async updateComplete(userId, itemId) {
    return await API.updateComplete(userId, itemId);
  }

  async create(value, userName) {
    // if (!value.length) {
    //   throw new Error(ERROR_MESSAGE.CONTENT_EMPTY);
    // }
    // this._setCurrentStorage(userName);
    // this._todos[userName].push(
    //   this._currentStorage.new({
    //     contents: value,
    //     completed: false,
    //   })
    // );
    // this._currentStorage.save(this._todos[userName]);
    // return this._todos[userName][this._todos[userName].length - 1];
  }

  async remove(todoId, userName) {
    // return this._update({
    //   todoId,
    //   userName,
    //   cmd: 'remove',
    // });
  }

  async updateStatus(todoId, userName) {
    // return this._update({
    //   todoId,
    //   userName,
    //   cmd: 'updateStatus',
    // });
  }

  async updateContent(todoId, content, userName) {
    // return this._update({
    //   todoId,
    //   userName,
    //   content,
    //   cmd: 'updateContent',
    // });
  }

  // getTodosOf(userName) {
  //   const a = this.data.find((user) => user.name === userName);
  //   console.log(a.todoList);
  //   return a.todoList;
  //   // return this._todos[userName].filter((todo) => !todo.removed);
  // }

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
