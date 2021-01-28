const selectedUser = {
  data: {
    id: null,
    name: null,
    todoList: [],
  },

  updateInfo(id, name, todoList) {
    this.id = id;
    this.name = name;
    this.todoList = todoList;
  },
};
