function TodoInput({addTodo}) {
  this.render = () => {
    const todoInput = document.querySelector('.new-todo')
    todoInput.addEventListener('keyup', addTodo)
  };
}
export default TodoInput;
