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


axiosMock.axiosMocks(process.env.REACT_APP_CORE_API_ENDPOINT);

const controlledHttpClient = axios.create({
  baseURL: process.env.REACT_APP_CORE_API_ENDPOINT,
});

describe('Observer List', () => {
  let store, wrapper;
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
      // Error message
      lastError: '',
      lastErrorDescription: '',
      selectedCampaign: {
        campaignId: 1
      },
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
      },
      controlledHttpClient
    };
    const mockStore = configureMockStore();
    store = mockStore(reduxMockStore);
  });

  describe('test cases valid', () => {
    beforeEach(() => {
      wrapper = mountWithIntl(
        <IntlProvider locale={i18n.locale} timezone={i18n.timezone} messages={i18n.messages}>
          <Provider store={store} >
            <Authority>
              <ObserverList />
            </Authority>
          </Provider>
        </IntlProvider>
      );
    });
    it('check Observers list render successful', () => {
      const observerListComponent = wrapper.find('ObserverListComponent');
      expect(observerListComponent.length).toEqual(1);
    });

    it('rendering AbstractList successful', () => {
      wrapper.update();
      const abstractList = wrapper.find('.animated');
      expect(abstractList.hasClass('fadeIn')).toEqual(true);

    });

    it('rendering React-table successful', () => {
      wrapper.update();
      const reactTable = wrapper.find('ReactTable');
      expect(reactTable.length).toEqual(1);
    });

    it ('check data set data on state after call api', () => {
      let data = [
        {
          "id": 0,
          "observerId": "1",
          "campaignId": "1",
          "label": "observers name",
          "lifetime": "3600000",
          "priority": "0",
          "condition": {
            "channel": "web",
            "targetPhoneNumber": "0359891749",
            "defaultTrackingNumberId": "{defaultTrackingNumberId}",
            "targetDevice": "'all",
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
          "createdAt": "2018-12-20T12:36:59+00:00"
        }
      ];
      wrapper.update();
      const abstractList = wrapper.find('AbstractListComponent');
      expect(abstractList.state().items).toEqual(data);
    });
  });

  describe('throw error when campaignId is invalid format', () => {
    it('check error campaignId invalid format', () => {
      store.getState().selectedCampaign.campaignId = 'asdasd';
      const observers = mountWithIntl(
        <IntlProvider locale={i18n.locale} timezone={i18n.timezone} messages={i18n.messages}>
          <Provider store={store} >
            <Authority>
              <ObserverList />
            </Authority>
          </Provider>
        </IntlProvider>
      );
      expect(() => observers.find('AbstractListComponent').simulateError('Campaign Id invalid format')).toThrow();
    });
  });

  describe('throw error when campaignId is does exits', () => {
    it('check error campaignId is does exits', () => {
      store.getState().selectedCampaign.campaignId = 2;
      const observers = mountWithIntl(
        <IntlProvider locale={i18n.locale} timezone={i18n.timezone} messages={i18n.messages}>
          <Provider store={store} >
            <Authority>
              <ObserverList />
            </Authority>
          </Provider>
        </IntlProvider>
      );
      expect(() => observers.find('AbstractListComponent').simulateError('Observers does not exist')).toThrow();
    });
  });

  describe('Test response is empty', () => {
    it('Test response is empty', () => {
      store.getState().selectedCampaign.campaignId = null;
      const observers = mountWithIntl(
        <IntlProvider locale={i18n.locale} timezone={i18n.timezone} messages={i18n.messages}>
          <Provider store={store} >
            <Authority>
              <ObserverList />
            </Authority>
          </Provider>
        </IntlProvider>
      );
      const observationPoint = observers.find('AbstractListComponent');
      expect(observationPoint.state().items).toEqual([]);
    });
  });

  describe('throw error when campaignId is empty', () => {
    it('check error campaignId is empty', () => {
      store.getState().selectedCampaign.campaignId = '';
      const observers = mountWithIntl(
        <IntlProvider locale={i18n.locale} timezone={i18n.timezone} messages={i18n.messages}>
          <Provider store={store} >
            <Authority>
              <ObserverList />
            </Authority>
          </Provider>
        </IntlProvider>
      );
      expect(() => observers.find('AbstractListComponent').simulateError('Campaign Id invalid format')).toThrow();
    });
  });

  describe('throw error when data response from API inCorrect', () => {
    it('check throw error when data structure is not correct', () => {
      axiosMock.axiosMocks(process.env.REACT_APP_CORE_API_ENDPOINT, 'error');
      store.getState().selectedCampaign.campaignId = '';
      const observers = mountWithIntl(
        <IntlProvider locale={i18n.locale} timezone={i18n.timezone} messages={i18n.messages}>
          <Provider store={store} >
            <Authority>
              <ObserverList />
            </Authority>
          </Provider>
        </IntlProvider>
      );
      expect(() => observers.find('AbstractListComponent').simulateError('Unknown error')).toThrow();
    });
  });
});
