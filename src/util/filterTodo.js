const getActiveTodos = (todoList) => {
  const filtedTodos = todoList.filter(({ isCompleted }) => !isCompleted);
  return filtedTodos;
};

const getCompletedTodos = (todoList) => {
  const filtedTodos = todoList.filter(({ isCompleted }) => isCompleted);
  return filtedTodos;
};
const getAll = (todoList) => {
  return todoList;
};

const filterTodo = (className, todoList) => {
  const callback = {
    all: getAll,
    active: getActiveTodos,
    completed: getCompletedTodos,
  }[className];
  if (!callback) return todoList;
  const filtedTodos = callback(todoList);
  return filtedTodos;
};

export { filterTodo };
