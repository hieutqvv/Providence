export default (state, action) => {
  let newState = Object.assign({}, state);
  newState.me = null;
  newState.identity = {
    authorizedAt: null,
    accessToken: null,
    refreshToken: null,
    expiresIn: null,
  };
  return newState;
};
