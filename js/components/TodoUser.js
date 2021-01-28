export default function TodoUser(titleEl, userListEl, todoApp) {
  this.createUser = ({ target }) => {
    if (!target.classList.contains("user-create-button")) {
      return;
    }

    const userName = prompt("추가하고 싶은 이름을 입력해주세요.").trim();
    if (userName.length < 2) {
      alert("이름은 최소 2글자 이상이어야 합니다.");
    }
  };

  this.render = () => {
    const { _id: selectedId, name: selectedName } = todoApp.selectedUser;
    titleEl.dataset.username = selectedName;
    titleEl.innerHTML = `<span><strong>${selectedName}</strong>'s Todo List</span>`;

    userListEl.innerHTML = `${todoApp.userList
      .map(
        ({ _id, name }) =>
          `<button class="ripple ${
            _id === selectedId ? "active" : ""
          }" data-id="${_id}">${name}</button>`
      )
      .join("")}<button class="ripple user-create-button">+ 유저 생성</button>`;
  };

  userListEl.addEventListener("click", this.createUser);
}
