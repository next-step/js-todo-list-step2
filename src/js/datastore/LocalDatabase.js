import { TodoItem } from "../component/todo/Todo.js";
export class LocalDataBase {
  static DB_NAME = "my-todo-list";

  static loadData() {
    const localStoredArray = JSON.parse(
      localStorage.getItem(LocalDataBase.DB_NAME)
    );
    const resultArray = [];
    localStoredArray.forEach((item) => {
      resultArray.push(new TodoItem(item.data, item.isCompleted));
    });
    return resultArray;
  }
  static addItem(todoListArray,data) {
    const isCompleted = false;
    todoListArray.push(new TodoItem(data, isCompleted));
    this.saveData(todoListArray);
  }
  static deleteItem(index, todoListArray) {
    todoListArray.splice(index, 1);
    this.saveData(todoListArray);
  }
  static updateItem(index, todoListArray, data) {
    todoListArray[index].data = data;
    this.saveData(todoListArray);
  }
  static updateItemState(index, todoListArray, isCompleted) {
      todoListArray[index].isCompleted = isCompleted;
      this.saveData(todoListArray);
  }
  saveData(todoListArray) {
    localStorage.setItem(LocalDataBase.DB_NAME, JSON.stringify(todoListArray));
  }
}
