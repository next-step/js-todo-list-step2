export const editTodo = ({ target }) => {
  if (target.className !== 'label') {
    return;
  }
  console.log(target);
};
