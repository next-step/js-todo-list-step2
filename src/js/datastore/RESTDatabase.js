import * as Ajax from "../util/ajaxUtil.js";

export class RESTDataBase {
  static BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com";
  static async getUsers() {
    const url = RESTDataBase.BASE_URL + '/api/users'
    return await Ajax.get(url,"UserList 로드 실패");
  }

  static async getUser(userId) {
    const url = RESTDataBase.BASE_URL + '/api/users/' + userId;
    return await Ajax.get(url,"User 로드 실패");
  }

  static async addUser(userName) {
    const url = RESTDataBase.BASE_URL + '/api/users';

    return await Ajax.post(url,{'name':userName},"User Add 실패");
  }
  static async deleteUser(userId) {
    const url = RESTDataBase.BASE_URL + '/api/users/' + userId;
    return await Ajax.deleteRequest(url,"User delete 실패");
  }
   static async getUserItems(userId) {
    const url = RESTDataBase.BASE_URL + '/api/users/' + userId + '/items';
    return await Ajax.get(url,"UserItem 로드 실패");
  }

  static async addItem(userId,data) {
    const url = RESTDataBase.BASE_URL + '/api/users/' + userId + '/items';
    return await Ajax.post(url,{'contents':data},"Add Item 실패");
  }
  static async deleteItem(userId, itemId) {
    const url = RESTDataBase.BASE_URL + '/api/users/' + userId + '/items/' +itemId;
    return await Ajax.deleteRequest(url,"Delete Item 실패");
  }
  static updateItem(index, todoListArray, data) {
    todoListArray[index].data = data;
  }
  static updateItemState(index, todoListArray, isCompleted) {
      todoListArray[index].isCompleted = isCompleted;
  }

  static saveData(todoListArray) {
    localStorage.setItem(LocalDataBase.DB_NAME, JSON.stringify(todoListArray));
  }
}
