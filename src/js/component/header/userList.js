import requests from "../../util/fetch.js";
import { $ } from "../../util/querySelector.js";

export default class UserList {
  constructor({ addUser, deleteUser, selectUser }) {
    this.addUser = addUser;
    this.deleteUser = deleteUser;
    this.selectUser = selectUser;

    const onClickAction = {
      createUser: async (e) => {
        const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
        const newUserData = await requests.post("/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: userName }),
        });

        if (newUserData) {
          addUser(newUserData);
        }
      },
      deleteUser: async (e) => {
        await requests.delete(`/users/${e.target.dataset.userid}`, {
          method: "DELETE",
        });
        deleteUser();
      },
      selectUser: async (e) => {
        const userdata = await requests.post(
          `/users/${e.target.dataset.userid}`
        );
        selectUser(userdata);
      },
    };

    this.addOnClickBtnListener = () => {
      for (
        let i = 0;
        i < document.getElementsByClassName("ripple").length;
        i++
      ) {
        document
          .getElementsByClassName("ripple")
          [i].addEventListener("click", async (e) => {
            onClickAction[e.target.dataset.action](e);
          });
      }
    };

    this.addOnClickBtnListener();
  }
  $userList = $("#user-list");

  render = (userList, selectedUserInfo) => {
    this.$userList.innerHTML = userList
      .map(
        (user) =>
          `<button class="ripple ${
            user._id === selectedUserInfo._id ? "active" : ""
          }" data-userid=${user._id} data-action=${
            user._id === selectedUserInfo._id ? "" : "selectUser"
          } >${user.name}</button>`
      )
      .concat([
        `<button class="ripple user-create-button" data-action="createUser"> + 유저 생성 </button>`,
        `<button class="ripple user-delete-button" data-action="deleteUser" data-userId=${selectedUserInfo._id}> 삭제 - </button>`,
      ])
      .join(" ");

    this.addOnClickBtnListener();
  };
}
