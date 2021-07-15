const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com";
const API = Object.freeze({
  USER: "/api/users",
  ITEM: "/items",
});

const request = async (url, message = null) => {
  try {
    const res = await fetch(url, message);
    if (!res.ok) {
      throw new Error();
    }
    return await res.json();
  } catch (error) {
    throw new Error(error);
  }
};

const getUserList = async () => {
  const userList = await request(BASE_URL + API.USER);
  return userList;
};

/**
 * @param {string} userId
 */
const getUserTodoList = async (userId) => {
  const todoList = await request(BASE_URL + API.USER + `/${userId}${API.ITEM}`);
  return todoList;
};

export { getUserList, getUserTodoList };
