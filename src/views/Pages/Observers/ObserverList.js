import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import {doesRequireReload, updatePageConfig} from '../../../lib/redux/actions';
import OperableCard from '../../../views/Parts/Card/OperableCard';
import LoadableTable from '../../../views/Parts/Table/LoadableTable';
import observerListColumns from '../../../lib/table/columnTemplates/observerList';

class ObserverListComponent extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      displayable: false,
    };
    this.title = 'Observer List';
    this.endpoint = '/observers';
    this.pageName = 'observers';
    this.table = React.createRef();
    this.columns = observerListColumns;
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
          query={{campaignId: this.props.selectedCampaign.campaignId}}
          columns={this.columns}
          onLoaded={() => this.setState({displayable: true})}
          table={this.table}
          config={this.props.config}
          showPagination={false}
        />
      </OperableCard>
    );
  }
}

const mapStateToProps = (storeState, ownProps) => {
  let newState = Object.assign({}, ownProps);

  newState.config = storeState.configOfObservers;
  newState.selectedCampaign = storeState.selectedCampaign;

  return newState;
};

const mapDispatchToProps = dispatch => {
  return {
    reloaded: () => dispatch(doesRequireReload(true)),
    updateConfig: config => dispatch(updatePageConfig(config)),
  };
};

const ObserverList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(ObserverListComponent));
export default ObserverList;
