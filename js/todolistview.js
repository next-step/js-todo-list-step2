import { updateCountText } from "./common.js";
import { API as UserAPI } from "./users.js";
import { getSelectedFilter, applySelectedFilter } from "./filterview.js";

export async function initTodos() {
  initTodoInputForm();
  initRemoveAllTodoButton();
  initUsers();
}

function initTodoInputForm() {
  document.querySelector("input.new-todo").addEventListener("keyup", onAddTodo);
}

function initRemoveAllTodoButton() {
  document
    .querySelector("button.clear-completed")
    .addEventListener("click", onRemoveAllTodoClick);
}

async function initUsers() {
  const users = await UserAPI.loadUsers();
  users.map((user) => drawUser(user));
  const userList = document.getElementById("user-list");
  userList.addEventListener("click", onClickUserList);
  userList.addEventListener("contextmenu", onRightClickUser);
}

async function checkDuplicatedTodo(userid, text) {
  const todoList = await UserAPI.loadTodoList(userid);
  return (
    todoList.filter((todoElement) => todoElement.contents === text).length > 0
  );
}

function disableClickedEffectUser(userid) {
  document.getElementById(userid).classList.remove("active");
}

function enableClickedEffectUser(userid) {
  document.getElementById(userid).classList.add("active");
}

function updateHeaderText(text) {
  document.querySelector("h1#user-title span strong").textContent = text;
}

async function onClickUserList({ target }) {
  if (!target || target.nodeName !== "BUTTON") {
    return;
  }

  if (target.hasAttribute("id")) {
    disableClickedEffectUser(UserAPI.getActiveUserID() ?? target.id);
    enableClickedEffectUser(target.id);
    showTodoListLoadingAnimation();
    clearTodoList();

    const clickedUsersTodoList = await UserAPI.loadTodoList(target.id);
    clickedUsersTodoList.map((todoElement) => drawTodo(todoElement));

    updateHeaderText(target.textContent);
    updateCountText();
  } else {
    const newUsername = prompt(
      "What is your name?",
      "DEFAULT_ACCOUNT"
    ).padStart(2, "_");
    const newUserInfo = await UserAPI.addUser(newUsername);
    alert(`New user ${newUserInfo.name}#${newUserInfo._id} added!`);
    drawUser(newUserInfo);
  }
}

// 마우스 우클릭으로 사용자를 제거함.
async function onRightClickUser(event) {
  if (
    event.target &&
    event.target.nodeName === "BUTTON" &&
    event.target.hasAttribute("id")
  ) {
    event.preventDefault();
    if (!confirm(`Delete user ${event.target.textContent}?`)) return;
    const userID = event.target.id;
    UserAPI.deleteUser(userID);
    if (userID === UserAPI.getActiveUserID()) {
      clearTodoList();
    }
    event.target.remove();
  }
}

function drawUser({ _id, name }) {
  if (_id === undefined || name === undefined) return;
  const userList = document.getElementById("user-list");
  const newUserButton = document.createElement("button");
  newUserButton.classList.add("ripple");
  newUserButton.id = _id;
  newUserButton.textContent = name;
  userList.insertBefore(
    newUserButton,
    userList.querySelector('button[class*="user-create-button"]')
  );
}

async function onAddTodo({ target, key }) {
  const newTodoText = target.value.trim();

  if (key != "Enter" || newTodoText.length === 0) {
    target.focus();
    return;
  }

  const userID = UserAPI.getActiveUserID();
  if (userID === null) {
    alert("Select user first!");
    return;
  }

  if (await checkDuplicatedTodo(userID, newTodoText)) {
    alert("That ToDo already exists!");
    return;
  }

  target.value = "";
  const addedTodo = await UserAPI.addTodoElement(userID, newTodoText);
  drawTodo(addedTodo);

  // 현재 보고 있는 할 일들이 완료된 할 일일 경우를 고려, 할 일 추가 후 필터를 다시 적용.
  applySelectedFilter();
}

function isValidTodoElement({ _id, contents, priority, isCompleted }) {
  return (
    _id !== undefined &&
    contents !== undefined &&
    priority !== undefined &&
    isCompleted !== undefined
  );
}

function drawTodo({ _id, contents, priority, isCompleted }) {
  if (!isValidTodoElement({ _id, contents, priority, isCompleted })) {
    return;
  }

  const todoList = document.querySelector("ul.todo-list");
  const li = document.createElement("li");
  const newTodoHTMLElement = `
        <div class="view">
            <input class="toggle" type="checkbox">
            <label class="label">
                <select class="chip select ${
                  priority == "FIRST"
                    ? "primary"
                    : priority == "SECOND"
                    ? "secondary"
                    : ""
                }">
                    <option value="0">순위</option>
                    <option value="1">1순위</option>
                    <option value="2">2순위</option>
                </select>
                <span class="text">
                ${contents}
                </span>
            </label>
            <button class="destroy"></button>
        </div>
        <div class="view loading-animation" style="display:none">
          <label class="label">
            <div class="animated-background">
              <div class="skel-mask-container">
                <div class="skel-mask"></div>
              </div>
            </div>
          </label>
        </div>
        <input class="edit" value="${contents}"></input>
    `;
  li.id = _id;
  li.innerHTML = newTodoHTMLElement;
  li.querySelector(
    `option[value="${priority == "FIRST" ? 1 : priority == "SECOND" ? 2 : 0}"]`
  ).toggleAttribute("selected");

  li.querySelector("select").addEventListener(
    "change",
    changeTodoElementPriority
  );

  li.addEventListener("click", onTodoElementClicked);
  li.addEventListener("dblclick", onTodoElementDblclicked);
  li.addEventListener("keyup", onTodoElementKeyupped);

  todoList.append(li);
  if (isCompleted) {
    li.querySelector("input.toggle").setAttribute("checked", "");
    li.classList.add("completed");
  }

  updateCountText();
}

