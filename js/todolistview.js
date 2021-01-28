import { updateCountText } from "./common.js";
import {
  loadUser,
  loadUsers,
  loadTodoList,
  addUser,
  deleteUser,
  addTodoElement,
  deleteTodoElement,
  deteleAllTodoElement,
  updateTodoElementPriority,
  updateTodoElementStatus,
  updateTodoElementText,
  getActiveUserID,
} from "./users.js";
import { getSelectedFilter, applySelectedFilter } from "./filterview.js";

export async function initTodos() {
  // 새로운 할 일 입력폼에 이벤트 리스너 등록.
  document.querySelector("input.new-todo").addEventListener("keyup", onAddTodo);

  // 모든(또는 완료된?) 할 일 제거 버튼에 이벤트 리스너 등록.
  document
    .querySelector("button.clear-completed")
    .addEventListener("click", onRemoveAllTodoClick);

  // 사용자 추가 및 제거 이벤트 처리기 등록.
  const allData = await loadUsers();
  allData.map((data) => drawUser(data));
  const userList = document.getElementById("user-list");
  userList.addEventListener("click", onClickUserList);
  userList.addEventListener("contextmenu", onRightClickUser);
}

async function checkDuplicates(userid, text) {
  const todoList = await loadTodoList(userid);
  return (
    todoList.filter((todoElement) => todoElement.contents === text).length > 0
  );
}

async function onClickUserList({ target }) {
  if (target && target.nodeName === "BUTTON") {
    // 사용자 선택.
    if (target.getAttribute("id")) {
      // 선택된 사용자만 강조 표시.
      document
        .getElementById(getActiveUserID() ?? target.id)
        .classList.remove("active");
      target.classList.add("active");
      // 선택된 사용자의 할 일 표시.
      showTodoListLoadingAnimation();
      const todoList = await loadTodoList(target.id);
      clearTodoList();
      todoList.map((todoElement) => drawTodo(todoElement));
      // 헤더 텍스트 변경.
      document.querySelector("h1#user-title span strong").innerText =
        target.innerText;
      updateCountText();
      // 사용자 추가.
    } else {
      const newUsername = prompt(
        "What is your name?",
        "DEFAULT_ACCOUNT"
      ).padStart(2, "_");
      const newUserInfo = await addUser(newUsername);
      alert(`New user ${newUserInfo.name}#${newUserInfo._id} added!`);
      drawUser(newUserInfo);
    }
  }
}

// 사용자 제거 함수.
async function onRightClickUser(event) {
  if (
    event.target &&
    event.target.nodeName === "BUTTON" &&
    event.target.getAttribute("id")
  ) {
    event.preventDefault();
    if (!confirm(`Delete user ${event.target.innerText}?`)) return;
    const userID = event.target.id;
    deleteUser(userID);
    // 만약 현재 선택된 사용자를 제거한다면 할 일 목록도 초기화.
    if (userID === getActiveUserID()) {
      clearTodoList();
    }
    event.target.remove();
  }
}

// 사용자 버튼을 그리는 함수.
function drawUser({ _id, name }) {
  if (_id === undefined || name === undefined) return;
  const userList = document.getElementById("user-list");
  const newUserButton = document.createElement("button");
  newUserButton.classList.add("ripple");
  newUserButton.id = _id;
  newUserButton.innerText = name;
  userList.insertBefore(
    newUserButton,
    userList.querySelector('button[class*="user-create-button"]')
  );
}

// 사용자 입력으로 새로운 할 일이 추가되는 함수
async function onAddTodo(event) {
  // 기본적인 예외 처리(공백 문자열, 중복 할 일 등)
  const newTodoInput = event.target;
  const newTodoText = newTodoInput.value.trimStart().trimEnd();
  if (event.key != "Enter" || newTodoText.length === 0) {
    newTodoInput.focus();
    return;
  }

  const userID = getActiveUserID();
  if (userID === null) {
    alert("Select user first!");
    return;
  }

  if (await checkDuplicates(userID, newTodoText)) {
    alert("That ToDo already exists!");
    return;
  }

  newTodoInput.value = "";
  const addedTodo = await addTodoElement(userID, newTodoText);
  drawTodo(addedTodo);

  // 현재 보고 있는 할 일들이 완료된 할 일일 경우를 고려, 할 일 추가 후 필터를 다시 적용.
  applySelectedFilter();
}

