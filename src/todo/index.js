import { mappedTodoUsers } from "./utils/validator.js";

import Api from "./api/index.js";
import {
  TodoInput,
  TodoUserList,
  TodoUserInput,
  TodoCreateUserButton,
  TodoDeleteUserButton,
  TodoList,
  TodoCount
} from "./components/index.js";
import { TodoStore } from "./stores/index.js";
import { TARGETS } from "../shared/utils/constants.js";

class Todo {
  constructor() {
    this.state = TodoStore.getStore;

    this.todoInput = new TodoInput({
      $target: document.querySelector(TARGETS.TODO_INPUT),
      setGlobalState: this.setState
    });

    this.todoUserList = new TodoUserList({
      $target: document.querySelector(TARGETS.TODO_USER_LIST)
    });

    this.todoUserInput = new TodoUserInput({
      $target: document.querySelector(TARGETS.TODO_USER_LIST_INPUT),
      setGlobalState: this.setState
    });

    this.todoCreateUserButton = new TodoCreateUserButton({
      $target: document.querySelector(TARGETS.TODO_USER_CREATE_BUTTON),
      setGlobalState: this.setState
    });

    this.todoDeleteUserButton = new TodoDeleteUserButton({
      $target: document.querySelector(TARGETS.TODO_USER_DELETE_BUTTON),
      setGlobalState: this.setState
    });

    this.todoCount = new TodoCount({
      $target: document.querySelector(TARGETS.TODO_COUNT),
      count: this.state.count
    });

    this.todoList = new TodoList({
      $target: document.querySelector(TARGETS.TODO_LIST),
      setGlobalState: this.setState,
      todoCount: this.todoCount
    });
  }

  setState = () => {
    this.todoUserList.setState(TodoStore.getStore);
    this.todoList.setState(TodoStore.getStore);
    this.todoUserInput.setState(TodoStore.getStore);
    this.todoCount.setState(TodoStore.getStore);
    this.todoUserInput.setState(TodoStore.getStore);
  };

  init = async () => {
    const userList = await Api.requestUser();
    const state = TodoStore.getStore;

    if (userList.length) {
      TodoStore.setState({
        ...state,
        userList,
        todos: mappedTodoUsers(userList[0].todoList),
        count: userList[0].todoList.length,
        activeUser: userList[0]._id
      });
      this.setState();
    }
  };
}

export default Todo;
