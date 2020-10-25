export default (storeState, {payload}) => {
  let newState = Object.assign({}, storeState);
  if (typeof payload !== 'string') {
    console.error(payload);
    return {};
  }
  let errorMessage = payload.match(/error="([^"]+)"/);
  let errorDescription = payload.match(/error_description="([^"]+)"/);
  newState.lastError = errorMessage[1];
  newState.lastErrorDescription = errorDescription[1];
  return newState;
};