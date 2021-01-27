const userTemplate = ({ name, active }) => {
  const className = ["ripple", active ? "active" : ""].join(" ");
  return `<button class="${className}">${name}</button>`;
};

export default function App() {
  const users = [{ name: "eastjun", active: true }];

  const $userTitle = document.querySelector("#user-title");
  const $userList = document.querySelector("#user-list");
  const $userCreateBtn = document.querySelector(".user-create-button");

  const renderUserTitle = () => {
    const { name } = users.find(({ active }) => active);

    $userTitle.innerHTML = `<span><strong>${name}</strong>'s Todo List</span>`;
  };

  const renderUserList = () => {
    $userList.innerHTML = users.map(userTemplate).join("");
    $userList.insertAdjacentElement("beforeend", $userCreateBtn);
  };

  const activeUser = (selectedUser) => {
    users.forEach((user) => (user.active = false));
    selectedUser.active = true;
  };

  const handleSelectUser = ({ target }) => {
    if (!target.classList.contains("ripple") || target === $userCreateBtn) {
      return;
    }

    const selectedUser = users.find(({ name }) => name === target.innerText);
    activeUser(selectedUser);
    render();
  };

  const handleCreateUser = () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    if (!userName?.trim()) {
      return;
    }

    const newUser = {
      name: userName,
      active: false,
    };
    users.push(newUser);
    activeUser(newUser);

    render();
  };

  const render = () => {
    renderUserList();
    renderUserTitle();
  };

  $userList.addEventListener("click", handleSelectUser);
  $userCreateBtn.addEventListener("click", handleCreateUser);

  render();
}
