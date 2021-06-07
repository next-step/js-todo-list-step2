const watch =(() => {
  let watch = {};

  const subscribe = (target, method) => {
    if (!watch[target]) {
      watch[target] = [];
    }
    watch[target].push(method);
  };
  
  const publish = (target) => {
    if (!watch[target]) return;
    console.log(watch);
    watch[target].forEach(async (method) => await method());
  };

  return {
    subscribe,
    publish
  }  
})();

export default watch;