import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import {doesRequireReload, updatePageConfig} from '../../../lib/redux/actions';
import OperableCard from '../../../views/Parts/Card/OperableCard';
import LoadableTable from '../../../views/Parts/Table/LoadableTable';
import campaignListColumns from '../../../lib/table/columnTemplates/campaignList';

class CampaignListComponent extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      displayable: false,
    };
    this.title = 'Campaign List';
    this.endpoint = '/campaigns';
    this.pageName = 'campaigns';
    this.table = React.createRef();
    this.columns = campaignListColumns;
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
        config={this.props.config}
        columns={this.columns}
      >
        <LoadableTable
          pageName={this.pageName}
          endpoint={this.endpoint}
          query={{accountId: this.props.selectedAccount.accountId}}
          columns={this.columns}
          onLoaded={() => this.setState({displayable: true})}
          table={this.table}
          config={this.props.config}
        />
      </OperableCard>
    );
  }
}

const mapStateToProps = (storeState, ownProps) => {
  let newState = Object.assign({}, ownProps);

  newState.config = storeState.configOfAccounts;
  newState.selectedAccount = storeState.selectedAccount;

  return newState;
};

const mapDispatchToProps = dispatch => {
  return {
    reloaded: () => dispatch(doesRequireReload(true)),
    updateConfig: config => dispatch(updatePageConfig(config)),
  };
};

const CampaignList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(CampaignListComponent));
export default CampaignList;
