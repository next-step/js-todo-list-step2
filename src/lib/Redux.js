let store;

export const createStore = (reducer, middlewares = []) => {
  let state = reducer(undefined, { type: 'DEFAULT' });
  let handler = [];

  const dispatch = (action) => {
    state = reducer(state, action);
    handler.forEach((listener) => {
      listener();
    });
  };

  const getState = () => state;

  const subscribe = (listener) => {
    handler.push(listener);

    return () => {
      handler = handler.filter((l) => l !== listener);
    };
  };

  store = {
    getState,
    subscribe,
  };

  middlewares = Array.from(middlewares).reverse();

  let lastDispatch = dispatch;

  middlewares.forEach((middleware) => {
    lastDispatch = middleware({ ...store, dispatch: lastDispatch })(
      lastDispatch
    );
  });

  return {
    ...store,
    dispatch: lastDispatch,
  };
};

export const combineReducers = (reducersObj) => {
  const combinedState = {};
  const reducers = Object.entries(reducersObj);
  reducers.forEach(([key, reducer]) => {
    combinedState[key] = reducer(undefined, { type: 'DEFAULT' });
  });

  return (state = combinedState, action) => {
    reducers.forEach(([key, reducer]) => {
      state[key] = reducer(state[key] || undefined, action);
    });
    return state;
  };
};

export const useSelector = (fn) => {
  if (typeof fn !== 'function') return store.getState();
  return fn(store.getState());
};
