import { createElement } from "../utils/createElement.js";
import $store from "../store/index.js";

const template = `
  <span><strong>Name</strong>'s Todo List</span>
`;

export default function UserTitle() {
  const dom = createElement(template);
  const title = dom.querySelector("strong");

  const init = () => {
    render();
    $store.userState.subscribe(render);
  };

  const render = () => {
    const { name } = $store.userState.getSelectedUser();
    title.innerText = name;
  };

  init();

  return dom;
}
