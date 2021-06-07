import { $, $$ } from "../utils/querySelector.js";
import API from "../api/api.js";

export default function TodoTotal  ({ reloadTodos }) {
	this.setState = (todos) => $(".todo-count strong").innerHTML = todos.length;

	const selectTodos = ({ currentTarget }) => {
		$$(".filter").forEach(item => item.classList.remove("selected"));
		currentTarget.classList.add("selected");
		reloadTodos(currentTarget.dataset.filter);
	}

	const deleteAll =  async () => {
		const $activeUserId = $(".active").dataset.id;

		await API.deleteFetch(`/api/users/${ $activeUserId }/items/`);
		reloadTodos();
	}

	$$(".filter").forEach(item => item.addEventListener("click", selectTodos));
	$(".clear-completed").addEventListener("click", () => deleteAll);
}