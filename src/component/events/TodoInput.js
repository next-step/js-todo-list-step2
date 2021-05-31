import TodoItemModel from "../model/TodoItemModel.js";

import request from "../../util/request.js";

import env from "../../constants/env.js";

async function onAdd(contents) {
	const { response, error } = await request(env.BASE_URL + env.ITEM(this.users[this.selectedUserIdx].id), "POST", {
		contents
	});
	if (error) {
		alert("할 일 등록에 실패했습니다.");
		return;
	}

	this.users[this.selectedUserIdx].todoList.push(
		new TodoItemModel({
			...response,
			id: response._id
		})
	);
	this.setSelectedUser(this.selectedUserIdx);
}

export default onAdd;
