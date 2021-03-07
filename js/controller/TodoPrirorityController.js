import { todoPriorityService } from "/js/service/TodoPrioritySerivce.js";

export function TodoPriorityController() {
  const $prioritySelect = document.querySelectorAll(".chip");

  const onClickPrioritySelect = ({ target }) => {
    const priorityValue = target.value;
    const $todoItem = target.closest(".todo-item");
    todoPriorityService.setPriority($todoItem.dataset.id, priorityValue);
  };

  this.init = () => {
    $prioritySelect.forEach((v) =>
      v.addEventListener("change", onClickPrioritySelect)
    );
  };
}
