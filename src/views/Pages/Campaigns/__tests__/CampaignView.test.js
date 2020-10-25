import React from 'react';
import {Provider} from 'react-redux';
import { mountWithIntl } from 'enzyme-react-intl';
import i18n from '../../../lib/i18n';
import { IntlProvider } from 'react-intl';
import axios from 'axios';
import CampaignView from '../CampaignView';
import configureMockStore from 'redux-mock-store';
import Authority from '../../../containers/DefaultLayout/Authority.js';
import axiosMock from '../../../__mocks__/axiosMock';
import 'moment/locale/ja';

const controlledHttpClient = axios.create({
  baseURL: process.env.REACT_APP_CORE_API_ENDPOINT,
});

describe('CampaignView', () => {
  let store, wrapper;
  axiosMock.mockAxiosAccounts(process.env.REACT_APP_CORE_API_ENDPOINT);
  const props = {
    params: {
      campaignId: 1,
    }
  };

  describe('test the cases in Campaign View component', () => {
    beforeEach(async () => {
      let reduxMockStore = {
        identity: {
          accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOnsiaWQiOjYsInJvbGUiOjIsImxhYmVsIjoiVG9tb2hpZGUgS0FLRVlBIn0sImV4cCI6MTU1NzQ3ODk2NywiY3JlYXRlZEF0IjoxNTU3NDc3MTY3fQ.rIpYe-vaG03MECEJ9wkte09Bb18U7LHJZsH4dJxz824',
          refreshToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOnsiaWQiOjYsInJvbGUiOjIsImxhYmVsIjoiVG9tb2hpZGUgS0FLRVlBIn0sImNyZWF0ZWRBdCI6MTU1NzQ3NzE2N30.cqVTL97Rla_SRIWHn5fRPNkihh-ar86BF8zBEkdRST0',
          expiresIn: 2957478967,
          authorizedAt: '2019-05-10T08:32:47.211Z'
        },
        errorMessage: '',
        lastErrorDescription: '',
        selectedCampaign: {
          campaignId: 3,
          accountId: 3,
          label: "Test campaign",
          createdAt: "2018-12-20T12:36:59+00:00"
        },
        configOfCampaigns: {
          pageSize: 100,
          sorted: [{id: 'label', desc: true}],
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
      wrapper = await mountWithIntl(
        <IntlProvider locale={i18n.locale} timezone={i18n.timezone} messages={i18n.messages}>
          <Provider store={store} >
            <Authority>
              <CampaignView match={props}/>
            </Authority>
          </Provider>
        </IntlProvider>
      );
    });
    it ('rendering campaign view successful', () => {
      const campaignView = wrapper.find('CampaignViewComponent');
      expect(campaignView.length).toEqual(1);
      expect(campaignView.text().includes('キャンペーン情報')).toBe(true);
    });

    it ('rendering React-Table Component successful', () => {
      wrapper.update();
      const campaignViewComponent = wrapper.find('.animated');
      expect(campaignViewComponent.hasClass('fadeIn')).toEqual(true);
      const reactTable = wrapper.find('ReactTable');
      expect(reactTable.length).toEqual(2);
    });

    it ('Check get data from axios mock successful', () => {
      const observers = [
        {
          "observerId": "1",
          "label": "observer name"
        }
      ];
      const trackingNumbers = [
        {
          "trackingNumberId": "1",
          "phoneNumber": "0123456789"
        }
      ];
      const infoCampaign = {
        "campaignId": "1",
        "accountId": "1",
        "label": "campaign name 1",
        "defaultTrackingNumberId": "1",
        "beganAt": "2019-04-01T16:58:02+09:00",
        "finishedAt": "2019-04-01T16:58:02+09:00",
        "createdAt": "2019-04-01T16:58:02+09:00",
        "deletedAt": "2019-04-01T16:58:02+09:00",
        "_embedded": {
          "observers": [
            {
              "observerId": "1",
              "label": "observer name"
            }
          ],
          "trackingNumbers": [
            {
              "trackingNumberId": "1",
              "phoneNumber": "0123456789"
            }
          ]
        }
      };

      wrapper.update();
      const campaignView = wrapper.find('CampaignViewComponent');
      expect(campaignView.state().observers.data).toEqual(observers);
      expect(campaignView.state().trackingNumber.data).toEqual(trackingNumbers);
      expect(campaignView.state().campaign).toEqual(infoCampaign);
    });

    it('Expect data rendered on react-table', () => {
      wrapper.update();
      const campaignView = wrapper.find('CampaignViewComponent');
      expect(campaignView.text().includes('observer name')).toBe(true);
      expect(campaignView.text().includes('0123456789')).toBe(true);
    });
  });

  describe('throw error when campaign is not exits', () => {
    it('check error campaign not exist', () => {
      const props = {
        params: {
          campaignId: 5,
        }
      };
      const campaignView = mountWithIntl(
        <IntlProvider locale={i18n.locale} timezone={i18n.timezone} messages={i18n.messages}>
          <Provider store={store} >
            <Authority>
              <CampaignView match={props}/>
            </Authority>
          </Provider>
        </IntlProvider>
      );
      expect(() => campaignView.find('CampaignViewComponent').simulateError('Campaign not exist')).toThrow();
    });
  });

  describe('throw error when campaignId is invalid format', () => {
    it('check error campaignId invalid format', () => {
      const props = {
        params: {
          campaignId: 'asas',
        }
      };
      const campaignView = mountWithIntl(
        <IntlProvider locale={i18n.locale} timezone={i18n.timezone} messages={i18n.messages}>
          <Provider store={store} >
            <Authority>
              <CampaignView match={props}/>
            </Authority>
          </Provider>
        </IntlProvider>
      );
      expect(() => campaignView.find('CampaignViewComponent').simulateError('Campaign invalid format')).toThrow();
    });
  });
});