import { DAO } from "../datastore/datastore.js";
import { TodoItem } from "../component/todo/Todo.js";

export class TodoApp {
  async init(userId = '') {
    this.userListArray = await this.getUsers();
    if(!userId){
      const [haveTodoListUser] = this.userListArray.filter((user)=>user.todoList[0]);
      this.currentUser = haveTodoListUser;
    }else{
      this.currentUser = await DAO.getUser(userId);
    }
    
    this.todoItemArray = this.currentUser.todoList.map(item => new TodoItem(item));
    this.setState();
  }
  async getUsers(){
    return await DAO.getUsers();
  }
  async refreshUserItems(userId){
    const userItems = await DAO.getUserItems(userId);
    this.todoItemArray = userItems.map(item => new TodoItem(item));
    this.setState();
  }

  async changeUser(userId){
    await this.init(userId);
  }

  async addUser(userName){
    const addedUser = await DAO.addUser(userName);
    this.userListArray = await this.getUsers();//userList 업데이트를 위함.
    await this.init(addedUser._id);
  }

  async deleteUser(userId){
    const deletedUser = await DAO.deleteUser(userId);
    this.init();
  }

  async addItem(data) {
    if (!data || data.trim().length < 2 ){
      alert('할일을 최소 2자 이상으로 입력해 주세요.')
      return;
    } 
    await DAO.addItem(this.currentUser._id,data);
    await this.refreshUserItems(this.currentUser._id);
  }
  async deleteItem(itemId) {
    await DAO.deleteItem(this.currentUser._id, itemId);
    await this.refreshUserItems(this.currentUser._id);
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

