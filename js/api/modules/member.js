import { api } from "/js/api/index.js";
import { Member } from "/js/core/member.js";
import { $loadingBar } from "/js/view/loadingbar.js";

export const memberApi = {
  async findAllMembers() {
    $loadingBar.loading();
    const members = await api.get("/api/users");
    return members.map((member) => new Member(member));
  },

  async saveMember({ name }) {
    $loadingBar.loading();
    const savedMember = await api.post("/api/users/", { name });
    return new Member(savedMember);
  },

  async deleteMemberById(memberId) {
    $loadingBar.loading();
    return await api.delete(`/api/users/${memberId}`);
  },

  async findTodoItemById(memberId) {
    $loadingBar.loading();
    return await api.get(`/api/users/${memberId}/items/`);
  },
};
