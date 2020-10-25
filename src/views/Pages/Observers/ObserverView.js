import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Col, Input, Label, FormGroup, CustomInput} from 'reactstrap';
import OperableCard from '../../../views/Parts/Card/OperableCard';
import LoadableForm from '../../../views/Parts/Form/LoadableForm';
import MoldableTable from '../../../views/Parts/Table/MoldableTable';
import triggerConditionListColumns from '../../../lib/table/columnTemplates/triggerConditionList';
import TrackingNumberList from '../../../views/Parts/Table/TrackingNumberList';

class ObserverViewComponent extends Component {

  title = 'Observer Detail';
  endpoint = '/observers';
  pageName = 'observers';

  constructor(props) {
    super(props);
    this.state = {
      displayable: false,
      editable: false,
      observer: {
        label: '',
        condition: {
          channel: '',
          targetDevice: '',
          targetPhoneNumber: '',
          triggers: [],
        },
      },
      trackingNumbers: [],
    };
    this.form = React.createRef();
    this.fetchData = this.fetchData.bind(this);
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (nextProps.selectedCampaign.campaignId !== this.props.selectedCampaign.campaignId) {
      this.props.history.push(['/campaigns', nextProps.selectedCampaign.campaignId].join('/'));
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
            query={{observerId: this.props.match.params.observerId}}
            onFetchData={this.fetchData}
          >
            <FormGroup row key="label">
              <Col sm={2}><Label className="col-form-label" for="observer-name"><FormattedMessage
                id="Observer name"/></Label></Col>
              <Col><Input type="text" name="observer-name" disabled={!this.state.editable}
                value={this.state.observer.label}/></Col>
            </FormGroup>
            <FormGroup row key="channel">
              <Col sm={2}>
                <Label className="col-form-label" for="channel"><FormattedMessage id="Tracking channel"/></Label>
              </Col>
              <Col>
                <Input type="select" name="channel" disabled={!this.state.editable}
                  value={this.state.observer.condition.channel}>
                  <option value="web">{this.props.intl.formatMessage({id: 'Web'})}</option>
                  <option value="phone">{this.props.intl.formatMessage({id: 'Phone'})}</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row key="target-device">
              <Col sm={2}>
                <Label className="col-form-label" for="target-device"><FormattedMessage id="Target device"/></Label>
              </Col>
              <Col>
                <CustomInput
                  id="target-device-pc"
                  name="target-device"
                  type="checkbox"
                  value="pc"
                  label={this.props.intl.formatMessage({id: 'PC'})}
                  disabled={!this.state.editable}
                  checked={
                    this.state.observer.condition.targetDevice === 'all'
                    || this.state.observer.condition.targetDevice === 'pc'
                  }
                  inline
                />
                <CustomInput
                  id="target-device-mobile"
                  name="target-device"
                  type="checkbox"
                  value="mobile"
                  label={this.props.intl.formatMessage({id: 'Mobile'})}
                  disabled={!this.state.editable}
                  checked={
                    this.state.observer.condition.targetDevice === 'all'
                    || this.state.observer.condition.targetDevice === 'mobile'
                  }
                  inline
                />
              </Col>
            </FormGroup>
            <FormGroup row key="target-phone-number">
              <Col sm={2}>
                <Label className="col-form-label" for="target-phone-number">
                  <FormattedMessage id="Target phone number"/>
                </Label>
              </Col>
              <Col>
                <Input
                  type="text"
                  name="target-phone-number"
                  disabled={!this.state.editable}
                  value={this.state.observer.condition.targetPhoneNumber}
                />
              </Col>
            </FormGroup>
          </LoadableForm>
        </OperableCard>
        <OperableCard
          title="Trigger Condition List"
          pageName="triggerConditionList"
          displayable={this.state.observer.condition.triggers.length > 0}
        >
          <MoldableTable
            columns={triggerConditionListColumns}
            data={this.state.observer.condition.triggers}
            showPagination={false}
          />
        </OperableCard>
        <TrackingNumberList
          defaultTrackingNumberId={this.state.observer.defaultTrackingNumberId}
          data={this.state.trackingNumbers}
        />
      </div>
    );
  }

  fetchData(response) {
    if (response.status !== 200) {
      this.props.history.goBack();
      return false;
    }
    let state = {observer: response.data._embedded.observers[0], displayable: true};
    if (state.observer.condition.triggers === undefined) {
      state.observer.condition.triggers = [];
      state.observer.condition.targetPhoneNumber = '';
    }
    if (state.observer._embedded !== undefined) {
      if (state.observer._embedded.trackingNumbers !== undefined) {
        state.trackingNumbers = Object.assign([], state.observer._embedded.trackingNumbers);
      }
    }
    this.setState(state);
  }
}

const mapStateToProps = (storeState, ownProps) => {
  let newState = Object.assign({}, ownProps);

  newState.configOfTrackingNumbers = storeState.configOfTrackingNumbers;
  newState.selectedCampaign = storeState.selectedCampaign;

  return newState;
};

const ObserverView = connect(
  mapStateToProps,
  undefined,
)(injectIntl(ObserverViewComponent));

export default ObserverView;
