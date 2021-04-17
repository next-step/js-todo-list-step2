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
    const options = {
      switchUser: () => this._refresh(obj.params),
      addUser: () => this._addUser(obj.params),
      deleteUser: () => this._deleteUser(obj.params),
      add: () => this._add(obj.params),
      remove: () => this._refresh(obj.params),
      editStart: () => this._editMode(obj.params),
      editApply: () => this._update(obj.params),
      editEnd: () => this._editEnd(obj.params),
      toggle: () => this._update(obj.params),
      setPriority: () => this._update(obj.params),
      showAll: () => this._filterAll(),
      showActive: () => this._filterActive(),
      showCompleted: () => this._filterCompleted(),
      deleteAll: () => this._deleteAll(),
    };
    options[cmd]();
  }

  setUserListViewEventListener(callbacks) {
    this.userListView.setEvents(callbacks);
  }

  setInputViewEventListener(callbacks) {
    this.inputView.setEvents(callbacks);
  }

  setTodoListViewEventListener(callbacks) {
    this.todoListView.setEvents(callbacks);
  }

  setTodoCountViewEventListener(callbacks) {
    this.todoCountView.setEvents(callbacks);
  }

  getCurrentUserId() {
    return this.userListView.getCurrentUserId();
  }

  _add(todo) {
    this.todoListView.add(todo);
    this.inputView.clear();
    console.log(this.todoCountView.getCurrentFilter());
    if (this.todoCountView.getCurrentFilter() === 'completed') {
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
    } else if (currentFilter === 'completed' && !todo.isCompleted) {
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
    this.userListView.selectUser(user._id);
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

  _deleteAll() {
    this.todoListView.clear();
    this.todoCountView.init(0);
  }
}
