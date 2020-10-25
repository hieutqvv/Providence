export default (storeState, {payload}) => {
  let newState = Object.assign({}, storeState);
  newState.http.defaults.headers.common['Authorization'] = `bearer ${payload.accessToken}`;
  return newState;
};