import React, {Component} from 'react';
import {DropdownMenu, DropdownToggle, Nav, DropdownItem} from 'reactstrap';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {AppHeaderDropdown, AppSidebarToggler} from '@coreui/react';

import {connect} from 'react-redux';
import md5 from 'js-md5';

import logo from '../../assets/img/brand/logo.svg';
import {FormattedMessage} from 'react-intl';
// import sygnet from '../../assets/img/brand/sygnet.svg'
//import avatar from '../../assets/img/avatars/6.jpg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const {children, ...attributes} = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile/>
        <span className="navbar-brand">
          <img src={logo} width="32" height="35" alt="Omni Data Bank" />
          <FormattedMessage id="Omni Data Bank"/>
        </span>
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown>
            <DropdownToggle nav>
              <img src={this.props.profileImage} className="img-avatar" alt={this.props.label}/>
            </DropdownToggle>
            <DropdownMenu right style={{right: 'auto', height: 'auto'}}>
              <DropdownItem tag={Link} to="/logout"><FormattedMessage id="Logout"/></DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const mapStateToProps = (state, ownProps) => {
  let newState = Object.assign({}, state);
  if (state.me && state.me.email) {
    newState.label = state.me.label;
    newState.profileImage = '//www.gravatar.com/avatar.php?gravatar_id=' + md5(state.me.email);
  }
  return newState;
};

export default connect(
  mapStateToProps,
)(DefaultHeader);
