import {
  filterActiveUserTodos,
  mapTodoUsers,
  filterViewTypeTodos
} from "../utils/validator.js";

class TodoStore {
  static data = {
    todos: [],
    userList: [],
    count: 0,
    activeUser: "",
    viewType: "all"
  };

  static setState({ ...data }) {
    const getTodos = TodoStore.activeUserTodos(data.userList, data.activeUser);

    let filterTodosCount = getTodos.length;
    if (data.viewType === "completed") {
      filterTodosCount = filterViewTypeTodos(getTodos, true).length;
    } else if (data.viewType === "active") {
      filterTodosCount = filterViewTypeTodos(getTodos, false).length;
    }

    TodoStore.data = {
      ...data,
      todos: mapTodoUsers(getTodos),
      count: filterTodosCount
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
