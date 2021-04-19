import { checkKey, getValue, isEmptyValue } from "../../utils/eventUtils.js";
import { ILLEGAL_MESSAGE } from "../../utils/Message.js";

export default function TodoInput(app) {
  const todoInput = document.querySelector(".new-todo");

  const onKeyHandler = event => {
    if(checkKey(event, "Enter")) {
      if(isEmptyValue(event)) {
        alert(ILLEGAL_MESSAGE['EMPTY_VALUE']);
        return;
      }
      app.add(getValue(event));
      event.target.value = "";
      event.stopPropagation();
    }
  } 

  todoInput.addEventListener("keydown", onKeyHandler);
}
