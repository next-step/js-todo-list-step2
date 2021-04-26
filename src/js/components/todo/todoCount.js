import {
  checkClassName,
  checkLocalName,
  getClassName,
  removeSelect,
  setSelect,
} from "../../utils/eventUtils.js";

export default function TodoCount(app) {
  const todoCount = document.querySelector(".count-container");

  this.render = (items) => {
    todoCount.querySelector("strong").textContent = items.length;
  };

  const select = (event) => {
    todoCount.querySelectorAll("a").forEach((each) => removeSelect(each));
    setSelect(event);
  };

  const onClickHandler = (event) => {
    if (checkLocalName(event, "a")) {
      select(event);
      document.location.hash = getClassName(event);
      app.render();
      return;
    }
    if (checkClassName(event, "clear-completed")) {
      app.deleteAll();
    }
  };

  todoCount.addEventListener("click", onClickHandler);
}
