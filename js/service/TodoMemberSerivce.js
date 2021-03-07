import { MemberApiService } from "/js/api/modules/member.js";
import { todoView } from "/js/view/TodoView.js";
import { $store } from "/js/store/index.js";
import { Member } from "/js/core/member.js";

function TodoMemberService() {
  this.todoView = todoView;

  this.addMember = async (userName) => {
    try {
      const memberToSave = new Member({ name: userName });
      let member = await MemberApiService.saveMember(memberToSave);
      $store.member.addMember(member);
      this.todoView.render();
    } catch (e) {
      alert(e.message);
    }
  };

  this.deleteMember = async (member) => {
    if (!confirm("삭제하시겠습니까?")) {
      return;
    }

    try {
      console.log(member);
      await MemberApiService.deleteMemberById(member._id);
      $store.member.deleteMember(member);
      this.todoView.render();
    } catch (e) {
      alert(e.message);
    }
  };

  this.selectMember = async (id) => {
    let todoItems = await MemberApiService.findTodoItemById(id);
    $store.todoItem.setItems(todoItems);
    $store.member.setNowMemberById(id);
    this.todoView.render();
  };
}

export const todoMemberService = new TodoMemberService();
