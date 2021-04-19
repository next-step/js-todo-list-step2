import { checkClassName, checkKey, checkLocalName, getClassLiId, getValue, isEmptyValue } from "../../utils/eventUtils.js";
import { ILLEGAL_MESSAGE } from "../../utils/Message.js";
import TodoCount from "./todoCount.js";
import { todoTemplate } from "./todoItem.js";

export default function TodoList(app) {
  const todoList = document.querySelector(".todo-list");
  const todoCount = new TodoCount(app);

  this.render = items => {
    const hash = document.location.hash;
    const checkFilter = checkHash[hash];
    items = items.filter(checkFilter);
    const template = items.map(item => todoTemplate(item));
    todoList.innerHTML = template.join("\n");
    todoCount.render(items);
  }

  this.editing = id => {
    todoList.querySelector(`li[data-id="${id}"]`).className = "editing";
  }

  const onClickHandler = event => {
    if (checkClassName(event, "toggle")) {
      app.complete(getClassLiId(event));
      return;
    }
    if (checkClassName(event, "destroy")) {
      app.delete(getClassLiId(event));
      return;
    }
  }

  const checkHash = {
    "#active": item => item.isCompleted() !== true,
    "#completed": item => item.isCompleted() === true,
    "": () => true,
    "#": () => true
  }

  const onDbClickHandler = event => {
    if (checkClassName(event, "label")) {
      app.editing(getClassLiId(event));
    }
  }

  const onKeyHandler = event => {
    if(checkKey(event, "Enter")) {
      if(isEmptyValue(event)) {
        alert(ILLEGAL_MESSAGE['EMPTY_VALUE']);
        return;
      }
      app.edit(getClassLiId(event), getValue(event));
    }
  }

  const onChangeHandler = event => {
    if(checkLocalName(event, "select")) {
      app.changePriority(getClassLiId(event), getValue(event));
    }
  }

  todoList.addEventListener("click", onClickHandler);
  todoList.addEventListener("dblclick", onDbClickHandler);
  todoList.addEventListener("keydown", onKeyHandler);
  todoList.addEventListener("change", onChangeHandler);
}
