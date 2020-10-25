export default (storeState, {payload}) => {
  let newState = Object.assign({}, storeState);
  newState.doesRequireReload = payload;
  return newState;
};