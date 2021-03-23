import { REQUEST_METHODS, fetchRequest } from './util.js';

const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';
let _currentUserId = '';
const userMap = new Map();
const itemMap = new Map();

const userStore = () => {
  const setCurrentUser = (userId) => {
    _currentUserId = userId; //TODO
  };

  const refresh = async () => {
    const userList = await fetchUsers();
    userMap.clear();
    userList.forEach((user) => {
      userMap.set(user._id, user);
    });
  };

  const getUser = async (userId) => {
    return userMap.get(userId) ?? (await fetchUser(userId)); //TODO shouldn't you add to userMap?
  };

  const getUsers = () => {
    return [...Array.from(userMap.values())];
  };

  const fetchUser = async (userId) => {
    return fetchRequest(`${BASE_URL}/api/users/${userId}`);
  };

  const fetchUsers = async () => {
    return fetchRequest(`${BASE_URL}/api/users`);
  };

  const createUser = async (name) => {
    const user = await fetchRequest(
      `${BASE_URL}/api/users`,
      REQUEST_METHODS.post,
      { name }
    );
    userMap.set(user._id, user);
  };

  const deleteUser = async () => {
    await fetchRequest(
      `${BASE_URL}/api/users/${_currentUserId}`,
      REQUEST_METHODS.delete
    );
    userMap.delete(_currentUserId);
    _currentUserId = '';
  };

  return {
    refresh,
    async setUser(userId) {
      setCurrentUser(userId);
      await todoItemStore().refresh(); //TODO
      return getUser(userId);
    },
    getUsers,
    createUser,
    deleteUser,
  };
};

const todoItemStore = () => {
  const refresh = async () => {
    const itemList = await fetchItemList();
    itemMap.clear();
    itemList.forEach((item) => {
      itemMap.set(item._id, item);
    });
  };

  const getItemList = () => {
    return [...Array.from(itemMap.values())];
  };

  const fetchItemList = async () => {
    return fetchRequest(`${BASE_URL}/api/users/${_currentUserId}/items`);
  };

  const createItem = async (contents) => {
    const item = await fetchRequest(
      `${BASE_URL}/api/users/${_currentUserId}/items`,
      REQUEST_METHODS.post,
      { contents }
    );
    itemMap.set(item._id, item);
    return item;
  };

  const deleteItem = async (todoId) => {
    await fetchRequest(
      `${BASE_URL}/api/users/${_currentUserId}/items/${todoId}`,
      REQUEST_METHODS.delete
    );
    itemMap.delete(todoId);
  };

  async function updateItemContents(todoId, contents) {
    const item = await fetchRequest(
      BASE_URL + `/api/users/${_currentUserId}/items/${todoId}`,
      REQUEST_METHODS.put,
      { contents }
    );
    itemMap.set(item._id, item);
    return item;
  }

  async function updateItemToggle(todoId) {
    const item = await fetchRequest(
      BASE_URL + `/api/users/${_currentUserId}/items/${todoId}/toggle`,
      REQUEST_METHODS.put
    );
    itemMap.set(item._id, item);
    return item;
  }

  return {
    refresh,
    getItemList,
    createItem,
    deleteItem,
    updateItemContents,
    updateItemToggle,
  };
};

export { userStore, todoItemStore };
