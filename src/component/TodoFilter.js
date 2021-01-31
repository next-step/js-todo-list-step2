import { createElement } from "../utils/createElement.js";

import TodoFilterItem from "./TodoFilterItem.js";
import { FILTER } from "../utils/constants.js";

export default function TodoFilter() {
  const dom = createElement(`<div></div>`);

  const init = () => {
    dom.innerHTML = "";
    render();
  };

  const render = () => {
    Object.values(FILTER).map(renderEachFilter);
  };

  const renderEachFilter = (filter) => {
    const todoFilterItem = TodoFilterItem({ filter });
    dom.appendChild(todoFilterItem);
  };

  init();

  return dom;
}
