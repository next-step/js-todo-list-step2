const watch = (() => {
  let watch = {};

  const subscribe = (target, method) => {
    const key = `${target}`;
    if (!watch[key]) {
      watch[key] = [method];
    }
    watch[key].push(method);
  };

  const publish = (target) => {
    const key = `${target}`;
    if (!watch[key]) {
      return;
    }
    watch[key].forEach(async (method) => await method());
  };

  return {
    subscribe,
    publish,
  };
})();

export default watch;
