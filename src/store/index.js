import { readUserFacade, readUserListFacade } from '../endpoint/facade.js';

const store = {
  userList: [],
  user: undefined,
};

/* store 를 변경하는 함수는 set 으로 시작됩니다. */
export const setter = {
  userList(userList) {
    store.userList = userList;
  },
  user(user) {
    store.user = user;
    observer.render('user');
  },
  userItems(userItems) {
    store.user.todoList = userItems;
    observer.render('userItems');
  },
  itemMode(itemId, mode) {
    const item = store?.user?.todoList.find(v => v._id === itemId);
    item.mode = mode;
  },
};

export const initStore = async() => {
  await readUserListFacade();
  const userId = getter.firstUser();
  await readUserFacade(userId);
};


export const observer = {
  userList: [],
  user: [],
  userItems: [],
  addObserver(target, component) {
    this[target].push(component);
  },
  render(target) {
    this[target].forEach(render => render());
  },
};

export const getter = {
  userList() {
    return store.userList;
  },
  user() {
    return store.user;
  },
  userName() {
    return store.user?.name;
  },
  userId() {
    return store.user?._id;
  },
  userItems() {
    return store.user?.todoList;
  },
  userItem(itemId) {
    return store.user.todoList.find(v => v._id === itemId);
  },
  firstUser() {
    return store.userList?.[0]._id || null;
  }
};


export const dispatch = {

}