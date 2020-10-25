import React, {Component} from 'react';

import logo from '../../assets/img/brand/logo.svg';
import {FormattedMessage} from 'react-intl';

class PublicHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <span className="navbar-brand">
          <img src={logo} width="32" height="35" alt="Omni Data Bank" />
          <span><FormattedMessage id="Omni Data Bank"/></span>
        </span>
      </React.Fragment>
    );
  }
}

export default PublicHeader;
