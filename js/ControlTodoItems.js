import { renewStrong, chooseButton } from "./ControlTodoButton.js";
import { ajaxPostFunctions } from "./AjaxPost.js";

const todoList = document.querySelector(".todo-list");

export function initTodolistItems() {
  todoList.addEventListener("click", itemClickControl);
  todoList.addEventListener("dblclick", workContentCopy);
  todoList.addEventListener("keyup", workUpdate);
  todoList.addEventListener("change", labelApply);
}

function itemClickControl({ target }) {
  if (target.classList.contains("toggle")) workCheck({ target });
  else if (target.classList.contains("destroy")) workDelete({ target });
  else if (
    target.classList.contains("primary") ||
    target.classList.contains("secondary")
  )
    labelChange({ target });
}

function workCheck({ target }) {
  const li = target.closest("li");
  li.classList.toggle("completed");

  if (target.checked) target.setAttribute("checked", "");
  else target.removeAttribute("checked");

  ajaxPostFunctions(li, "checkitem");

  if (/(active)/.exec(window.location.href)) chooseButton("active");
  else if (/(completed)/.exec(window.location.href)) chooseButton("completed");
}

function workDelete({ target }) {
  if (confirm("정말 삭제하시겠습니까?")) {
    const li = target.closest("li");
    ajaxPostFunctions(li,'deleteitem');
    li.parentNode.removeChild(li);
    renewStrong();
  }
}

function workContentCopy({ target }) {
  if (!target.classList.contains("text")) {
    return;
  }
  const li = target.closest("li");
  li.classList.add("editing");
  const chginput = li.querySelector(".edit");
  chginput.value = li.querySelector(".text").innerText;
}

function workUpdate({ target, key }) {
  const li = target.closest("li");
  if (key === "Escape") {
    li.classList.remove("editing");
    return;
  }
  if (key === "Enter") {
    if (target.value !== "" && !/^\s+|\s+$/g.exec(target.value)) {
      let label = target.parentNode.querySelector(".text");
      label.innerText = target.value;
      ajaxPostFunctions(li, 'changeitem');
      target.value = "";
      li.classList.remove("editing");
    } else {
      alert("불필요한 공백을 제거해주세요!");
    }
  }
}

function labelApply({ target }) {
  if (target.nodeName !== "SELECT") {
    return;
  }

  const li = target.closest("li");
  const span = li.querySelector("span.chip");
  const selecter = li.querySelector("select");

  if (selecter.value === "1") span.classList.add("primary");
  else if (selecter.value === "2") span.classList.add("secondary");
  span.innerText = selecter.value + "순위";
  selecter.style.display = "none";
  span.style.display = "block";
  ajaxPostFunctions(li, 'prioritem');
}

function labelChange({ target }) {
  const selecter = target.closest("li").querySelector("select");

  target.classList.remove("primary", "secondary");
  target.style.display = "none";

  selecter.style.display = "block";
  selecter.value = 0;

  ajaxPostFunctions(target.closest("li"), 'prioritem');

  labelApply({ target });
}
