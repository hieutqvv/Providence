export default (state, {payload}) => {
  let newState = Object.assign({}, state);
  newState.selectedAccount = payload;
  return newState;
};
