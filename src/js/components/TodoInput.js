import { $ } from "../utils/querySelector.js";
import { setTodos } from "../utils/Storage.js";

export default function TodoInput () {
	const $input = $(".new-todo");

	$input.addEventListener("keyup", ({key, currentTarget}) => {
		const addItem = {
			user: "user01",
			content: currentTarget.value,
			status: "done",
		};

 		key === "Enter" && setTodos(addItem);
	});
}