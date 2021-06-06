import { $ } from "../utils/querySelector.js";
import { clearTodos } from "../utils/storage.js";

export default function TodoTotal () {
	const $deleteAll = $(".clear-completed");

	$deleteAll.addEventListener("click", () => clearTodos());

	this.setState = (todos) => {
	}
}