import { SELECTOR } from "../utils/constants.js";

export default function TodoCount($todoCount, { setFilter, deleteAllTodo }) {
  this.changeSelected = (filter) => {
    if (!filter) {
      return;
    }

    $todoCount
      .querySelector(`.${SELECTOR.SELECTED}`)
      .classList.remove(`${SELECTOR.SELECTED}`);
    $todoCount
      .querySelector(`.${filter}`)
      .classList.add(`${SELECTOR.SELECTED}`);
  };

  const onClickTodoCount = ({ target }) => {
    const $target = target;

    if ($target.classList.contains(SELECTOR.TODO_FILTER)) {
      const filter = $target.dataset.filter;
      this.changeSelected(filter);
      setFilter(filter);
    }

    if ($target.classList.contains(SELECTOR.CLEAR_COMPLETED)) {
      deleteAllTodo();
    }
  };

  this.bindEvent = () => {
    $todoCount.addEventListener("click", onClickTodoCount);
  };

  this.render = (count) => {
    $todoCount.querySelector(
      `.${SELECTOR.TODO_COUNT_TEXT}`
    ).textContent = count;
  };

  this.init = () => {
    this.bindEvent();
  };

  this.init();
}
