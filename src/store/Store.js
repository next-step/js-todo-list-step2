const createStore = (initialState, reducer) => {
  let state = initialState;
  const events = {};

  // 상태 변화 시 실행할 함수 등록
  const subscribe = (actionType, eventCallback) => {
    if (!events[actionType]) {
      events[actionType] = [];
    }
    events[actionType].push(eventCallback);
  };

  const publish = (actionType) => {
    if (!events[actionType]) {
      return;
    }
    // console.log(`publishing ${actionType}`);
    events[actionType].map((cb) => cb());
  };

  const dispatch = (action) => {
    // action에는 type, payload(data)가 있음
    state = reducer(state, action);
    publish(action.type);
  };

  const getState = () => state;

  return {
    getState,
    subscribe,
    dispatch,
  };
};

const createAsyncStore = (initialState, reducer) => {
  let state = initialState;
  const events = {};

  // 상태 변화 시 실행할 함수 등록
  const subscribe = (actionType, eventCallback) => {
    if (!events[actionType]) {
      events[actionType] = [];
    }
    events[actionType].push(eventCallback);
  };

  const publish = (actionType) => {
    if (!events[actionType]) {
      return;
    }
    // console.log(`async publishing ${actionType}`);
    events[actionType].map((cb) => cb());
  };

  const dispatch = async (action) => {
    // action에는 type, payload(data)가 있음
    state = await reducer(state, action);
    // console.log(`async reducer for ${action.type}`);
    publish(action.type);
  };

  const getState = () => state;

  return {
    getState,
    subscribe,
    dispatch,
  };
};

export default { createStore, createAsyncStore };
