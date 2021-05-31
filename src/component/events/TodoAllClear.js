import request from "../../util/request.js";

import env from "../../constants/env.js";

async function onAllClear() {
	const { response, error } = await request(env.BASE_URL + env.ITEM(this.users[this.selectedUserIdx].id), "DELETE");
	if (error) {
		alert("할 일 삭제에 실패했습니다.");
		return;
	}

	this.users[this.selectedUserIdx].todoList = [];
	this.setTodoItems(this.users[this.selectedUserIdx].todoList);
}

export default onAllClear;
