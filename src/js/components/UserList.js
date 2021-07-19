import { $, $$ } from "../utils/querySelector.js";
import API from "../api/api.js";
import Message from "../config/message.js"
import TodoList from "./TodoList.js";

export default function UserList ({ reloadTodos }) {

	this.setState = (users) => {
		addUser(users);
		addEvent();
	}

	const addUser = (users) => {
		let items = "";

		users.map(({ _id, name }, id) => {
			id === 0 && ($(".active-user").innerHTML = name);
			items += `<button class="user ripple ${ id === 0 && "active" }" data-id="${ _id }">${ name }</button>`;
		});

		items += `
			<button class="ripple user-create-button" data-action="createUser">
				+ 유저 생성
			</button>
			<button class="ripple user-delete-button" data-action="deleteUser">
				삭제 -
			</button>`;

		$("#user-list").innerHTML = items;
	}

	const addEvent = () => {
		$$('.user').forEach(item => item.addEventListener('click', onUserClickHandler));

		$('.user-create-button').addEventListener('click', onUserCreateHandler);
		$('.user-delete-button').addEventListener('click', onUserDeleteHandler);
	}


	const onUserClickHandler = ({ currentTarget }) => {
		$(".active").classList.remove("active");
		currentTarget.classList.add("active");

		$(".active-user").innerText = currentTarget.innerHTML;

		reloadTodos();
		// reloadTodos(currentTarget.dataset.id);
	}

	const onUserCreateHandler = async () => {
		const userName = prompt(Message.ADD_USER);

		if (!userName) return;
		if (userName.length < 2) return alert(Message.SHORT_INPUT_LENGTH);

		await API.postFetch("/api/users", { "name": userName, "todoList": [] });
		await reloadUsers();
	}

	const onUserDeleteHandler = async () => {
		const $activeUser = $(".active");
		const deleteBool = confirm(`${$activeUser.textContent}${Message.DELETE_USER}`);

		if (!deleteBool) return;

		await API.deleteFetch(`/api/users/${ $activeUser.dataset.id }`);
		await reloadUsers();
	}


	const reloadUsers = async () => {
		const users = await API.getFetch(`/api/users`);
		this.setState(users);
	}

	// const reloadTodos = async (userId) => {
	// 	this.todoList = new TodoList();
	// 	const todos = await API.getFetch(`/api/users/${ userId }/items`);
	// 	this.todoList.setState(todos);
	// }
}