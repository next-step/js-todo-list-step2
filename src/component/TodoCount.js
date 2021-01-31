import { createElement } from "../utils/createElement.js";
import $store from "../store/index.js";

const template = () => `
  <div>
    총 <strong>0</strong> 개
  </div>
`;

export default function TodoCount() {
  const dom = createElement(template());
  const counter = dom.querySelector("strong");

  const init = async () => {
    $store.todoState.subscribe(render);
    await render();
  };

  const render = async () => {
    const { length } = await $store.todoState.getFilteredTodos();
    counter.innerText = length;
  };

  init();

  return dom;
}
