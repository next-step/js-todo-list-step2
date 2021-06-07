import { $ } from "../utils/querySelector.js";
import API from "../api/api.js";

export default function TodoTotal  ({ reloadTodos }) {
	this.setState = (todos) => $(".todo-count strong").innerHTML = todos.length;

	$(".all").addEventListener("click", ()=> selectTodos({ type: "ALL" }));
	$(".active").addEventListener("click", ()=> selectTodos({ type: "ACTIVE" }));
	$(".completed").addEventListener("click", ()=> selectTodos({ type: "COMPLETE" }));

	$(".clear-completed").addEventListener("click", () => deleteAll);

	const selectTodos = ({ type }) => {
		reloadTodos(type);



		// switch (type) {
		// 	case "ALL":
		// 		reloadTodos("all");
		// 		break;
		// 	case "ACTIVE":
		// 		reloadTodos("all");
		// 		break;
		// 	case "COMPLETE":
		// 		reloadTodos("all");
		// 		break;
		// }
	}

	const deleteAll =  async () => {
		const $activeUserId = $(".active").dataset.id;

		await API.deleteFetch(`/api/users/${ $activeUserId }/items/`);
		reloadTodos();
	}
}