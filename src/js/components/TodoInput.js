import { $ } from "../utils/querySelector.js";
import { setTodos } from "../utils/storage.js";
import MSG from "../config/message.js"

export default function TodoInput ({ addList }) {
	const $input = $(".new-todo");

	$input.addEventListener("keyup", ({key, currentTarget}) => {
		if (key === "Enter") addTodo(currentTarget.value);
	});

	const addTodo = (content) => {
		if (content.length < 2) return alert(MSG.CONTENTS_LENGTH);

		const addItem = {
			user: "user01",
			content: content,
			status: "todo",	// new: 해야할 일 / completed: 완료한 일
		};

		setTodos(addItem);
		addList();
	}
}