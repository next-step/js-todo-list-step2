import { createElement } from "../utils/createElement.js";

const template = ({ name, active }) => {
  const className = ["ripple", active ? "active" : ""].join(" ");
  return `<button class="${className}">${name}</button>`;
};

export default function UserListItem({ user, selectUser }) {
  const dom = createElement(template(user));

  const init = () => {
    dom.addEventListener("click", onSelectUser);
  };

  const onSelectUser = () => {
    selectUser(user);
  };

  init();

  return dom;
}
