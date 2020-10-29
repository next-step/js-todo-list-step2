import User from "./client/user.js";

const apiService = new User();
const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  apiService.addUser(userName);
};

/**
 * 유저 목록을 보여준다
 * @param {Array} users
 */

const showUsers = (users) => {
  for (const user of users) {
    console.log(user);
  }
};

apiService.fetchUsers().then(showUsers);

const userCreateButton = document.querySelector(".user-create-button");
userCreateButton.addEventListener("click", onUserCreateHandler);

{
  /* <div id="user-list">
  <button class="ripple active">eastjun</button>
  <button class="ripple">westjun</button>
  <button class="ripple">southjun</button>
  <button class="ripple">northjun</button>
  <button class="ripple">hojun</button>
  <button class="ripple user-create-button">+ 유저 생성</button>
</div>; */
}
