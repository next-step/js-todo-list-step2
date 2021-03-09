import { initTodos } from "./todolistview.js";
import { initFilters } from "./filterview.js";

window.onload = () => init();

function init() {
  initTodos();
  initFilters();
}
