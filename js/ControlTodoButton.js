const viewAllListBtn = document.querySelector(".all");
const viewTodoListBtn = document.querySelector(".active");
const viewCompleteListBtn = document.querySelector(".completed");
const filter = document.querySelector(".filters");

export function initTodolistButton() {
  filter.addEventListener("click", controlFilterButton);
}

function controlFilterButton({ target }) {
  if (target.classList.contains("all")) chooseButton("all");
  else if (target.classList.contains("active")) chooseButton("active");
  else if (target.classList.contains("completed")) chooseButton("completed");
}

export function chooseButton(button) {
  const funcList = {
    all: viewAll,
    active: viewTodo,
    completed: viewDone,
  };
  funcList[button]();
}

function viewAll() {
  const list = document.querySelectorAll(".todo-list>li");
  list.forEach((li) => li.classList.add("selected"));

  changeBox(viewAllListBtn);
  reflectView();
}

function viewTodo() {
  const list = document.querySelectorAll(".todo-list>li");
  list.forEach((li) => {
    if (li.querySelector(".toggle").hasAttribute("checked")) {
      li.classList.remove("selected");
    } else {
      li.classList.add("selected");
    }
  });
  changeBox(viewTodoListBtn);
  reflectView();
}

function viewDone() {
  const list = document.querySelectorAll(".todo-list>li");
  list.forEach((li) => {
    if (!li.querySelector(".toggle").hasAttribute("checked")) {
      li.classList.remove("selected");
    } else {
      li.classList.add("selected");
    }
  });
  changeBox(viewCompleteListBtn);
  reflectView();
}

function changeBox(box) {
  viewAllListBtn.classList.remove("selected");
  viewTodoListBtn.classList.remove("selected");
  viewCompleteListBtn.classList.remove("selected");

  if (box.classList.contains("all")) {
    viewAllListBtn.classList.add("selected");
  } else if (box.classList.contains("active")) {
    viewTodoListBtn.classList.add("selected");
  } else if (box.classList.contains("completed")) {
    viewCompleteListBtn.classList.add("selected");
  }
}

function reflectView() {
  const list = document.querySelectorAll(".todo-list>li");
  list.forEach((li) => {
    if (li.classList.contains("selected")) {
      li.style.display = "";
    } else {
      li.style.display = "none";
    }
  });

  renewItemCount();
}

export function renewItemCount() {
  const list = document.querySelectorAll(".todo-list>li.selected");
  const item = document.querySelector(".todo-count>strong");
  item.innerText = list.length;
}
