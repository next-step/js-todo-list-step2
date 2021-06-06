import requests from "../../util/fetch.js";
import { $ } from "../../util/querySelector.js";

export default class UserList {
  constructor({ addUser, deleteUser, selectUser }) {
    this.addUser = addUser;
    this.deleteUser = deleteUser;
    this.selectUser = selectUser;

    const onClickAction = {
      createUser: (e) => {
        addUser();
      },
      deleteUser: (e) => {
        deleteUser(e.target.dataset.userid);
      },
      selectUser: (e) => {
        selectUser(e.target.dataset.userid);
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

  render = (userList, selectedUserId) => {
    this.$userList.innerHTML = userList
      .map(
        (user) =>
          `<button class="ripple ${
            user._id === selectedUserId ? "active" : ""
          }" data-userid=${user._id} data-action=${
            user._id === selectedUserId ? "" : "selectUser"
          } >${user.name}</button>`
      )
      .concat([
        `<button class="ripple user-create-button" data-action="createUser"> + 유저 생성 </button>`,
        `<button class="ripple user-delete-button" data-action="deleteUser" data-userId=${selectedUserId}> 삭제 - </button>`,
      ])
      .join(" ");

    this.addOnClickBtnListener();
  };
}
