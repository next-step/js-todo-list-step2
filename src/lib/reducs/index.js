let store;
function createStore(reducer, middleWares = []) {
  let state = reducer(undefined, { type: 'DEFAULT' });

  let listeners = [];

  function dispatch(action) {
    state = reducer(state, action);
    publish();
  }

  function publish() {
    listeners.forEach(listener => listener());
  }

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.push(listener);

    return function unsubscribe() {
      listeners = listeners.filter(l => l !== listener);
    };
  }

  store = {
    getState,
    subscribe,
  };

  let lastDispatch = dispatch;
  middleWares = [...middleWares].reverse();
  middleWares.forEach(
    m => (lastDispatch = m({ ...store, dispatch: lastDispatch })(lastDispatch))
  );

  return { ...store, dispatch: lastDispatch };
}

function createAction(type, payload) {
  return { type, payload };
}

/**
 *
 * @returns A reducer function that invokes every reducer inside the passed object,
 * and builds a state object with the same shape.
 */
function combineReducers(reducersObj) {
  let combinedState = {};
  const reducers = Object.entries(reducersObj);
  // [ [ 'todo', ƒ todo() ], [ 'user', ƒ user() ] ]
  reducers.forEach(([key, reducer]) => {
    combinedState[key] = reducer(undefined, { type: 'DEFAULT' });
  });

  return function combinedReducer(state = combinedState, action) {
    reducers.forEach(([key, reducer]) => {
      state[key] = reducer(state[key] || undefined, action);
    });
    return state;
  };
}

export function useSelector(fn) {
  if (typeof fn !== 'function') return store.getState();
  return fn(store.getState());
}

export { createStore, createAction, combineReducers };
