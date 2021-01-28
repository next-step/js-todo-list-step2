const addTodoItem = (e, _id) => {
  console.log(e, _id);
};

export const addTodo = ({ _id }) => {
  const $newTodo = document.querySelector('.new-todo');

  $newTodo.addEventListener('keyup', (event) => addTodoItem(event, _id));
};
