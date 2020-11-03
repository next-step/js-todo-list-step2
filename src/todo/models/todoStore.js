class TodoStore {
  constructor({ todos, userList, count, activeUser }) {
    this.todos = todos;
    this.userList = userList;
    this.count = count;
    this.activeUser = activeUser;
  }

  static init({ todos = [], userList = [], activeUser = "" } = {}) {
    return new TodoStore({
      todos,
      userList,
      count: userList.length,
      activeUser
    });
  }
}

export default TodoStore;
