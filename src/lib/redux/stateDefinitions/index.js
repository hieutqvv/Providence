import identity from './identity';
import moment from 'moment';

const locale = (window.navigator.languages && window.navigator.languages[0]) ||
  window.navigator.language ||
  window.navigator.userLanguage ||
  window.navigator.browserLanguage;

export default {
  // Access token of login user. (persist)
  identity,
  // User data of who login.
  me: null,
  // Selection (persist)
  selectedLocale: locale,
  selectedTimezone: 'Asia/Tokyo',
  selectedAccount: null,
  selectedCampaign: null,
  selectedTerm: {
    beginTimestamp: moment().subtract(30, 'days').format('x'),
    endTimestamp: moment().format('x'),
  },
  // Prevent manipulate user when this is true.
  isRequesting: false,
  doesRequireReload: false,
  // Error message
  lastError: '',
  lastErrorDescription: '',
  // For /log/audienceLog page only.
  configOfAudienceLog: {
    pageSize: 100,
    sorted: [{id: 'visitedAt', desc: true}],
    columns: {},
  },
  // For /log/callLog page only.
  configOfCallLog: {
    pageSize: 100,
    sorted: [{id: 'visitedAt', desc: true}],
    columns: {},
  },
  // for /accounts page only.
  configOfAccounts: {
    pageSize: 100,
    sorted: [{id: 'createdAt', desc: true}],
    columns: {},
  },
  // for /campaigns page only.
  configOfCampaigns: {
    pageSize: 100,
    sorted: [{id: 'createdAt', desc: true}],
    columns: {},
  },
  configOfTrackingNumbers: {
    pageSize: 100,
    sorted: [{id: 'createdAt', desc: true}],
    columns: {},
  },
  // for /observers page only.
  configOfObservers: {
    pageSize: 100,
    sorted: [{id: 'priority', desc: true}],
    columns: {},
  },
  http: null,
  initializeDone: false,
  controlledHttpClient: null,
};
