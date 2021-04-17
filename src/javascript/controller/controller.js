import {
  ERROR_MESSAGE,
  EVENT_NAME,
  RENDER_COMMAND,
} from '../utils/constants.js';

import * as UTILS from '../utils/utils.js';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.setEventListeners();
  }

  async selectUser(userId) {
    try {
      const user = await this.model.getUser(userId);
      this.view.render({
        cmd: RENDER_COMMAND.SWITCH_USER,
        params: user,
      });
      UTILS.setLastSelectedUser(userId);
    } catch (error) {
      alert(error.message);
      UTILS.refresh();
    }
  }

  async addUser(userName) {
    try {
      const newUser = await this.model.createUser(userName);
      this.view.render({
        cmd: RENDER_COMMAND.ADD_USER,
        params: newUser,
      });
    } catch (error) {
      alert(error.message);
      UTILS.refresh();
    }
  }

  async deleteUser(userId) {
    try {
      this.model.deleteUser(userId);
      this.view.render({
        cmd: RENDER_COMMAND.DELETE_USER,
        params: userId,
      });
    } catch (error) {
      alert(error.message);
      UTILS.refresh();
    }
  }

  async add(contents) {
    if (!this.view.getCurrentUserId()) {
      alert(ERROR_MESSAGE.SELECT_USER_FIRST);
      return;
    }
    try {
      const newTodo = await this.model.createItem(
        this.view.getCurrentUserId(),
        contents
      );
      this.view.render({
        cmd: RENDER_COMMAND.ADD,
        params: newTodo,
      });
    } catch (error) {
      alert(error.message);
      this.selectUser(UTILS.getLastSelectedUser());
    }
  }

  async remove(todoId) {
    try {
      const user = await this.model.deleteItem(
        this.view.getCurrentUserId(),
        todoId
      );
      this.view.render({
        cmd: RENDER_COMMAND.REMOVE,
        params: user,
      });
    } catch (error) {
      alert(error.message);
      this.selectUser(UTILS.getLastSelectedUser());
    }
  }

  async toggleComplete(todoId) {
    try {
      const updatedTodo = await this.model.updateComplete(
        this.view.getCurrentUserId(),
        todoId
      );
      this.view.render({
        cmd: RENDER_COMMAND.TOGGLE,
        params: updatedTodo,
      });
    } catch (error) {
      alert(error.message);
      this.selectUser(UTILS.getLastSelectedUser());
    }
  }

  async setPriority(todoId, priority) {
    try {
      const updatedTodo = await this.model.updatePriority(
        this.view.getCurrentUserId(),
        todoId,
        priority
      );
      this.view.render({
        cmd: RENDER_COMMAND.SET_PRIORITY,
        params: updatedTodo,
      });
    } catch (error) {
      alert(error.message);
      this.selectUser(UTILS.getLastSelectedUser());
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
      const updatedTodo = await this.model.updateContents(
        this.view.getCurrentUserId(),
        todoId,
        contents
      );
      this.view.render({
        cmd: RENDER_COMMAND.EDIT_APPLY,
        params: updatedTodo,
      });
    } catch (error) {
      alert(error.message);
      this.selectUser(UTILS.getLastSelectedUser());
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
      await this.model.deleteAllTodoOfUser(this.view.getCurrentUserId());
      this.view.render({
        cmd: RENDER_COMMAND.DELETE_ALL,
      });
    } catch (error) {
      alert(error.message);
      this.selectUser(UTILS.getLastSelectedUser());
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
}
