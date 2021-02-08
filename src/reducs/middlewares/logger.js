const logger = store => dispatch => action => {
  console.log(`%c type ${action.type}`, 'color:lime');
  dispatch(action);
};

export default logger;
