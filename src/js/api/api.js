const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com";
const API = Object.freeze({
  USER: "/api/users",
  ITEM: "/items",
});

/**
 * @param {Object} data
 * @param {string} methodType
 */
const postMessageForm = (data, methodType = "POST") => {
  return {
    method: methodType,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

const deleteMessageForm = () => {
  return {
    method: "DELETE",
  };
};

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

/**
 * @param {Object} userNameForm
 * @param {string} userNameForm.name
 */
const postUser = async (userNameForm) => {
  const message = postMessageForm(userNameForm);
  const userInfo = await request(BASE_URL + API.USER, message);
  return userInfo;
};

/**
 * @param {string} userId
 */
const deleteUser = async (userId) => {
  await request(BASE_URL + API.USER + `/${userId}`, deleteMessageForm());
};

export { getUserList, getUserTodoList, postUser, deleteUser };
