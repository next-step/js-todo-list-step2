import KEY_CODE from "../constants/KeyCode.js";

function TodoInput({ onAdd }) {
	const $todoInput = document.querySelector("input.new-todo");
	$todoInput.addEventListener("keydown", (event) => this.addTodoItem(event));

	this.isValid = (event) => {
		if (event.keyCode === KEY_CODE.ENTER) {
			return true;
		}
	};

	this.addTodoItem = (event) => {
		const $newTodoTarget = event.target;
		if (this.isValid(event, $newTodoTarget.value)) {
			onAdd($newTodoTarget.value);
			$newTodoTarget.value = "";
		}
	};
}

export default TodoInput;
