import React, {cloneElement} from 'react';
import {Provider} from 'react-redux';
import { mountWithIntl } from 'enzyme-react-intl';
import i18n from '../../../lib/i18n';
import { IntlProvider } from 'react-intl';
import axios from 'axios';
import AccountList from '../AccountList';
import AbstractList from '../../BaseComponent/AbstractList';
import configureMockStore from 'redux-mock-store';
import Authority from '../../../containers/DefaultLayout/Authority.js';
import axiosMock from '../../../__mocks__/axiosMock';
import { MemoryRouter } from 'react-router-dom';
import 'moment/locale/ja';

axiosMock.mockAxiosAccounts(process.env.REACT_APP_CORE_API_ENDPOINT);

const controlledHttpClient = axios.create({
  baseURL: process.env.REACT_APP_CORE_API_ENDPOINT,
});

const data = [
  {
    "id": 0,
    "accountId": 1,
    "label": "account owner",
    "ownerId": 1,
    "agencyId": 1,
    "isAgency": true,
    "createdAt": "2019-04-01T16:58:02+09:00",
  },
  {
    "id": 1,
    "accountId": 2,
    "label": "account belongs",
    "ownerId": 1,
    "agencyId": 1,
    "isAgency": true,
    "createdAt": "2019-04-01T16:58:02+09:00",
  },
  {
    "id": 2,
    "accountId": 3,
    "label": "account client",
    "ownerId": 1,
    "agencyId": 1,
    "isAgency": false,
    "createdAt": "2019-04-01T16:58:02+09:00",
  },
  {
    "id": 3,
    "accountId": 4,
    "label": "account agency",
    "ownerId": 1,
    "agencyId": 1,
    "isAgency": true,
    "createdAt": "2019-04-01T16:58:02+09:00",
  }
];

