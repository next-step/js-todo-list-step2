import { renderTodoItem } from "./Todo.js";

const BASEURL = "https://js-todo-list-9ca3a.df.r.appspot.com";

const users = [];

const userList = document.querySelector("#user-list");

const userBtnTemplate = (id, userName) =>
	`<button class="ripple" data-id=${id}>${userName}</button>`;

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

const userBtnClicked = async (event) => {
	const clickedBtn = event.target;
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
	const selectedUserTodos = await fetchUserTodos(clickedBtn.dataset.id);
	let userTodoList = [];
	if (selectedUserTodos.length === 0) {
		renderTodoItem(userTodoList);
	} else {
		selectedUserTodos.map((todo) => {
			userTodoList.push({
				_id: todo._id,
				contents: todo.contents,
				isCompleted: todo.isCompleted,
			});
			renderTodoItem(userTodoList);
		});
	}
};

const fetchUserTodos = (id) => {
	return fetch(`${BASEURL}/api/users/${id}/items`).then((res) => res.json());
};

const updateUser = (userData) => {
	users.push(userData);
};

const onUserCreateHandler = async (event) => {
	const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
	if (userName && userName.length >= 2) {
		const userData = await addUser(userName);
		updateUser(userData);
		const newUser = users[users.length - 1];
		renderUserBtn(newUser);
	} else alert("두 글자 이상으로 적어주세요!");
};

const addUser = (userName) => {
	return fetch(`${BASEURL}/api/users`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name: `${userName}` }),
	}).then((res) => res.json());
};

const fetchUserList = () => {
	return fetch(`${BASEURL}/api/users`).then((res) => res.json());
};

const showUserList = async () => {
	const fetchedUserList = await fetchUserList();
	users.push(...fetchedUserList);
	renderUserList();
};

const renderUserList = () => {
	users.map((user) => renderUserBtn(user));
};

const userCreateButton = document.querySelector(".user-create-button");
userCreateButton.addEventListener("click", onUserCreateHandler);

export { showUserList, onUserCreateHandler };
