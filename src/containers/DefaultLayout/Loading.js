import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';

import logoSvg from '../../assets/img/logo.svg';

class Loading extends Component {
  constructor (props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  render () {
    return (
      <Modal centered className="loading" fade={false} isOpen={this.props.isRequesting} zIndex="10000">
        <ModalBody>
          <div className="rotateLogo">
            <img alt="" src={logoSvg} />
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = (storeState, ownProps) => {
  let newState = Object.assign(Object.assign({}, ownProps), storeState);
  newState.isRequesting = storeState.isRequesting;
  return newState;
};
export default connect(
  mapStateToProps
)(Loading);
