const logger = (store) => (dispatch) => (action) => {
  console.group(action && action.type);
  console.log('이전 상태', store.getState());
  console.log('액션', action);
  dispatch(action);
  console.log('다음 상태', store.getState());
  console.groupEnd();
};

export default logger;
