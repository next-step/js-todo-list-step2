import { setUserList } from '../endpoint/service.js';
import { userListRender } from '../render.js';

const store = {
  userList: [],
  user: undefined,
};
export const setter = {
  async userList (newUser) {
    const result = await setUserList();
    store.userList = result;

    const user = newUser ? newUser :
      (result[0] ? result[0] : undefined);
    this.user(user);

    newUser && userListRender();
  },
  user (value) {
    store.user = value;
  },
};

export const initStore = async () => {
  await Promise.all([setter.userList()]);
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


