export default function TodoUser(titleEl, userListEl, todoApp) {
  const checkButton = ({ classList }) =>
    !classList.contains("ripple") || classList.contains("user-create-button");

  this.chooseUser = ({ target }) => {
    if (checkButton(target)) {
      return;
    }

    todoApp.chooseUser(target.dataset.id);
  };

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
    const { _id: chosenId, name: chosenName } = todoApp.chosenUser;
    titleEl.dataset.username = chosenName;
    titleEl.innerHTML = `<span><strong>${chosenName}</strong>'s Todo List</span>`;

    userListEl.innerHTML = `${todoApp.users
      .map(
        ({ _id, name }) =>
          `<button class="ripple ${
            _id === chosenId ? "active" : ""
          }" data-id="${_id}">${name}</button>`
      )
      .join("")}<button class="ripple user-create-button">+ 유저 생성</button>`;
  };

  userListEl.addEventListener("click", this.chooseUser);
  userListEl.addEventListener("click", this.createUser);
}
