export default (state, {payload}) => {
  let newState = Object.assign({}, state);
  newState.isRequesting = payload;
  if (newState.isRequesting === true) {
    newState.lastError = null;
    newState.lastErrorDescription = '';
  }
  return newState;
};
