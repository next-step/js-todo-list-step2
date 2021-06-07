import { $, $$ } from "../utils/querySelector.js";
import API from "../api/api.js";

export default function TodoList ({ reloadTodos, filterTodos }) {
	this.userId = "";

	const $new = ({ _id, contents, isCompleted }) => {
		return `
			<li class="${ isCompleted ? "completed" : "new" }">
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
				<input class="edit" value="완료된 타이틀" />
			</li>`;
	};


	this.setState = (todos) => {
		let items = "";
		this.userId = $(".user.active").dataset.id;

		todos.map(todo => items += $new(todo));
		$(".todo-list").innerHTML = items;

		$$(".destroy").forEach(destroy => destroy.addEventListener("click", deleteItem));
		$$(".toggle").forEach(chk => chk.addEventListener("click", completeItem));
	}

	const deleteItem = async ({ currentTarget }) => {
		const itemId = currentTarget.dataset.id;

		await API.deleteFetch(`/api/users/${ this.userId }/items/${ itemId }`);
		reloadTodos();
	}

	const completeItem = ({currentTarget}) => {
		const itemId = currentTarget.dataset.id;

		const chrBool = currentTarget.checked;
		const $parentLi = (currentTarget.parentElement).parentElement;

		$parentLi.classList.remove(chrBool ? "new" : "completed" );
		$parentLi.classList.add(chrBool ? "completed" : "new");

		API.putFetch(`/api/users/${ this.userId }/items/${ itemId }/toggle`);
	}
}