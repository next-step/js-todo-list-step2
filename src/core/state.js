export const useState = (initVal = undefined) => {
  let _state = initVal;
  const observable = new Set();

  const state = (render) => {
    if (render) observable.add(render);
    return _state;
  };

  const setState = (newValue) => {
      _state = newValue;
      render();
  };

  const render = () => {
    observable.forEach(render => render());
  };
  return [state, setState];
};