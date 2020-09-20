import {observable} from "./Observer.js";

export const Store = class {

  $state; $getters; #mutations; #actions;

  constructor({ state = {}, mutations = {}, getters = {}, actions = {} }) {
    this.$state = observable(state);
    console.log(state);
    this.$getters = Object.entries(getters)
                          .reduce((getters, [key, getter]) => {
                            Object.defineProperty(getters, key, {
                              get: () => getter(this.$state)
                            })
                            return getters;
                          }, {});
    this.#mutations = mutations;
    this.#actions = actions;
  }

  commit (key, payload) {
    this.#mutations[key](this.$state, payload);
  }

  dispatch (key, payload) {
    return this.#actions[key]({
      commit: (key, payload) => this.commit(key, payload),
      dispatch: (key, payload) => this.dispatch(key, payload),
      state: this.$state,
    }, payload);
  }
}
