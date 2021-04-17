import TodoItemModel from "../model/TodoItemModel.js";
import User from "../model/User.js";

import request from "../../util/request.js";

import env from "../../constants/env.js";

export async function onSelectingUser(e) {
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
}

export async function onAddUser() {
	const name = prompt("추가하고 싶은 이름을 입력해주세요.");
	const { response, error } = await request(env.BASE_URL + env.USERS, "POST", { name });

	if (error) {
		alert("사용자 등록에 실패했습니다.");
		return;
	}

	this.setUsers([...this.users, new User({ id: response._id, name: response.name, todoList: [] })]);
}

export async function onDeleteUser() {
	const answer = confirm(`${this.users[this.selectedUserIdx].name}을 삭제하시겠습니까?`);
	if (!answer) {
		return;
	}

	const { response, error } = await request(env.BASE_URL + env.USER(this.users[this.selectedUserIdx].id), "DELETE");

	if (error) {
		alert("사용자 삭제에 실패했습니다.");
		return;
	}

	this.users.splice(this.selectedUserIdx, 1);

	this.setUsers([...this.users]);
	this.setSelectedUser(0);
}
