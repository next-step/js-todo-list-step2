import UserListItem from "./UserListItem.js";
import { createElement } from "../utils/createElement.js";
import $store from "../store/index.js";

const template = () => `
  <div>
    <button class="ripple user-create-button">+ 유저 생성</button>
    <button class="ripple user-delete-button">- 유저 삭제</button>
  </div>
`;

export default function UserList() {
  const dom = createElement(template());
  const userCreateBtn = dom.querySelector(".user-create-button");
  const userDeleteBtn = dom.querySelector(".user-delete-button");

  const init = async () => {
    userCreateBtn.addEventListener("click", onCreateUser);
    userDeleteBtn.addEventListener("click", onDeleteUser);
    $store.userState.subscribe(render);

    await render();
  };

  const render = async () => {
    const users = await $store.userState.getUsers();

    dom.innerHTML = "";
    users.forEach(renderEachUser);
    dom.appendChild(userCreateBtn);
    dom.appendChild(userDeleteBtn);
  };

  const renderEachUser = (user) => {
    const selectUser = $store.userState.selectUser;
    const $userListItem = new UserListItem({ user, selectUser });
    dom.appendChild($userListItem);
  };

  const onCreateUser = async () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.")?.trim();
    if (userName.length <= 2) {
      alert("유저의 이름은 최소 2글자 이상이어야 합니다.");
      return;
    }

    const newUser = await $store.userState.createUser(userName);
    $store.userState.selectUser(newUser);
  };

  const onDeleteUser = async () => {
    const { _id, name } = $store.userState.getSelectedUser();
    const isYes = confirm(`${name}을 삭제할까요?`);
    if (!isYes) {
      return;
    }

    await $store.userState.deleteUser(_id);
  };

  init();

  return dom;
}
