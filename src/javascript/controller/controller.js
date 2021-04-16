import { EVENT_NAME, RENDER_COMMAND } from '../utils/constants.js';
export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.setEventListeners();
  }

  add(value) {
    this.model
      .create(value, this.view.getCurrentUser())
      .then((todo) => {
        this.view.render({
          cmd: RENDER_COMMAND.ADD,
          params: todo,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  refreshPage() {
    const todos = this.model.getTodosOf(this.view.getCurrentUser());
    this.view.render({
      cmd: RENDER_COMMAND.REFRESH,
      todos: todos,
    });
  }

  remove(todoId) {
    this.model
      .remove(todoId, this.view.getCurrentUser())
      .then((todo) => {
        this.view.render({
          cmd: RENDER_COMMAND.REMOVE,
          params: todo,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
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
      alert('toggle update error');
    }
  }

  edit(todo) {
    this.view.render({
      cmd: RENDER_COMMAND.EDIT_START,
      params: todo,
    });
  }

  editApply(todoId, content) {
    this.model
      .updateContent(todoId, content, this.view.getCurrentUser())
      .then((todo) => {
        this.view.render({
          cmd: RENDER_COMMAND.EDIT_APPLY,
          params: todo,
        });
      })
      .catch((error) => {
        if (error instanceof Error) {
          alert(error);
        } else {
          this.view.render({
            cmd: RENDER_COMMAND.EDIT_END,
            params: error,
          });
        }
      });
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
    const user = await this.model.getUser(userId);
    this.view.render({
      cmd: RENDER_COMMAND.SWITCH_USER,
      params: user,
    });
  }

  async addUser(userName) {
    try {
      const newUser = await this.model.createUser(userName);
      this.view.render({
        cmd: RENDER_COMMAND.ADD_USER,
        params: newUser,
      });
    } catch (error) {
      alert('생성 실패');
    }
  }

  async deleteUser(userId) {
    // NOTE: 통신 확인해보니 delete를 날리면 무조건 성공으로 나온다.
    // NOTE: 그러니깐 굳이 여기서 model 작업에 await를 하지는 말자.
    if (!userId) {
      return;
    }
    this.model.deleteUser(userId);
    this.view.render({
      cmd: RENDER_COMMAND.DELETE_USER,
      params: userId,
    });
  }

  setEventListeners() {
    this.view.setEventListener(EVENT_NAME.ADD, (value) => {
      this.add(value);
    });
    this.view.setEventListener(EVENT_NAME.REFRESH, () => {
      this.refreshPage();
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
  }
}
