import hermes from './index.js';

/**
 * @namespace UserService at your service!
 */
class UserService {
  static async fetchUsers() {
    try {
      const { data } = await hermes.get();
      return data;
    } catch (error) {
      console.warn(error);
    }
  }

  static async add(payload) {
    return await hermes.post('', payload);
  }

  static async fetchUser(id) {
    try {
      const { data } = await hermes.get(id);
      return data;
    } catch (error) {
      console.warn(error);
    }
  }

  static async delete(id) {
    try {
      const { data } = await hermes.delete(id);
      return data;
    } catch (error) {
      console.warn(error);
    }
  }
}

export default UserService;
