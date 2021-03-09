import { createElement } from "../utils/createElement.js";
import $store from "../store/index.js";

const template = ({ name, active }) => {
  const className = ["ripple", active ? "active" : ""].join(" ");
  return `<button class="${className}">${name}</button>`;
};

export default function UserListItem({ user }) {
  const dom = createElement(template(user));

  const init = () => {
    dom.addEventListener("click", onSelectUser);
  };

  const onSelectUser = () => {
    $store.userState.selectUser(user);
  };

  init();

  return dom;
}
