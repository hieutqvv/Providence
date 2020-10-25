import React, {Component, Suspense} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container} from 'reactstrap';
import {injectIntl} from 'react-intl';
import {
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// routes config
import routes from '../../routes';
import Authority from './Authority';
import PickersHeader from './PickersHeader';

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [
        {
          name: this.props.intl.formatMessage({id: 'Dashboard'}),
          url: '/dashboard',
          icon: 'icon-speedometer',
        },
        {
          name: this.props.intl.formatMessage({id: 'Accounts'}),
          url: '/accounts',
          icon: 'icon-home',
        },
        {
          name: this.props.intl.formatMessage({id: 'Log'}),
          url: '/log',
          icon: 'icon-grid',
          children: [
            {
              name: this.props.intl.formatMessage({id: 'Call Log'}),
              url: '/log/behaviors/phone/calls',
              icon: 'icon-phone',
            },
            {
              name: this.props.intl.formatMessage({id: 'Audience Log'}),
              url: '/log/audiences/web',
              icon: 'icon-people',
            },
          ],
        },
      ],
    };
  }

  loading() {
    return (
      <div className="animated fadeIn pt-1 text-center">
        <div className="sk-spinner sk-spinner-pulse"/>
      </div>
    );
  };

  render() {
    return (
      <Authority>
        <div className="app">
          <AppHeader fixed>
            <Suspense fallback={this.loading()}>
              <DefaultHeader/>
            </Suspense>
          </AppHeader>
          <div className="app-body">
            <AppSidebar fixed display="lg">
              <AppSidebarHeader/>
              <AppSidebarForm/>
              <Suspense>
                <AppSidebarNav navConfig={{items: this.state.routes}} {...this.props} />
              </Suspense>
              <AppSidebarFooter/>
              <AppSidebarMinimizer/>
            </AppSidebar>
            <main className="main">
              <Suspense fallback={this.loading()}>
                <nav>
                  <PickersHeader/>
                </nav>
              </Suspense>
              <Container fluid>
                <Suspense fallback={this.loading()}>
                  <Switch>
                    {routes.map((route, idx) => {
                      return route.component ? (
                        <Route
                          key={idx}
                          path={route.path}
                          exact={route.exact}
                          name={route.name}
                          render={props => (
                            <route.component {...props} />
                          )}/>
                      ) : (null);
                    })}
                    <Redirect from="/" to="/dashboard"/>
                  </Switch>
                </Suspense>
              </Container>
            </main>
          </div>
          <AppFooter>
            <Suspense fallback={this.loading()}>
              <DefaultFooter/>
            </Suspense>
          </AppFooter>
        </div>
      </Authority>
    );
  }
}

export default injectIntl(DefaultLayout);
