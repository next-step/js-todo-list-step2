import { $, $$ } from "../utils/querySelector.js";
import API from "../api/api.js";

export default function TodoList ({ reloadTodos, filterTodos }) {
	this.userId = "";

	const $new = ({ _id, contents, isCompleted }) => {
		return `
			<li class="${ isCompleted && "completed" }" data-id="${ _id }">
				<div class="view">
					<input class="toggle" type="checkbox" data-id="${ _id }" ${ isCompleted && "checked" }/>
					<label class="label">
						<select class="chip select">
							<option value="0" selected>순위</option>
							<option value="1">1순위</option>
							<option value="2">2순위</option>
						</select>
						${ contents }
					</label>
					<button class="destroy" data-id="${ _id }"></button>
				</div>
				<input class="edit" value="${ contents }" />
			</li>`;
	};

	const editItem = ({ currentTarget }) => {
		const $parentLi = currentTarget.parentElement.parentElement;
		const $edit = $parentLi.querySelector(".edit");
		const itemId = $parentLi.dataset.id;

		$$(".todo-list li").forEach(li => li.classList.remove("editing"));
		$parentLi.classList.add("editing");

		$edit.addEventListener("keyup",({ key, currentTarget }) => key === "Enter" && saveEditItem(itemId, currentTarget.value))
	}

	const saveEditItem = async (itemId, contents) => {
		await API.putFetch(`/api/users/${ this.userId }/items/${ itemId }`, {contents: contents});
		reloadTodos();
	}


	this.setState = (todos) => {
		let items = "";
		this.userId = $(".user.active").dataset.id;

		todos.map(todo => items += $new(todo));
		$(".todo-list").innerHTML = items;

		$$(".label").forEach(destroy => destroy.addEventListener("dblclick", editItem));
		$$(".destroy").forEach(destroy => destroy.addEventListener("click", deleteItem));
		$$(".toggle").forEach(chk => chk.addEventListener("click", completeItem));
	}

	const deleteItem = async ({ currentTarget }) => {
		const itemId = currentTarget.parentElement.parentElement.dataset.id;

		await API.deleteFetch(`/api/users/${ this.userId }/items/${ itemId }`);
		reloadTodos();
	}

	const completeItem = ({ currentTarget }) => {
		const $parentLi = currentTarget.parentElement.parentElement;
		const itemId = $parentLi.dataset.id;
		const chrBool = currentTarget.checked;

		$parentLi.classList.remove(chrBool ? "new" : "completed" );
		$parentLi.classList.add(chrBool ? "completed" : "new");

		API.putFetch(`/api/users/${ this.userId }/items/${ itemId }/toggle`);
	}
}