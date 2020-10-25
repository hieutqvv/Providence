export default (state, {payload}) => {
  let newState = Object.assign({}, state);
  if (typeof payload !== 'object') {
    for (let i = 0; i < state.me._embedded.campaigns.length; ++i) {
      if (payload === state.me._embedded.campaigns[i].campaignId) {
        payload = state.me._embedded.campaigns[i];
      }
    }
  }
  newState.selectedCampaign = payload;
  return newState;
};
