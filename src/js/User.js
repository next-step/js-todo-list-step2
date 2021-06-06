import { $, $$, addEvent, fetchApi } from "./utils/index.js";
export default function User(activeUser, users) {
  let userList = [];
  // let activeUser = "";
  console.log({ users });
  const userControlBtns = `
    <button class="ripple user-create-button" data-action="createUser">
      + 유저 생성
    </button>
    <button class="ripple user-delete-button" data-action="deleteUser">
      삭제 -
    </button>`;

  const beforeRender = async () => {
    this.renderUsers(users);
  };

  function userAddApi(name) {
    fetchApi("", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        activeUser = res._id;
        const newList = await fetchApi();
        console.log("new", { newList });
        userList = newList;
        this.renderUsers();
      })
      .catch((error) => console.error(error));
  }

  function activateUser(e) {
    const target = e.target;
    const users = $$("button.user");
    users.forEach((user) => user.classList.remove("active"));
    target.classList.add("active");
  }

  function onClickUsers(e) {
    const id = e.target.dataset.id;
    activateUser(e);
  }

  const onUserCreateHandler = (e) => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    userAddApi(userName);
    // const addedUserList = [...userList, {name: userName}]
    // addedUserList.sort();
    // console.log({addedUserList})

    this.renderUsers();
  };

  this.renderUsers = () => {
    const userListHtml =
      users.length > 0
        ? users
            .map(
              (user, idx) =>
                `<button class="ripple user ${
                  user.active ? "active" : ""
                }" data-id='${user._id}'>${user.name}</button>`
            )
            .join("")
        : "";

    const usersWrap = $("#user-list");
    usersWrap.innerHTML = userListHtml + userControlBtns;

    const userCreateButton = $(".user-create-button");
    addEvent(userCreateButton, "click", onUserCreateHandler);

    const $users = $$("button.user");
    console.log(userList);

    addEvent($users, "click", onClickUsers);
  };

  beforeRender();
}
