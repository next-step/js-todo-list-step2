import { TodoItem } from "../component/todo/Todo.js";
import * as Ajax from "../util/ajaxUtil.js";

export class RESTDataBase {
  static BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com";
  static async getUsers() {
    const url = RESTDataBase.BASE_URL + '/api/users'
    return await Ajax.get(url,"UserList 로드 실패");
  }

  static async getUser(id) {
    const url = RESTDataBase.BASE_URL + '/api/users/' + id;
    return await Ajax.get(url,"User 로드 실패");
  }

  static loadData(user) {
    const loadedArray = user.todoList;
    const resultArray =[];
    loadedArray.forEach((item) => {
      resultArray.push(new TodoItem(item.contents, item.isCompleted, item._id, item.priority));
    });
    return resultArray;
  }
  static addItem(todoListArray,data) {
    const isCompleted = false;
    todoListArray.push(new TodoItem(data, isCompleted));
  }
  static deleteItem(index, todoListArray) {
    todoListArray.splice(index, 1);
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
