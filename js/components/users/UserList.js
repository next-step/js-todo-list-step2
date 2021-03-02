import User from "./User.js";
import $ from "../../utils/Selector.js"
import Validation from "../../utils/Validation.js";
import RequestAPI from "../../utils/Request.js";
import {USERS} from "../../utils/Urls.js";

export default function UserList({users}) {

  this.$userList = $.single("#user-list");

  const init = () => {
    createButtonInit();

    this.$userList.addEventListener("click", userListDelegateEvent)
  }

  const createButtonInit = () => {
    const $userCreateButton = $.single(".user-create-button")
    $userCreateButton.addEventListener("click", onUserCreateHandler);
  }

  const onUserCreateHandler = () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");

    if (Validation.isNull(userName)) return
    if (!Validation.moreThan(userName, 2)) {
      alert("User의 이름은 최소 2글자 이상이어야 합니다.")
      return;
    }
  }

  const initActiveClass = () => {
    const $userButtons = $.multi("#user-list button");
    $userButtons.forEach(v => {
      if (Validation.notIncludeClass(v.classList, "active")) return;
      v.classList.remove("active");
    })
  }

  const userListDelegateEvent = e => {
    const {target: $target} = e;
    const {id: _id} = $target.dataset;
    const name = $target.textContent;

    activeUser(_id)
    changeUserTitle(name);
  }

  const activeUser = _id => {
    initActiveClass();
    $.single(`#user-list [data-id=${_id}]`).classList.add("active")
  }

  const changeUserTitle = userName=> {
    const userTitle = $.single("#user-title")
    userTitle.dataset.username = userName;

    const userTitleView = $.single("#user-title strong");
    userTitleView.textContent = userName;
  }

  const persistUser = async userName => {
    const {_id, name, todoList} = await RequestAPI.of(USERS.PERSIST_USER, {name: userName}).request();
    activeUser(_id)
    changeUserTitle(name)
  }

  const buildUserList = async () => {
    return await users.map(v => new User(v).render())
  }

  const build = async () => {
    const result = await buildUserList()
    this.$userList.innerHTML = result.join("");
  }

  this.render = async () => {
    await build();
    await init()
  }
}