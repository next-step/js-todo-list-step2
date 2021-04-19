const BASEURL = "https://js-todo-list-9ca3a.df.r.appspot.com";

const users = [];

const userBtnTemplate = (id, userName, todoList, isActive) =>
	`<!--<user-list-item key=${id} data-_id=${id} data-name=${userName} data-todolist=${todoList} data-active=${
		isActive ? true : false
	}>-->
		<button class=${
			isActive ? "ripple active" : "ripple"
		} data-id=${id} data-action=${
		isActive ? "selectUser" : "notSelected"
	} selectuser="click">
		${userName}</button>
	<!--</user-list-item>-->`;

const renderUserBtn = (newUser) => {
	const userList = document.querySelector("#user-list");
	const newUserTemplate = userBtnTemplate(
		newUser._id,
		newUser.name,
		newUser.todoList,
		false
	);
	userList.insertAdjacentHTML("afterbegin", newUserTemplate);
};

const updateUser = (userData) => {
	users.push({ ...userData, isActive: false });
};

const onUserCreateHandler = async (event) => {
	const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
	if (userName.length >= 2) {
		const userData = await fetchUser(userName);
		updateUser(userData);
		const newUser = users[users.length - 1];
		renderUserBtn(newUser);
	} else alert("Short!");
};

const fetchUser = (userName) => {
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
	const userList = await fetchUserList();
	users.push(...userList);
	renderUserList();
};

const renderUserList = () => {
	users.map((user) => {
		renderUserBtn(user);
	});
};

const userCreateButton = document.querySelector(".user-create-button");
userCreateButton.addEventListener("click", onUserCreateHandler);

showUserList();
