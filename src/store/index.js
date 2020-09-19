import { getUserListService, getUserItemsService } from '../endpoint/service.js';
const store = {
  userList: [],
  user: undefined,
};
/* store 를 변경하는 함수는 set 으로 시작됩니다. */
export const setter = {
  async userList () {
    const result = await getUserListService();
    store.userList = result;
  },
  user (userId) {
    store.user = userId ?
      store.userList.find(user => user._id === userId) :
      store.userList[0];
    observer.render('user');
  },
  async userItems (userId) {
    const userItems = await getUserItemsService({ userId });
    store.user.todoList = userItems;
    observer.render('userItems');
  }
};

export const initStore = async () => {
  await setter.userList();
  setter.user();
};

export const observer = {
  userList: [],
  user: [],
  userItems: [],
  addObserver(target, component) {
    this[target].push(component);
  },
  render (target) {
    this[target].forEach(render => render());
  }
};

export const getter = {
  userList () {
    return store.userList;
  },
  user () {
    return store.user;
  },
  userName () {
    return store.user.name;
  },
  userId () {
    return store.user._id;
  },
};


