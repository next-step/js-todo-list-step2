import { $ } from "../utils/querySelector.js";
import Message from "../config/message.js"
import API from "../api/api.js";
import TodoList from "../components/TodoList.js";

export default function TodoInput ({ reloadList }) {
	this.todos = [];
	this.todoList = new TodoList();
	const $activeUser = $(".active");

	this.setState = (todos) => this.todos = todos;

	$(".new-todo").addEventListener("keyup", ({key, currentTarget}) =>
		(key === "Enter") && addTodo(currentTarget.value));

	const addTodo = async (content) => {
		if (content.length < 2) return alert(Message.SHORT_INPUT_LENGTH);

		await API.postFetch(`/api/users/${ $activeUser.dataset.id }/items/`, { contents: content });

		// const todos = await API.getFetch(`/api/users/${ $activeUser.dataset.id }/items/`);
		// this.todoList.setState(todos);

		reloadList();
	}

}