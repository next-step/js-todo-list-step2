import { $, $all } from '../utils/selectors.js';

function TodoCount({ filter, clear }) {
  const countContainer = $('.count-container');
  this.render = userTodoData => {
    const todoCount = $('.todo-count strong');
    todoCount.textContent = userTodoData.length;
    this.event();
  };
  this.event = () => {
    countContainer.addEventListener('click', filterHandler);
    countContainer.addEventListener('click', clear);
  };
  function filterHandler(event) {
    event.preventDefault();
    if (event.target.tagName !== 'A') return;
    const filterButtons = $all('.filters li a');
    const [status] = event.target.classList;
    const targetButton = $(`a.${status}`);
    Object.keys(filterButtons).map(key => filterButtons[key].classList.remove('selected'));
    targetButton.classList.add('selected');
    filter(status);
  }
}
export default TodoCount;
