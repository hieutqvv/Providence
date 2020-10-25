import React, {Component} from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import PropTypes from 'prop-types';
import storage from 'redux-persist/es/storage';
import {persistReducer, persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import * as actions from './actions';
import {doesRequireReload, changeSelectedCampaign, setHttpClient, setTokenOnHttpClient} from './actions';
import reducers from './reducers';
import {injectIntl} from 'react-intl';
import axios from 'axios';

class Store extends Component {
  constructor(props) {
    super(props);

    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const persistedStates = [
      'identity',
      'configOfAudienceLog',
      'configOfCallLog',
      'configOfAccounts',
      'selectedLocale',
      'selectedTimezone',
      'selectedCampaign',
      'selectedTerm',
      'configOfCampaigns',
      'configOfObservers',
    ];
    this.store = createStore(
      persistReducer({key: 'persistedStore', storage, whitelist: persistedStates}, reducers),
      composeEnhancer(applyMiddleware(this.subscriber)),
    );
    /**
     * Instance of Axios
     *
     * @type {AxiosInstance}
     */
    const http = axios.create({
      baseURL: process.env.REACT_APP_CORE_API_ENDPOINT,
    });
    this.store.dispatch(setHttpClient(http));

    this.reducers = reducers;
    this.actions = actions;
    this.props = props;
    this.persistor = persistStore(this.store, null, () => {
      const states = this.store.getState();
      if (states.identity.accessToken) {
        this.store.dispatch(setTokenOnHttpClient(states.identity));
      }
    });
  }

  componentWillMount() {
    document.querySelector('title').innerText = this.props.intl.formatMessage(
      {id: document.querySelector('title').innerText},
    );
  }

  subscriber(store) {
    return next => action => {
      /**
       * Here is before dispatch.
       */
      const returnValue = next(action);
      /**
       * Here is after dispatch.
       */
      let newState = store.getState();
      if (action.type === 'CHANGE_SELECTED_ACCOUNT') {
        if (action.payload.accountId !== newState.selectedCampaign.accountId) {
          for (let i = 0; i < newState.me._embedded.campaigns.length; i++) {
            if (action.payload.accountId === newState.me._embedded.campaigns[i].accountId) {
              store.dispatch(changeSelectedCampaign(newState.me._embedded.campaigns[i]));
              break;
            }
          }
        }
      } else if (['CHANGE_SELECTED_CAMPAIGN', 'CHANGE_SELECTED_TERM'].includes(action.type)) {
        store.dispatch(doesRequireReload(true));
      }
      return returnValue;
    };
  }

  render() {
    return (
      <Provider store={this.store}>
        <PersistGate loading={null} persistor={this.persistor}>
          {this.props.children}
        </PersistGate>
      </Provider>
    );
  }
}

Store.propTypes = {
  children: PropTypes.node,
};
Store.defaultProps = {};

export default injectIntl(Store);
