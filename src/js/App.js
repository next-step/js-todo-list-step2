import TodoInput from "./components/TodoInput.js";
import TodoTotal from "./components/TodoTotal.js";
import TodoList from "./components/TodoTotal.js";

export default function App () {
	const setSate = () => { }

	const render = () => {

	}


	const reloadList = () => console.log("..reload");

	this.todoInput = new TodoInput({
		reload: () => reloadList()
	});

	this.todoList = new TodoList();

	this.todoTotal = new TodoTotal();

	// this.render = () => {
	// 	console.log("gg")
	// 	// this.setState(this.todoItems);
	// };
}