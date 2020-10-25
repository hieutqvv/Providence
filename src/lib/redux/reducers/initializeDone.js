export default (storeState, action) => {
  let newState = Object.assign({}, storeState);

  newState.initialized = true;

  return newState;
};