async function onRemoveAllTodoClick(event) {
  try {
    await UserAPI.deteleAllTodoElement(UserAPI.getActiveUserID());
    clearTodoList();
  } catch (error) {
    alert("할 일을 제거하는 데 실패했습니다!");
  }
}

function onTodoElementClicked({ target }) {
  if (!target) {
    return;
  }

  if (target.nodeName === "INPUT" && target.classList.contains("toggle")) {
    toggleTodoElementCompleted(target);
  } else if (target.nodeName === "BUTTON") {
    removeCurrentTodoElement(target);
  }
}

function onTodoElementDblclicked({ target }) {
  if (target && target.nodeName === "LABEL") {
    toggleTodoElementEditing(target);
  }
}

function onTodoElementKeyupped({ target, key }) {
  if (target && target.nodeName === "INPUT") {
    updateTodoEdit({ target, key });
  }
}

async function changeTodoElementPriority({ target }) {
  // 선택된 option 값은 select 엘리먼트의 value 값.
  const selectedPriority = parseInt(target.value);
  const todoElement = target.closest("li");

  const animationToggler = getTodoElementLoadingAnimationToggler(todoElement);
  animationToggler();

  const updatedTodoElement = await UserAPI.updateTodoElementPriority(
    UserAPI.getActiveUserID(),
    todoElement.id,
    selectedPriority == 0 ? "NONE" : selectedPriority == 1 ? "FIRST" : "SECOND"
  );

  target.classList.remove("primary", "secondary");
  switch (updatedTodoElement.priority) {
    case "FIRST":
      target.value = 1;
      target.classList.add("primary");
      break;
    case "SECOND":
      target.value = 2;
      target.classList.add("secondary");
      break;
    case "NONE":
      target.value = 0;
  }

  animationToggler();
}

async function toggleTodoElementCompleted(target) {
  const todoElement = target.closest("li");

  const animationToggler = getTodoElementLoadingAnimationToggler(todoElement);
  animationToggler();

  const updatedTodoElement = await UserAPI.updateTodoElementStatus(
    UserAPI.getActiveUserID(),
    todoElement.id
  );

  if (updatedTodoElement.isCompleted) {
    todoElement.classList.add("completed");
  } else {
    todoElement.classList.remove("completed");
  }
  animationToggler();

  applySelectedFilter();
  updateCountText();
}

function toggleTodoElementEditing(target) {
  target.closest("li").classList.toggle("editing");
}

async function updateTodoEdit({ target, key }) {
  if (key === "Escape") {
    toggleTodoElementEditing(target);
    return;
  }

  if (key === "Enter") {
    const editingTodoElement = target.closest("li");
    const newTodoText = target.value.trim();
    if (newTodoText.length === 0) {
      target.focus();
      return;
    }

    if (await checkDuplicatedTodo(UserAPI.getActiveUserID(), newTodoText)) {
      alert("That ToDo already exists!");
      target.focus();
      return;
    }

    toggleTodoElementEditing(target);
    const animationToggler = getTodoElementLoadingAnimationToggler(
      editingTodoElement
    );
    animationToggler();

    const updatedTodoElement = await UserAPI.updateTodoElementText(
      UserAPI.getActiveUserID(),
      editingTodoElement.id,
      newTodoText
    );

    editingTodoElement.querySelector("div label span").textContent =
      updatedTodoElement.contents;

    animationToggler();
  }
}

function removeCurrentTodoElement(target) {
  const currentTodoElement = target.closest("li");
  const itemID = currentTodoElement.id;
  UserAPI.deleteTodoElement(UserAPI.getActiveUserID(), itemID);
  currentTodoElement.remove();
  updateCountText();
}

function getTodoElementLoadingAnimationToggler(todoElement) {
  const todoElementContent = todoElement.querySelector("div.view");
  const todoElementAnimation = todoElementContent.nextElementSibling;

  let loading = false;

  return function () {
    loading = !loading;
    if (loading) {
      todoElementContent.style.display = "none";
      todoElementAnimation.style.display = "";
    } else {
      todoElementContent.style.display = "";
      todoElementAnimation.style.display = "none";
    }
  };
}

function showTodoListLoadingAnimation() {
  const animationElement = `
    <li>
        <div class="view">
          <label class="label">
            <div class="animated-background">
            <div class="skel-mask-container">
                <div class="skel-mask"></div>
            </div>
            </div>
          </label>
        </div>
    </li>`;
  clearTodoList(animationElement);
}

function clearTodoList(clearValue = "") {
  document.querySelector("ul.todo-list").innerHTML = clearValue;
  updateCountText();
}
