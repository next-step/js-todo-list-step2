import { api } from "/js/api/index.js";
import { $loadingBar } from "/js/utils/loadingbar.js";

export const todoItemApi = {
  async saveItem(member, contents) {
    $loadingBar.loading();
    return await api.post(`/api/users/${member._id}/items/`, {
      contents: contents,
    });
  },

  async deleteItem(member, itemId) {
    $loadingBar.loading();
    return await api.delete(`/api/users/${member._id}/items/${itemId}`);
  },

  async editItem(member, itemId, contents) {
    $loadingBar.loading();
    return await api.put(`/api/users/${member._id}/items/${itemId}`, {
      contents: contents,
    });
  },

  async toggleItem(member, itemId) {
    $loadingBar.loading();
    return await api.put(`/api/users/${member._id}/items/${itemId}/toggle`);
  },
};
