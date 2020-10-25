import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import 'react-table/react-table.css';
import {doesRequireReload, raiseError} from '../../../lib/redux/actions';
import MoldableTable from './MoldableTable';

class LoadableTableComponent extends Component {
  static propTypes = {
    pageName: PropTypes.string.isRequired,
    endpoint: PropTypes.string.isRequired,
    columns: PropTypes.object,
    config: PropTypes.object,
    onLoaded: PropTypes.func.isRequired,
    target: PropTypes.string,
    showPagination: PropTypes.bool
  };

  static defaultProps = {
    showPagination: true,
    query: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pages: 0,
      isLoading: false,
    };
    this.onFetchData = this.onFetchData.bind(this);
    this.updateItems = this.updateItems.bind(this);
  }

  /**
   * Method that puts extracted data in state.
   *
   * @param {object} response Response data from API
   */
  updateItems(response) {
    const target = this.props.target === undefined ? this.props.endpoint.split('/').pop() : this.props.target;
    for (let i = 0; i < response.data._embedded[target].length; i++) {
      response.data._embedded[target][i].id = i;
    }
    this.setState({
      /** Respond data for display in the table. */
      data: response.data._embedded[target],
      /** Page number that now displaying. */
      pages: Math.ceil(response.data.total / this.props.config.pageSize),
      /** Set false to done to load. */
      isLoading: false,
    });
    this.props.onLoaded(response.data);
  }

  /**
   * Method that request to extract log data from API.
   *
   * - `this.updateItems()` is performed as callback.
   *
   * @param {Object} state
   * @param {Object} instance
   */
  onFetchData(state, instance) {
    if (this.props.selectedCampaign === null) {
      return;
    }
    this.setState({isLoading: true});
    let query = {};
    if (typeof this.props.query === 'function') {
      query = this.props.query();
    } else {
      query = Object.assign({}, this.props.query);
    }
    query.page = state.page + 1;
    query.limit = state.pageSize;
    query.filtered = state.filtered;
    if (typeof state.sorted[0] === 'object') {
      query.sortBy = state.sorted[0].id;
      query.sort = state.sorted[0].desc === true ? 'desc' : 'asc';
    }
    this.props.http({
      url: this.props.endpoint,
      params: query
    }).then(this.updateItems).catch(this.props.raiseError);
  }

  /**
   * Called when state or props of the component is changed.
   *
   * - `This.props.doesRequireReload` will be` true` if an operation requiring reloading is done outside the component.
   * - `this.state.table.fireFetchData ()` will perform the `fetchData ()` method of the `ReactTable` component.
   * - `this.props.reloaded ()` indicates that reloading is complete.
   * - `this.props.doesRequireReload` is attached from the Store.
   *
   * @see https://reactjs.org/docs/react-component.html#componentdidupdate
   */
  componentDidUpdate() {
    if (this.props.doesRequireReload === true) {
      this.props.table.current.fireFetchData();
      this.props.reloaded();
    }
  }

  render() {
    return (
      <MoldableTable
        pageName={this.props.pageName}
        onFetchData={this.onFetchData}
        data={this.state.data}
        columns={this.props.columns}
        pages={this.state.pages}
        table={this.props.table}
        config={this.props.config}
        hasSubComponent={this.props.hasSubComponent}
        showPagination={this.props.showPagination}
      />
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
    raiseError: error => {dispatch(raiseError(error));},
  };
};

const LoadableTable = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoadableTableComponent);
export default LoadableTable;
