import { renewStrong } from "./ControlTodoButton.js";
import { chooseButton } from "./ControlTodoButton.js";

const todoList = document.querySelector(".todo-list"); // 작성한 할 일이 삽입되는 ul 태그

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
  labelApply({ target });
}

function workCheck({ target }) {
  // 등록된 항목들을 체크하거나 푸는 기능
  const li = target.closest("li");
  li.classList.toggle("completed");

  if (target.checked) {
    target.setAttribute("checked", "");
    //li.querySelector('span.chip').style.display= 'none';
  } else {
    target.removeAttribute("checked");
    //li.querySelector('span.chip').style.display= 'block';
  }
  if (/(active)/.exec(window.location.href)) chooseButton("active");
  else if (/(completed)/.exec(window.location.href)) chooseButton("completed");
}

function workDelete({ target }) {
  if (confirm("정말 삭제하시겠습니까?")) {
    const li = target.closest("li");
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
      target.value = "";
      li.classList.remove("editing");
    } else {
      alert("불필요한 공백을 제거해주세요!");
    }
  }
}

function labelApply({ target }) {
  const li = target.closest("li");
  const span = li.querySelector("span.chip");
  const selecter = li.querySelector("select");

  if (target.classList.contains("primary") ||
    target.classList.contains("secondary")
  ) {
    selecter.style.display = "block";
    selecter.value =0;
  }

  span.classList.remove("primary", "secondary");
  if (selecter.value !== "0") {
    if (selecter.value === "1") span.classList.add("primary");
    if (selecter.value === "2") span.classList.add("secondary");
    span.innerText = selecter.value + "순위";
    selecter.style.display = "none";
  }
}

