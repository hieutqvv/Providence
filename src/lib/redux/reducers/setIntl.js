export default (storeState, {payload}) => {
  let newState = Object.assign({}, storeState);
  newState.intl = payload.intl;
  return newState;
};