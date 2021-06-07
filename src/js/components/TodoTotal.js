import { $ } from "../utils/querySelector.js";
import { clearTodos } from "../utils/storage.js";
import API from "../api/api.js";

export default function TodoTotal  ({ reloadTodos }) {
	this.setState = (todos) => {
		$(".todo-count strong").innerHTML = todos.length;
	}

	$(".clear-completed").addEventListener("click", () => deleteAll() );


	const deleteAll =  async () => {
		const $activeUserId = $(".active").dataset.id;

		await API.deleteFetch(`/api/users/${ $activeUserId }/items/`);

		reloadTodos();
	}

}