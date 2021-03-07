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
    return new Member(savedMember);
  },

  async deleteMemberById(memberId) {
    return await ApiService.delete(`/api/users/${memberId}`);
  },

  async findTodoItemById(memberId) {
    return await ApiService.get(`/api/users/${memberId}/items/`);
  },
};
