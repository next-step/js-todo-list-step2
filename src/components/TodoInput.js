import { addTodo } from "../apis/todo.js";
import { SELECTOR } from "../utils/constants.js";

export default function TodoInput($todoInput, { onAdd }) {
  const onKeydownInput = (event) => {
    const $newTodoTarget = event.target;

    if ($newTodoTarget.value.trim() && event.key === "Enter") {
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
