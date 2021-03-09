import { updateCountText } from "./common.js";

const filters = document.querySelector("ul.filters");
const filterAll = filters.querySelector("li a.all");
const filterActive = filters.querySelector("li a.active");
const filterCompleted = filters.querySelector("li a.completed");
let selectedFilter = filterAll;

export function initFilters() {
  filters.addEventListener("click", changeFilterView);
}

export function changeFilterView({ target }) {
  if (!target || target.nodeName != "A") {
    return;
  }

  const todoList = document.querySelector("ul.todo-list");
  const todoElements = todoList.children;

  selectedFilter.classList.remove("selected");
  const { filterType, filterAction } = findNewFilter(target);
  filterType.classList.add("selected");
  applyTodoElementsFilter(todoElements, filterAction);

  updateCountText();
}

function findNewFilter(target) {
  const result = {};
  if (target.classList.contains("all")) {
    result.filterType = filterAll;
    result.filterAction = applyFilter.all;
  } else if (target.classList.contains("active")) {
    result.filterType = filterActive;
    result.filterAction = applyFilter.active;
  } else if (target.classList.contains("completed")) {
    result.filterType = filterCompleted;
    result.filterAction = applyFilter.completed;
  }
  return result;
}

const applyFilter = {
  all: (todoElement) => {
    todoElement.style.display = "";
  },
  active: (todoElement) => {
    const isChecked = todoElement
      .querySelector("div.view input")
      .hasAttribute("checked");
    todoElement.style.display = isChecked ? "none" : "";
  },
  completed: (todoElement) => {
    const isChecked = todoElement
      .querySelector("div.view input")
      .hasAttribute("checked");
    todoElement.style.display = isChecked ? "" : "none";
  },
};

function applyTodoElementsFilter(todoElements, action) {
  Array.apply([], todoElements).map(action);
}

export function getSelectedFilter() {
  return document.querySelector('ul.filters li a[class*="selected"');
}

export function applySelectedFilter() {
  getSelectedFilter().dispatchEvent(new Event("click", { bubbles: true }));
}
