import { getUserList } from '../endpoint/api.js';

const store = {
  userList: [],
  name: 'eyabc',
};
export const setter = {
  async userList () {
    try {
      store.userList = await getUserList();
    } catch (err) {
      console.log(err);
    }
  },
};

export const initStore = async () => {
  await Promise.all([setter.userList()]);
};

export const getter = {
  userList () {
    return store.userList;
  },
  name () {
    return store.name;
  },
};


