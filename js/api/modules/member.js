import { ApiService } from "/js/api/index.js";

export const MemberApiService = {
  async findAllMember() {
    return await ApiService.get("/api/users").then(res => res.json());
  },
};
