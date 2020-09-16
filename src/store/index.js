import { getUserList } from '../endpoint/api.js';
import { userListRender } from '../render.js';

const store = {
  userList: [],
  user: undefined,
};
export const setter = {
  async userList (newUser) {
    try {
      const result = await getUserList();
      store.userList = result;
      const user = newUser ? newUser :
        (result[0] ? result[0] : undefined);
      this.user(user);
      userListRender();
    } catch (err) {
      console.log(err);
    }
  },
  user (value) {
    store.user = value;
    // render();
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


