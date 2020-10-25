import React, {Component, Suspense} from 'react';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl} from 'react-intl';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardHeader,
  CardBody,
  Button,
  Alert,
  Popover,
  PopoverBody,
} from 'reactstrap';
import {isRequesting, raiseError} from '../lib/redux/actions';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      isOpenPasswordResetPopover: false,
    };
    this.onPasswordResetButton = this.onPasswordResetButton.bind(this);
  }

  loading() {
    return (
      <div className="animated fadeIn pt-1 text-center">
        <div className="sk-spinner sk-spinner-pulse"/>
      </div>
    );
  }

  get cannotDoPasswordReset() {
    return !this.state.password;
  }

  onPasswordResetButton(e) {
    e.preventDefault();
    this.props.onPasswordResetButton({component: this, event: e, http: this.props.http});
  }

  render() {
    return (
      <div className="animated fadeIn row justify-content-md-center" style={{marginTop: '2em'}}>
        <Card>
          <CardHeader>
            <FormattedMessage id="Password reset"/>
          </CardHeader>
          <CardBody>
            <Suspense fallback={this.loading()}>
              <Alert isOpen={this.props.isError} color="danger">
                <FormattedMessage id={this.props.errorDescription}/>
              </Alert>
              <Form>
                <FormGroup>
                  <Label for="newPassword"><FormattedMessage id="New password"/></Label>
                  <Input
                    type="password"
                    name="password"
                    id="newPassword"
                    value={this.state.password}
                    placeholder={this.props.intl.formatMessage({id: 'New password'})}
                    onChange={e => this.setState({password: e.currentTarget.value})}
                  />
                </FormGroup>
                <Button
                  id="password-reset-button"
                  color="warning"
                  disabled={this.cannotDoPasswordReset}
                  onClick={this.onPasswordResetButton}
                  onMouseOver={e => {
                    if (this.cannotDoPasswordReset) {
                      this.setState({isOpenPasswordResetPopover: true});
                    }
                  }}
                  onMouseLeave={e => {
                    this.setState({isOpenPasswordResetPopover: false});
                  }}
                ><FormattedMessage id="Password reset"/></Button>
              </Form>
              <Popover
                placement="bottom"
                isOpen={this.state.isOpenPasswordResetPopover}
                target="password-reset-button"
              >
                <PopoverBody><FormattedMessage id="Please enter new password."/></PopoverBody>
              </Popover>
              <ToastContainer/>
            </Suspense>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (storeState, ownProps) => {
  let newProps = Object.assign({}, ownProps);

  newProps.isError = storeState.lastErrorDescription.length > 0;
  newProps.errorDescription = storeState.lastErrorDescription;
  newProps.http = storeState.http;

  return newProps;
};

const mapDispatchToProps = dispatch => {
  return {
    onPasswordResetButton: ({component, http}) => {
      dispatch(isRequesting(true));
      http({
        method: 'put',
        url: '/users/password',
        data: {
          token: component.props.match.params.token,
          password: component.state.password,
        }
      }).then(response => {
        dispatch(isRequesting(false));
        toast(
          component.props.intl.formatMessage({id: 'Password has been reset.'}),
          {
            position: toast.POSITION.TOP_CENTER,
            onClose: e => component.props.history.push('/'),
          },
        );
      }).catch(error => {
        // エラー発生
        if (error.response.headers['www-authenticate'] !== undefined) {
          dispatch(raiseError(error.response.headers['www-authenticate']));
        }
        dispatch(isRequesting(false));
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(PasswordReset));
