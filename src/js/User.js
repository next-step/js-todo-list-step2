import { userAPI } from "./API.js";
import { getUserTodoList, newTodoList, pushData } from "./List.js";
import { renderTodoItem } from "./Todo.js";

const users = [];

const userTitle = document.querySelector("#user-title");
const userList = document.querySelector("#user-list");

const userTitleTemplate = (userName) =>
	`<span><strong>${userName}</strong>'s Todo List</span>`;
const userBtnTemplate = (id, userName) =>
	`<button class="ripple" data-id=${id} data-contents=${userName}>${userName}</button>`;

const loadingUser = () => {
	userTitle.innerHTML = `🙏 NOW LOADING... 🙏`;
};

const userBtnEvent = () => {
	const userBtns = document.querySelectorAll(".ripple");
	const userBtnsAry = Array.prototype.slice.call(userBtns, 0, -2);
	userBtnsAry.map((userBtn) =>
		userBtn.addEventListener("click", userBtnClicked)
	);
};

const renderUserBtn = (newUser) => {
	const newUserTemplate = userBtnTemplate(newUser._id, newUser.name);
	userList.insertAdjacentHTML("afterbegin", newUserTemplate);
	userBtnEvent();
};

const getUserTitle = (user) => {
	const title = userTitleTemplate(user.dataset.contents);
	userTitle.dataset.username = user.dataset.contents;
	userTitle.innerHTML = title;
};

const renderUserTodo = async (userId) => {
	const selectedUserTodos = await userAPI.fetchUserTodos(userId);
	newTodoList();
	if (selectedUserTodos.length === 0) {
		renderTodoItem(getUserTodoList());
	} else {
		selectedUserTodos.map((todo) => {
			const todoItem = {
				_id: todo._id,
				contents: todo.contents,
				isCompleted: todo.isCompleted,
				priority: todo.priority,
			};
			pushData(todoItem);
			renderTodoItem(getUserTodoList());
		});
	}
};

const userBtnClicked = (event) => {
	const clickedBtn = event.target;
	getUserTitle(clickedBtn);
	const userBtns = userList.children;
	const userBtnsAry = Array.prototype.slice.call(userBtns, 0, -2);
	userBtnsAry.map((userBtn) => {
		if (
			userBtn.dataset.id !== clickedBtn.dataset.id &&
			userBtn.classList.contains("active")
		)
			userBtn.classList.remove("active");
		else if (userBtn.dataset.id === clickedBtn.dataset.id)
			userBtn.classList.add("active");
	});
	renderUserTodo(clickedBtn.dataset.id);
};

const updateUser = (userData) => {
	users.push(userData);
};

const onUserCreateHandler = async (event) => {
	const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
	if (userName && userName.length >= 2) {
		const userData = await userAPI.addUser(userName);
		updateUser(userData);
		const newUser = users[users.length - 1];
		renderUserBtn(newUser);
	} else alert("두 글자 이상으로 적어주세요!");
};

const showUserList = async () => {
	loadingUser();
	const fetchedUserList = await userAPI.fetchUserList();
	users.push(...fetchedUserList);
	renderUserList();
	const userBtn = userList.children[0];
	userBtn.classList.add("active");
	renderUserTodo(userBtn.dataset.id);
	getUserTitle(userBtn);
};

const renderUserList = () => {
	users.map((user) => renderUserBtn(user));
};

const onUserDeleteHandler = async (event) => {
	const clickedUser = document.querySelector(".active");
	await userAPI.fetchUserDelete(clickedUser.dataset.id);
	userList.removeChild(clickedUser);
};

const userCreateButton = document.querySelector(".user-create-button");
userCreateButton.addEventListener("click", onUserCreateHandler);

const userDeleteButton = document.querySelector(".user-delete-button");
userDeleteButton.addEventListener("click", onUserDeleteHandler);

export { showUserList };
