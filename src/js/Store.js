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
  if (isEmptyObject(selectedUser)) {
    resetSelectedUser();
  }
  userListListeners.map((listener) => listener(userList, selectedUser));
};

const publishSelectedUser = () =>
  selectedUserListeners.map((listener) => listener(selectedUser));

export const setUserList = (update) => {
  userList = update;
  publishUserList();
};

export const setSelectedUser = (update) => {
  selectedUser = update;
  publishSelectedUser();
};

export const getSelectedUser = () => selectedUser;

export const resetSelectedUser = () => setSelectedUser(userList[0]);
