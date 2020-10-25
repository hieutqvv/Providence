import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logout} from '../lib/redux/actions';
import {Redirect} from 'react-router-dom';

class LogoutComponent extends Component {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return (<Redirect to="/"/>);
  }
}

const mapStateToProps = storeState => {
  return storeState;
};
const mapDispatchToProps = dispatch => {
  return {
    logout() {
      dispatch(logout());
    },
  };
};

const Logout = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogoutComponent);
export default Logout;