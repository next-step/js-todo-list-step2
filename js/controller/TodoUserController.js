function TodoUserController() {
  const userCreateButton = document.querySelector(".user-create-button");

  const onUserCreateHandler = () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  };

  this.init = function () {
    userCreateButton.addEventListener("click", onUserCreateHandler);
  };
}

export const todoUserController = new TodoUserController();
