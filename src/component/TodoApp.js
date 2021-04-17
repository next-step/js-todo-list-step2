import TodoInput from "./TodoInput.js";
import TodoItemModel from "./model/TodoItemModel.js";
import User from "./model/User.js";
import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";
import TodoMode from "./TodoMode.js";
import UserList from "./UserList.js";
import TodoAllClear from "./TodoAllClear.js";
import TodoTitle from "./TodoTitle.js";

import KEY_CODE from "../constants/KeyCode.js";
import env from "../constants/env.js";

import request from "../util/request.js";

import onChangeMode from "./events/TodoMode.js";
import onAdd from "./events/TodoInput.js";
import { onDelete, onCompleted, onEditing } from "./events/TodoList.js";
import { onSelectingUser, onAddUser, onDeleteUser } from "./events/UserList.js";

function TodoApp(users) {
	this.users = users.map((user) => {
		return new User({
			id: user._id,
			name: user.name,
			todoList: user.todoList.map(
				(todo) =>
					new TodoItemModel({
						...todo,
						id: todo._id
					})
			)
		});
	});
	this.selectedUserIdx = 0;
	this.searchSelectedUserIdx = (userId) => {
		let i = 0;
		for (; i < this.users.length; i++) {
			if (this.users[i].id === userId) {
				return i;
			}
		}
		return -1;
	};

	const userListTarget = document.querySelector("#user-list");
	const userList = new UserList({
		target: userListTarget,
		onSelectingUser: onSelectingUser.bind(this),
		onAddUser: onAddUser.bind(this),
		onDeleteUser: onDeleteUser.bind(this)
	});

	const countTarget = document.querySelector(".todo-count strong");
	const todoCount = new TodoCount({ target: countTarget });

	const listTarget = document.querySelector(".todo-list");
	const todoList = new TodoList({
		target: listTarget,
		status: null,
		onDeleteButton: onDelete.bind(this),
		onCompleted: onCompleted.bind(this),
		onEditing: onEditing.bind(this),
		onEdit: (id) => async (event) => {
			if (event.keyCode === KEY_CODE.ESC) {
				this.users[this.selectedUserIdx].todoList.map((item) => {
					if (item.id === id) {
						item.editing = false;
					}
					return item;
				});
				this.setTodoItems(this.users[this.selectedUserIdx].todoList);
			} else if (event.keyCode === KEY_CODE.ENTER) {
				const { response, error } = await request(
					env.BASE_URL + env.USER_ITEM(this.users[this.selectedUserIdx].id, id),
					"PUT",
					{ contents: event.target.value }
				);
				if (error) {
					alert("할 일 완료에 실패했습니다.");
					return;
				}

				this.users[this.selectedUserIdx].todoList.map((item) => {
					if (item.id === id) {
						item.contents = event.target.value;
						item.editing = false;
					}
					return item;
				});
				this.setTodoItems(this.users[this.selectedUserIdx].todoList);
			}
		}
	});

	new TodoInput({
		onAdd: onAdd.bind(this)
	});

	new TodoMode({
		target: document.querySelector(".filters"),
		onChangeMode: onChangeMode.bind(this)
	});

	new TodoAllClear({
		target: document.querySelector(".clear-completed"),
		onAllClear: async () => {
			const { response, error } = await request(
				env.BASE_URL + env.ITEM(this.users[this.selectedUserIdx].id),
				"DELETE"
			);
			if (error) {
				alert("할 일 삭제에 실패했습니다.");
				return;
			}

			this.users[this.selectedUserIdx].todoList = [];
			this.setTodoItems(this.users[this.selectedUserIdx].todoList);
		}
	});

	const todoTitle = new TodoTitle(document.querySelector("#user-title strong"));

	this.render = () => {
		userList.render(this.users, 0);

		this.setTodoItems(this.users[0].todoList);
		todoTitle.setState(this.users[0].name);
		todoCount.setState(this.users[0].todoList);
	};

	this.setTodoItems = (updatedTodo) => {
		todoList.setState(updatedTodo);
		todoCount.setState(updatedTodo);
	};

	this.setUsers = (updatedUsers) => {
		this.users = updatedUsers;
		userList.render(this.users, this.selectedUserIdx);

		todoTitle.setState(this.users[this.selectedUserIdx].name);
		todoCount.setState(this.users[this.selectedUserIdx].todoList);
	};

	this.setSelectedUser = (selectedUserIdx) => {
		this.selectedUserIdx = selectedUserIdx;
		userList.setState(this.users, this.selectedUserIdx);

		todoList.setState(this.users[this.selectedUserIdx].todoList);
		todoCount.setState(this.users[this.selectedUserIdx].todoList);
	};

	this.render();
}

export default TodoApp;
