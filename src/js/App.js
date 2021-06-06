import TodoInput from "./components/TodoInput.js";
import TodoTotal from "./components/TodoTotal.js";
import TodoList from "./components/TodoList.js";
import UserList	from "./components/UserList.js";
import { getTodos } from "./utils/storage.js";
import { $ } from "./utils/querySelector.js";
import API from "./api/api.js";

export default function App () {
	this.todos = "";


	const listReload = async () => {
		console.log("..");

		const $activeUser = $(".active");
		const todos = await API.getFetch(`/api/users/${ $activeUser.dataset.id }/items/`);
		this.todoList.setState(todos);
	}

	this.userList = new UserList();

	this.todoInput = new TodoInput({
		// reloadList: listReload(),
		reloadList: async () => {
			const $activeUser = $(".active");
			const todos = await API.getFetch(`/api/users/${ $activeUser.dataset.id }/items/`);

			this.todoList.setState(todos);
		}
	});

	this.todoList = new TodoList();
	this.todoTotal = new TodoTotal({
		// reloadList: listReload(),
	});


	const setSate = ({users, todos}) => {
		this.userList.setState(users);
		this.todoInput.setState(todos);
		this.todoList.setState(todos);
		// this.todoTotal.setState(todos);
	}

	const init = async () => {
		const users = await API.getFetch("/api/users");
		setSate({users: users, todos: users[0].todoList});
	}

	init();

}