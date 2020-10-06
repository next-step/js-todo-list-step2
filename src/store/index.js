import { readUserList, readUserTodoItems, readUser } from '../endpoint/service.js';
import { ERROR } from '../constants/messageAPI.js';
const store = {
  userList: [],
  user: undefined,
  user1: {
    name: undefined,
    id: -1,
    todoList: []
  },
};

/* store 를 변경하는 함수는 set 으로 시작됩니다. */
export const setter = {
  async userList () {
    try {
      store.userList = await readUserList();
    }
    catch (err) {
      alert(err.message);
    }
  },
  async user (userId) {
    const newUserId = userId ? userId : store.userList[0]._id;
    try {
      const user = await readUser({ userId: newUserId });
      store.user = user.message ? undefined : user;
    }
    catch (err) {
      if (err.message === ERROR.NO_USER2) {
        alert(err);
        // await initStore();
      }
    }
    observer.render('user');
  },
  async userItems (userId) {
    try {
      store.user.todoList = await readUserTodoItems({ userId });
    }
    catch (err) {
      if (err.message === ERROR.NO_USER2) {
        alert(err.message);
        await initStore();
      }
    }
    finally {
      observer.render('userItems');
    }
  },
  itemMode (itemId, mode) {
    const item = store?.user?.todoList.find(v => v._id === itemId);
    item.mode = mode;
  },
  userItem(itemId, newItem) {
    let idx;
    store.user.todoList.find((v, k) => {
      if (v._id === itemId) {
        idx = k;
        return;
      }
    });
    store.user.todoList[idx] = newItem;
  }
};

export const initStore = async () => {
  await setter.userList();
  await setter.user();
};


export const observer = {
  userList: [],
  user: [],
  userItems: [],
  addObserver (target, component) {
    this[target].push(component);
  },
  render (target) {
    this[target].forEach(render => render());
  },
};

export const getter = {
  userList () {
    return store.userList;
  },
  user () {
    return store.user;
  },
  userName () {
    return store.user?.name;
  },
  userId () {
    return store.user?._id;
  },
  userItems () {
    return store.user?.todoList;
  },
  userItem(itemId) {
    return store.user.todoList.find(v => v._id === itemId);
  }
};


