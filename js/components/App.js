import { addUser, fetchUser, fetchUsers } from "../domain/userApi.js";
import { SELECTOR } from "../utils/constant.js";
import { checkTarget } from "../utils/validator.js";
import TodoList from "./TodoList.js";
import UserList from "./UserList.js";
import TodoInput from "./TodoInput.js";
import { addTodo } from "../domain/todoApi.js";
import { LOAD_USER } from "../store/Store.js";

function App({ $target, store }) {
  const init = async () => {
    checkTarget($target);

    this.userList = new UserList({
      $target: document.querySelector(SELECTOR.USER_LIST),
      onChangeUser: this.onChangeUser,
      onAddUser: this.onAddUser,
      store,
    });

    this.todoList = new TodoList({
      $target: document.querySelector(SELECTOR.TODO_LIST),
      store,
    });

    // this.todoInput = new TodoInput({
    //   $target: document.querySelector(SELECTOR.TODO_INPUT),
    //   name: this.state.user.name,
    //   onAddTodo: this.onAddTodo,
    // });
  };

  this.onChangeUser = async (username) => {
    store.dispatch({
      type: LOAD_USER,
      payload: await fetchUser(username),
    });
  };

  this.onAddUser = async (username) => {
    const newUser = await addUser(username);
    this.state.addUser(newUser);
    this.setState();
  };

  // TODO : 구현
  this.onAddTodo = async (title, name) => {
    const response = await addTodo(title, name);
    console.log(response);
  };

  this.setState = () => {
    this.userList.setState(this.state);
    this.todoList.setState(this.state.user.todoList);
    this.todoInput.setState(this.state.user.name);
  };

  init();
}

export default App;
