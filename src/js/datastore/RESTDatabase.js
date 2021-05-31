import * as Ajax from "../util/ajaxUtil.js";
const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com";
const APIs = {
  getUsers : () => `${BASE_URL}/api/users/`,
  getUser : (userId) => `${BASE_URL}/api/users/${userId}`,
  getItems : (userId) => `${BASE_URL}/api/users/${userId}/items/`,
  getItem : (userId,itemId) => `${BASE_URL}/api/users/${userId}/items/${itemId}`,
  updateItem : (userId,itemId,updateAction) => `${BASE_URL}/api/users/${userId}/items/${itemId}/${updateAction}`
}
export class RESTDataBase {
  
  static async getUsers() {
    const url = APIs.getUsers();
    return await Ajax.get(url,"UserList 로드 실패");
  }

  static async getUser(userId) {
    const url = APIs.getUser(userId);
    return await Ajax.get(url,"User 로드 실패");
  }

  static async addUser(userName) {
    const url = APIs.getUsers();

    return await Ajax.post(url,{'name':userName},"User Add 실패");
  }
  static async deleteUser(userId) {
    const url = APIs.getUser(userId);
    return await Ajax.deleteRequest(url,"User delete 실패");
  }
   static async getUserItems(userId) {
    const url = APIs.getItems(userId);
    return await Ajax.get(url,"UserItem 로드 실패");
  }

  static async addItem(userId,data) {
    const url = APIs.getItems(userId);
    return await Ajax.post(url,{'contents':data},"Add Item 실패");
  }
  static async deleteItem(userId, itemId) {
    const url = APIs.getItem(userId, itemId);
    return await Ajax.deleteRequest(url,"Delete Item 실패");
  }
  static async deleteItemAll(userId) {
    const url = APIs.getItems(userId);
    return await Ajax.deleteRequest(url,"Delete All Item 실패");
  }
  static async updateItem(userId,itemId,data) {
    const url = APIs.getItem(userId, itemId);
    const options = {
      'data' :{'contents':data},
      'errMsg' :"Update Item 실패"
    }
    return await Ajax.put(url,options);
  }
  static async updateItemState(userId,itemId) {
    const url = APIs.updateItem(userId, itemId,'toggle');
    const options = {
      errMsg :"Update Item State 실패"
    }
    return await Ajax.put(url,options);
  }

  static async updateItemPriority(userId,itemId,priority) {
    const url = APIs.updateItem(userId, itemId,'priority');
    const options = {
      'data' : {'priority':priority},
      'errMsg' :"Update Item Priority 실패"
    }
    return await Ajax.put(url,options);
  }
}
