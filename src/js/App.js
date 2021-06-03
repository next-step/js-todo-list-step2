import TodoInput from "./components/TodoInput.js";
import TodoTotal from "./components/TodoTotal.js";

export default function App () {
	this.todoInput = new TodoInput();
	this.todoTotal = new TodoTotal();

	// this.render = () => {
	// 	console.log("gg")
	// 	// this.setState(this.todoItems);
	// };
}