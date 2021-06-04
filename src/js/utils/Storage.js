export const getTodos = () => {
	return (!window.localStorage["todos"]) ? [] : JSON.parse(window.localStorage["todos"]);
}

export const setTodos = (obj) => {
	let arr = getTodos();
	arr.push(obj);
}

export const clearTodos = () => {
	if (!window.localStorage["todos"]) return;
	window.localStorage.removeItem("todos");
}