import defaultState from '../stateDefinitions';
import IS_REQUESTING from './isRequesting';
import UPDATE_ME from './updateMe';
import UPDATE_IDENTITY from './updateIdentity';
import RAISE_ERROR from './raiseError';
import CHANGE_SELECTED_CAMPAIGN from './changeSelectedCampaign';
import CHANGE_SELECTED_ACCOUNT from './changeSelectedAccount';
import CHANGE_SELECTED_TERM from './changeSelectedTerm';
import LOGOUT from './logout';
import SET_INTL from './setIntl';
import DOES_REQUIRE_RELOAD from './doesRequireReload';
import UPDATE_PAGE_CONFIG from './updatePageConfig';
import SET_HTTP_CLIENT from './setHttpClient';
import SET_CONTROLLED_HTTP_CLIENT from './setControlledHttpClient';
import INITIALIZE_DONE from './initializeDone';
import RAISE_ERROR_MESSAGES from './raiseErrorMessages';
import SET_TOKEN_ON_HTTP_CLIENT from './setTokenOnHttpClient';

const reducers = {
  UPDATE_ME,
  UPDATE_IDENTITY,
  UPDATE_PAGE_CONFIG,

  CHANGE_SELECTED_CAMPAIGN,
  CHANGE_SELECTED_ACCOUNT,
  CHANGE_SELECTED_TERM,

  LOGOUT,
  IS_REQUESTING,
  DOES_REQUIRE_RELOAD,
  RAISE_ERROR,
  SET_INTL,
  SET_HTTP_CLIENT,
  SET_CONTROLLED_HTTP_CLIENT,
  SET_TOKEN_ON_HTTP_CLIENT,
  INITIALIZE_DONE,
  RAISE_ERROR_MESSAGES,
};

export default (state = defaultState, action = {}) => {
  if (reducers[action.type] === undefined) {
    return state;
  }
  return reducers[action.type](state, action);
};
