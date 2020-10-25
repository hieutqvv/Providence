import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Col, Input, Label, FormGroup} from 'reactstrap';
import OperableCard from '../../../views/Parts/Card/OperableCard';
import LoadableForm from '../../../views/Parts/Form/LoadableForm';
import MoldableTable from '../../../views/Parts/Table/MoldableTable';
import observerListColumns from '../../../lib/table/columnTemplates/observerList';
import TrackingNumberList from '../../../views/Parts/Table/TrackingNumberList';
import {changeSelectedAccount, changeSelectedCampaign} from '../../../lib/redux/actions';

class CampaignViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayable: false,
      editable: false,
      campaign: {
        label: '',
        attributes: [],
      },
      observers: [],
      trackingNumbers: [],
    };
    this.title = 'Campaign Detail';
    this.endpoint = '/campaigns';
    this.pageName = 'campaigns';
    this.form = React.createRef();
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(response) {
    if (response.status !== 200) {
      this.props.history.goBack();
      return false;
    }
    let state = {campaign: response.data._embedded.campaigns[0], displayable: true};
    if (state.campaign._embedded.observers !== undefined) {
      state.observers = Object.assign([], state.campaign._embedded.observers);
    }
    if (state.campaign._embedded.trackingNumbers !== undefined) {
      state.trackingNumbers = Object.assign([], state.campaign._embedded.trackingNumbers);
    }
    this.setState(state);
  }

  componentWillMount() {
    if (this.props.selectedCampaign.campaignId !== this.props.match.params.campaignId) {
      this.props.changeSelectedCampaign(Number(this.props.match.params.campaignId));
    }
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (nextProps.selectedCampaign.campaignId !== this.props.selectedCampaign.campaignId) {
      this.props.history.push(['/campaigns', nextProps.selectedCampaign.campaignId].join('/'));
    }
  }

  renderAttributes() {
    if (this.state.campaign.attributes === undefined) {
      return [];
    }
    let attributes = [];
    this.state.campaign.attributes.map(attribute => {
      if (attribute.name === 'timezone') {
        attributes.push(
          <FormGroup row key="timezone">
            <Col sm={2}><Label className="col-form-label" for="timezone"><FormattedMessage id="Timezone"/></Label></Col>
            <Col><Input type="text" name="timezone" disabled={!this.state.editable} value={attribute.value}/></Col>
          </FormGroup>,
        );
      } else if (attribute.name === 'notifyDestinations') {
        attributes.push(
          <FormGroup row key="notifyDestinations">
            <Col sm={2}><Label className="col-form-label" for="notifyDestination"><FormattedMessage
              id="Notify destinations"/></Label></Col>
            <Col><Input type="textarea" disabled={!this.state.editable} value={attribute.value.join('\n')}/></Col>
          </FormGroup>,
        );
      }

      return true;
    });

    return attributes;
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
            query={{campaignId: this.props.match.params.campaignId}}
            onFetchData={this.fetchData}
          >
            <FormGroup row key="label">
              <Col sm={2}><Label className="col-form-label" for="campaignName"><FormattedMessage
                id="Campaign Name"/></Label></Col>
              <Col><Input type="text" name="campaignName" disabled={!this.state.editable}
                value={this.state.campaign.label}/></Col>
            </FormGroup>
            {this.renderAttributes()}
          </LoadableForm>
        </OperableCard>
        <OperableCard
          title="Observer List"
          pageName="observerList"
          displayable={this.state.observers.length > 0}
        >
          <MoldableTable
            columns={observerListColumns}
            data={this.state.observers}
            showPagination={false}
          />
        </OperableCard>
        <TrackingNumberList
          defaultTrackingNumberId={this.state.campaign.defaultTrackingNumberId}
          data={this.state.trackingNumbers}
        />
      </div>
    );
  }
}

const mapStateToProps = (storeState, ownProps) => {
  let newState = Object.assign({}, ownProps);

  newState.configOfObservers = storeState.configOfObservers;
  newState.configOfTrackingNumbers = storeState.configOfTrackingNumbers;
  newState.selectedCampaign = storeState.selectedCampaign;

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

const CampaignView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(CampaignViewComponent));

export default CampaignView;
