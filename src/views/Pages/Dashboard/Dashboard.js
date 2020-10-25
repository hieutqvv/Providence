import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class DashboardComponent extends Component {
  render() {
    let direction = '/log/behaviors/phone/calls';
    if (this.props.me.isAgent !== undefined && this.props.me.isAgent === true) {
      direction = '/accounts';
    }
    return (
      <div className="animated fadeIn">
        <Redirect to={direction}/>

      </div>
    );
  }
}

const mapStateToProps = (storeState, ownProps) => {
  let newState = Object.assign({}, ownProps);

  newState.me = storeState.me;

  return newState;
};

const Dashboard = connect(
  mapStateToProps,
  undefined,
)(DashboardComponent);

export default Dashboard;
