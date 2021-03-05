import User from "./User.js";
import $ from "../../utils/Selector.js"
import Validation from "../../utils/Validation.js";
import RequestAPI from "../../utils/Request.js";
import {USERS} from "../../utils/Urls.js";
import {addUser} from "../../utils/APIs.js";

export default function UserList({users}) {

  this.$userList = $.single("#user-list");

  const init = () => {
    createButtonEventInit();
    userListEventInit();

  }

  // 유저 생성 이벤트
  const createButtonEventInit = () => {
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

    persistUser(userName);
  }

  // user list 이벤트 위임
  const userListEventInit = () => {
    this.$userList.addEventListener("click", userListDelegateEvent)
  }

  const userListDelegateEvent = e => {
    const {target: $target} = e;
    const {_id} = $target.dataset;
    const name = $target.textContent;

    activeUser(_id)
    changeUserTitle(name);

    // 불러와야함 .
  }


  // user lit class init
  const initActiveClass = () => {
    const $userButtons = $.multi("#user-list button");
    $userButtons.forEach(v => {
      if (Validation.notIncludeClass(v.classList, "active")) return;
      v.classList.remove("active");
    })
  }

  // 해당하는 dataset-id를 갖는 button active
  const activeUser = _id => {
    initActiveClass();
    $.single(`#user-list [data-_id='${_id}']`).classList.add("active")
  }

  // 상단 userName 변경
  const changeUserTitle = userName => {
    const userTitle = $.single("#user-title")
    userTitle.dataset.username = userName;

    const userTitleView = $.single("#user-title strong");
    userTitleView.textContent = userName;
  }

  // 유저 생성 API
  const persistUser = async userName => {

    const {_id, name, todoList} = await addUser({name: userName});
    // 돔에 그려줘야함.
    this.$userList.innerHTML += new User({_id, name}).render();
    activeUser(_id)
    changeUserTitle(name)
  }

  // user list 동적 render
  const buildUserList = async () => {
    return await users.map(v => new User(v).render())
  }

  // user list 결과 render
  const build = async () => {
    const result = await buildUserList()
    this.$userList.innerHTML = result.join("");
  }

  // render
  this.render = async () => {
    await build();
    await init()
  }
}