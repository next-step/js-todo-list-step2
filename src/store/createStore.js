export const createStore = (reducer) => {
  // 상태 저장 변수 선언
  let state;

  const listeners = [];

  const subscribe = (subscriber, context = null) => {
    listeners.push({
      subscriber,
      context,
    });
  };

  const publish = () => {
    listeners.forEach(({ subscriber, context }) => {
      subscriber.call(context);
    });
  };

  const getState = () => ({ ...state });

  const dispatch = (action) => {
    state = reducer(state, action);
    publish();
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
};
export const createAction = (type, payload = {}) => ({
  type,
  payload: { ...payload },
});
