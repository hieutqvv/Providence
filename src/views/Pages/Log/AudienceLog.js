import React, {Component} from 'react';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import OperableCard from '../../../views/Parts/Card/OperableCard';
import LoadableTable from '../../../views/Parts/Table/LoadableTable';

class AudienceLogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayable: false,
    };
    this.title = 'Audience Log';
    this.endpoint = '/audiences/web';
    this.pageName = 'AudienceLog';
    this.target = 'audiences';
    this.table = React.createRef();
    this.columns = {
      history: {label: 'History', cellType: 'history', isForce: true},
      rowNumber: {label: 'Row number', cellType: 'rowNumber', isForce: true},
      visitedAt: {label: 'Visited at', cellType: 'datetime'},
      audienceId: {label: 'Audience ID'},
      media: {label: 'Media'},
      source: {label: 'Source'},
      keyword: {label: 'Keyword'},
      webCv: {label: 'Web CV', cellType: 'existence'},
      callCv: {label: 'Call CV', cellType: 'existence'},
      stayDuration: {label: 'Stay duration', cellType: 'secondToTime'},
      callDuration: {label: 'Call duration', cellType: 'secondToTime'},
      callerPhoneNumber: {label: 'Caller phone number'},
    };
  }

  /**
   * Return query for API.
   *
   * @returns {{beginTimestamp: number, campaignId: null, endTimestamp: number}}
   */
  getQuery() {
    return {
      campaignId: this.props.selectedCampaign !== null ? this.props.selectedCampaign.campaignId : null,
      beginTimestamp: parseInt(this.props.selectedTerm.beginTimestamp / 1000),
      endTimestamp: parseInt(this.props.selectedTerm.endTimestamp / 1000),
    };
  }

  /**
   * For OperableCard as enable export.
   *
   * @returns {{params: {} & {beginTimestamp: number, campaignId: null, endTimestamp: number}, url: string}}
   */
  exportProperty() {
    let params = Object.assign({}, this.getQuery());
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
        target={this.target}
        onReload={this.table.current && this.table.current.fireFetchData}
        onCollapseConfig={this.toggleConfig}
        displayable={this.state.displayable}
        configurable={true}
        config={this.props.config}
        columns={this.columns}
        exportProperty={this.exportProperty()}
      >
        <LoadableTable
          pageName={this.pageName}
          target={this.target}
          endpoint={this.endpoint}
          query={this.getQuery()}
          columns={this.columns}
          onLoaded={() => this.setState({displayable: true})}
          table={this.table}
          config={this.props.config}
          hasSubComponent={true}
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
  }, storeState.configOfAudienceLog);
  newState.selectedCampaign = storeState.selectedCampaign;
  newState.selectedTerm = storeState.selectedTerm;

  return newState;
};

const AudienceLog = connect(
  mapStateToProps,
  undefined,
)(injectIntl(AudienceLogComponent));
export default AudienceLog;
