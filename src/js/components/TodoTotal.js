import { $ } from "../utils/querySelector.js";
import { clearTodos } from "../utils/Storage.js";

export default function TodoTotal () {
	const $deleteAll = $(".clear-completed");

	$deleteAll.addEventListener("click", () => clearTodos());
}