import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import {Form} from 'reactstrap';
import {doesRequireReload, raiseError} from '../../../lib/redux/actions';
import axios from 'axios';

class LoadableFormComponent extends Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    query: PropTypes.object,
    onFetchData: PropTypes.func
  };

  static defaultProps = {
    query: {}
  };

  constructor(props) {
    super(props);
    this.signal = axios.CancelToken.source();
    this.state = {
      data: [],
      pages: 0,
      isLoading: false,
    };
    this.fireFetchData = this.fireFetchData.bind(this);
  }

  fireFetchData() {
    this.props.http({
      url: this.props.endpoint,
      params: this.props.query,
      cancelToken: this.signal.token,
    }).then(this.props.onFetchData).catch(this.props.raiseError);
  }

  componentWillMount() {
    this.fireFetchData();
    this.props.reloaded();
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (this.props.doesRequireReload === true) {
      this.fireFetchData();
      this.props.reloaded();
    }
  }

  componentWillUnmount() {
    this.signal.cancel('Api is being canceled.');
  }

  render() {
    return (
      <Form>{this.props.children}</Form>
    );
  }
}

const mapStateToProps = (storeState, ownProps) => {
  let newState = Object.assign({}, ownProps);
  newState.http = storeState.controlledHttpClient;
  newState.doesRequireReload = storeState.doesRequireReload;
  newState.initializeDone = storeState.initializeDone;
  return newState;
};

const mapDispatchToProps = dispatch => {
  return {
    /**
     * Method that indicates complete reloaded a log table.
     *
     * @returns {*}
     */
    reloaded: () => dispatch(doesRequireReload(false)),
    raiseError: error => {
      if (error.message === undefined || error.message !== 'Api is being canceled.') {
        dispatch(raiseError(error));
      }
    },
  };
};

const LoadableForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(LoadableFormComponent));
export default LoadableForm;
