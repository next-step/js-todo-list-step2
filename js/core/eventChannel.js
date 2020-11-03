export default {
  done: (type, payload) =>
    document.dispatchEvent(
      new CustomEvent(type, {
        detail: payload,
      })
    ),
  when: (type, listener) => {
    document.addEventListener(type, ({ detail }) => listener(detail));
  },
};
