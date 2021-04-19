let userTodoList = [];

export const newTodoList = () => {
	userTodoList = [];
};

export const getUserList = () => {
	return userTodoList;
};

export const pushData = (todoItem) => {
	userTodoList.push(todoItem);
};
