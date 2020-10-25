import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { raiseErrorMessages, isRequesting } from '../../../lib/redux/actions';
import CustomFieldTemplate from '../../../lib/form/functions/CustomFieldTemplate';
import ObjectFieldTemplate from '../../../lib/form/functions/ObjectFieldTemplate';
import { Alert } from 'reactstrap';
import Form from 'react-jsonschema-form';

class GenerateFormComponent extends Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object.isRequired,
    endpoint: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    onSuccess: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm({formData}) {
    this.props.http({
      method: this.props.method,
      url: this.props.endpoint,
      data: formData
    }).then(this.props.onSuccess).catch(this.props.raiseError);
  }

  render() {
    return (
      <div>
        <Alert isOpen={this.props.isError} color="danger">
          <h3>{this.props.intl.formatMessage({id: 'Errors'})}</h3>
          <ul className="list-group">
            <li className="list-group-item text-danger">
              {this.props.errorDescription}
            </li>
          </ul>
        </Alert>
        <Form
          schema={this.props.schema}
          uiSchema={this.props.uiSchema}
          showErrorList={false}
          ObjectFieldTemplate={props => ObjectFieldTemplate(props, this.props.intl)}
          FieldTemplate={(props) => CustomFieldTemplate(props, this.props.intl)}
          onSubmit={this.submitForm}
        />
      </div>
    )
  }
}

const mapStateToProps = (storeState, ownProps) => {
  let newProps = Object.assign({}, ownProps);

  newProps.http = storeState.controlledHttpClient;
  newProps.isError = storeState.lastErrorDescription.length > 0;
  newProps.errorDescription = storeState.lastErrorDescription;

  return newProps
};

const mapDispatchToProps = dispatch => {
  return {
    raiseError: error => {
      dispatch(raiseErrorMessages(error.response));
      dispatch(isRequesting(false));
    },
  };
};

const GenerateForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(GenerateFormComponent));

export default GenerateForm;
