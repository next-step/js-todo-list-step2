import { ApiService } from "/js/api/index.js";
import { Member } from "/js/core/member.js";

export const MemberApiService = {
  async findAllMembers() {
    const members = await ApiService.get("/api/users");
    return members.map((member) => new Member(member));
  },

  async saveMember(member) {
    const savedMember = await ApiService.post("/api/users/", {
      name: member.name,
    });
    return new Member({
      id: savedMember._id,
      name: savedMember.name,
      todoList: savedMember.todoList,
    });
  },

  async deleteMemberBy(memberId) {
    return await ApiService.delete(`/api/users/${memberId}`);
  },

  async findTodoItemBy(memberId) {
    return await ApiService.get(`/api/users/${memberId}/items/`);
  },
};
