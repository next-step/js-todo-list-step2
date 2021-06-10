export const getTodos = () => {
	return (!window.localStorage["todos"]) ? [] : JSON.parse(window.localStorage["todos"]);
}

export const setTodos = (obj) => {
	let arr = getTodos();
	arr.push(obj);

	window.localStorage["todos"] = JSON.stringify(arr);
}

export const clearTodos = () => {
	if (!window.localStorage["todos"]) return;
	window.localStorage.removeItem("todos");
}