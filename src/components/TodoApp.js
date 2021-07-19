import {
  addTodoItemData,
  addUserData,
  deleteUserData,
  getTodoListData,
  getUserData,
  getUsersData,
  removeTodoItemData,
  removeTodoListData,
  setTodoItemPriorityData,
  toggleTodoItemData,
  updateTodoItemData,
} from '../api.js';
import { FILTER_STATUS } from '../constants.js';
import TodoCount from './TodoCount.js';
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import UserList from './UserList.js';
import Username from './Username.js';

export default class TodoApp {
  constructor() {
    this.users = [];
    this.currentUser = { _id: '', name: '', todoList: [] };
    this.filterStatus = FILTER_STATUS.ALL;

    this.username = new Username();

    this.userList = new UserList({
      onSelect: async (userId) => {
        try {
          const selectedUser = await getUserData(userId);
          this.currentUser = selectedUser;
          this.renderAll();
        } catch (error) {
          console.error(error);
          this.init();
        }
      },
      onAdd: async () => {
        try {
          const name = prompt('추가하고 싶은 이름을 입력해주세요.');
          if (name.length < 2) {
            window.alert('2글자 이상이어야 합니다.');
            return;
          }

          const newUser = await addUserData({ name });
          await this.loadUsers();
          this.currentUser = this.users.find(({ _id }) => _id === newUser._id);
          this.renderAll();
        } catch (error) {
          console.error(error);
        }
      },
      onDelete: async () => {
        try {
          const confirmation = window.confirm(`${this.currentUser.name}을 삭제하시겠습니까?`);
          if (confirmation === false) return;

          await deleteUserData(this.currentUser._id);
          this.init();
        } catch (error) {
          console.error(error);
          this.init();
        }
      },
    });

    this.todoInput = new TodoInput({
      onAdd: async (contents) => {
        try {
          if (contents.length < 2) {
            window.alert('2글자 이상이어야 합니다.');
            return;
          }

          await addTodoItemData(this.currentUser._id, { contents });
          this.initTodoListAndCount();
        } catch (error) {
          console.error(error);
          this.init();
        }
      },
    });

    this.todoList = new TodoList({
      onToggle: async (itemId) => {
        try {
          await toggleTodoItemData(this.currentUser._id, itemId);
          this.initTodoListAndCount();
        } catch (error) {
          console.error(error);
          this.init();
        }
      },
      onRemove: async (itemId) => {
        try {
          await removeTodoItemData(this.currentUser._id, itemId);
          this.initTodoListAndCount();
        } catch (error) {
          console.error(error);
          this.init();
        }
      },
      onUpdate: async (itemId, contents) => {
        try {
          await updateTodoItemData(this.currentUser._id, itemId, { contents });
          this.initTodoList();
        } catch (error) {
          console.error(error);
          this.init();
        }
      },
      onSetPriority: async (itemId, priority) => {
        try {
          await setTodoItemPriorityData(this.currentUser._id, itemId, { priority });
          this.initTodoList();
        } catch (error) {
          console.error(error);
          this.init();
        }
      },
    });

    this.todoCount = new TodoCount({
      onFilter: (status) => {
        this.filterStatus = status;
        this.renderTodoList();
        this.renderTodoCount();
      },
      onClear: async () => {
        try {
          await removeTodoListData(this.currentUser._id);
          this.initTodoListAndCount();
        } catch (error) {
          console.error(error);
          this.init();
        }
      },
    });

    this.init();
  }

  renderUsername() {
    this.username.render(this.currentUser.name);
  }

  renderUserList() {
    this.userList.render(this.users, this.currentUser._id);
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
    if (this.filterStatus === FILTER_STATUS.ALL) return this.currentUser.todoList;
    if (this.filterStatus === FILTER_STATUS.ACTIVE) {
      return this.currentUser.todoList.filter((item) => !item.isCompleted);
    }
    if (this.filterStatus === FILTER_STATUS.COMPLETED) {
      return this.currentUser.todoList.filter((item) => item.isCompleted);
    }
  }

  async initTodoList() {
    try {
      this.currentUser.todoList = await getTodoListData(this.currentUser._id);
      this.renderTodoList();
    } catch (error) {
      console.error(error);
      this.init();
    }
  }

  async initTodoListAndCount() {
    try {
      await this.initTodoList();
      this.renderTodoCount();
    } catch (error) {
      console.error(error);
      this.init();
    }
  }

  async init() {
    await this.loadUsers();
    this.currentUser = this.users[0];
    this.renderAll();
  }
}
