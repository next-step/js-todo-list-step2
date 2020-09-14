import { getUserList } from '../endpoint/api.js';

const store = {
  userList: [],
  user: undefined,
};
export const setter = {
  async userList () {
    try {
      const result = await getUserList();
      store.userList = result;
      result[0] && this.user(result[0]);
    } catch (err) {
      console.log(err);
    }
  },
  user (value) {
    store.user = value;
  }
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
  }
};


