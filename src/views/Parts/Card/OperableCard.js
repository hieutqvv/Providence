import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Card, CardBody, CardHeader} from 'reactstrap';
import 'react-table/react-table.css';
import {doesRequireReload, raiseError} from '../../../lib/redux/actions';
import OperationPanel from './OperationPanel';

/**
 * OperableCard component
 *
 * - Implement operation method for components included.
 */
class OperableCardComponent extends Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    onReload: PropTypes.func,
    onCollapseConfig: PropTypes.func,
    onCreate: PropTypes.func,
    exportProperty: PropTypes.object,
    /** The component display when the property is true. */
    displayable: PropTypes.bool,
    configurable: PropTypes.bool,
  };

  static defaultProps = {
    displayable: false,
    configurable: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isDisplayOperationPanel: false,
    };
    this.toggleConfig = this.toggleConfig.bind(this);
    this.onExportAsCsv = this.onExportAsCsv.bind(this);
  }

  /**
   * Toggle display operation panel for the component inside `CardBody`.
   */
  toggleConfig() {
    this.setState({isDisplayOperationPanel: !this.state.isDisplayOperationPanel});
  }

  /**
   * Export method.
   *
   * - Export button shows when `this.props.exportProperty` is specified.
   */
  onExportAsCsv() {
    this.props.http({
      url: this.props.exportProperty.url,
      params: this.props.exportProperty.params,
      responseType: 'blob',
      headers: {
        accept: 'text/csv',
      },
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data], {'type': 'csv/plain'}));
      const link = document.createElement('a');
      link.href = url;
      const contentDisposition = response.headers['content-disposition'];
      const target = this.props.target === undefined ?
        this.props.exportProperty.url.split('/').pop() :
        this.props.target;
      let filename = target + '.csv';
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        if (fileNameMatch.length === 2)
          filename = fileNameMatch[1];
      }
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    }).catch(this.props.raiseError);
  }

  render() {
    return (
      <div className={this.props.displayable ? 'animated fadeIn' : 'hidden'}>
        <Card>
          <CardHeader>
            <FormattedMessage id={this.props.title}/>
            <div className="card-header-actions">

              {this.props.configurable && <button
                onClick={this.toggleConfig}
                className="card-header-action btn btn-setting"
                title={this.props.intl.formatMessage({id: 'Configuration'})}
              ><i className="fa fa-cog"/></button>}

              {this.props.onCreate && <button
                onClick={this.props.onCreate}
                className="card-header-action btn btn-setting"
                title={this.props.intl.formatMessage({id: 'Create'})}
              ><i className="fa fa-plus"/></button>}

              {this.props.exportProperty && <button
                onClick={this.onExportAsCsv}
                className="card-header-action btn btn-setting"
                title={this.props.intl.formatMessage({id: 'Export as CSV'})}
              ><i className="fa fa-download"/></button>}

              {this.props.onReload && <button
                onClick={this.props.onReload}
                className="card-header-action btn btn-setting"
                title={this.props.intl.formatMessage({id: 'Reload'})}
              ><i className="fa fa-refresh"/></button>}

            </div>
          </CardHeader>
          {this.props.configurable && <OperationPanel
            toggleDisplay={this.state.isDisplayOperationPanel}
            {...this.props}
          />}
          <CardBody>{this.props.children}</CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (storeState, ownProps) => {
  let newState = Object.assign({}, ownProps);

  newState.http = storeState.controlledHttpClient;

  return newState;
};

const mapDispatchToProps = dispatch => {
  return {
    /**
     * Method that indicates complete reloaded a log table.
     *
     * @returns {*}
     */
    reloaded: () => dispatch(doesRequireReload(false)),
    /**
     * Methods that cause errors according to responses from the API.
     *
     * @param error
     */
    raiseError: error => dispatch(raiseError(error)),
  };
};

const OperableCard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(OperableCardComponent));
export default OperableCard;
