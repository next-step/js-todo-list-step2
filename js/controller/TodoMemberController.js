import { todoMemberService } from "/js/service/TodoMemberSerivce.js";
import { $memberStore } from "/js/store/MemberStore.js";

function TodoMemberController() {
  const $userList = document.querySelector("#user-list");

  const onClickUserComponent = ({ target }) => {
    if (isMemberCreateButton(target)) {
      const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
      todoMemberService.addMember(userName);
      return;
    }
    if (isMemberDeleteButton(target)) {
      todoMemberService.deleteMember($memberStore.getNowMemberId());
    }
    changeMember(target);
  };

  const isMemberCreateButton = (target) => {
    return target.classList.contains("user-create-button");
  };

  const isMemberDeleteButton = (target) => {
    return target.classList.contains("user-delete-button");
  };

  const changeMember = (target) => {
    console.log(target);
  };

  this.init = function () {
    $userList.addEventListener("click", onClickUserComponent);
  };
}

export const todoMemberController = new TodoMemberController();
