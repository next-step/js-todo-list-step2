import { todoMemberService } from "/js/service/TodoMemberSerivce.js";
import { $store } from "/js/store/index.js";

export function TodoMemberController() {
  const $userList = document.querySelector("#user-list");

  const onClickUserComponent = async ({ target }) => {
    if (isMemberCreateButton(target)) {
      const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
      await todoMemberService.addMember(userName);
      return;
    }
    if (isMemberDeleteButton(target)) {
      await todoMemberService.deleteMember($store.member.getNowMember());
      return;
    }
    if (isMemberNameButton(target)) {
      await todoMemberService.selectMember(target.dataset.id);
    }
  };

  const isMemberCreateButton = (target) => {
    return target.classList.contains("user-create-button");
  };

  const isMemberDeleteButton = (target) => {
    return target.classList.contains("user-delete-button");
  };

  const isMemberNameButton = target => {
    return target.classList.contains("ripple");
  }

  this.init = function () {
    $userList.addEventListener("click", onClickUserComponent);
  };
}

export const todoMemberController = new TodoMemberController();
