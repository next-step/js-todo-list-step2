import { SELECTOR, KEY } from "../utils/constants.js";

export default function TodoInput($todoInput, { onAdd }) {
  const onKeydownInput = ({ target, key }) => {
    const $newTodoTarget = target;

    if ($newTodoTarget.value.trim() && key === KEY.ENTER) {
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  };

  this.toggleLoading = (loading) => {
    $todoInput.classList.toggle(SELECTOR.DISABLED, loading);
  };

  this.bindEvent = () => {
    $todoInput.addEventListener("keydown", onKeydownInput);
  };

  this.init = () => {
    this.bindEvent();
  };

  this.init();
}
