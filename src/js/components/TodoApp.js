import { fetchRequest } from "../lib/fetchRequest.js";
import { API_URL } from "../constants/config.js";

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
    const { result, error } = await fetchRequest(API_URL.USERS, "get");

    if (error) return alert("사용자 목록 조회에 실패했습니다.");

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
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");

    if (userName.length < 2) return alert("최소 2글자 이상이어야 합니다.");

    const { error } = await fetchRequest(API_URL.USERS, "post", { name: userName });
    if (error) return alert("사용자 추가에 실패했습니다.");
    this.getUserList();
  }

  async onDeleteUser() {
    const deleteId = this.selectedUser.id;
    const { error } = await fetchRequest(API_URL.USER(deleteId), "delete");
    if (error) return alert("사용자 삭제에 실패했습니다.");
    this.selectedUser = {};
    this.getUserList();
  }

  // TodoInput 함수

  async getUserTodoList(userId) {
    const { result, error } = await fetchRequest(API_URL.ITEM(userId), "get");
    if (error) alert("사용자의 리스트를 불러오는데 실패했습니다.");

    this.selectedUser.todoList = result.map((item) => {
      return new TodoItemModel({ ...item, id: item._id });
    });

    this.todoList.setState(this.selectedUser.todoList);
  }

  async onAddItem(contents) {
    const { result, error } = await fetchRequest(API_URL.ITEM(this.selectedUser.id), "post", {
      contents,
    });

    if (error) return alert("할 일 추가에 실패했습니다.");

    this.selectedUser.todoList.push(new TodoItemModel({ ...result, id: result._id }));

    this.todoList.setState(this.selectedUser.todoList);
  }

  // User의 TodoList 함수

  async onDeleteAllItem() {
    const { result, error } = await fetchRequest(API_URL.ITEM(this.selectedUser.id), "delete");
    if (error) return alert("모두 삭제하기에 실패했습니다.");

    this.selectedUser.todoList = [];
    this.todoList.setState(this.selectedUser.todoList);
  }

  async onDeleteItem(itemId) {
    const { result, error } = await fetchRequest(
      API_URL.USER_ITEM(this.selectedUser.id, itemId),
      "delete"
    );
    if (error) return alert("할 일 삭제하기에 실패했습니다.");

    this.selectedUser.todoList = result.todoList.map((item) => {
      return new TodoItemModel({ ...item, id: item._id });
    });
    this.todoList.setState(this.selectedUser.todoList);
  }

  async onCompleteItem(itemId) {
    const { result, error } = await fetchRequest(
      API_URL.ITEM_TOGGLE(this.selectedUser.id, itemId),
      "put"
    );

    if (error) return alert("할 일 완료 저장에 실패했습니다.");

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
    if (event.key === "Escape") {
      this.selectedUser.todoList = this.selectedUser.todoList.map((item) => {
        if (item.id == itemId) {
          item.editing = !item.editing;
        }
        return item;
      });

      this.todoList.setState(this.selectedUser.todoList);
    }
    if (event.key === "Enter") {
      const { result, error } = await fetchRequest(
        API_URL.USER_ITEM(this.selectedUser.id, itemId),
        "put",
        { contents: event.target.value }
      );

      if (error) return alert("할 일 수정에 실패했습니다.");

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
