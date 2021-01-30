import UserListItem from "./UserListItem.js";
import { createElement } from "../utils/createElement.js";
import store from "../store/index.js";

const template = () => `
  <div>
    <button class="ripple user-create-button">+ 유저 생성</button>
  </div>
`;

export default function UserList() {
  const $dom = createElement(template());
  const $userCreateBtn = $dom.querySelector(".user-create-button");

  const init = () => {
    $userCreateBtn.addEventListener("click", handleCreateUser);
    render();
    store.userState.subscribe(render);
  };

  const render = () => {
    const users = store.userState.getUsers();

    $dom.innerHTML = "";
    users.forEach(renderEachUser);
    $dom.appendChild($userCreateBtn);
  };

  const renderEachUser = (user) => {
    const selectUser = store.userState.selectUser;
    const $userListItem = new UserListItem({ user, selectUser });
    $dom.appendChild($userListItem);
  };

  const handleCreateUser = () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    if (!userName?.trim()) {
      return;
    }

    store.userState.createUser(userName);
  };

  init();

  return $dom;
}
