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

  async add(contents) {
    if (!this.view.getCurrentUserId()) {
      alert('유저를 먼저 선택해주세요 :)');
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
      console.log('after view');
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
      console.log(UTILS.getLastSelectedUser());
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
      // TODO: 아무것도 선택하지 않은 상태로 돌아가기
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
      // TODO: 아무것도 선택하지 않은 상태로 돌아가기
      alert(error.message);
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
      // TODO: 아무것도 선택하지 않은 상태로 돌아가기
    }
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
    this.view.setEventListener(EVENT_NAME.ADD, (value) => {
      this.add(value);
    });
    this.view.setEventListener(EVENT_NAME.DESTROY, (todoId) => {
      this.remove(todoId);
    });
    this.view.setEventListener(EVENT_NAME.TOGGLE, (todoId) => {
      this.toggleComplete(todoId);
    });
    this.view.setEventListener(EVENT_NAME.SELECT_ALL, () => {
      this.showAll();
    });
    this.view.setEventListener(EVENT_NAME.SELECT_ACTIVE, () => {
      this.showActive();
    });
    this.view.setEventListener(EVENT_NAME.SELECT_COMPLETED, () => {
      this.showCompleted();
    });
    this.view.setEventListener(EVENT_NAME.EDIT, (todo) => {
      this.edit(todo);
    });
    this.view.setEventListener(EVENT_NAME.EDIT_END, (todo) => {
      this.editEnd(todo);
    });
    this.view.setEventListener(EVENT_NAME.EDIT_APPLY, (todoId, content) => {
      this.editApply(todoId, content);
    });
    this.view.setEventListener(EVENT_NAME.SELECT_USER, (data) => {
      this.selectUser(data);
    });
    this.view.setEventListener(EVENT_NAME.ADD_USER, (data) => {
      this.addUser(data);
    });
    this.view.setEventListener(EVENT_NAME.DELETE_USER, (userId) => {
      this.deleteUser(userId);
    });
    this.view.setEventListener(EVENT_NAME.SET_PRIORITY, (todoId, priority) => {
      this.setPriority(todoId, priority);
    });
    this.view.setEventListener(EVENT_NAME.DELETE_ALL, (userId) => {
      this.deleteAllTodoOfUser(userId);
    });
  }
}
