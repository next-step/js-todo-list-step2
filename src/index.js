import App from "./App.js";
import Store from "./store/index.js";

// const onUserCreateHandler = () => {
//   const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
// };

// const userCreateButton = document.querySelector(".user-create-button");
// userCreateButton.addEventListener("click", onUserCreateHandler);

const initState = {
  users: [],
  userName: "",
  userId: "",
  filter: "all",
}
new App(new Store(), initState);
