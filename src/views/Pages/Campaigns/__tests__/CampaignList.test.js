import React from 'react';
import {Provider} from 'react-redux';
import { mountWithIntl } from 'enzyme-react-intl';
import CampaignList from '../CampaignList';
import i18n from '../../../lib/i18n';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import Authority from '../../../containers/DefaultLayout/Authority.js';
import axiosMock from '../../../__mocks__/axiosMock';
import 'moment/locale/ja';


axiosMock.mockAxiosAccounts(process.env.REACT_APP_CORE_API_ENDPOINT);

const controlledHttpClient = axios.create({
  baseURL: process.env.REACT_APP_CORE_API_ENDPOINT,
});

describe("CampaignList", () => {
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
      selectedAccount: {accountId: 1},
      configOfCampaigns: {
        pageSize: 100,
        sorted: [{id: 'label', desc: true}],
        columns: {}
      },
      loading: false,
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

  describe('Test valid case in Campaign List', () => {
    beforeEach(() => {
      const props = {
        accountId: 1,
      };

      wrapper = mountWithIntl(
        <IntlProvider locale={i18n.locale} timezone={i18n.timezone} messages={i18n.messages}>
          <Provider store={store} >
            <Authority>
              <MemoryRouter>
                <CampaignList selectedAccount={props} />
              </MemoryRouter>
            </Authority>
          </Provider>
        </IntlProvider>
      );
    });

    it('rendering campaign lists successful', () => {
      const campaignListComponent = wrapper.find('CampaignListComponent');
      expect(campaignListComponent.length).toEqual(1);
      expect(campaignListComponent.text().includes('キャンペーン一覧')).toBe(true);
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

    it('rendering data on React-table successful', () => {
      wrapper.update();
      const reactTable = wrapper.find('ReactTable');
      expect(reactTable.text().includes('campaign name 1')).toBe(true);
    });

    it('check data set data on state after call api', () => {
      const campaign = [
        {
          "id": 0,
          "campaignId": "1",
          "accountId": "1",
          "label": "campaign name 1",
          "defaultTrackingNumberId": "1",
          "beganAt": "2019-04-01T16:58:02+09:00",
          "finishedAt": "2019-04-01T16:58:02+09:00",
          "createdAt": "2019-04-01T16:58:02+09:00",
          "deletedAt": "2019-04-01T16:58:02+09:00",
        }
      ];
      wrapper.update();
      const abstractList = wrapper.find('AbstractListComponent');
      expect(abstractList.state().items).toEqual(campaign);
    });
    it ('Includes link to campaign view', () => {
      wrapper.update();
      const link = wrapper.find('Link').get(0);
      expect(link.props.to).toEqual('/campaigns/1');
    });

  });

  describe('throw error when data response from API inCorrect', () => {
    it('check throw error when data structure is not correct', () => {
      axiosMock.mockAxiosAccounts(process.env.REACT_APP_CORE_API_ENDPOINT, 'error');
      expect(() => {
        const abstractListComponent = mountWithIntl(
          <IntlProvider locale={i18n.locale} timezone={i18n.timezone} messages={i18n.messages}>
            <Provider store={store} >
              <Authority>
                <AbstractList
                  src="/campaigns"
                  target="campaigns"
                  config={store.getState().configOfCampaigns}
                  updateConfig={() => jest.fn}
                  cardTitle="Campaign List"
                  defaultColumns={null}
                />
              </Authority>
            </Provider>
          </IntlProvider>
        );
      }).toThrow();
    });
  });

  describe('throw error when accountId not exist', () => {
    it('check throw error when accountID is not exist', () => {
      const params = {
        accountId: 2
      };

      expect(() => {
        const abstractListComponent = mountWithIntl(
          <IntlProvider locale={i18n.locale} timezone={i18n.timezone} messages={i18n.messages}>
            <Provider store={store} >
              <Authority>
                <AbstractList
                  src="/campaigns"
                  target="campaigns"
                  params={params}
                  config={store.getState().configOfCampaigns}
                  updateConfig={() => jest.fn}
                  cardTitle="Campaign List"
                  defaultColumns={null}
                />
              </Authority>
            </Provider>
          </IntlProvider>
        );
      }).toThrow();
    });
  });

  describe('throw error when accountId invalid format', () => {
    it('check throw error when accountID invalid format', () => {
      const params = {
        accountId: 'axaxax'
      };
      
      expect(() => {
        const abstractListComponent = mountWithIntl(
          <IntlProvider locale={i18n.locale} timezone={i18n.timezone} messages={i18n.messages}>
            <Provider store={store} >
              <Authority>
                <AbstractList
                  src="/campaigns"
                  target="campaigns"
                  params={params}
                  config={store.getState().configOfCampaigns}
                  updateConfig={() => jest.fn}
                  cardTitle="Campaign List"
                  defaultColumns={null}
                />
              </Authority>
            </Provider>
          </IntlProvider>
        );
      }).toThrow();
    });
  });
});