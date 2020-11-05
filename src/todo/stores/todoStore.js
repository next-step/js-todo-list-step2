import { filterActiveUserTodos, mapTodoUsers } from "../utils/validator.js";

class TodoStore {
  static data = {
    todos: [],
    userList: [],
    count: 0,
    activeUser: ""
  };

  static setState({ ...data }) {
    const getTodos = TodoStore.activeUserTodos(data.userList, data.activeUser);

    TodoStore.data = {
      ...data,
      todos: mapTodoUsers(getTodos),
      count: getTodos?.length
    };
  }

  static get getStore() {
    return {
      ...TodoStore.data
    };
  }

  static activeUserTodos(userList, activeUser) {
    return filterActiveUserTodos(userList, activeUser);
  }

  static changeActiveUser({ activeUser }) {
    TodoStore.setState({ ...TodoStore.data, activeUser });
  }

  static renewUserList({ activeUser, userList }) {
    TodoStore.setState({ ...TodoStore.data, activeUser, userList });
  }
}

export default TodoStore;
