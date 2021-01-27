const userTemplate = ({ name, active }) => {
  const className = ["ripple", active ? "active" : ""].join(" ");
  return `<button class="${className}">${name}</button>`;
};

export default function UserList({ selectUser, createUser }) {
  const $userList = document.querySelector("#user-list");
  const $userCreateBtn = document.querySelector(".user-create-button");

  const render = (users) => {
    $userList.innerHTML = users.map(userTemplate).join("");
    $userList.insertAdjacentElement("beforeend", $userCreateBtn);
  };

  const handleSelectUser = ({ target }) => {
    if (!target.classList.contains("ripple") || target === $userCreateBtn) {
      return;
    }

    selectUser(target.innerText);
  };

  const handleCreateUser = () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    if (!userName?.trim()) {
      return;
    }

    createUser(userName);
  };

  $userList.addEventListener("click", handleSelectUser);
  $userCreateBtn.addEventListener("click", handleCreateUser);

  return {
    render,
  };
}
