import errorHandler from './errorHandler';
import hermes from './index';

/**
 * @namespace UserService at your service!
 */
const UserService = {
  async fetchUsers() {
    return await errorHandler(hermes.get);
  },
  async fetchUser(id) {
    return await errorHandler(hermes.get, id);
  },

  async add(payload) {
    return await errorHandler(hermes.post, payload);
  },

  async delete(id) {
    return await errorHandler(hermes.delete, id);
  },
};

export default UserService;
