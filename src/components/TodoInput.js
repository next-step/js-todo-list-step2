import { SELECTOR, KEY } from "../utils/constants.js";

export default function TodoInput($todoInput, { onAdd }) {
  const onKeydownInput = ({ target: $target, key }) => {
    if ($target.value.trim() && key === KEY.ENTER) {
      onAdd($target.value);
      $target.value = "";
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
