export default (state, {payload}) => {
  let newState = Object.assign({}, state);
  newState.me = payload.me;

  if (newState.me._embedded.campaigns === null) {
    return newState;
  }

  // Select campaign if not selecting.
  let mustUpdate = true;
  if (newState.selectedCampaign !== null) {
    for (let i = 0; i < newState.me._embedded.campaigns.length; i++) {
      if (newState.selectedCampaign.campaignId === newState.me._embedded.campaigns[i].campaignId) {
        mustUpdate = false;
        break;
      }
    }
  }
  if (newState.me._embedded.campaigns === null) {
    return newState;
  }

  if (mustUpdate !== false) {
    newState.selectedCampaign = newState.me._embedded.campaigns[0];
  }

  // Select account of the selected campaign if not selecting.
  if (newState.selectedAccount === null) {
    for (let i = 0; i < newState.me._embedded.accounts.length; i++) {
      if (newState.selectedCampaign.accountId === newState.me._embedded.accounts[i].accountId) {
        newState.selectedAccount = newState.me._embedded.accounts[i];
        break;
      }
    }
  }

  return newState;
};
