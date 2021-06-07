import { fetchRequest } from "../lib/fetchRequest.js";
import { API_URL, METHOD } from "../constants/config.js";
import { INFORM_MESSAGES, ERROR_MESSAGES } from "../constants/message.js";
import { MINIMUM_LENGTH } from "../constants/limitValue.js";
import { KEY } from "../constants/eventKey.js";

import UserList from "./UserList.js";
import TodoList from "./TodoList.js";
import TodoInput from "./TodoInput.js";
import TodoDeleteAll from "./TodoDeleteAll.js";
import TodoItemModel from "../model/TodoItemModel.js";
import UserModel from "../model/UserModel.js";

class TodoApp {
  constructor() {
    this.userList = new UserList({
      onAddUser: this.onAddUser.bind(this),
      onDeleteUser: this.onDeleteUser.bind(this),
      onSelectUser: this.onSelectUser.bind(this),
    });
    this.users = [];
    this.selectedUser = {};
    this.todoList = new TodoList({
      onDelete: this.onDeleteItem.bind(this),
      onComplete: this.onCompleteItem.bind(this),
      onEditing: this.onEditingItem.bind(this),
      onEdit: this.onEditItem.bind(this),
    });
    this.todoInput = new TodoInput({ onAddItem: this.onAddItem.bind(this) });
    this.todoDeleteAll = new TodoDeleteAll({ onDeleteAll: this.onDeleteAllItem.bind(this) });
    this.init();
  }

  init() {
    this.getUserList();
  }

  // UserList 함수

  async getUserList() {
    const { result, error } = await fetchRequest(API_URL.USERS, METHOD.GET);

    if (error) return alert(ERROR_MESSAGES.GET_USER_LIST);

    const userListData = result.map((user) => {
      const userTodoList = user.todoList.map((todoList) => {
        return new TodoItemModel({
          id: todoList._id,
          contents: todoList.contents,
          isCompleted: todoList.isCompleted,
          priority: todoList.priority,
        });
      });
      return new UserModel({ id: user._id, name: user.name, todoList: userTodoList });
    });

    this.users = userListData;
    this.selectedUser = userListData[0];
    this.userList.render(this.users);
    this.todoList.setState(this.selectedUser.todoList);
  }

  onSelectUser(id) {
    if (!id) return;

    this.selectedUser = this.users.find((user) => {
      return user.id == id;
    });

    this.getUserTodoList(id);
  }

  async onAddUser() {
    const userName = prompt(INFORM_MESSAGES.ADD_USER);
    if (!userName) return;
    if (userName.length < MINIMUM_LENGTH.USER_NAME)
      return alert(ERROR_MESSAGES.TOO_SHORT_USER_NAME);

    const { error } = await fetchRequest(API_URL.USERS, METHOD.POST, { name: userName });
    if (error) return alert(ERROR_MESSAGES.ADD_USER);
    this.getUserList();
  }

  async onDeleteUser() {
    const deleteId = this.selectedUser.id;
    const { error } = await fetchRequest(API_URL.USER(deleteId), METHOD.DELETE);
    if (error) return alert(ERROR_MESSAGES.DELETE_USER);
    this.selectedUser = {};
    this.getUserList();
  }

  async getUserTodoList(userId) {
    const { result, error } = await fetchRequest(API_URL.ITEM(userId), METHOD.GET);
    if (error) alert(ERROR_MESSAGES.GET_TODO_LIST);

    this.selectedUser.todoList = result.map((item) => {
      return new TodoItemModel({ ...item, id: item._id });
    });

    this.todoList.setState(this.selectedUser.todoList);
  }

  // TodoInput 함수

  async onAddItem(contents) {
    const { result, error } = await fetchRequest(API_URL.ITEM(this.selectedUser.id), METHOD.POST, {
      contents,
    });

    if (error) return alert(ERROR_MESSAGES.ADD_ITEM);

    this.selectedUser.todoList.push(new TodoItemModel({ ...result, id: result._id }));

    this.todoList.setState(this.selectedUser.todoList);
  }

  // User의 TodoList 함수

  async onDeleteAllItem() {
    const { result, error } = await fetchRequest(API_URL.ITEM(this.selectedUser.id), METHOD.DELETE);
    if (error) return alert(ERROR_MESSAGES.DELETE_ALL_ITEMS);

    this.selectedUser.todoList = [];
    this.todoList.setState(this.selectedUser.todoList);
  }

  async onDeleteItem(itemId) {
    const { result, error } = await fetchRequest(
      API_URL.USER_ITEM(this.selectedUser.id, itemId),
      METHOD.DELETE
    );
    if (error) return alert(ERROR_MESSAGES.DELETE_ITEM);

    this.selectedUser.todoList = result.todoList.map((item) => {
      return new TodoItemModel({ ...item, id: item._id });
    });
    this.todoList.setState(this.selectedUser.todoList);
  }

  async onCompleteItem(itemId) {
    const { result, error } = await fetchRequest(
      API_URL.ITEM_TOGGLE(this.selectedUser.id, itemId),
      METHOD.PUT
    );

    if (error) return alert(ERROR_MESSAGES.COMPLETE_ITEM);

    this.selectedUser.todoList = this.selectedUser.todoList.map((item) => {
      if (item.id === itemId) {
        return new TodoItemModel({ ...item, isCompleted: result.isCompleted });
      }
      return item;
    });

    this.todoList.setState(this.selectedUser.todoList);
  }

  onEditingItem(itemId) {
    this.selectedUser.todoList = this.selectedUser.todoList.map((item) => {
      if (item.id == itemId) {
        item.editing = !item.editing;
      }
      return item;
    });

    this.todoList.setState(this.selectedUser.todoList);
  }

  async onEditItem(event, itemId) {
    if (event.key === KEY.ESCAPE) {
      this.selectedUser.todoList = this.selectedUser.todoList.map((item) => {
        if (item.id == itemId) {
          item.editing = !item.editing;
        }
        return item;
      });

      this.todoList.setState(this.selectedUser.todoList);
    }
    if (event.key === KEY.ENTER) {
      const { result, error } = await fetchRequest(
        API_URL.USER_ITEM(this.selectedUser.id, itemId),
        METHOD.PUT,
        { contents: event.target.value }
      );

      if (error) return alert(ERROR_MESSAGES.EDIT_ITEM);

      this.selectedUser.todoList = this.selectedUser.todoList.map((item) => {
        if (item.id == itemId) {
          item.editing = !item.editing;
          item.contents = result.contents;
        }
        return item;
      });

      this.todoList.setState(this.selectedUser.todoList);
    }
  }
}

export default TodoApp;
