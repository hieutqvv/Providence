import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Dashboard = React.lazy(() => import('./views/Pages/Dashboard'));
const CallLog = React.lazy(() => import('./views/Pages/Log/CallLog'));
const AudienceLog = React.lazy(() => import('./views/Pages/Log/AudienceLog'));
const Logout = React.lazy(() => import('./views/Logout'));
const AccountList = React.lazy(()=> import('./views/Pages/Accounts/AccountList'));
const AccountView = React.lazy(()=> import('./views/Pages/Accounts/AccountView'));
const CampaignList = React.lazy(()=> import('./views/Pages/Campaigns/CampaignList'));
const CampaignView = React.lazy(()=> import('./views/Pages/Campaigns/CampaignView'));
const ObserverList = React.lazy(()=> import('./views/Pages/Observers/ObserverList'));
const ObserverView = React.lazy(()=> import('./views/Pages/Observers/ObserverView'));
const AccountNew = React.lazy(()=> import('./views/Pages/Accounts/AccountNew'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  {path: '/', name: 'Home', component: DefaultLayout, exact: true},
  {path: '/dashboard', name: 'Dashboard', component: Dashboard},
  {path: '/log/behaviors/phone/calls', name: 'CallLog', component: CallLog},
  {path: '/log/audiences/web', name: 'AudienceLog', component: AudienceLog},
  {path: '/logout', name: 'Logout', component: Logout},
  {path: '/accounts', name: 'AccountList', component: AccountList, exact: true},
  {path: '/accounts/new', name: 'AccountNew', component: AccountNew, exact: true},
  {path: '/accounts/:accountId', name: 'AccountView', component: AccountView},
  {path: '/campaigns', name: 'CampaignList', component: CampaignList, exact: true},
  {path: '/campaigns/:campaignId', name: 'CampaignView', component: CampaignView},
  {path: '/observers', name: 'ObserverList', component: ObserverList, exact: true},
  {path: '/observers/:observerId', name: 'ObserverView', component: ObserverView}
];

export default routes;
