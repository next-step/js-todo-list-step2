import {
  addTodoItemData,
  addUserData,
  deleteUserData,
  getTodoListData,
  getUserData,
  getUsersData,
  removeTodoItemData,
  toggleTodoItemData,
  updateTodoItemData,
} from '../api.js';
import { ACTIVE, ALL, COMPLETED } from '../constants.js';
import TodoCount from './TodoCount.js';
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import UserList from './UserList.js';
import Username from './Username.js';

export default class TodoApp {
  constructor() {
    this.users = [];
    this.activeUser = { _id: '', name: '', todoList: [] };
    this.filterStatus = ALL;

    this.username = new Username();

    this.userList = new UserList({
      onSelect: async (userId) => {
        const selectedUser = await getUserData(userId);
        if (selectedUser.message) {
          this.init();
          return;
        }

        this.activeUser = selectedUser;
        this.renderAll();
      },
      onAdd: async () => {
        const name = prompt('추가하고 싶은 이름을 입력해주세요.');
        if (name.length < 2) {
          window.alert('2글자 이상이어야 합니다.');
          return;
        }

        const newUser = await addUserData({ name });
        await this.loadUsers();
        this.activeUser = this.users.find(({ _id }) => _id === newUser._id);
        this.renderAll();
      },
      onDelete: async () => {
        const confirmation = window.confirm(`${this.activeUser.name}을 삭제하시겠습니까?`);
        if (confirmation === false) return;

        await deleteUserData(this.activeUser._id);
        this.init();
      },
    });

    this.todoInput = new TodoInput({
      onAdd: async (contents) => {
        if (contents.length < 2) {
          window.alert('2글자 이상이어야 합니다.');
          return;
        }

        const response = await addTodoItemData(this.activeUser._id, { contents });
        if (response.message) {
          this.init();
          return;
        }

        this.initTodoListAndCount();
      },
    });

    this.todoList = new TodoList({
      onToggle: async (itemId) => {
        const response = await toggleTodoItemData(this.activeUser._id, itemId);
        if (response.message) {
          this.init();
          return;
        }

        this.initTodoListAndCount();
      },
      onRemove: async (itemId) => {
        const response = await removeTodoItemData(this.activeUser._id, itemId);
        if (response.message) {
          this.init();
          return;
        }

        this.initTodoListAndCount();
      },
      onUpdate: async (itemId, contents) => {
        const response = await updateTodoItemData(this.activeUser._id, itemId, { contents });
        if (response.message) {
          this.init();
          return;
        }

        this.initTodoList();
      },
    });

    this.todoCount = new TodoCount({
      onFilter: (status) => {
        this.filterStatus = status;
        this.renderTodoList();
        this.renderTodoCount();
      },
    });

    this.init();
  }

  renderUsername() {
    this.username.render(this.activeUser.name);
  }

  renderUserList() {
    this.userList.render(this.users, this.activeUser._id);
  }

  renderTodoList() {
    const todoList = this.getFilteredTodoList();
    this.todoList.render(todoList);
  }

  renderTodoCount() {
    const todoList = this.getFilteredTodoList();
    this.todoCount.render(todoList.length);
  }

  renderAll() {
    this.renderUsername();
    this.renderUserList();
    this.renderTodoList();
    this.renderTodoCount();
  }

  async loadUsers() {
    this.users = await getUsersData();
  }

  getFilteredTodoList() {
    if (this.filterStatus === ALL) return this.activeUser.todoList;
    if (this.filterStatus === ACTIVE) {
      return this.activeUser.todoList.filter((item) => !item.isCompleted);
    }
    if (this.filterStatus === COMPLETED) {
      return this.activeUser.todoList.filter((item) => item.isCompleted);
    }
  }

  async initTodoList() {
    this.activeUser.todoList = await getTodoListData(this.activeUser._id);
    this.renderTodoList();
  }

  async initTodoListAndCount() {
    await this.initTodoList();
    this.renderTodoCount();
  }

  async init() {
    await this.loadUsers();
    this.activeUser = this.users[0];
    this.renderAll();
  }
}
