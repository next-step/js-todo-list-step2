import { $ } from "../utils/querySelector.js";
import { clearTodos } from "../utils/storage.js";
import API from "../api/api.js";

export default function TodoTotal  ({ reloadTodos }) {
	const $deleteAll = $(".clear-completed");
	// const $activeUserId = $(".active").dataset.id;

	$deleteAll.addEventListener("click", () => deleteAll() );

	const deleteAll =  async () => {
		const $activeUserId = $(".active").dataset.id;

		await API.deleteFetch(`/api/users/${ $activeUserId }/items/`);
		reloadTodos();
		// await reloadList();
	}
	// this.setState = (todos) => {
	// }
}