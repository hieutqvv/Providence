export default (state, {payload}) => {
  let newState = Object.assign({}, state);

  newState.reloadMainContent = payload;

  return newState;
};
