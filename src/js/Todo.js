import { getUserList, pushData } from "./List.js";

const TODOITEMS = "todoItems";
const PENDING = "pending";
const COMPLETED = "completed";

const todoInput = document.getElementById("new-todo-title");
const todoList = document.getElementById("todo-list");
const todoCount = document.querySelector(".todo-count strong");

const showAllBtn = document.querySelector(".all");
const completedBtn = document.querySelector(".completed");
const pendingBtn = document.querySelector(".active");

let todoItemList = [];

const todoItemTemplate = (id, inputText, completed) =>
	`<li id=${id} class=${completed === COMPLETED ? "completed" : "pending"}>
	<div class="view">
		<input class="toggle" type="checkbox" id=${id} ${
		completed === COMPLETED ? "checked" : ""
	}>
		<label class="label">${inputText}</label>
		<button class="destroy" id=${id}></button>
	</div>
	<input class="edit" value=${inputText}>
</li>
`;

// 할 일들의 개수
function setTodoNum() {
	const todoNum = todoList.children.length;
	todoCount.textContent = todoNum;
}

// 완료 여부 확인
function isComplete(toggle) {
	if (!toggle.checked) {
		return false;
	}
	return true;
}

function itemEventTrigger() {
	todoList.addEventListener("click", setItemState);
	todoList.addEventListener("click", removeItem);
	todoList.addEventListener("dblclick", editItem);
	todoList.addEventListener("keyup", finishEdit);
}

// 리스트 랜더링
export function renderTodoItem(todoItems) {
	const mergedTemplate = todoItems.map((item) =>
		todoItemTemplate(item._id, item.contents, item.isCompleted)
	);
	todoList.innerHTML = mergedTemplate.join("");

	itemEventTrigger();
	todoItemList = getUserList();
}

function updatedTodoItems(_id, contents, isCompleted) {
	const todoItemInfo = {
		_id,
		contents,
		isCompleted,
	};
	todoItemList.push(todoItemInfo);
	return todoItemList;
}

// 할 일 추가
export function addItem(id, inputText, completed) {
	todoItemList = updatedTodoItems(id, inputText, completed);
	renderTodoItem(todoItemList);
	setTodoNum();
	saveData();
}

// 할 일 상태 설정
function setItemState(event) {
	if (event.target.className === "toggle") {
		//event.target.classList.contains("toggle")
		const toggle = event.target;
		toggle.toggleAttribute("checked");
		const todoItem = toggle.closest("li");
		todoItem.className = isComplete(toggle) ? COMPLETED : PENDING;
		const idx = todoItemList.findIndex((item) => item._id === todoItem.id);
		todoItemList[idx].isCompleted = isComplete(toggle)
			? COMPLETED
			: PENDING;
		saveData();
	}
}

// 할 일 삭제
function removeItem(event) {
	if (event.target.className === "destroy") {
		const destroy = event.target;
		const todoItem = destroy.closest("li");
		todoList.removeChild(todoItem);
		todoItemList = todoItemList.filter((item) => item._id !== todoItem._id);
		setTodoNum();
		saveData();
	}
}

// 할 일 수정
function editItem(event) {
	if (event.target.className === "label") {
		const label = event.target;
		const todoItem = label.closest("li");
		todoItem.classList.add("editing");
	}
}

// 수정 종료
function finishEdit(event) {
	const todoItem = event.target.closest("li");
	if (todoItem.classList.contains("editing")) {
		const edit = event.target;
		const label = todoItem.querySelector("label");
		const editText = edit.value;

		if (event.key === "Escape") {
			todoItem.classList.remove("editing");
			edit.value = label.textContent;
		}

		if (event.key === "Enter") {
			todoItem.classList.remove("editing");
			edit.setAttribute("value", editText);
			label.textContent = editText;
		}
	}
}

// 할 일 입력
function enterItem(event) {
	if (event.key === "Enter") {
		const inputText = todoInput.value;
		if (inputText !== "") {
			const id = Date.now().toString();
			addItem(id, inputText, PENDING);
			todoInput.value = "";
		}
	}
}

// 상태별 보기 버튼 설정
function showProgress(event) {
	const completedList = todoItemList.filter(
		(item) => item.isCompleted === COMPLETED
	);
	const pendingList = todoItemList.filter(
		(item) => item.isCompleted === PENDING
	);
	if (event.target === showAllBtn) {
		renderTodoItem(todoItemList);
	}
	if (event.target === completedBtn) {
		renderTodoItem(completedList);
	}
	if (event.target === pendingBtn) {
		renderTodoItem(pendingList);
	}
	setTodoNum();
}

// localStorage
export function saveData() {
	localStorage.setItem(TODOITEMS, JSON.stringify(todoItemList));
}

function loadData() {
	const loadedItems = localStorage.getItem(TODOITEMS);
	if (loadedItems !== null) {
		const parsedItems = JSON.parse(loadedItems);
		parsedItems.map((item) => pushData(item));
		renderTodoItem(parsedItems);
	}
}

export function todoRole() {
	loadData();

	todoInput.addEventListener("keyup", enterItem);
	showAllBtn.addEventListener("click", showProgress);
	completedBtn.addEventListener("click", showProgress);
	pendingBtn.addEventListener("click", showProgress);
}
