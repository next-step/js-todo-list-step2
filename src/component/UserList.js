import UserListItem from "./UserListItem.js";

export default function UserList({ selectUser, createUser }) {
  const $userList = document.querySelector("#user-list");
  const $userCreateBtn = document.querySelector(".user-create-button");

  const renderEachUser = (user) => {
    const userListItem = new UserListItem({ user, selectUser });
    $userList.appendChild(userListItem.$dom);
  };

  const render = (users) => {
    $userList.innerHTML = "";
    users.forEach(renderEachUser);
    $userList.appendChild($userCreateBtn);
  };

  const handleCreateUser = () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    if (!userName?.trim()) {
      return;
    }

    createUser(userName);
  };

  $userCreateBtn.addEventListener("click", handleCreateUser);

  return {
    render,
  };
}
