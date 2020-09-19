import { getUserListService, getUserItemsService, getUserService } from '../endpoint/service.js';

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
  async user (userId) {
    const newUserId = userId ? userId : store.userList[0]._id;
    try {
      const user = await getUserService({ userId: newUserId });
      if (user.message)
        alert(user.message);
      store.user = user.message ? undefined : user;
    } catch (err) {
      console.log(err);
    }
    observer.render('user');
  },
  async userItems (userId) {
    const userItems = await getUserItemsService({ userId });
    store.user.todoList = userItems;
    observer.render('userItems');
  },
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
  }
};


