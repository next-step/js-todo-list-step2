import TodoInput from "./components/TodoInput.js";
import TodoTotal from "./components/TodoTotal.js";
import TodoList from "./components/TodoList.js";
import UserList	from "./components/UserList.js";
import { getTodos } from "./utils/storage.js";
import API from "./api/api.js";

export default function App () {
	this.todos = "";

	this.userList = new UserList();

	this.todoInput = new TodoInput({
		addList: () => setSate(getTodos())
	});

	this.todoList = new TodoList();
	this.todoTotal = new TodoTotal();

	const setSate = (users) => {
		this.userList.setState(users);
		this.todoList.setState();
		this.todoTotal.setState();
	}

	const init = async () => {
		const users = await API.getFetch("/api/users");
		setSate(users);

		// const todos = await getFetch("/api/users");
		// setSate(getTodos());
	}

	init();

}