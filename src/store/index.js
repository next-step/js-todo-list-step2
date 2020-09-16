import { setUserList } from '../endpoint/service.js';
import { userListRender } from '../render.js';

const store = {
  userList: [],
  user: undefined,
};
/* store 를 변경하는 함수는 set 으로 시작됩니다. */
export const setter = {
  async userList () {
    const result = await setUserList();
    store.userList = result;
  },
  user (userId) {
    store.user = userId ?
      store.userList.find(user => user._id === userId) :
      store.userList[0];

    userId && userListRender()
  },
};

export const initStore = async () => {
  await setter.userList();
  setter.user();
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


