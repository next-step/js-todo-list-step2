import { ERROR_MESSAGE, RENDER_COMMAND } from '../utils/constants.js';
import * as UTILS from '../utils/utils.js';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.setEventListeners();
  }

  async selectUser(userId) {
    location.href = '#';
    try {
      UTILS.setLoadingBar();
      const user = await this.model.getUser(userId);
      UTILS.deleteLoadingBar();
      this.view.render({
        cmd: RENDER_COMMAND.SWITCH_USER,
        params: user,
      });
      UTILS.setLastSelectedUser(userId);
    } catch (error) {
      this._refreshWith(error.message);
    }
  }

  async addUser(userName) {
    try {
      UTILS.setLoadingBar();
      const newUser = await this.model.createUser(userName);
      UTILS.deleteLoadingBar();
      this.view.render({
        cmd: RENDER_COMMAND.ADD_USER,
        params: newUser,
      });
    } catch (error) {
      this._refreshWith(error.message);
    }
  }

  async deleteUser(userId) {
    try {
      UTILS.setLoadingBar();
      await this.model.deleteUser(userId);
      UTILS.deleteLoadingBar();
      this.view.render({
        cmd: RENDER_COMMAND.DELETE_USER,
        params: userId,
      });
    } catch (error) {
      this._refreshWith(error.message);
    }
  }

  async add(contents) {
    if (!this.view.getCurrentUserId()) {
      alert(ERROR_MESSAGE.SELECT_USER_FIRST);
      return;
    }
    try {
      UTILS.setLoadingBar();
      const newTodo = await this.model.createItem(
        this.view.getCurrentUserId(),
        contents
      );
      UTILS.deleteLoadingBar();
      this.view.render({
        cmd: RENDER_COMMAND.ADD,
        params: newTodo,
      });
    } catch (error) {
      this._reloadUserWith(error.message);
    }
  }

  async remove(todoId) {
    try {
      UTILS.setLoadingBar();
      const user = await this.model.deleteItem(
        this.view.getCurrentUserId(),
        todoId
      );
      UTILS.deleteLoadingBar();
      this.view.render({
        cmd: RENDER_COMMAND.REMOVE,
        params: user,
      });
    } catch (error) {
      this._reloadUserWith(error.message);
    }
  }

  async toggleComplete(todoId) {
    try {
      UTILS.setLoadingBar();
      const updatedTodo = await this.model.updateComplete(
        this.view.getCurrentUserId(),
        todoId
      );
      UTILS.deleteLoadingBar();
      this.view.render({
        cmd: RENDER_COMMAND.TOGGLE,
        params: updatedTodo,
      });
    } catch (error) {
      this._reloadUserWith(error.message);
    }
  }

  async setPriority(todoId, priority) {
    try {
      UTILS.setLoadingBar();
      const updatedTodo = await this.model.updatePriority(
        this.view.getCurrentUserId(),
        todoId,
        priority
      );
      UTILS.deleteLoadingBar();
      this.view.render({
        cmd: RENDER_COMMAND.SET_PRIORITY,
        params: updatedTodo,
      });
    } catch (error) {
      this._reloadUserWith(error.message);
    }
  }

  edit(todo) {
    this.view.render({
      cmd: RENDER_COMMAND.EDIT_START,
      params: todo,
    });
  }

  async editApply(todoId, contents) {
    try {
      UTILS.setLoadingBar();
      const updatedTodo = await this.model.updateContents(
        this.view.getCurrentUserId(),
        todoId,
        contents
      );
      UTILS.deleteLoadingBar();
      this.view.render({
        cmd: RENDER_COMMAND.EDIT_APPLY,
        params: updatedTodo,
      });
    } catch (error) {
      this._reloadUserWith(error.message);
    }
  }

  editEnd(todo) {
    this.view.render({
      cmd: RENDER_COMMAND.EDIT_END,
      params: todo,
    });
  }

  showAll() {
    this.view.render({
      cmd: RENDER_COMMAND.SHOW_ALL,
    });
  }

  showActive() {
    this.view.render({
      cmd: RENDER_COMMAND.SHOW_ACTIVE,
    });
  }

  showCompleted() {
    this.view.render({
      cmd: RENDER_COMMAND.SHOW_COMPLETED,
    });
  }

  async deleteAllTodoOfUser() {
    if (!this.view.getCurrentUserId()) {
      alert(ERROR_MESSAGE.NO_USER_SELECTED);
      return;
    }
    try {
      UTILS.setLoadingBar();
      await this.model.deleteAllTodoOfUser(this.view.getCurrentUserId());
      this.view.render({
        cmd: RENDER_COMMAND.DELETE_ALL,
      });
      UTILS.deleteLoadingBar();
    } catch (error) {
      this._reloadUserWith(error.message);
    }
  }

  setEventListeners() {
    // NOTE: userListView
    this.view.setUserListViewEventListener({
      addUser: (userName) => this.addUser(userName),
      deleteUser: (userId) => this.deleteUser(userId),
      selectUser: (userId) => this.selectUser(userId),
    });
    // NOTE: inputView
    this.view.setInputViewEventListener({
      add: (contents) => this.add(contents),
    });
    // NOTE: todoListView
    this.view.setTodoListViewEventListener({
      edit: (todo) => this.edit(todo),
      editEnd: (todo) => this.editEnd(todo),
      editApply: (todoId, contents) => this.editApply(todoId, contents),
      setPriority: (todoId, priority) => this.setPriority(todoId, priority),
      destroy: (todoId) => this.remove(todoId),
      toggle: (todoId) => this.toggleComplete(todoId),
    });
    // NOTE: todoCountView
    this.view.setTodoCountViewEventListener({
      selectAll: () => this.showAll(),
      selectActive: () => this.showActive(),
      selectCompleted: () => this.showCompleted(),
      deleteAll: () => this.deleteAllTodoOfUser(),
    });
  }

  _reloadUserWith(message) {
    alert(message);
    UTILS.deleteLoadingBar();
    this.selectUser(UTILS.getLastSelectedUser());
  }

  _refreshWith(message) {
    alert(message);
    UTILS.setLastSelectedUser('');
    window.location.reload();
  }
}
