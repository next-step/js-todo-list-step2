import HeaderContainer from "./component/header/headerContainer.js";
import TodoListContainer from "./component/todo/todoListContainer.js";
import requests from "./util/fetch.js";

export default class App {
  init = async () => {
    this.userList = [{ _id: "slQAW-lSB", name: "yt" }];
    // this.selectedUserInfo = await requests.get("/users/slQAW-lSB");
    this.selectedUserId =
      this.userList.length === 0 ? "" : this.userList[0]._id;
    this.todoList = await requests.get("/users/slQAW-lSB/items");
    this.render();
  };

  addUser = async () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    const newUserData = await requests.post("/users", { name: userName });

    this.userList.push({ _id: newUserData._id, name: newUserData.name });
    this.render();
  };

  deleteUser = async (userid) => {
    await requests.delete(`/users/${userid}`);

    const index = this.userList.findIndex((user) => user._id === userid);
    this.userList.splice(index, 1);

    if (this.userList.length > 0) {
      this.selectUser(this.userList[0]._id);
    }

    this.selectUser();
  };

  selectUser = (userId = "") => {
    this.selectedUserId = userId;
    if (userId === "" && this.userList.length > 0) {
      this.selectedUserId = this.userList[0]._id;
    }
    this.setTodoList(this.selectedUserId);
  };

  setTodoList = async (id) => {
    if (id === "") {
      this.todoList = [];
    } else {
      this.todoList = await requests.get(`/users/${id}/items`);
    }

    this.render();
  };

  addTodo = async (contents) => {
    await requests.post(`/users/${this.selectedUserId}/items`, { contents });

    this.selectUser(this.selectedUserId);
  };

  headerContainer = new HeaderContainer({
    addUser: this.addUser,
    deleteUser: this.deleteUser,
    selectUser: this.selectUser,
  });
  todoListContainer = new TodoListContainer({ addTodo: this.addTodo });

  render = async () => {
    console.dir(this.userList);
    console.dir(this.selectedUserId);
    console.dir(this.todoList);
    this.headerContainer.render(this.userList, this.selectedUserId);
    this.todoListContainer.render(this.todoList);
  };
}
