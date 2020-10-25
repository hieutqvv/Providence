import React from 'react';
import {Provider} from 'react-redux';
import { mountWithIntl } from 'enzyme-react-intl';
import i18n from '../../../lib/i18n';
import { IntlProvider } from 'react-intl';
import axios from 'axios';
import AccountView from '../AccountView';
import configureMockStore from 'redux-mock-store';
import Authority from '../../../containers/DefaultLayout/Authority.js';
import axiosMock from '../../../__mocks__/axiosMock';
import { MemoryRouter } from 'react-router-dom';
import 'moment/locale/ja';

const controlledHttpClient = axios.create({
  baseURL: process.env.REACT_APP_CORE_API_ENDPOINT,
});

describe('AccountView', () => {
  let store, wrapper;
  axiosMock.mockAxiosAccounts(process.env.REACT_APP_CORE_API_ENDPOINT);
  const props = {
    params: {
      accountId: 1,
    }
  };
  describe('test the cases in Account View component', () => {
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
        configOfAccounts: {
          pageSize: 100,
          sorted: [{id: 'createdAt', desc: true}],
          columns: {},
          patterns: {},
          relationshipTypeParams: ['owner', 'belongs', 'client', 'agency']
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
        selectedAccount: {
          accountId: 4,
          serviceConsumerId: 1,
          ownerId: 10,
          label: "須藤石材",
          isAgency: false,
          createdAt: "2018-12-20T12:37:02+00:00",
          agencyId: 1,
        },
        controlledHttpClient
      };
      const mockStore = configureMockStore();
      store = mockStore(reduxMockStore);
      wrapper = await mountWithIntl(
        <IntlProvider locale={i18n.locale} timezone={i18n.timezone} messages={i18n.messages}>
          <Provider store={store} >
            <Authority>
              <MemoryRouter>
                <AccountView match={props}/>
              </MemoryRouter>
            </Authority>
          </Provider>
        </IntlProvider>
      );
    });
    it ('rendering account view successful', () => {
      const accountView = wrapper.find('AccountViewComponent');
      expect(accountView.length).toEqual(1);
      expect(accountView.text().includes('アカウント情報')).toBe(true);
    });

    it ('rendering AbstractList and React-Table Component successful', () => {
      wrapper.update();
      const abstractList = wrapper.find('.animated');
      expect(abstractList.hasClass('fadeIn')).toEqual(true);
      const reactTable = wrapper.find('ReactTable');
      expect(reactTable.length).toEqual(2);
    });

    it ('Check get data from axios mock successful', () => {
      const campaigns = [
        {
          "campaignId": "1",
          "label": "Campaign name 1"
        }
      ];
      const infoAccount = {
        "accountId": 1,
        "label": "account owner",
        "ownerId": 1,
        "agencyId": 1,
        "isAgency": true,
        "createdAt": "2019-04-01T16:58:02+09:00",
        "_embedded": {
          "accounts": [
            {
              "accountId": "1",
              "label": "account name"
            }
          ],
          "campaigns": [
            {
              "campaignId": "1",
              "label": "Campaign name 1"
            }
          ]
        }
      };
      wrapper.update();
      const accountView = wrapper.find('AccountViewComponent');
      expect(accountView.state().campaigns.data).toEqual(campaigns);
      expect(accountView.state().account).toEqual(infoAccount);
    });

    it('Expect data campaign rendered', () => {
      wrapper.update();
      const accountView = wrapper.find('AccountViewComponent');
      expect(accountView.text().includes('Campaign name 1')).toBe(true);
    });
  });

  describe('Expect account selected is not agency rendered', () => {
    let accountView;
    beforeEach(() => {
      const props = {
        params: {
          accountId: 3,
        }
      };
      accountView = mountWithIntl(
        <IntlProvider locale={i18n.locale} timezone={i18n.timezone} messages={i18n.messages}>
          <Provider store={store} >
            <Authority>
              <MemoryRouter>
                <AccountView match={props}/>
              </MemoryRouter>
            </Authority>
          </Provider>
        </IntlProvider>
      );
    });

    it('Expect data accounts rendered', () => {
      wrapper.update();
      const accountView = wrapper.find('AccountViewComponent');
      expect(accountView.text().includes('account name')).toBe(true);
    });
  });

  describe('throw error when account is not exits', () => {
    it('check error account not exist', () => {
      const props = {
        params: {
          accountId: 5,
        }
      };
      const accountView = mountWithIntl(
        <IntlProvider locale={i18n.locale} timezone={i18n.timezone} messages={i18n.messages}>
          <Provider store={store} >
            <Authority>
              <MemoryRouter>
                <AccountView match={props}/>
              </MemoryRouter>
            </Authority>
          </Provider>
        </IntlProvider>
      );
      expect(() => accountView.find('AccountViewComponent').simulateError('Account not exist')).toThrow();
    });
  });

  describe('throw error when accountId invalid format', () => {
    it('check error when accountId is invalid format', () => {
      const props = {
        params: {
          accountId: 'asdasd',
        }
      };
      const accountView = mountWithIntl(
        <IntlProvider locale={i18n.locale} timezone={i18n.timezone} messages={i18n.messages}>
          <Provider store={store} >
            <Authority>
              <MemoryRouter>
                <AccountView match={props}/>
              </MemoryRouter>
            </Authority>
          </Provider>
        </IntlProvider>
      );
      expect(() => accountView.find('AccountViewComponent').simulateError('Account not exist')).toThrow();
    });
  });
});
