export default (storeState, {payload}) => {
  let newState = Object.assign({}, storeState);

  newState.http = payload;

  return newState;
};
