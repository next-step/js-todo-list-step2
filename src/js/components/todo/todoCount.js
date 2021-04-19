import { checkClassName, checkLocalName, getClassName } from "../../utils/eventUtils.js";

export default function TodoCount(app) {
  const todoCount = document.querySelector(".count-container");
  
  this.render = items => {
    todoCount.querySelector("strong").textContent = items.length;
  }

  const onClickHandler = event => {
    if(checkLocalName(event, "a")) {
      document.location.hash = getClassName(event);
      app.render();
      return;
    }
    if(checkClassName(event, "clear-completed")) {
      app.deleteAll();
    }
  }

  todoCount.addEventListener("click", onClickHandler);
}
