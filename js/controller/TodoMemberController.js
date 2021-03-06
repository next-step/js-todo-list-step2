import { todoMemberService } from "/js/service/TodoMemberSerivce.js";

function TodoMemberController() {
  const $userList = document.querySelector("#user-list");

  const onClickUserComponent = async ({ target }) => {
    if (isMemberCreateButton(target)) {
      const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
      await todoMemberService.addMember(userName);
      return;
    }
    console.log(target.innerText);
  };

  const isMemberCreateButton = (target) => {
    return target.classList.contains("user-create-button");
  };

  this.init = function () {
    $userList.addEventListener("click", onClickUserComponent);
  };
}

export const todoMemberController = new TodoMemberController();
