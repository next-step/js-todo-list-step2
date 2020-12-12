import $api from "../../api/index.js";

const user = (() => {
  let selected = {};

  const mapUser = (user) => {
    return {
      ...user,
      active: user._id === selected._id,
    };
  };

  return {
    get selected() {
      return selected;
    },
    set selected(value) {
      selected = value;
      this.watch.selected.forEach((method) => method());
    },

    subscribe(target, method) {
      if (!this["watch"]) {
        this["watch"] = {};
      }
      if (!this["watch"][target]) {
        this.watch[target] = [method];
      }
      this.watch[target].push(method);
    },

    async getAll() {
      const users = await $api.user.getAll();
      return users.map(mapUser);
    },

    async create(name) {
      const user = await $api.user.create({ name });
      return mapUser(user);
    },

    async getSelectedId() {
      if (!selected._id) {
        const users = await user.getAll();
        user.selected = users[0];
      }
      return selected._id;
    },
  };
})();

export default user;
