import { createElement } from "../utils/createElement.js";

const template = ({ name }) => `
  <span><strong>${name}</strong>'s Todo List</span>
`;

export default function UserTitle({ name }) {
  const $userTitle = document.querySelector("#user-title");
  const $dom = createElement(template({ name }));
  const $title = $dom.querySelector("strong");

  const render = (name) => {
    $title.innerText = name;
  };

  $userTitle.appendChild($dom);

  return {
    render,
  };
}
