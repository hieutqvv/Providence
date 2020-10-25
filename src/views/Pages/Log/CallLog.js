import React, {Component} from 'react';
import {connect} from 'react-redux';
import OperableCard from '../../Parts/Card/OperableCard';
import LoadableTable from '../../Parts/Table/LoadableTable';
import callLogColumns from '../../../lib/table/columnTemplates/callLog';

class CallLogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayable: false,
    };
    this.title = 'Call Log';
    this.endpoint = '/behaviors/phone/calls';
    this.pageName = 'CallLog';
    this.table = React.createRef();
    this.columns = callLogColumns;
    this.filter = [
      {
        label: 'Observers to display',
        name: 'observers',
        type: 'checkbox',
        values: [],
      },
    ];
    this.getUrlParameters = this.getUrlParameters.bind(this);
    this.getFilterParameters = this.getFilterParameters.bind(this);
    this.shouldUpdate = this.shouldUpdate.bind(this);
  }

  /**
   * It is called on `componentDidUpdate` in `Filter` to judge whether should update.
   *
   * @param prevProps
   * @param prevState
   * @param snapshot
   * @returns {boolean}
   */
  shouldUpdate(prevProps, prevState, snapshot) {
    if (prevProps.selectedCampaign.campaignId !== this.props.selectedCampaign.campaignId) {
      return true;
    } else if (this.props.location.pathname === prevProps.location.pathname
      && !this.props.location.search
      && prevProps.location.search
    ) {
      return true;
    }
    return false;
  }

  getUrlParameters(e) {
    let search = {observerId: []};
    document.getElementsByName('observers').forEach(function(elm) {
      if (elm.checked) {
        search.observerId.push(elm.value);
      }
    });
    /** Must choose at least 1. */
    if (!search.observerId.length && e !== undefined) {
      e.target.checked = true;
      return false;
    }
    return (new URLSearchParams(search)).toString();
  }

  getFilterParameters(e) {
    if (this.props.selectedCampaign._embedded === undefined
      || this.props.selectedCampaign._embedded.observers === undefined
    ) {
      return Object.assign([], this.filter);
    }
    let filter = Object.assign([], this.filter);

    /** If `e` is event object, filter changed. */
    if (e !== undefined) {
      if (e.target.name === 'observers') {
        for (let i = 0; i < filter[0].values.length; ++i) {
          if (filter[0].values[i].value === Number(e.target.value)) {
            filter[0].values[i].checked = !filter[0].values[i].checked;
          }
        }
      }
      return filter;
    }

    let observers = this.props.selectedCampaign._embedded.observers;
    let query = this.getSearchParamsAsObject();

    let observerIds = [];
    filter[0].values = [];
    for (let i = 0; i < observers.length; ++i) {
      if (observers[i].condition.channel !== 'phone') {
        continue;
      }
      observerIds.push(observers[i].observerId);
      filter[0].values.push({
        label: observers[i].label,
        value: observers[i].observerId,
        checked: query.observerId.length < 1 || query.observerId.includes(observers[i].observerId),
      });
    }

    /** `observerId` is removed in URL if URL parameters contain observer ID that not relate a campaign. */
    if (observerIds.length) {
      for (let i = 0; i < query.observerId.length; ++i) {
        if (!observerIds.includes(query.observerId[i])) {
          this.props.history.push({pathname: this.props.location.pathname});
          return Object.assign([], this.filter);
        }
      }
    }

    return filter;
  }

  getSearchParamsAsObject() {
    let query = new URLSearchParams(this.props.location.search);

    let observerId = query.get('observerId');
    if (observerId !== null) {
      const observers = observerId.split(',');
      observerId = [];
      for (let i = 0; i < observers.length; ++i) {
        observerId.push(Number(observers[i]));
      }
    } else {
      observerId = [];
    }

    return {observerId};
  }

  /**
   * Return query for API.
   *
   * @returns {{beginTimestamp: number, campaignId: null, endTimestamp: number}}
   */
  get query() {
    let query = {
      campaignId: this.props.selectedCampaign !== null ? this.props.selectedCampaign.campaignId : null,
      beginTimestamp: parseInt(this.props.selectedTerm.beginTimestamp / 1000),
      endTimestamp: parseInt(this.props.selectedTerm.endTimestamp / 1000),
    };
    let params = new URLSearchParams(this.props.location.search);
    let observerId = params.get('observerId');
    if (observerId !== null) {
      query.observerId = observerId;
    }
    return query;
  }

  /**
   * For OperableCard as enable export.
   *
   * @returns {{params: {} & {beginTimestamp: number, campaignId: null, endTimestamp: number}, url: string}}
   */
  exportProperty() {
    let params = Object.assign({}, this.query);
    if (typeof this.props.config.sorted[0] === 'object') {
      params.sortBy = this.props.config.sorted[0].id;
      params.sort = this.props.config.sorted[0].desc === true ? 'desc' : 'asc';
    }
    return {
      url: this.endpoint,
      params: params,
    };
  }

  render() {
    return (
      <OperableCard
        title={this.title}
        pageName={this.pageName}
        onReload={this.table.current && this.table.current.fireFetchData}
        onCollapseConfig={this.toggleConfig}
        displayable={this.state.displayable}
        configurable={true}
        columns={this.columns}
        exportProperty={this.exportProperty()}
        filter={this.filter}
        filterParameterGetter={this.getFilterParameters}
        urlParameterGetter={this.getUrlParameters}
        onFilterChange={e => this.table.current.fireFetchData(e)}
        shouldUpdate={this.shouldUpdate}
        {...this.props}
      >
        <LoadableTable
          pageName={this.pageName}
          endpoint={this.endpoint}
          query={this.query}
          columns={this.columns}
          onLoaded={() => this.setState({displayable: true})}
          table={this.table}
          {...this.props}
        />
      </OperableCard>
    );
  }
}

const mapStateToProps = (storeState, ownProps) => {
  let newState = Object.assign({}, ownProps);
  newState.config = Object.assign({
    pageSize: 100,
    sorted: [{id: 'visitedAt', desc: true}],
    columns: {},
  }, storeState.configOfCallLog);
  newState.selectedCampaign = storeState.selectedCampaign;
  newState.selectedTerm = storeState.selectedTerm;

  return newState;
};

const CallLog = connect(
  mapStateToProps,
  undefined,
)(CallLogComponent);
export default CallLog;
