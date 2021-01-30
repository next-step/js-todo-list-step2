import { createElement } from "../utils/createElement.js";
import store from "../store/index.js";

const template = ({ name }) => `
  <span><strong>${name}</strong>'s Todo List</span>
`;

export default function UserTitle() {
  const $dom = createElement(template(store.userState.getSelectedUser()));
  const $title = $dom.querySelector("strong");

  const init = () => {
    store.userState.subscribe(render);
  };

  const render = () => {
    const { name } = store.userState.getSelectedUser();
    $title.innerText = name;
  };

  init();

  return $dom;
}
