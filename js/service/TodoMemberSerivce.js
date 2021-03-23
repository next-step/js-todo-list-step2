import { memberApi } from "/js/api/modules/member.js";
import { todoView } from "/js/view/TodoView.js";
import { $store } from "/js/store/index.js";
import { Member } from "/js/core/member.js";

function TodoMemberService() {
  this.todoView = todoView;

  this.addMember = async (userName) => {
    try {
      const memberToSave = new Member({ name: userName });
      const member = await memberApi.saveMember(memberToSave);

      $store.member.addMember(member);
      $store.todoItem.setItems(member.todoList);

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
      await memberApi.deleteMemberById(member._id);
      $store.member.deleteMemberById(member._id);
      this.todoView.render();
    } catch (e) {
      alert(e.message);
    }
  };

  this.selectMember = async (id) => {
    let todoItems = await memberApi.findTodoItemById(id);
    $store.todoItem.setItems(todoItems);
    $store.member.setNowMemberById(id);
    this.todoView.render();
  };
}

export const todoMemberService = new TodoMemberService();
