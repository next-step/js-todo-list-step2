/* 
  NOTE: 현재는 currentUser 를 default로 바로 등록하고 있지만,
        이후에는 DOM 요소로 user를 선택할 수 있게 수정해야한다.
*/
import TodoListView from './todoListView.js';
import InputView from './inputView.js';
import TodoCountView from './todoCountView.js';
import UserListView from './userListView.js';

export default class View {
  constructor(user) {
    this.todoListView = new TodoListView();
    this.inputView = new InputView();
    this.todoCountView = new TodoCountView();
    this.userListView = new UserListView(user);
  }

  render(obj) {
    const cmd = obj.cmd;
    if (!cmd) {
      return;
    }
    // TODO: obj.params 를 전부 params 로 수정히자
    const options = {
      add: () => this._add(obj.params),
      editStart: () => this._editMode(obj.params),
      editApply: () => this._update(obj.params),
      editEnd: () => this._editEnd(obj.params),
      remove: () => this._refresh(obj.params),
      toggle: () => this._update(obj.params),
      refresh: () => this._addAll(obj.params),
      showAll: () => this._filterAll(),
      showActive: () => this._filterActive(),
      showCompleted: () => this._filterCompleted(),
      switchUser: () => this._refresh(obj.params),
      addUser: () => this._addUser(obj.params),
      deleteUser: () => this._deleteUser(obj.params),
    };
    options[cmd]();
  }

  setEventListener(eventName, callback) {
    const options = {
      // NOTE: callback == Controller.add
      add: () => this.inputView.setAddEvent(callback),
      // NOTE: callback == Controller.destroy
      destroy: () => this.todoListView.setRemoveEvent(callback),
      // NOTE: callback == Controller.toggleCheckBox
      toggle: () => this.todoListView.setToggleEvent(callback),
      // NOTE: callback == Controller.edit
      edit: () => this.todoListView.setEditStartEvent(callback),
      // NOTE: callback == Controller._editEnd
      editEnd: () => this.todoListView.setEditEndEvent(callback),
      // NOTE: callback == Controller.editApply
      editApply: () => this.todoListView.setEditApplyEvent(callback),
      // NOTE: callback == Controller.showAll
      selectAll: () => this.todoCountView.setSelectAllEvent(callback),
      // NOTE: callback == Controller.showActive
      selectActive: () => this.todoCountView.setSelectActiveEvent(callback),
      // NOTE: callback == Controller.showCompleted
      selectCompleted: () =>
        this.todoCountView.setSelectCompletedEvent(callback),
      // NOTE: callback == Controller.switchUser
      selectUser: () => this.userListView.setSelectUser(callback),
      // NOTE: callback == Controller.addUser
      addUser: () => this.userListView.setAddUser(callback),
      // NOTE: callback == COntroller.deleteUser
      deleteUser: () => this.userListView.setDeleteUser(callback),
    };
    options[eventName]();
  }

  getCurrentUserId() {
    return this.userListView.getCurrentUserId();
  }

  _add(todo) {
    // console.log(todo);
    this.todoListView.add(todo);
    this.inputView.clear();
    if (this.todoCountView.getCurrentFilter() === 'isCompleted') {
      this.todoListView.hide(todo);
    } else {
      this.todoCountView.setTodoCount(
        this.todoCountView.getInnerTextCount() + 1
      );
    }
    this.todoCountView.increaseTodoCount();
  }

  _addAll(todos) {
    todos.map((todo) => {
      this._add(todo);
    });
  }

  _remove(todo) {
    this.todoListView.remove(todo);
    this.todoCountView.decreaseTodoCount();
    this.todoCountView.setTodoCount(this.todoCountView.getInnerTextCount() - 1);
  }

  _update(todo) {
    this.todoListView.update(todo);
    const currentFilter = this.todoCountView.getCurrentFilter();

    if (currentFilter === 'all') {
      return;
    } else if (currentFilter === 'active' && todo.isCompleted) {
      this.todoListView.hide(todo);
      this.todoCountView.setTodoCount(
        this.todoCountView.getInnerTextCount() - 1
      );
    } else if (currentFilter === 'completed' && !todo.isCompletd) {
      this.todoListView.hide(todo);
      this.todoCountView.setTodoCount(
        this.todoCountView.getInnerTextCount() - 1
      );
    }
  }

  _filterAll() {
    const count = this.todoListView.filterAll();
    this.todoCountView.setTodoCount(count);
  }

  _filterActive() {
    const count = this.todoListView.filterActive();
    this.todoCountView.setTodoCount(count);
  }

  _filterCompleted() {
    const count = this.todoListView.filterCompleted();
    this.todoCountView.setTodoCount(count);
  }

  _editMode(todo) {
    this.todoListView.editStart(todo);
  }

  _editEnd(todo) {
    this.todoListView.editEnd(todo);
  }

  _clearInput() {
    this.InputView.clear();
  }

  _refresh(user) {
    this.userListView.setActive(user._id);
    this.todoListView.addAll(user.todoList);
    this.todoCountView.init(user.todoList.length);
  }

  _addUser(data) {
    this.userListView.addUser(data);
  }

  _deleteUser(userId) {
    this.userListView.deleteUser(userId);
    this.todoListView.clear();
    this.todoCountView.init(0);
  }
}
