import requests from "../../util/fetch.js";
import { $ } from "../../util/querySelector.js";

export default class UserList {
  constructor({ addUser, deleteUser, changeCurrentUser }) {
    this.addUser = addUser;
    this.deleteUser = deleteUser;
    this.changeCurrentUser = changeCurrentUser;

    this.onAddUser = () => {
      $(".user-create-button").addEventListener("click", async () => {
        const userName = prompt("추가하고 싶은 이름을 입력해주세요.");

        const newUserData = await requests.post("/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: userName }),
        });

        if (newUserData) {
          this.addUser(newUserData);
        }
      });
    };
    this.onAddUser();
  }
  $userList = $("#user-list");

  render = (userList, selectedUserInfo) => {
    console.dir(userList);
    console.dir(selectedUserInfo);
    this.$userList.innerHTML = userList
      .map(
        (user) =>
          `<button class="ripple ${
            user._id === selectedUserInfo._id ? "active" : ""
          }">${user.name}</button>`
      )
      .concat([
        `<button class="ripple user-create-button" data-action="createUser"> + 유저 생성 </button>`,
        `<button class="ripple user-delete-button" data-action="deleteUser"> 삭제 - </button>`,
      ])
      .join(" ");
    this.onAddUser();
  };
}
