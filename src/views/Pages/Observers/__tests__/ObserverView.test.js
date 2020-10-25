import React from 'react';
import {Provider} from 'react-redux';
import { mountWithIntl } from 'enzyme-react-intl';
import i18n from '../../../lib/i18n';
import { IntlProvider } from 'react-intl';
import axios from 'axios';
import ObserverList from '../ObserverList';
import configureMockStore from 'redux-mock-store';
import Authority from '../../../containers/DefaultLayout/Authority.js';
import axiosMock from '../../../__mocks__/axiosMockOfObservers';
import 'moment/locale/ja';
import ObserverView from '../ObserverView';

axiosMock.axiosMocks(process.env.REACT_APP_CORE_API_ENDPOINT);

const controlledHttpClient = axios.create({
  baseURL: process.env.REACT_APP_CORE_API_ENDPOINT,
});

describe('Observer View', () => {
  let store, wrapper;
  const props = {
    params: {
      observerId: 1,
    }
  };
  beforeEach(() => {
    let reduxMockStore = {
      identity: {
        accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOnsiaWQiOjYsInJvbGUiOjIsImxhYmVsIjoiVG9tb2hpZGUgS0FLRVlBIn0sImV4cCI6MTU1NzQ3ODk2NywiY3JlYXRlZEF0IjoxNTU3NDc3MTY3fQ.rIpYe-vaG03MECEJ9wkte09Bb18U7LHJZsH4dJxz824',
        refreshToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOnsiaWQiOjYsInJvbGUiOjIsImxhYmVsIjoiVG9tb2hpZGUgS0FLRVlBIn0sImNyZWF0ZWRBdCI6MTU1NzQ3NzE2N30.cqVTL97Rla_SRIWHn5fRPNkihh-ar86BF8zBEkdRST0',
        expiresIn: 2957478967,
        authorizedAt: '2019-05-10T08:32:47.211Z'
      },
      selectedLocale: 'ja',
      selectedTimezone: 'Asia/Tokyo',
      configOfAccounts: {
        pageSize: 100,
        sorted: [{id: 'createdAt', desc: true}],
        columns: {},
        patterns: {},
        relationshipTypeParams: ['owner', 'belongs', 'client', 'agency']
      },
      selectedCampaign: {
        campaignId: 3,
        accountId: 3,
        label: "Test campaign",
        createdAt: "2018-12-20T12:36:59+00:00"
      },
      // Error message
      lastError: '',
      lastErrorDescription: '',
      configOfObservers: {
        pageSize: 100,
        sorted: [{id: 'priority', desc: true}],
        columns: {}
      },
      me: {
        email: 'kakeya@scuti.asia',
        label: 'Tomohide KAKEYA',
        role: 2,
        createdAt: '2018-12-20T12:36:59+00:00',
        _embedded: {
          accounts: [],
          campaigns: [],
        }
      },
      controlledHttpClient
    };
    const mockStore = configureMockStore();
    store = mockStore(reduxMockStore);
  });

  describe('test observers view', () => {
    beforeEach(() => {
      wrapper = mountWithIntl(
        <IntlProvider locale={i18n.locale} timezone={i18n.timezone} messages={i18n.messages}>
          <Provider store={store} >
            <Authority>
              <ObserverView match={props} />
            </Authority>
          </Provider>
        </IntlProvider>
      );
    });

    it ('rendering observers view successful', () => {
      const observers = wrapper.find('ObserverViewComponent');
      expect(observers.length).toEqual(1);
      expect(observers.text().includes('観測点閲覧')).toBe(true);
    });

    it('check rendering React-table', () => {
      const reactTable = wrapper.find('ReactTable');
      expect(reactTable.length).toEqual(2);
    });

    it('Check get data from axios mock successful', () => {
      const observers = {
        "observerId": 2,
        "campaignId": 1,
        "label": "電話観測点",
        "condition": {
          "channel": "phone",
          "targetPhoneNumber": "0359891749",
          "targetDevice": "all",
          "triggers": [
            {
              "target": "landing",
              "type": "query",
              "method": "regex",
              "formula": ".*",
              "subject": "utm_source"
            }
          ]
        },
        "lifetime": 3600000,
        "priority": 0,
        "createdAt": "2018-12-20T12:36:59+00:00",
        "_embedded": {
          "trackingNumbers": [
            {
              "trackingNumberId": 1,
              "phoneNumber": "05053561091",
              "observers": [
                2
              ]
            }
          ]
        }
      };
      const triggers = [{
        "target": "landing",
        "type": "query",
        "method": "regex",
        "formula": ".*",
        "subject": "utm_source"
      }];
      const trackingNumbers = [
        {
          "trackingNumberId": 1,
          "phoneNumber": "05053561091",
          "observers": [
            2
          ]
        }
      ];
      wrapper.update();
      const observerView = wrapper.find('ObserverViewComponent');
      expect(observerView.state().observer).toEqual(observers);
      expect(observerView.state().conditionItems.triggers).toEqual(triggers);
      expect(observerView.state().trackingNumberItems.data).toEqual(trackingNumbers);
    });

    it('check target service is All checked or not', () => {
      wrapper.update();
      const radio = wrapper.find('input[type="radio"]').get(0);
      expect(radio.props.value).toEqual('all');
      expect(radio.props.checked).toEqual('checked');
    });

    it('check data render successful on conditions table', () => {
      wrapper.update();
      const reactTable = wrapper.find('ReactTable').get(0);
      expect(reactTable.props.data[0].target).toEqual('landing');
    });

    it('check data render successful on conditions table', () => {
      wrapper.update();
      const reactTable = wrapper.find('ReactTable').get(0);
      expect(reactTable.props.data[0].target).toEqual('landing');
    });

    it('check data render successful on trackingNumbers table', () => {
      wrapper.update();
      const reactTable = wrapper.find('ReactTable').get(1);
      expect(reactTable.props.data[0].phoneNumber).toEqual('05053561091');
    });
  });

  describe('throw error when observer is not exits', () => {
    it('check error observer not exist', () => {
      const props = {
        params: {
          observerId: 999,
        }
      };
      const observerView = mountWithIntl(
        <IntlProvider locale={i18n.locale} timezone={i18n.timezone} messages={i18n.messages}>
          <Provider store={store} >
            <Authority>
              <ObserverView match={props}/>
            </Authority>
          </Provider>
        </IntlProvider>
      );
      expect(() => observerView.find('ObserverViewComponent').simulateError('observer not exist')).toThrow();
    });
  });

  describe('throw error when observerId invalid format', () => {
    it('check error when observerId is invalid format', () => {
      const props = {
        params: {
          observerId: 'asdasd',
        }
      };
      const observerView = mountWithIntl(
        <IntlProvider locale={i18n.locale} timezone={i18n.timezone} messages={i18n.messages}>
          <Provider store={store} >
            <Authority>
              <ObserverView match={props}/>
            </Authority>
          </Provider>
        </IntlProvider>
      );
      expect(() => observerView.find('ObserverViewComponent').simulateError('observer not exist')).toThrow();
    });
  });
});