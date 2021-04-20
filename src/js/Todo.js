import { BASEURL } from "./API.js";
import { getUserTodoList, saveUserTodoList } from "./List.js";

// const TODOITEMS = "todoItems";
const PENDING = "false";
const COMPLETED = "completed";

const todoInput = document.getElementById("new-todo-title");
const todoList = document.getElementById("todo-list");
const todoCount = document.querySelector(".todo-count strong");

const showAllBtn = document.querySelector(".all");
const completedBtn = document.querySelector(".completed");
const pendingBtn = document.querySelector(".active");
const deleteAllBtn = document.querySelector(".clear-completed");

let todoItemList = [];

const todoItemTemplate = (id, inputText, completed) =>
	`<li id=${id} class=${completed ? "completed" : "false"}>
	<div class="view">
		<input class="toggle" type="checkbox" id=${id} ${completed ? "checked" : ""}>
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
	todoItemList = getUserTodoList();
	setTodoNum();
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
	// saveData();
}

// 할 일 상태 설정
async function setItemState(event) {
	if (event.target.className === "toggle") {
		//event.target.classList.contains("toggle")
		const user = document.querySelector(".active");
		const toggle = event.target;
		toggle.toggleAttribute("checked");
		const todoItem = toggle.closest("li");
		todoItem.className = isComplete(toggle) ? COMPLETED : PENDING;
		const idx = todoItemList.findIndex((item) => item._id === todoItem.id);
		todoItemList[idx].isCompleted = isComplete(toggle) ? true : false;
		await fetchCompleteItem(user.dataset.id, todoItem.id);
		// saveUserTodoList(todoItemList);
		// saveData();
	}
}

// 할 일 삭제
async function removeItem(event) {
	if (event.target.className === "destroy") {
		const user = document.querySelector(".active");
		const destroy = event.target;
		const todoItem = destroy.closest("li");
		todoList.removeChild(todoItem);
		todoItemList = todoItemList.filter((item) => item._id !== todoItem.id);
		await fetchDeleteItem(user.dataset.id, todoItem.id);
		saveUserTodoList(todoItemList);
		setTodoNum();
		// saveData();
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
async function finishEdit(event) {
	const todoItem = event.target.closest("li");
	const user = document.querySelector(".active");
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
			await fetchEditItem(user.dataset.id, todoItem.id, editText);
			const idx = todoItemList.findIndex(
				(item) => item._id === todoItem.id
			);
			todoItemList[idx].contents = editText;
		}
	}
}

// 할 일 입력
async function enterItem(event) {
	if (!event.isComposing && event.key === "Enter") {
		const inputText = todoInput.value;
		if (inputText.length >= 2) {
			const user = document.querySelector(".active");
			const addedItem = await fetchAddItem(user.dataset.id, inputText);
			addItem(addedItem._id, inputText, false);
			todoInput.value = "";
		} else alert("두 글자 이상으로 적어주세요!");
	}
}

// 상태별 보기 버튼 설정
function showProgress(event) {
	const completedList = todoItemList.filter(
		(item) => item.isCompleted === true
	);
	const pendingList = todoItemList.filter(
		(item) => item.isCompleted === false
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

async function removeAllItems(event) {
	const user = document.querySelector(".active");
	todoList.innerHTML = "";
	setTodoNum();
	await fetchDeleteAll(user.dataset.id);
	todoItemList = [];
	saveUserTodoList(todoItemList);
}

// localStorage
// export function saveData() {
// 	localStorage.setItem(TODOITEMS, JSON.stringify(todoItemList));
// }

// function loadData() {
// 	const loadedItems = localStorage.getItem(TODOITEMS);
// 	if (loadedItems !== null) {
// 		const parsedItems = JSON.parse(loadedItems);
// 		parsedItems.map((item) => pushData(item));
// 	}
// }

export function todoRole() {
	// loadData();
	// todoItemList = getUserTodoList();
	todoInput.addEventListener("keydown", enterItem);
	showAllBtn.addEventListener("click", showProgress);
	completedBtn.addEventListener("click", showProgress);
	pendingBtn.addEventListener("click", showProgress);
	deleteAllBtn.addEventListener("click", removeAllItems);
}

const fetchAddItem = (userId, inputText) => {
	return fetch(`${BASEURL}/api/users/${userId}/items`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ contents: `${inputText}` }),
	}).then((res) => res.json());
};

const fetchDeleteItem = (userId, itemId) => {
	return fetch(`${BASEURL}/api/users/${userId}/items/${itemId}`, {
		method: "DELETE",
	});
};

const fetchCompleteItem = (userId, itemId) => {
	return fetch(`${BASEURL}/api/users/${userId}/items/${itemId}/toggle`, {
		method: "PUT",
	}).then((res) => res.json());
};

const fetchEditItem = (userId, itemId, inputText) => {
	return fetch(`${BASEURL}/api/users/${userId}/items/${itemId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ contents: `${inputText}` }),
	});
};

const fetchDeleteAll = (userId) => {
	return fetch(`${BASEURL}/api/users/${userId}/items`, { method: "DELETE" });
};
