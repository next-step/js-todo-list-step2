import { $ } from "../util/domSelection.js";
import { DAO } from "../datastore/datastore.js";

export class TodoApp {
  constructor(todoItemArray) {
    this.todoItemArray = todoItemArray;

    const newTodoInput = $("input.new-todo");
    newTodoInput.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        this.addItem(newTodoInput.value);
        newTodoInput.value = "";
      }
    });
  }
  async init() {
    this.userListArray = await DAO.getUsers();
    
    const [haveTodoListUser] = this.userListArray.filter((user)=>user.todoList[0]);
    this.currentUser = haveTodoListUser;
    this.todoItemArray = DAO.loadData(this.currentUser);
    this.setState();
  }
  async changeUser(userId){
    const selectedUser = await DAO.getUser(userId);
    this.currentUser = selectedUser;
    this.todoItemArray = DAO.loadData(selectedUser);
    this.setState();
  }

  async addUser(name){
  }
  async deleteUser(name){
  }

  addItem(data) {
    if (!data || data.trim() == "") return;
    DAO.addItem(this.todoItemArray,data);
    this.setState();
  }
  deleteItem(index) {
    DAO.deleteItem(index, this.todoItemArray);
    this.setState();
  }
  updateItem(index, data) {
    DAO.updateItem(index, this.todoItemArray, data);
    this.setState();
  }
  updateItemState(index, isCompleted) {
    DAO.updateItemState(index, this.todoItemArray, isCompleted);
    this.setState();
  }
  setState() {
    if (this.todoList) {
      this.todoList.setState(this.todoItemArray);
    }
    if (this.todoStatusContainer) {
      this.todoStatusContainer.setState();
    }
    if (this.userList) {
      this.userList.setState(this.userListArray,this.currentUser);
    }
  }
}

