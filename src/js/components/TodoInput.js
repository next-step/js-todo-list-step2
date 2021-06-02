import { $ } from "../utils/querySelector.js";

export const TodoInput = () => {
	const $input = $(".new-todo");

	$input.addEventListener("keyup", ({key}) => {
		console.log("key ", key);
	});
}