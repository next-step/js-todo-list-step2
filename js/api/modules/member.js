import { api } from "/js/api/index.js";
import { Member } from "/js/core/member.js";

export const memberApi = {
  async findAllMembers() {
    const members = await api.get("/api/users");
    return members.map((member) => new Member(member));
  },

  async saveMember(member) {
    const savedMember = await api.post("/api/users/", {
      name: member.name,
    });
    return new Member(savedMember);
  },

  async deleteMemberById(memberId) {
    return await api.delete(`/api/users/${memberId}`);
  },

  async findTodoItemById(memberId) {
    return await api.get(`/api/users/${memberId}/items/`);
  },
};
