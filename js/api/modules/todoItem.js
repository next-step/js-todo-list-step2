import { api } from "/js/api/index.js";

export const todoItemApi = {
  async saveItem(member, itemTitle) {
    return  await api.post(
      `/api/users/${member._id}/items/`,
      {
        contents: itemTitle,
      }
    );
  },
};
