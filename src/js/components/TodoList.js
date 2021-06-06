import { $, $$ } from "../utils/querySelector.js";
import API from "../api/api.js";

export default function TodoList () {
	const $new = ({ _id, contents, isCompleted }) => {
		return `
			<li class="${isCompleted ? "completed" : "new"}">
				<div class="view">
					<input class="toggle" type="checkbox" data-id="${ _id }"/>
					<label class="label">
						<select class="chip select">
							<option value="0" selected>순위</option>
							<option value="1">1순위</option>
							<option value="2">2순위</option>
						</select>
						${ contents }
					</label>
					<button class="destroy"></button>
				</div>
				<input class="edit" value="완료된 타이틀" />
			</li>`;
	};


	this.setState = (todos) => {
		let items = "";

		console.log("todo" , todos)

		todos.map(todo => items += $new(todo));

		$(".todo-list").innerHTML = items;

		$$(".toggle").forEach(chk => {
			chk.addEventListener("click", ({ currentTarget }) => complete(currentTarget))
		});
	}

	const complete = (target) => {
		const userId = $(".active").dataset.id;
		const itemId = target.dataset.id;
		
		const chrBool = target.checked;
		const $parentLi = (target.parentElement).parentElement;

		$parentLi.classList.remove(chrBool ? "new" : "completed" );
		$parentLi.classList.add(chrBool ? "completed" : "new");

		API.putFetch(`/api/users/${ userId }/items/${ itemId }/toggle`);
	}


}