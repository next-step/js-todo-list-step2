import { MemberApiService } from "/js/api/modules/member.js";
import { todoView } from "/js/view/TodoView.js";
import { $memberStore } from "/js/store/MemberStore.js";
import { isEmpty } from "/js/utils/util.js";

function TodoMemberService() {
  this.todoView = todoView;

  this.addMember = async (userName) => {
    try {
      validateAddMemberName();
      await MemberApiService.saveMember({ name: userName });
      $memberStore.render(members);
      await this.todoView.userRender();
    } catch (e) {
      alert(e.message);
    }
  };

  const validateAddMemberName = (userName) => {
    if (isEmpty(userName)) {
      throw new Error("이름을 입력해주세요");
    }
  };

  this.deleteMember = async (memberId) => {
    await MemberApiService.deleteMember(memberId);

    const members = await MemberApiService.findAllMembers();
    $memberStore.render(members);
    $memberStore.resetNowMember();
    await this.todoView.userRender();
  };
}

export const todoMemberService = new TodoMemberService();
