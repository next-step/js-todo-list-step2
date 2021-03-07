import { api } from "/js/api/index.js";

export const todoItemApi = {
  async saveItem(member, contents) {
    return await api.post(`/api/users/${member._id}/items/`, {
      contents: contents,
    });
  },

  async deleteItem(member, itemId) {
    return await api.delete(`/api/users/${member._id}/items/${itemId}`);
  },

  async editItem(member, itemId, contents) {
    return await api.put(`/api/users/${member._id}/items/${itemId}`, {
      contents: contents,
    });
  },

  async toggleItem(member, itemId) {
    return await api.put(`/api/users/${member._id}/items/${itemId}/toggle`);
  },
};
