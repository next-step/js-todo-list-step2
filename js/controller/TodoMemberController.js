import { todoMemberService } from "/js/service/TodoMemberSerivce.js";
import { $store } from "/js/store/MemberStore.js";

function TodoMemberController() {
  const $userList = document.querySelector("#user-list");

  const onClickUserComponent = ({ target }) => {
    if (isMemberCreateButton(target)) {
      const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
      todoMemberService.addMember(userName);
      return;
    }
    if (isMemberDeleteButton(target)) {
      todoMemberService.deleteMember($store.getNowMemberId());
      return;
    }
    todoMemberService.selectMember(target.dataset.id);
  };

  const isMemberCreateButton = (target) => {
    return target.classList.contains("user-create-button");
  };

  const isMemberDeleteButton = (target) => {
    return target.classList.contains("user-delete-button");
  };

  this.init = function () {
    $userList.addEventListener("click", onClickUserComponent);
  };
}

export const todoMemberController = new TodoMemberController();
