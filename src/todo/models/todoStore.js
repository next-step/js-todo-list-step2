class TodoStore {
  constructor({ todos, userList, activeUser }) {
    this.todos = todos;
    this.userList = userList;
    this.activeUser = activeUser;
  }

  static init({ todos = [], userList = [], activeUser = "" } = {}) {
    console.log(todos, userList, activeUser);
    return new TodoStore({
      todos: todos,
      userList: userList,
      activeUser: activeUser
    });
  }
}

export default TodoStore;
