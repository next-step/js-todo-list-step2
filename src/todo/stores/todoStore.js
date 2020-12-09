import {
  filterActiveUserTodos,
  mappedTodoUsers,
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
    const mappedTodos = TodoStore.activeUserTodos(
      data.userList,
      data.activeUser
    );

    let filterTodosCount = mappedTodos.length;
    if (data.viewType === "completed") {
      filterTodosCount = filterViewTypeTodos(mappedTodos, true).length;
    } else if (data.viewType === "active") {
      filterTodosCount = filterViewTypeTodos(mappedTodos, false).length;
    }

    TodoStore.data = {
      ...data,
      todos: mappedTodoUsers(mappedTodos),
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
