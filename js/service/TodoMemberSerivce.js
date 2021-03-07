import { MemberApiService } from "/js/api/modules/member.js";
import { todoView } from "/js/view/TodoView.js";
import { $store } from "/js/store/MemberStore.js";
import { Member } from "/js/core/member.js";

function TodoMemberService() {
  this.todoView = todoView;

  this.addMember = async (userName) => {
    try {
      const memberToSave = new Member({ name: userName });
      $store.addMember(await MemberApiService.saveMember(memberToSave));
      this.todoView.render();
    } catch (e) {
      alert(e.message);
    }
  };

  this.deleteMember = async (memberId) => {
    if (!confirm("삭제하시겠습니까?")) {
      return;
    }

    try {
      await MemberApiService.deleteMemberBy(memberId);
      $store.deleteMember(memberId);
      this.todoView.render();
    } catch (e) {
      alert(e.message);
    }
  };

  this.selectMember = async (id) => {
    let todoItems = await MemberApiService.findTodoItemBy(id);
    $store.setItems(todoItems);
    console.log(todoItems);
    $store.setNowMember(id);
    this.todoView.render();
  };
}

export const todoMemberService = new TodoMemberService();
