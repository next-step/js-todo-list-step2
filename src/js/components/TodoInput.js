import TodoList from "../components/TodoList.js";
import { $ } from "../utils/querySelector.js";
import Message from "../config/message.js"
import API from "../api/api.js";

export default function TodoInput ({ reloadTodos }) {
	const $newTodo = $(".new-todo");

	$newTodo.addEventListener("keyup", ({key, currentTarget}) => key === "Enter" && addTodo(currentTarget.value));

	const addTodo = async (content) => {
		const $activeUserId = $(".user.active").dataset.id;

		if (content.length < 2) return alert(Message.SHORT_INPUT_LENGTH);

		await API.postFetch(`/api/users/${ $activeUserId }/items/`, { contents: content });
		reloadTodos();

		$newTodo.value = "";
	}
}