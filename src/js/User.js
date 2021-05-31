import { userAPI } from "./API.js";
import { $, $all } from "./Dom.js";
import { getUserTodoList, newTodoList, pushData } from "./UserTodoList.js";
import { template } from "./Template.js";
import { renderTodoItem } from "./Todo.js";

const users = [];

const userTitle = $("#user-title");
const userList = $("#user-list");

// 로딩
const loadingUser = () => {
	userTitle.innerHTML = `🙏 NOW LOADING... 🙏`;
};

// 유저 타이틀
const getUserTitle = (user) => {
	const title = template.userTitleTemplate(user.dataset.contents);
	userTitle.dataset.username = user.dataset.contents;
	userTitle.innerHTML = title;
};

// 유저 Todo 랜더링
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

// 유저 버튼 클릭 이벤트
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
		else if (userBtn.dataset.id === clickedBtn.dataset.id) {
			userBtn.classList.add("active");
		}
	});
	renderUserTodo(clickedBtn.dataset.id);
};

// 유저 버튼 이벤트 할당
const userBtnEvent = () => {
	const userBtns = $all(".ripple");
	const userBtnsAry = Array.prototype.slice.call(userBtns, 0, -2);
	userBtnsAry.map((userBtn) =>
		userBtn.addEventListener("click", userBtnClicked)
	);
};

// 유저 버튼 랜더링
const renderUserBtn = (newUser) => {
	const newUserTemplate = template.userBtnTemplate(newUser._id, newUser.name);
	userList.insertAdjacentHTML("afterbegin", newUserTemplate);
	userBtnEvent();
};

// 유저 리스트 랜더링
const renderUserList = () => {
	users.map((user) => renderUserBtn(user));
};

// 유저 리스트 업데이트
const updateUser = (userData) => {
	users.push(userData);
};

// 초기 화면 랜더링 (서버에서 유저 리스트 가져오기)
const showUserList = async () => {
	loadingUser();
	const fetchedUserList = await userAPI.fetchUserList();
	users.push(...fetchedUserList);
	renderUserList();
	const userBtn = userList.children[0];
	userBtn.classList.add("active");
	getUserTitle(userBtn);
	renderUserTodo(userBtn.dataset.id);
};

// 유저 생성
const onUserCreateHandler = async (event) => {
	const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
	if (userName && userName.length >= 2) {
		const userData = await userAPI.addUser(userName);
		updateUser(userData);
		const newUser = users[users.length - 1];
		renderUserBtn(newUser);
	} else alert("두 글자 이상으로 적어주세요!");
};

const userCreateButton = $(".user-create-button");
userCreateButton.addEventListener("click", onUserCreateHandler);

// 유저 삭제
const onUserDeleteHandler = async (event) => {
	const clickedUser = $(".active");
	await userAPI.fetchUserDelete(clickedUser.dataset.id);
	userList.removeChild(clickedUser);
};

const userDeleteButton = $(".user-delete-button");
userDeleteButton.addEventListener("click", onUserDeleteHandler);

export { showUserList };
