import TodoInput from "./components/TodoInput.js";
import TodoTotal from "./components/TodoTotal.js";
import TodoList from "./components/TodoList.js";
import { getTodos } from "./utils/storage.js";


export default function App () {
	this.todos = "";

	this.todoInput = new TodoInput({
		addList: () => setSate(getTodos())
	});

	this.todoList = new TodoList();
	this.todoTotal = new TodoTotal();

	const setSate = (todos) => {
		this.todoList.setState();
		this.todoTotal.setState(todos);
	}

	const init = () => {
		setSate(getTodos());
	}

	init();

}