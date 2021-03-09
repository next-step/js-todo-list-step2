import { serverURL } from "./common.js";

export const API = {
  getActiveUserID,
  loadUser,
  loadUsers,
  addUser,
  deleteUser,
  loadTodoList,
  addTodoElement,
  deteleAllTodoElement,
  deleteTodoElement,
  updateTodoElementText,
  updateTodoElementPriority,
  updateTodoElementStatus,
};

function getActiveUserID() {
  const selectedUser = document.querySelector("div#user-list button.active");
  return selectedUser === null ? null : selectedUser.id;
}

async function loadUser(userid) {
  let userInfo = {};
  await fetch(`${serverURL}/api/users/${userid}`)
    .then(jsonifyData)
    .then((jsonResponse) => (userInfo = responseChecker(jsonResponse)))
    .catch(errorHandler);
  return userInfo;
}

async function loadUsers() {
  let todoListBulk = [];
  await fetch(`${serverURL}/api/users`)
    .then(jsonifyData)
    .then((jsonResponse) => (todoListBulk = jsonResponse))
    .catch(errorHandler);
  return todoListBulk;
}

async function addUser(newUsername) {
  let addedUserInfo = {};
  await fetch(
    `${serverURL}/api/users`,
    requestOption.post({ name: newUsername })
  )
    .then(jsonifyData)
    .then((jsonResponse) => (addedUserInfo = responseChecker(jsonResponse)))
    .catch(errorHandler);

  return addedUserInfo;
}

function deleteUser(userid) {
  fetch(`${serverURL}/api/users/${userid}`, requestOption.delete());
}

async function loadTodoList(userid) {
  let todoList = [];
  await fetch(`${serverURL}/api/users/${userid}/items/`)
    .then(jsonifyData)
    .then((jsonResponse) => (todoList = responseChecker(jsonResponse)))
    .catch(errorHandler);
  return todoList;
}

async function addTodoElement(userid, text) {
  let todoElement = {};
  await fetch(
    `${serverURL}/api/users/${userid}/items/`,
    requestOption.post({ contents: text })
  )
    .then(jsonifyData)
    .then((jsonResponse) => (todoElement = responseChecker(jsonResponse)))
    .catch(errorHandler);
  return todoElement;
}

async function deteleAllTodoElement(userid) {
  let result = false;
  await fetch(`${serverURL}/api/users/${userid}/items/`, requestOption.delete())
    .then(jsonifyData)
    .then((jsonResponse) => (result = jsonResponse.success));
  return result;
}

async function deleteTodoElement(userid, itemid) {
  await fetch(
    `${serverURL}/api/users/${userid}/items/${itemid}`,
    requestOption.delete()
  );
}

async function updateTodoElementText(userid, itemid, text) {
  let updatedTodoElement = {};
  await fetch(
    `${serverURL}/api/users/${userid}/items/${itemid}`,
    requestOption.put({ contents: text })
  )
    .then(jsonifyData)
    .then(
      (jsonResponse) => (updatedTodoElement = responseChecker(jsonResponse))
    )
    .catch(errorHandler);
  return updatedTodoElement;
}

async function updateTodoElementPriority(userid, itemid, priority) {
  let updatedTodoElement = {};
  await fetch(
    `${serverURL}/api/users/${userid}/items/${itemid}/priority`,
    requestOption.put({ priority: priority })
  )
    .then(jsonifyData)
    .then(
      (jsonResponse) => (updatedTodoElement = responseChecker(jsonResponse))
    )
    .catch(errorHandler);
  return updatedTodoElement;
}

async function updateTodoElementStatus(userid, itemid) {
  let updatedTodoElement = {};
  await fetch(
    `${serverURL}/api/users/${userid}/items/${itemid}/toggle`,
    requestOption.put()
  )
    .then(jsonifyData)
    .then(
      (jsonResponse) => (updatedTodoElement = responseChecker(jsonResponse))
    )
    .catch(errorHandler);
  return updatedTodoElement;
}

const requestOption = {
  post: (data) => {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  },
  put: (data) => {
    return {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  },
  delete: () => {
    return {
      method: "DELETE",
    };
  },
};

function jsonifyData(data) {
  return data.json();
}

function responseChecker(jsonResponse) {
  if (jsonResponse.message) {
    throw new Error(jsonResponse.message);
  }
  return jsonResponse;
}

function errorHandler(error) {
  alert(error);
}
