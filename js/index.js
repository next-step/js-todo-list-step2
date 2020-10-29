import User from "./client/user.js";

const apiService = new User();
const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  apiService.addUser(userName);
};

apiService
  .fetchUsers()
  .then((users) => users.map((user) => user.name))
  .then(console.log);
const userCreateButton = document.querySelector(".user-create-button");
userCreateButton.addEventListener("click", onUserCreateHandler);
