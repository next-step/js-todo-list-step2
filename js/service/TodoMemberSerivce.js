import { MemberApiService } from "/js/api/modules/member.js";
import { todoView } from "/js/view/TodoView.js";
import { $memberStore } from "/js/store/MemberStore.js";

function TodoMemberService() {
  this.todoView = todoView;

  this.addMember = async (userName) => {
    const newMember = await MemberApiService.saveMember({ name: userName });
    $memberStore.addMember(newMember);
    this.todoView.userRender();
  };
}

export const todoMemberService = new TodoMemberService();
