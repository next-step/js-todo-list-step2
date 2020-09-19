const store = {
  userList: [],
  user: undefined
};

export const getter = {
  userList () {
    return store.userList;
  },
  user () {
    return store.user;
  },
  userId () {
    return store.user._id;
  },
  userName () {
    return store.user.name;
  },
  userTodoList () {
    return store.user.todoList;
  }
};

export const setter = {
  userList () {
    store.userList = [];
    observer.notify('userList');
  },
  user () {
    store.user = undefined;
    observer.notify('user');

  },
  userTodoList () {
    store.user.todoList = [];
    observer.notify('todoList');
  }
};

export const observer = {
  userList: [],
  user: [],
  userTodoList: [],

  addObserver(target, render) {
    this[target].push(render);
  },

  notify (target) {
    this[target].forEach(render => render());
  }
};