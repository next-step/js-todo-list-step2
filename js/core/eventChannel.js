export default {
  publish: (type, payload) => {
    document.dispatchEvent(
      new CustomEvent(type, {
        detail: payload,
      })
    );
  },
  subscribe: (type, listener) => {
    document.addEventListener(type, listener);
  },
};

export const ACTION = {
  INIT: 'init',
  VIEW_INIT: 'viewInit',
};