// 할 일 추가 시 실제로 HTML 요소를 그리는 함수
function drawTodo({ _id, contents, priority, isCompleted }) {
  if (
    !_id === undefined ||
    !contents === undefined ||
    !priority === undefined ||
    isCompleted === undefined
  ) {
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
        <input class="edit" value="${contents}"></input>
    `;
  // 추후 접근 편의를 위해 <li> 태그의 id를 해당 할 일의 고유값으로 설정.
  li.id = _id;
  li.innerHTML = newTodoHTMLElement;
  // 해당 할 일의 순위값 설정, 이벤트 처리기 등록.
  li.querySelector(
    `option[value="${priority == "FIRST" ? 1 : priority == "SECOND" ? 2 : 0}"]`
  ).toggleAttribute("selected");
  li.querySelector("select").addEventListener(
    "change",
    changeTodoElementPriority
  );
  // 해당 할 일에 대한 클릭(완료 상태 토글, 삭제), 더블클릭(편집모드 진입), 키 입력(편집모드 종료, 변경내역 반영) 이벤트 처리기 등록.
  li.addEventListener("click", onTodoElementClicked);
  li.addEventListener("dblclick", onTodoElementDblclicked);
  li.addEventListener("keyup", onTodoElementKeyupped);
  todoList.append(li);
  // 만약 해당 할 일이 완료된 할 일이라면 토글.
  // 이번에는 Event를 발생시키지 않음!! 이벤트 처리기 때문에 토글이 풀리는 문제가 발생.
  if (isCompleted) {
    li.querySelector("input.toggle").setAttribute("checked", "");
    li.classList.add("completed");
  }
  updateCountText();
}

// 모든 할 일들 제거.
async function onRemoveAllTodoClick(event) {
  if (await deteleAllTodoElement(getActiveUserID())) {
    clearTodoList();
  } else {
    // TODO: notify user that operation is failed.
  }
}

// 할 일을 클릭했을때 이벤트 위임.
function onTodoElementClicked(event) {
  if (!event.target) {
    return;
  }

  if (
    event.target.nodeName === "INPUT" &&
    event.target.classList.contains("toggle")
  ) {
    toggleTodoElementStatus(event);
  } else if (event.target.nodeName === "BUTTON") {
    removeCurrentTodoElement(event);
  }
}

// 할 일을 더블클릭했을때 이벤트 위임.
function onTodoElementDblclicked(event) {
  if (event.target && event.target.nodeName === "LABEL") {
    toggleTodoElementMode(event);
  }
}

// 할 일을 조작 중 키를 입력했을때 이벤트 위임.
function onTodoElementKeyupped(event) {
  if (event.target && event.target.nodeName === "INPUT") {
    updateTodoEdit(event);
  }
}

// 할 일의 우선순위 변경.
async function changeTodoElementPriority({ target }) {
  target.toggleAttribute("disabled");
  const selectedPriority = parseInt(target.value); // 선택된 option 값은 select 요소의 value로 존재!
  const userID = getActiveUserID();
  const todoElementID = target.closest("li").getAttribute("id");

  const updatedTodoElement = await updateTodoElementPriority(
    userID,
    todoElementID,
    selectedPriority == 0 ? "NONE" : selectedPriority == 1 ? "FIRST" : "SECOND"
  );
  // 서버측 결과에 따라 스타일, 선택 항목 적용.
  switch (updatedTodoElement.priority) {
    case "FIRST":
      target.value = 1;
      target.classList.remove("secondary");
      target.classList.add("primary");
      break;
    case "SECOND":
      target.value = 2;
      target.classList.remove("primary");
      target.classList.add("secondary");
      break;
    case "NONE":
      target.value = 0;
      target.classList.remove("primary");
      target.classList.remove("secondary");
  }
  target.toggleAttribute("disabled");
}

// 할 일 완료 여부 설정/해제.
async function toggleTodoElementStatus({ target }) {
  target.toggleAttribute("disabled");
  const todoElement = target.closest("li");
  const updatedTodoElement = await updateTodoElementStatus(
    getActiveUserID(),
    todoElement.id
  );
  // checked 속성을 toggle input에 넣어줄 필요가 없는듯?
  if (updatedTodoElement.isCompleted) {
    // target.setAttribute('checked', '')
    todoElement.classList.add("completed");
  } else {
    // target.removeAttribute('checked')
    todoElement.classList.remove("completed");
  }
  target.toggleAttribute("disabled");
  applySelectedFilter();
  updateCountText();
}

// 할 일을 더블클릭 했을 때 편집 모드 토글.
function toggleTodoElementMode({ target }) {
  target.closest("li").classList.toggle("editing");
}

// 할 일 변경 이벤트 처리기.
async function updateTodoEdit({ target, key }) {
  const todoElement = target.closest("li");
  if (key === "Escape") {
    todoElement.classList.toggle("editing");
  } else if (key === "Enter") {
    target.toggleAttribute("disabled");
    const newTodoText = target.value.trimStart().trimEnd();
    if (newTodoText.length === 0) {
      target.focus();
    }

    if (await checkDuplicates(getActiveUserID(), newTodoText)) {
      alert("That ToDo already exists!");
      return;
    }

    const updatedTodoElement = await updateTodoElementText(
      getActiveUserID(),
      todoElement.id,
      newTodoText
    );
    // HTML 요소에서도 변경사항 적용 후 편집모드 종료.
    todoElement.querySelector("div label span").innerText =
      updatedTodoElement.contents;
    todoElement.classList.toggle("editing");
    target.toggleAttribute("disabled");
  }
}

// 할 일 삭제 이벤트 처리기.
function removeCurrentTodoElement({ target }) {
  const todoElement = target.closest("li");
  const itemID = todoElement.id;
  deleteTodoElement(getActiveUserID(), itemID);
  target.closest("li").remove();
  updateCountText();
}

// 로딩 애니메이션 표시. 할 일 리스트 전체를 불러올때만 적용.
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

// 할 일 리스트 초기화.
function clearTodoList(clearValue = "") {
  document.querySelector("ul.todo-list").innerHTML = clearValue;
  updateCountText();
}
