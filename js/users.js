import { serverURL } from "./common.js";

export function getActiveUserID() {
  const selectedUser = document.querySelector("div#user-list button.active");
  return selectedUser === null ? null : selectedUser.id;
}

export async function loadUser(userid) {
  let userInfo = {};
  await fetch(`${serverURL}/api/users/${userid}`)
    .then(jsonifyData)
    .then((jsonResponse) => (userInfo = responseChecker(jsonResponse)))
    .catch(errorHandler);
  return userInfo;
}

export async function loadUsers() {
  let todoListBulk = [];
  await fetch(`${serverURL}/api/users`)
    .then(jsonifyData)
    .then((jsonResponse) => (todoListBulk = jsonResponse))
    .catch(errorHandler);
  return todoListBulk;
}

export async function addUser(newUsername) {
  let addedUserInfo = {};
  await fetch(
    `${serverURL}/api/users`,
    requestOptionWithJsonData("POST", { name: newUsername })
  )
    .then(jsonifyData)
    .then((jsonResponse) => (addedUserInfo = responseChecker(jsonResponse)))
    .catch(errorHandler);

  return addedUserInfo;
}

export function deleteUser(userid) {
  fetch(`${serverURL}/api/users/${userid}`, requestOption("DELETE"));
}

export async function loadTodoList(userid) {
  let todoList = [];
  await fetch(`${serverURL}/api/users/${userid}/items/`)
    .then(jsonifyData)
    .then((jsonResponse) => (todoList = responseChecker(jsonResponse)))
    .catch(errorHandler);
  return todoList;
}

export async function addTodoElement(userid, text) {
  let todoElement = {};
  await fetch(
    `${serverURL}/api/users/${userid}/items/`,
    requestOptionWithJsonData("POST", { contents: text })
  )
    .then(jsonifyData)
    .then((jsonResponse) => (todoElement = responseChecker(jsonResponse)))
    .catch(errorHandler);
  return todoElement;
}

export async function deteleAllTodoElement(userid) {
  let result = false;
  await fetch(
    `${serverURL}/api/users/${userid}/items/`,
    requestOption("DELETE")
  )
    .then(jsonifyData)
    .then((jsonResponse) => (result = jsonResponse.success));
  return result;
}

export async function deleteTodoElement(userid, itemid) {
  await fetch(
    `${serverURL}/api/users/${userid}/items/${itemid}`,
    requestOption("DELETE")
  );
}

export async function updateTodoElementText(userid, itemid, text) {
  let updatedTodoElement = {};
  await fetch(
    `${serverURL}/api/users/${userid}/items/${itemid}`,
    requestOptionWithJsonData("PUT", { contents: text })
  )
    .then(jsonifyData)
    .then(
      (jsonResponse) => (updatedTodoElement = responseChecker(jsonResponse))
    )
    .catch(errorHandler);
  return updatedTodoElement;
}

export async function updateTodoElementPriority(userid, itemid, priority) {
  let updatedTodoElement = {};
  await fetch(
    `${serverURL}/api/users/${userid}/items/${itemid}/priority`,
    requestOptionWithJsonData("PUT", { priority: priority })
  )
    .then(jsonifyData)
    .then(
      (jsonResponse) => (updatedTodoElement = responseChecker(jsonResponse))
    )
    .catch(errorHandler);
  return updatedTodoElement;
}

export async function updateTodoElementStatus(userid, itemid) {
  let updatedTodoElement = {};
  await fetch(
    `${serverURL}/api/users/${userid}/items/${itemid}/toggle`,
    requestOption("PUT")
  )
    .then(jsonifyData)
    .then(
      (jsonResponse) => (updatedTodoElement = responseChecker(jsonResponse))
    )
    .catch(errorHandler);
  return updatedTodoElement;
}

function requestOption(method) {
  return { method: method };
}

function requestOptionWithJsonData(method, data) {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
}

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
