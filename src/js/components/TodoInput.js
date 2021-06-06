import { $ } from "../utils/querySelector.js";
import { setTodos } from "../utils/storage.js";
import Message from "../config/message.js"
import API from "../api/api.js";

export default function TodoInput ({ reloadList }) {
	this.todos = [];
	this.setState = (todos) => this.todos = todos;

	$(".new-todo").addEventListener("keyup", ({key, currentTarget}) =>
		(key === "Enter") && addTodo(currentTarget.value));

	const addTodo = async (content) => {
		if (content.length < 2) return alert(Message.SHORT_INPUT_LENGTH);

		const addItem = {
			contents: content,
			// priority: "NONE",
			// isCompleted: false,
		};

		const $activeUser = $(".active");

		await API.postFetch(`/api/users/${ $activeUser.dataset.id }/items/`, addItem);

		// setTodos(addItem);

		reloadList();
	}

}