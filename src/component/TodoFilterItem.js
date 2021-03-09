import { createElement } from "../utils/createElement.js";
import $store from "../store/index.js";

const template = ({ href, state, text }) => `
  <li>
    <a href="${href}" class="${state}">${text}</a>
  </li>
`;

export default function TodoFilterItem({ filter }) {
  const dom = createElement(template(filter));
  const filterBtn = dom.querySelector("a");

  const init = () => {
    dom.addEventListener("click", onFilterTodo);

    const selected = $store.todoState.getSelectedFilter();
    if (selected === filter) {
      filterBtn.classList.add("selected");
    }
  };

  const onFilterTodo = () => {
    $store.todoState.setSelectedFilter(filter);
    changeSelected();
  };

  const changeSelected = () => {
    const previous = dom.closest(".filters").querySelector(".selected");
    previous.classList.remove("selected");
    filterBtn.classList.add("selected");
  };

  init();

  return dom;
}