describe('AccountList', () => {
  let store, wrapper;
  const unCheckOwner = {target: {checked: false, dataset: {filter: 'owner'}}};
  const unCheckClient = {target: {checked: false, dataset: {filter: 'client'}}};
  const unCheckBelongs = {target: {checked: false, dataset: {filter: 'belongs'}}};
  const unCheckAgency = {target: {checked: false, dataset: {filter: 'agency'}}};
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
      selectedAccount: {
        'accountId': 4,
        'serviceConsumerId': 1,
        'ownerId': 10,
        'label': "須藤石材",
        'isAgency': false,
        'createdAt': "2018-12-20T12:37:02+00:00",
        'agencyId': 1,
      },
      // Error message
      lastError: '',
      lastErrorDescription: '',
      configOfAccounts: {
        pageSize: 100,
        sorted: [{id: 'createdAt', desc: true}],
        columns: {},
        patterns: {},
        relationshipTypeParams: ['owner', 'belongs', 'client', 'agency']
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
  describe('Test valid case in Account List', () => {
    beforeEach(() => {
      wrapper = mountWithIntl(
        <IntlProvider locale={i18n.locale} timezone={i18n.timezone} messages={i18n.messages}>
          <Provider store={store} >
            <Authority>
              <MemoryRouter>
                <AccountList />
              </MemoryRouter>
            </Authority>
          </Provider>
        </IntlProvider>
      );
    });

    it ('rendering account lists successful', () => {
      const accountListComponent = wrapper.find('AccountListComponent');
      expect(accountListComponent.length).toEqual(1);
    });

    it ('rendering AbstractList and React-Table Component successful', () => {
      wrapper.update();
      const abstractList = wrapper.find('.animated');
      expect(abstractList.hasClass('fadeIn')).toEqual(true);
      const reactTable = wrapper.find('ReactTable');
      expect(reactTable.length).toEqual(1);
    });

    it ('Check get data from axios mock successful', () => {
      wrapper.update();
      const abstractList = wrapper.find('AbstractListComponent');
      expect(abstractList.text().includes('account owner')).toBe(true);
      expect(abstractList.state().items).toEqual(data);
    });
    //start test filter function
    it ('Filter relationship types without owner ', () => {
      const filter = wrapper.find('FilterComponent');
      const accountList = wrapper.find('AccountListComponent');
      filter.find('input[type="checkbox"][defaultChecked=true][id="ownerFilter"]').simulate('change', unCheckOwner);
      wrapper.update();
      const abstractList = wrapper.find('AbstractListComponent');
      expect(accountList.state().params).toEqual(['belongs', 'client', 'agency']);
      expect(abstractList.props().params.relationshipTypes).toEqual("belongs,client,agency");
    });

    it ('Filter relationship types without belongs ', () => {
      const filter = wrapper.find('FilterComponent');
      const accountList = wrapper.find('AccountListComponent');
      filter.find('input[type="checkbox"][defaultChecked=true][id="belongsFilter"]').simulate('change', unCheckBelongs);
      wrapper.update();
      const abstractList = wrapper.find('AbstractListComponent');
      expect(accountList.state().params).toEqual(['owner', 'client', 'agency']);
      expect(abstractList.props().params.relationshipTypes).toEqual("owner,client,agency");
    });

    it ('Filter relationship types without client ', () => {
      const filter = wrapper.find('FilterComponent');
      const accountList = wrapper.find('AccountListComponent');
      filter.find('input[type="checkbox"][defaultChecked=true][id="clientFilter"]').simulate('change', unCheckClient);
      wrapper.update();
      const abstractList = wrapper.find('AbstractListComponent');
      expect(accountList.state().params).toEqual(['owner', 'belongs', 'agency']);
      expect(abstractList.props().params.relationshipTypes).toEqual("owner,belongs,agency");
    });

    it ('Filter relationship types without agency ', () => {
      const filter = wrapper.find('FilterComponent');
      const accountList = wrapper.find('AccountListComponent');
      filter.find('input[type="checkbox"][defaultChecked=true][id="agencyFilter"]').simulate('change', unCheckAgency);
      wrapper.update();
      const abstractList = wrapper.find('AbstractListComponent');
      expect(accountList.state().params).toEqual(['owner', 'belongs', 'client']);
      expect(abstractList.props().params.relationshipTypes).toEqual("owner,belongs,client");
    });

    it ('Filter relationship types by client and agency ', () => {
      const filter = wrapper.find('FilterComponent');
      const accountList = wrapper.find('AccountListComponent');

      filter.find('input[type="checkbox"][defaultChecked=true][id="ownerFilter"]').simulate('change', unCheckOwner);
      filter.find('input[type="checkbox"][defaultChecked=true][id="belongsFilter"]').simulate('change', unCheckBelongs);

      wrapper.update();

      const abstractList = wrapper.find('AbstractListComponent');

      expect(accountList.state().params).toEqual(['client', 'agency']);
      expect(abstractList.props().params.relationshipTypes).toEqual("client,agency");
    });

    it ('Filter relationship types by owner and belongs ', () => {
      const filter = wrapper.find('FilterComponent');
      const accountList = wrapper.find('AccountListComponent');

      filter.find('input[type="checkbox"][defaultChecked=true][id="clientFilter"]').simulate('change', unCheckClient);
      filter.find('input[type="checkbox"][defaultChecked=true][id="agencyFilter"]').simulate('change', unCheckAgency);

      wrapper.update();

      const abstractList = wrapper.find('AbstractListComponent');

      expect(accountList.state().params).toEqual(['owner', 'belongs']);
      expect(abstractList.props().params.relationshipTypes).toEqual("owner,belongs");
    });

    it ('Filter relationship types by belongs and agency ', () => {
      const filter = wrapper.find('FilterComponent');
      const accountList = wrapper.find('AccountListComponent');

      filter.find('input[type="checkbox"][defaultChecked=true][id="ownerFilter"]').simulate('change', unCheckOwner);
      filter.find('input[type="checkbox"][defaultChecked=true][id="clientFilter"]').simulate('change', unCheckClient);

      wrapper.update();

      const abstractList = wrapper.find('AbstractListComponent');

      expect(accountList.state().params).toEqual(['belongs', 'agency']);
      expect(abstractList.props().params.relationshipTypes).toEqual("belongs,agency");
    });

    it ('Filter relationship types by belongs and client ', () => {
      const filter = wrapper.find('FilterComponent');
      const accountList = wrapper.find('AccountListComponent');

      filter.find('input[type="checkbox"][defaultChecked=true][id="ownerFilter"]').simulate('change', unCheckOwner);
      filter.find('input[type="checkbox"][defaultChecked=true][id="agencyFilter"]').simulate('change', unCheckAgency);

      wrapper.update();

      const abstractList = wrapper.find('AbstractListComponent');

      expect(accountList.state().params).toEqual(['belongs', 'client']);
      expect(abstractList.props().params.relationshipTypes).toEqual("belongs,client");
    });

    it ('Filter relationship types by belongs and client ', () => {
      const filter = wrapper.find('FilterComponent');
      const accountList = wrapper.find('AccountListComponent');

      filter.find('input[type="checkbox"][defaultChecked=true][id="ownerFilter"]').simulate('change', unCheckOwner);
      filter.find('input[type="checkbox"][defaultChecked=true][id="agencyFilter"]').simulate('change', unCheckAgency);

      wrapper.update();

      const abstractList = wrapper.find('AbstractListComponent');

      expect(accountList.state().params).toEqual(['belongs', 'client']);
      expect(abstractList.props().params.relationshipTypes).toEqual("belongs,client");
    });

    it ('Filter relationship types by owner and client ', () => {
      const filter = wrapper.find('FilterComponent');
      const accountList = wrapper.find('AccountListComponent');

      filter.find('input[type="checkbox"][defaultChecked=true][id="belongsFilter"]').simulate('change', unCheckBelongs);
      filter.find('input[type="checkbox"][defaultChecked=true][id="agencyFilter"]').simulate('change', unCheckAgency);

      wrapper.update();

      const abstractList = wrapper.find('AbstractListComponent');

      expect(accountList.state().params).toEqual(['owner', 'client']);
      expect(abstractList.props().params.relationshipTypes).toEqual("owner,client");
    });

    it ('Filter relationship types by only owner', () => {
      const filter = wrapper.find('FilterComponent');
      const accountList = wrapper.find('AccountListComponent');

      filter.find('input[type="checkbox"][defaultChecked=true][id="belongsFilter"]').simulate('change', unCheckBelongs);
      filter.find('input[type="checkbox"][defaultChecked=true][id="clientFilter"]').simulate('change', unCheckClient);
      filter.find('input[type="checkbox"][defaultChecked=true][id="agencyFilter"]').simulate('change', unCheckAgency);

      wrapper.update();

      const abstractList = wrapper.find('AbstractListComponent');

      expect(accountList.state().params).toEqual(['owner']);
      expect(abstractList.props().params.relationshipTypes).toEqual("owner");
    });

    it ('Filter relationship types by only client', () => {
      const filter = wrapper.find('FilterComponent');
      const accountList = wrapper.find('AccountListComponent');

      filter.find('input[type="checkbox"][defaultChecked=true][id="ownerFilter"]').simulate('change', unCheckOwner);
      filter.find('input[type="checkbox"][defaultChecked=true][id="belongsFilter"]').simulate('change', unCheckBelongs);
      filter.find('input[type="checkbox"][defaultChecked=true][id="agencyFilter"]').simulate('change', unCheckAgency);

      wrapper.update();

      const abstractList = wrapper.find('AbstractListComponent');

      expect(accountList.state().params).toEqual(['client']);
      expect(abstractList.props().params.relationshipTypes).toEqual("client");
    });

    it ('Filter relationship types by only belongs', () => {
      const filter = wrapper.find('FilterComponent');
      const accountList = wrapper.find('AccountListComponent');

      filter.find('input[type="checkbox"][defaultChecked=true][id="ownerFilter"]').simulate('change', unCheckOwner);
      filter.find('input[type="checkbox"][defaultChecked=true][id="clientFilter"]').simulate('change', unCheckClient);
      filter.find('input[type="checkbox"][defaultChecked=true][id="agencyFilter"]').simulate('change', unCheckAgency);

      wrapper.update();

      const abstractList = wrapper.find('AbstractListComponent');

      expect(accountList.state().params).toEqual(['belongs']);
      expect(abstractList.props().params.relationshipTypes).toEqual("belongs");
    });

    it ('Filter relationship types by only agency', () => {
      const filter = wrapper.find('FilterComponent');
      const accountList = wrapper.find('AccountListComponent');

      filter.find('input[type="checkbox"][defaultChecked=true][id="ownerFilter"]').simulate('change', unCheckOwner);
      filter.find('input[type="checkbox"][defaultChecked=true][id="belongsFilter"]').simulate('change', unCheckBelongs);
      filter.find('input[type="checkbox"][defaultChecked=true][id="clientFilter"]').simulate('change', unCheckClient);

      wrapper.update();

      const abstractList = wrapper.find('AbstractListComponent');

      expect(accountList.state().params).toEqual(['agency']);
      expect(abstractList.props().params.relationshipTypes).toEqual("agency");
    });

    it ('Filter relationship types When the users unCheck all', () => {
      const filter = wrapper.find('FilterComponent');
      const accountList = wrapper.find('AccountListComponent');

      filter.find('input[type="checkbox"][defaultChecked=true][id="ownerFilter"]').simulate('change', unCheckOwner);
      filter.find('input[type="checkbox"][defaultChecked=true][id="belongsFilter"]').simulate('change', unCheckBelongs);
      filter.find('input[type="checkbox"][defaultChecked=true][id="clientFilter"]').simulate('change', unCheckClient);
      filter.find('input[type="checkbox"][defaultChecked=true][id="agencyFilter"]').simulate('change', unCheckAgency);

      wrapper.update();

      const abstractList = wrapper.find('AbstractListComponent');

      expect(accountList.state().params).toEqual([]);
      expect(abstractList.props().params.relationshipTypes).toEqual(undefined);
    });

    it ('Includes link to account view', () => {
      wrapper.update();
      const link = wrapper.find('Link').get(0);
      expect(link.props.to).toEqual('/accounts/1');
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
                  src="/accounts"
                  target="accounts"
                  config={store.getState().configOfAccounts}
                  updateConfig={() => jest.fn}
                  cardTitle="Accounts"
                  params={{
                    relationshipTypes: store.getState().configOfAccounts.relationshipTypes.toString(),
                  }}
                  defaultColumns={null}
                />
              </Authority>
            </Provider>
          </IntlProvider>
        );
      }).toThrow();
    });
  });

  describe('throw error when relationship type in store do not define', () => {
    it('check throw error when relationshipTypeParams is undefined', () => {
      axiosMock.mockAxiosAccounts(process.env.REACT_APP_CORE_API_ENDPOINT, 'error');
      store.getState().configOfAccounts.relationshipTypeParams = undefined;
      expect(store.getState().configOfAccounts.relationshipTypeParams).toBeUndefined();

      expect(() => {
        mountWithIntl(
          <IntlProvider locale={i18n.locale} timezone={i18n.timezone} messages={i18n.messages}>
            <Provider store={store} >
              <Authority>
                <AccountList/>
              </Authority>
            </Provider>
          </IntlProvider>
        );
      }).toThrow();
    });
  });
});
