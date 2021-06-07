import { $, $$, addEvent, fetchApi } from "./utils/index.js";
export default function User({activeUser, users, fetchTodos, updateActive,deleteUser}) {
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
        console.log(res._id)
        updateActive(res._id);
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
    fetchTodos(id);
    console.log({id});
    updateActive(id)
  }

  const onUserCreateHandler = (e) => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    userAddApi(userName);

    this.renderUsers();
  };

  const onUserDelete =e => {
    const target = e.target.value;
    deleteUser();
    console.log({activeUser})
    
  }

  this.renderUsers = () => {
    const userListHtml =
      users.length > 0
        ? users
            .map(
              (user, idx) =>`<button class="ripple user ${
                  user._id === activeUser ? "active" : ""
                }" data-id='${user._id}'>${user.name}</button>`
            )
            .join("")
        : "";

    const usersWrap = $("#user-list");
    usersWrap.innerHTML = userListHtml + userControlBtns;

    const userCreateButton = $(".user-create-button");
    addEvent(userCreateButton, "click", onUserCreateHandler);
    const userDeleteButton = $(".user-delete-button");
    addEvent(userDeleteButton, "click", onUserDelete);

    const $users = $$("button.user");

    addEvent($users, "click", onClickUsers);
  };

  beforeRender();
}
