import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import { IntlProvider } from 'react-intl';
import Loadable from 'react-loadable';
import i18n from './lib/i18n/';
import Store from './lib/redux/';
import './App.scss';
import 'moment/locale/ja';

const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});
const PublicLayout = Loadable({
  loader: () => import('./containers/PublicLayout'),
  loading
});

class App extends Component {
  render() {
    return (
      <IntlProvider locale={i18n.locale} timezone={i18n.timezone} messages={i18n.messages}>
        <Store>
          <HashRouter>
            <Switch>
              <Route exact path="/users/password/:token" name="Public" component={PublicLayout} />
              <Route path="/" name="Home" component={DefaultLayout} />
            </Switch>
          </HashRouter>
        </Store>
      </IntlProvider>
    );
  }
}

export default App;
