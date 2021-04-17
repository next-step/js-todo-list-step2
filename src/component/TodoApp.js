import TodoInput from "./TodoInput.js";
import TodoItemModel from "./model/TodoItemModel.js";
import User from "./model/User.js";
import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";
import TodoMode from "./TodoMode.js";
import UserList from "./UserList.js";

import KEY_CODE from "../constants/KeyCode.js";
import Mode from "../constants/Mode.js";
import env from "../constants/env.js";

import request from "../util/request.js";

function TodoApp(users) {
	let id = 0;
	this.users = users.map((user) => new User({ id: user._id, name: user.name, todoList: user.todoList }));
	this.selectedUserIdx = 0;

	const userListTarget = document.querySelector("#user-list");
	const userList = new UserList({
		target: userListTarget,
		onSelectingUser: () => {},
		onAddUser: async () => {
			const name = prompt("추가하고 싶은 이름을 입력해주세요.");
			const { response, error } = await request(env.BASE_URL + env.USERS, "POST", { name });

			if (error) {
				alert("사용자 등록에 실패했습니다.");
				return;
			}

			this.setUsers([...this.users, new User({ id: response._id, name: response.name, todoList: [] })]);
		},
		onDeleteUser: () => {}
	});

	this.setUsers = (updatedUsers) => {
		this.users = updatedUsers;
		userList.render(this.users, this.selectedUserIdx);
	};

	this.render = () => {
		userList.render(this.users, 0);
	};

	this.render();
}

export default TodoApp;
