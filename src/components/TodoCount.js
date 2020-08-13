import { SELECTOR } from "../utils/constants.js";

export default function TodoCount($todoCount, { setFilter }) {
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

  const onClickFilter = (event) => {
    const $target = event.target;

    if ($target.classList.contains(SELECTOR.TODO_FILTER)) {
      const filter = $target.dataset.filter;
      this.changeSelected(filter);
      setFilter(filter);
    }
  };

  this.bindEvent = () => {
    $todoCount.addEventListener("click", onClickFilter);
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
