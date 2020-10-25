import {createAction} from 'redux-actions';

export const updateMe = createAction('UPDATE_ME');
export const updateIdentity = createAction('UPDATE_IDENTITY');
export const isRequesting = createAction('IS_REQUESTING');
export const raiseError = createAction('RAISE_ERROR');
export const logout = createAction('LOGOUT');
export const changeSelectedCampaign = createAction('CHANGE_SELECTED_CAMPAIGN');
export const changeSelectedAccount = createAction('CHANGE_SELECTED_ACCOUNT');
export const changeSelectedTerm = createAction('CHANGE_SELECTED_TERM');
export const setIntl = createAction('SET_INTL');
export const doesRequireReload = createAction('DOES_REQUIRE_RELOAD');
export const updatePageConfig = createAction('UPDATE_PAGE_CONFIG');
export const setHttpClient = createAction('SET_HTTP_CLIENT');
export const setControlledHttpClient = createAction('SET_CONTROLLED_HTTP_CLIENT');
export const initializeDone = createAction('INITIALIZE_DONE');
export const raiseErrorMessages = createAction('RAISE_ERROR_MESSAGES');
export const setTokenOnHttpClient = createAction('SET_TOKEN_ON_HTTP_CLIENT');
