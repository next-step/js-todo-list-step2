import { VALUE, SELECTOR, KEY } from "../utils/constants.js";
import { loadingTemplate, todoTemplate } from "../utils/templates.js";

export default function TodoList(
  $todoList,
  { deleteTodo, toggleTodo, editTodo, changePriorityTodo }
) {
  this.render = (todos, loading) => {
    const template = todos.length ? todos.map(todoTemplate) : [];
    $todoList.innerHTML = loading ? loadingTemplate() : template.join("");
  };

  const onClickTodo = ({ target: $target }) => {
    const $li = $target.closest("li");

    if ($target.classList.contains(SELECTOR.TOGGLE)) {
      toggleTodo($li.id);
      return;
    }

    if ($target.classList.contains(SELECTOR.DESTROY)) {
      deleteTodo($li.id);
      return;
    }
  };

  const onDblclickTodo = ({ target: $target }) => {
    const $li = $target.closest("li");

    if ($li.classList.contains(SELECTOR.VIEW)) {
      $todoList.querySelectorAll(".view.editing").forEach(($edit) => {
        $edit.classList.remove(SELECTOR.EDITING);
      });

      $li.classList.add(SELECTOR.EDITING);
      const $edit = $li.querySelector(`.${SELECTOR.EDIT}`);
      const textLenth = $edit.value.length;

      if (!$target.classList.contains(SELECTOR.EDIT)) {
        $edit.focus();
        $edit.setSelectionRange(textLenth, textLenth);
      }
    }
  };

  const onKeydownTodo = ({ target: $target, key }) => {
    const $li = $target.closest("li");

    const onEditKeydown = () => {
      if ($target.value && key === KEY.ENTER) {
        editTodo($li.id, $target.value);
        return;
      }

      if (event.key === KEY.ESCAPE) {
        $li.classList.remove(SELECTOR.EDITING);
        $target.value = $li.querySelector(`.${SELECTOR.CONTENTS}`).textContent;
      }
    };

    if ($target.classList.contains(SELECTOR.EDIT)) {
      onEditKeydown();
    }
  };

  const onSelectPriorityChange = ({ target: $target }) => {
    const $li = $target.closest("li");

    if ($target.classList.contains(SELECTOR.SELECT)) {
      changePriorityTodo($li.id, $target.value);
    }
  };

  this.bindEvent = () => {
    $todoList.addEventListener("click", onClickTodo);
    $todoList.addEventListener("dblclick", onDblclickTodo);
    $todoList.addEventListener("keydown", onKeydownTodo);
    $todoList.addEventListener("change", onSelectPriorityChange);
  };

  this.init = () => {
    this.bindEvent();
  };

  this.init();
}
