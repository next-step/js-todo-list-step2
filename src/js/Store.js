import { isEmptyObject } from './helper/util.js';

let userList = [];
const userListListeners = [];

let selectedUser = {};
const selectedUserListeners = [];

export const subscribeUserList = (callbackFunction) =>
  userListListeners.push(callbackFunction);

export const subscribeSelectedUser = (callbackFunction) =>
  selectedUserListeners.push(callbackFunction);

const publishUserList = () => {
  userListListeners.map((listener) => listener(userList, selectedUser));
};

const publishSelectedUser = () =>
  selectedUserListeners.map((listener) => listener(selectedUser));

export const setUserList = (updateUserList, updateSelectedUser) => {
  const updateSelectedUserDataFromUserList = FindUserInArray(
    updateUserList,
    updateSelectedUser
  );
  userList = updateUserList;
  setSelectedUser(updateSelectedUserDataFromUserList);
  publishUserList();
};

export const setSelectedUser = (update) => {
  selectedUser = update;
  publishSelectedUser();
};

const FindUserInArray = (list, findUser = {}) =>
  isEmptyObject(findUser) || findUser._id.length === 0
    ? list[0]
    : list.find((user) => user._id === findUser._id);
