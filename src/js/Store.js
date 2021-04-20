import { isEmptyObject } from './Helper/util.js';
import { getUserId, getUserName } from './Helper/UserHelper.js';

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

const FindUserInArray = (list, findUser = {}) => {
  if (isEmptyObject(findUser)) {
    return list[0];
  }
  const findUserId = getUserId(findUser);
  return list.find((user) => getUserId(user) === findUserId) || list[0];
};

export const getSelectedUserId = () => getUserId(selectedUser);
export const getSelectedUserName = () => getUserName(selectedUser);
