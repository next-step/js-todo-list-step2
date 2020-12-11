import $api from "../../api/index.js";

const user = {
  _selected: {},
  get selected() {
    return this._selected;
  },
  set selected(value) {
    this._selected = value;
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

  mapUser(user) {
    return {
      ...user,
      active: false,
    };
  },

  async getAll() {
    const users = await $api.user.getAll();
    return users.map(this.mapUser);
  },

  async create(name) {
    const user = await $api.user.create({ name });
    return this.mapUser(user);
  },

  select(user) {
    this.selected = user;
  },
};

export default user;
