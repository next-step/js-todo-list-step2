import { filterActiveUserTodos } from "../utils/validator.js";

class TodoStore {
  static data = {
    todos: [],
    userList: [],
    count: 0,
    activeUser: ""
  };

  static activeUserTodos(userList, activeUser) {
    return filterActiveUserTodos(userList, activeUser);
  }

  static setState({ ...data }) {
    const getTodos = TodoStore.activeUserTodos(data.userList, data.activeUser);

    TodoStore.data = {
      ...data,
      todos: getTodos,
      count: getTodos?.length
    };
  }

  static toggleCompleted({ _id, isCompleted }) {
    TodoStore.data.todos.map(todo => {
      if (todo._id === _id) todo.isCompleted = isCompleted;
      return todo;
    });
  }

  static changeActiveUser({ activeUser }) {
    TodoStore.setState({ ...TodoStore.data, activeUser });
  }

  static get getStore() {
    return {
      ...TodoStore.data
    };
  }
}

export default TodoStore;
