import Mode from "../../constants/Mode.js";

function onChangeMode(mode) {
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
	this.setTodoItems(prevTodoItems);
}

export default onChangeMode;
