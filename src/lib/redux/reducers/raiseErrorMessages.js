export default (storeState, {payload}) => {
  let newState = Object.assign({}, storeState);
  let errorDescription = payload.request.statusText;
  newState.lastErrorDescription = errorDescription;

  return newState;
};