import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Col, Input, Label, FormGroup} from 'reactstrap';
import OperableCard from '../../../views/Parts/Card/OperableCard';
import LoadableForm from '../../../views/Parts/Form/LoadableForm';
import MoldableTable from '../../../views/Parts/Table/MoldableTable';
import campaignListColumns from '../../../lib/table/columnTemplates/campaignList';
import {changeSelectedAccount, changeSelectedCampaign} from '../../../lib/redux/actions';

class AccountViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayable: false,
      editable: false,
      account: {
        label: ''
      },
      campaigns: []
    };
    this.title = 'Account Detail';
    this.endpoint = '/accounts';
    this.pageName = 'accounts';
    this.form = React.createRef();
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(response) {
    if (response.status !== 200) {
      this.props.history.goBack();
      return false;
    }
    let state = {account: response.data._embedded.accounts[0], displayable: true};
    if (state.account._embedded.campaigns !== undefined) {
      state.campaigns = Object.assign([], state.account._embedded.campaigns);
    }
    this.setState(state);
  }

  componentWillMount() {
    if (this.props.selectedAccount.accountId !== this.props.match.params.accountId) {
      this.props.changeSelectedAccount({accountId: Number(this.props.match.params.accountId)});
    }
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (nextProps.selectedAccount.accountId !== this.props.selectedAccount.accountId) {
      this.props.history.push(['/accounts', nextProps.selectedAccount.accountId].join('/'));
    }
  }

  render() {
    return (
      <div>
        <OperableCard
          title={this.title}
          pageName={this.pageName}
          displayable={this.state.displayable}
        >
          <LoadableForm
            ref={this.form}
            endpoint={this.endpoint}
            query={{accountId: this.props.match.params.accountId}}
            onFetchData={this.fetchData}
          >
            <FormGroup row>
              <Col sm={2}><Label className="col-form-label" for="accountName"><FormattedMessage id="Account Name" /></Label></Col>
              <Col sm={5}><Input type="text" name="accountName" disabled={!this.state.editable} value={this.state.account.label} /></Col>
            </FormGroup>
          </LoadableForm>
        </OperableCard>
        <OperableCard
          title="Campaign List"
          pageName="campaignList"
          displayable={this.state.campaigns.length > 0}
        >
          <MoldableTable
            columns={campaignListColumns}
            data={this.state.campaigns}
            showPagination={false}
          />
        </OperableCard>
      </div>
    );
  }
}

const mapStateToProps = (storeState, ownProps) => {
  let newState = Object.assign({}, ownProps);

  newState.configOfCampaigns = storeState.configOfCampaigns;
  newState.selectedAccount = storeState.selectedAccount;

  return newState;
};

const mapDispatchToProps = dispatch => {
  return {
    changeSelectedCampaign(newSelection) {
      dispatch(changeSelectedCampaign(newSelection));
    },
    changeSelectedAccount(newSelection) {
      dispatch(changeSelectedAccount(newSelection));
    },
  };
};

const AccountView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(AccountViewComponent));

export default AccountView;
