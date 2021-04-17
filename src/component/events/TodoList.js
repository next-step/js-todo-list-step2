import TodoItemModel from "../model/TodoItemModel.js";

import request from "../../util/request.js";

import env from "../../constants/env.js";

export async function onDelete(id) {
	const { response, error } = await request(
		env.BASE_URL + env.USER_ITEM(this.users[this.selectedUserIdx].id, id),
		"DELETE"
	);
	if (error) {
		alert("할 일 삭제에 실패했습니다.");
		return;
	}

	this.users[this.selectedUserIdx].todoList = this.users[this.selectedUserIdx].todoList.filter(
		(item) => item.id !== id
	);

	this.setTodoItems(this.users[this.selectedUserIdx].todoList);
}

export async function onCompleted(id) {
	const { response, error } = await request(
		env.BASE_URL + env.ITEM_TOGGLE(this.users[this.selectedUserIdx].id, id),
		"PUT"
	);
	if (error) {
		alert("할 일 완료에 실패했습니다.");
		return;
	}

	this.users[this.selectedUserIdx].todoList = this.users[this.selectedUserIdx].todoList.map((item) => {
		if (item.id === id) {
			return new TodoItemModel({ ...response, id: response._id });
		}
		return item;
	});

	this.setTodoItems(this.users[this.selectedUserIdx].todoList);
}

export function onEditing(id) {
	this.users[this.selectedUserIdx].todoList = this.users[this.selectedUserIdx].todoList.map((item) => {
		if (item.id === id) {
			item.editing = true;
		}
		return item;
	});

	this.setTodoItems(this.users[this.selectedUserIdx].todoList);
}
