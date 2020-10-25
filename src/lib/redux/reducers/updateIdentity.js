export default (storeState, {payload}) => {
  let newState = Object.assign({}, storeState);
  newState.identity = {
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken,
    expiresIn: payload.expiresIn,
    authorizedAt: new Date(),
  };
  return newState;
};