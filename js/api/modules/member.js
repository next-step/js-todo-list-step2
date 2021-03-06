import { ApiService } from "/js/api/index.js";

export const MemberApiService = {
  async findAllMembers() {
    return await ApiService.get("/api/users");
  },
  async saveMember(data) {
    return await ApiService.post("/api/users/", data);
  },
  async deleteMember(memberId) {
    return await ApiService.delete("/api/users/" + memberId);
  },
};
