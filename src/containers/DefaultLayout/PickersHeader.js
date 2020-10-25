import React, {Component} from 'react';
import CampaignPicker from './PickersHeader/CampaignPicker';
import TermPicker from './PickersHeader/TermPicker';
import {Navbar} from 'reactstrap';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';

class PickersHeaderComponent extends Component {
  render() {
    if (!this.props.selectedCampaign) {
      return (<div/>);
    }
    return (
      <Navbar color="light" expand="md" style={{marginBottom: '1em'}}>
        <CampaignPicker selectedCampaign={this.props.selectedCampaign} accounts={this.props.accounts}
          campaigns={this.props.campaigns}/>
        <TermPicker selectedTerm={this.props.selectedTerm}/>
      </Navbar>
    );
  }
}

const mapStateToProps = (storeState, ownProps) => {
  let newProps = Object.assign({
    accounts: [],
    campaigns: [],
    selectedCampaign: null,
    selectedTerm: null,
  }, ownProps);

  if (storeState.me === null) {
    return newProps;
  }

  newProps.accounts = storeState.me._embedded.accounts;
  newProps.campaigns = storeState.me._embedded.campaigns;
  newProps.selectedCampaign = storeState.selectedCampaign;
  newProps.selectedTerm = storeState.selectedTerm;
  return newProps;
};

const PickersHeader = connect(
  mapStateToProps,
)(injectIntl(PickersHeaderComponent));
export default PickersHeader;