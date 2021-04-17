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
		onSelectingUser: async (e) => {
			if (!e.target.dataset || !e.target.dataset.id) {
				return;
			}

			const { id } = e.target.dataset;
			const selectedIdx = this.searchSelectedUserIdx(id);

			const { response, error } = await request(env.BASE_URL + env.ITEM(id));

			if (error) {
				alert("사용자 할 일 목록 조회에 실패했습니다.");
				return;
			}

			this.users[selectedIdx].todoList = response.map(
				(todo) =>
					new TodoItemModel({
						...todo,
						id: todo._id
					})
			);

			this.setSelectedUser(selectedIdx);
			this.setUsers([...this.users]);
		},
		onAddUser: async () => {
			const name = prompt("추가하고 싶은 이름을 입력해주세요.");
			const { response, error } = await request(env.BASE_URL + env.USERS, "POST", { name });

			if (error) {
				alert("사용자 등록에 실패했습니다.");
				return;
			}

			this.setUsers([...this.users, new User({ id: response._id, name: response.name, todoList: [] })]);
		},
		onDeleteUser: async () => {
			const answer = confirm(`${this.users[this.selectedUserIdx].name}을 삭제하시겠습니까?`);
			if (!answer) {
				return;
			}

			const { response, error } = await request(
				env.BASE_URL + env.USER(this.users[this.selectedUserIdx].id),
				"DELETE"
			);

			if (error) {
				alert("사용자 삭제에 실패했습니다.");
				return;
			}

			this.users.splice(this.selectedUserIdx, 1);

			this.setUsers([...this.users]);
			this.setSelectedUser(0);
		}
	});

	const countTarget = document.querySelector(".todo-count strong");
	const todoCount = new TodoCount({ target: countTarget });

	const listTarget = document.querySelector(".todo-list");
	const todoList = new TodoList({
		target: listTarget,
		status: null,
		onDeleteButton: (id) => {
			this.users[this.selectedUserIdx].todoList = this.users[this.selectedUserIdx].todoList.filter(
				(item) => item.id !== id
			);
			todoList.setState(this.users[this.selectedUserIdx].todoList);
			todoCount.setState(this.users[this.selectedUserIdx].todoList);
		},
		onCompleted: (id) => {
			this.users[this.selectedUserIdx].todoList = this.users[this.selectedUserIdx].todoList.map((item) => {
				if (item.id === id) {
					item.completed = !item.completed;
				}
				return item;
			});
			todoList.setState(this.users[this.selectedUserIdx].todoList);
			todoCount.setState(this.users[this.selectedUserIdx].todoList);
		},
		onEditing: (id) => {
			this.users[this.selectedUserIdx].todoList = this.users[this.selectedUserIdx].todoList.map((item) => {
				if (item.id === id) {
					item.editing = true;
				}
				return item;
			});
			todoList.setState(this.users[this.selectedUserIdx].todoList);
			todoCount.setState(this.users[this.selectedUserIdx].todoList);
		},
		onEdit: (id) => (event) => {
			if (event.keyCode === KEY_CODE.ESC) {
				this.users[this.selectedUserIdx].todoList.map((item) => {
					if (item.id === id) {
						item.editing = false;
					}
					return item;
				});
				todoList.setState(this.users[this.selectedUserIdx].todoList);
				todoCount.setState(this.users[this.selectedUserIdx].todoList);
			} else if (event.keyCode === KEY_CODE.ENTER) {
				this.users[this.selectedUserIdx].todoList.map((item) => {
					if (item.id === id) {
						item.contents = event.target.value;
						item.editing = false;
					}
					return item;
				});
				todoList.setState(this.users[this.selectedUserIdx].todoList);
				todoCount.setState(this.users[this.selectedUserIdx].todoList);
			}
		}
	});

	this.setState = (updatedItems) => {
		this.users[this.selectedUserIdx].todoList = updatedItems;
		todoList.setState(this.users[this.selectedUserIdx].todoList);
		todoCount.setState(this.users[this.selectedUserIdx].todoList);
	};

	new TodoInput({
		onAdd: (contents) => {
			const newTodoItem = new TodoItemModel({ contents });
			this.users[this.selectedUserIdx].todoList.push(newTodoItem);
			this.setState(this.users[this.selectedUserIdx].todoList);
		}
	});

	new TodoMode({
		target: document.querySelector(".filters"),
		onChangeMode: (mode) => {
			let prevTodoItems;
			switch (mode) {
				case Mode.ALL:
					prevTodoItems = this.users[this.selectedUserIdx].todoList;
					break;
				case Mode.ACTIVE:
					prevTodoItems = this.users[this.selectedUserIdx].todoList.filter((item) => !item.completed);
					break;
				case Mode.COMPLETED:
					prevTodoItems = this.users[this.selectedUserIdx].todoList.filter((item) => item.completed);
					break;
			}
			todoList.setState(prevTodoItems);
			todoCount.setState(prevTodoItems);
		}
	});

	this.render = () => {
		userList.render(this.users, 0);
	};

	this.setUsers = (updatedUsers) => {
		this.users = updatedUsers;
		userList.render(this.users, this.selectedUserIdx);
	};

	this.setSelectedUser = (selectedUserIdx) => {
		this.selectedUserIdx = selectedUserIdx;
		userList.setState(this.users, this.selectedUserIdx);
		todoList.setState(this.users[this.selectedUserIdx].todoList);
	};

	this.render();
}

export default TodoApp;
