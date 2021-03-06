import { ApiService } from "/js/api/index.js";

export const MemberApiService = {
  async findAllMember() {
    return await ApiService.get("/api/users");
  },
  async saveMember(data) {
    return await ApiService.post("/api/users/", data);
  },
};
