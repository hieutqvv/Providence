export default (storeState, {payload}) => {
  let newState = Object.assign({}, storeState);

  newState.controlledHttpClient = payload;

  return newState;
};
