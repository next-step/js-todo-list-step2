function TodoCount({ filter, clear }) {
  const countContainer = document.querySelector('.count-container');
  this.render = userTodoData => {
    const todoCount = document.querySelector('.todo-count strong');
    todoCount.textContent = userTodoData.length;
    this.event();
  };
  this.event = () => {
    countContainer.addEventListener('click', filterHandler);
    countContainer.addEventListener('click', clear);
  };
  function filterHandler(event) {
    event.preventDefault();
    if(event.target.tagName !== "A") return;
    const filterButtons = document.querySelectorAll('.filters li a');
    const [status] = event.target.classList;
    const targetButton = document.querySelector(`a.${status}`);
    Object.keys(filterButtons).map(key => filterButtons[key].classList.remove('selected'));
    targetButton.classList.add('selected');
    filter(status);
  }
}
export default TodoCount;
