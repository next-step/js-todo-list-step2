let userTodoList = [];

export const newTodoList = () => {
	userTodoList = [];
};

export const getUserTodoList = () => {
	return userTodoList;
};

export const pushData = (todoItem) => {
	userTodoList.push(todoItem);
};

export const saveUserTodoList = (todoList) => {
	userTodoList = todoList;
};
