import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span className="ml-auto">&copy; 2019 <FormattedMessage id="Lograph Inc."/></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
