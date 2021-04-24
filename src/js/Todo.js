import { todoAPI } from "./API.js";
import { $ } from "./Dom.js";
import { getUserTodoList, saveUserTodoList } from "./UserTodoList.js";
import { template } from "./Template.js";

const PENDING = "false";
const COMPLETED = "completed";

const todoInput = $("#new-todo-title");
const $todoList = $("#todo-list");
const todoCount = $(".todo-count strong");

const showAllBtn = $(".all");
const completedBtn = $(".completed");
const pendingBtn = $(".active");
const deleteAllBtn = $(".clear-completed");

const priorityList = {
	NONE: "select",
	FIRST: "primary",
	SECOND: "secondary",
};

let todoItemList = [];

// 할 일들의 개수
function setTodoNum() {
	const todoNum = $todoList.children.length;
	todoCount.textContent = todoNum;
}

// 완료 여부 확인
function isComplete(toggle) {
	if (!toggle.checked) {
		return false;
	}
	return true;
}

// todoItem 이벤트
function itemEventTrigger() {
	$todoList.addEventListener("click", setItemState);
	$todoList.addEventListener("click", removeItem);
	$todoList.addEventListener("dblclick", editItem);
	$todoList.addEventListener("keyup", finishEdit);
	$todoList.addEventListener("change", selectPriority);
}

// 리스트 랜더링
export function renderTodoItem(todoItems) {
	const mergedTemplate = todoItems.map((item) => {
		return template.todoItemTemplate(
			item._id,
			item.contents,
			item.isCompleted,
			item.priority
		);
	});
	$todoList.innerHTML = mergedTemplate.join("");
	itemEventTrigger();
	todoItemList = getUserTodoList(); // 얕은 복사
	setTodoNum();
}

// toDoList 업데이트
function updatedTodoItems(_id, contents, isCompleted, priority) {
	const todoItemInfo = {
		_id,
		contents,
		isCompleted,
		priority,
	};
	todoItemList.push(todoItemInfo);
	return todoItemList;
}

// 할 일 추가
function addItem(id, inputText, completed, priority) {
	todoItemList = updatedTodoItems(id, inputText, completed, priority);
	renderTodoItem(todoItemList);
}

// 할 일 입력
async function enterItem(event) {
	if (!event.isComposing && event.key === "Enter") {
		const inputText = todoInput.value;
		if (inputText.length < 2) {
			alert("두 글자 이상으로 적어주세요!");
		} else {
			const user = $(".active");
			const addedItem = await todoAPI.fetchAddItem(
				user.dataset.id,
				inputText
			);
			addItem(addedItem._id, inputText, false, "NONE");
			todoInput.value = "";
		}
	}
}

// 할 일 상태 설정
async function setItemState(event) {
	if (event.target.className === "toggle") {
		//event.target.classList.contains("toggle")
		const $user = $(".active");
		const toggle = event.target;
		toggle.toggleAttribute("checked");
		const $todoItem = toggle.closest("li");
		$todoItem.className = isComplete(toggle) ? COMPLETED : PENDING;
		const idx = todoItemList.findIndex((item) => item._id === $todoItem.id);
		todoItemList[idx].isCompleted = isComplete(toggle) ? true : false;
		await todoAPI.fetchCompleteItem($user.dataset.id, $todoItem.id);
	}
}

// 할 일 삭제
async function removeItem(event) {
	if (event.target.className === "destroy") {
		const $user = $(".active");
		const destroy = event.target;
		const $todoItem = destroy.closest("li");
		$todoList.removeChild($todoItem);
		todoItemList = todoItemList.filter((item) => item._id !== $todoItem.id);
		await todoAPI.fetchDeleteItem($user.dataset.id, $todoItem.id);
		saveUserTodoList($todoItemList); // todoItemList는 새로운 주소값
		setTodoNum();
	}
}

// 할 일 수정
function editItem(event) {
	if (event.target.className === "label") {
		const label = event.target;
		const $todoItem = label.closest("li");
		$todoItem.classList.add("editing");
	}
}

// 수정 종료
async function finishEdit(event) {
	const $todoItem = event.target.closest("li");
	const $user = $(".active");
	if (todoItem.classList.contains("editing")) {
		const edit = event.target;
		const $label = $todoItem.querySelector("label");
		const editText = edit.value;

		if (event.key === "Escape") {
			$todoItem.classList.remove("editing");
			edit.value = $label.textContent;
		}

		if (event.key === "Enter") {
			$todoItem.classList.remove("editing");
			edit.setAttribute("value", editText);
			$label.textContent = editText;
			const idx = todoItemList.findIndex(
				(item) => item._id === $todoItem.id
			);
			todoItemList[idx].contents = editText;
			await todoAPI.fetchEditItem(
				$user.dataset.id,
				$todoItem.id,
				editText
			);
		}
	}
}

// 우선 순위 정하기
async function selectPriority(event) {
	const $todoItem = event.target.closest("li");
	const $user = $(".active");
	if (event.target.classList.contains("chip")) {
		const select = event.target;
		const result = select.value;
		Object.keys(priorityList).map((priority) => {
			if (result === priority) {
				select.classList.remove("select", "primary", "secondary");
				select.classList.add(priorityList[result]);
			}
		});
		await todoAPI.fetchPriority($user.dataset.id, $todoItem.id, result);
		const idx = todoItemList.findIndex((item) => item._id === $todoItem.id);
		todoItemList[idx].priority = result;
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

// 전체 삭제
async function removeAllItems(event) {
	const $user = $(".active");
	$todoList.innerHTML = "";
	setTodoNum();
	await todoAPI.fetchDeleteAll($user.dataset.id);
	todoItemList = [];
	saveUserTodoList(todoItemList);
}

export function todoRole() {
	todoInput.addEventListener("keydown", enterItem);
	showAllBtn.addEventListener("click", showProgress);
	completedBtn.addEventListener("click", showProgress);
	pendingBtn.addEventListener("click", showProgress);
	deleteAllBtn.addEventListener("click", removeAllItems);
}
