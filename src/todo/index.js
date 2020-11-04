import { filterActiveTodoUsers } from "./utils/validator.js";

import Api from "./api/index.js";
import {
  TodoInput,
  TodoUserList,
  TodoList,
  TodoCount
} from "./components/index.js";
import { TodoStore } from "./stores/index.js";
import { TARGETS } from "../shared/utils/constants.js";

class Todo {
  constructor() {
    this.state = TodoStore.getStore;

    this.todoInput = new TodoInput({
      $target: document.querySelector(TARGETS.TODO_INPUT)
    });

    this.todoUserList = new TodoUserList({
      $target: document.querySelector(TARGETS.TODO_USER_LIST),
      setGlobalState: this.setState
    });

    this.todoList = new TodoList({
      $target: document.querySelector(TARGETS.TODO_LIST)
    });

    this.todoCount = new TodoCount({
      $target: document.querySelector(TARGETS.TODO_COUNT),
      count: this.state.count
    });
  }

  setState = () => {
    console.log("state:::", TodoStore.getStore);

    this.todoUserList.setState(TodoStore.getStore);
    this.todoList.setState(TodoStore.getStore);
    this.todoCount.setState(TodoStore.getStore);
  };

  init = async () => {
    const userList = filterActiveTodoUsers(await Api.requestUser());

    TodoStore.setState({
      userList,
      todos: userList[0].todoList,
      count: userList[0].todoList.length,
      activeUser: userList[0]._id
    });

    this.setState();
  };
}

export default Todo;
