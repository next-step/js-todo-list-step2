import { $, $$ } from "../utils/querySelector.js";
import API from "../api/api.js";

export default function TodoList () {
	const $new = ({ contents, isCompleted }) => {
		return `
			<li class="${isCompleted ? "completed" : "new"}">
				<div class="view">
					<input class="toggle" type="checkbox" />
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


	this.setState = async () => {
		let items = "";
		const id = $(".active").dataset.id;
		const todos = await API.getFetch(`/api/users/${ id }/items/`);

		todos.map(todo => items += $new(todo));

		$(".todo-list").innerHTML = items;

		$$(".toggle").forEach(chk => {
			chk.addEventListener("click", ({ currentTarget }) => complete(currentTarget))
		});
	}

	const complete = (target) => {
		const chrBool = target.checked;
		const $parentLi = (currentTarget.parentElement).parentElement;

		$parentLi.classList.remove(chrBool ? "new" : "completed" );
		$parentLi.classList.add(chrBool ? "completed" : "new");
	}


}