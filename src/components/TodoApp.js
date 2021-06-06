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
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import UserList from './UserList.js';
import Username from './Username.js';

export default class TodoApp {
  constructor() {
    this.users = [];
    this.activeUser = { _id: '', name: '', todoList: [] };

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

        this.initTodoList();
      },
    });

    this.todoList = new TodoList({
      onToggle: async (itemId) => {
        const response = await toggleTodoItemData(this.activeUser._id, itemId);
        if (response.message) {
          this.init();
          return;
        }

        this.initTodoList();
      },
      onRemove: async (itemId) => {
        const response = await removeTodoItemData(this.activeUser._id, itemId);
        if (response.message) {
          this.init();
          return;
        }

        this.initTodoList();
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

    this.init();
  }

  renderUsername() {
    this.username.render(this.activeUser.name);
  }

  renderUserList() {
    this.userList.render(this.users, this.activeUser._id);
  }

  renderTodoList() {
    this.todoList.render(this.activeUser.todoList);
  }

  renderAll() {
    this.renderUsername();
    this.renderUserList();
    this.renderTodoList();
  }

  async loadUsers() {
    this.users = await getUsersData();
  }

  async init() {
    await this.loadUsers();
    this.activeUser = this.users[0];
    this.renderAll();
  }

  async initTodoList() {
    this.activeUser.todoList = await getTodoListData(this.activeUser._id);
    this.renderTodoList();
  }
}
