import React, {Component, Suspense} from 'react';
import {AppFooter, AppHeader} from '@coreui/react';
import {Container} from 'reactstrap';
import {Route, Switch} from 'react-router-dom';
import PublicHeader from './PublicHeader';
import DefaultFooter from '../DefaultLayout/DefaultFooter';
import Loading from '../DefaultLayout/Loading';

const PasswordReset = React.lazy(() => import('../../views/PasswordReset'));

class PublicLayout extends Component {
  loading() {
    return (
      <div className="animated fadeIn pt-1 text-center">
        <div className="sk-spinner sk-spinner-pulse"/>
      </div>
    );
  };

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <PublicHeader/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <main className="main">
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  <Route
                    key="1"
                    path="/users/password/:token"
                    name="PasswordReset"
                    render={props => (
                      <PasswordReset {...props} />
                    )}
                  />
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
        <Loading/>
      </div>
    );
  }
}

export default PublicLayout;