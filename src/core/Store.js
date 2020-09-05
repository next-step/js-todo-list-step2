export const Store = class {

  $state;
  #mutations;
  #actions;
  $getters;
  #observes = new Set();

  constructor({ state, mutations, getters, actions }) {
    this.$state = state;
    this.$getters = Object.entries(getters)
                          .reduce((getters, [key, getter]) => {
                            Object.defineProperty(getters, key, {
                              get: () => getter(state)
                            })
                            return getters;
                          }, {});
    this.#mutations = mutations;
    this.#actions = actions;
  }

  commit (key, payload) {
    const newState = { ...this.$state };
    this.#mutations[key](newState, payload);
    this.#setState(newState);
  }

  dispatch (key, payload) {
    this.#actions[key]({
      commit: (key, payload) => this.commit(key, payload),
    }, payload);
  }

  addObserve (component) {
    this.#observes.add(component);
  }

  #setState (newState) {
    this.$state = { ...newState };
    this.#observes.forEach(observer => observer.$render());
  }
}