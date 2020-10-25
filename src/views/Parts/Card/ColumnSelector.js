import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {CustomInput, FormGroup} from 'reactstrap';
import {updatePageConfig} from '../../../lib/redux/actions';

/**
 * ColumnSelector component
 *
 * - Implement ColumnSelector form as part of `OperationPanel` component.
 */
class ColumnSelectorComponent extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.onColumnVisibilityChange = this.onColumnVisibilityChange.bind(this);
  }

  /**
   * Toggle visibility and update config on Redux.
   *
   * @param e
   */
  onColumnVisibilityChange(e) {
    let newConfig = Object.assign({}, this.props.config);
    const accessor = e.currentTarget.dataset.accessor;
    if (newConfig.columns[accessor] === undefined) {
      newConfig.columns[accessor] = {show: false};
    } else {
      newConfig.columns[accessor].show = !newConfig.columns[accessor].show;
    }
    this.props.updateConfig({name: 'configOf' + this.props.pageName, config: newConfig});
  }

  render() {
    return (
      <FormGroup>
        <label><FormattedMessage id="Columns to appear"/></label>
        <ul>
          {Object.keys(this.props.columns).map(key => {
            if (!this.props.columns.hasOwnProperty(key)) {
              return true;
            }
            let column = this.props.columns[key];
            const id = key + 'Visibility';

            return (
              <li key={id}><CustomInput
                type="checkbox"
                id={id}
                data-accessor={key}
                label={this.props.intl.formatMessage({id: column.label})}
                defaultChecked={
                  this.props.config.columns[key] === undefined ||
                  this.props.config.columns[key].show
                }
                onChange={this.onColumnVisibilityChange}
              /></li>);
          })}
        </ul>
      </FormGroup>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateConfig: config => {
      dispatch(updatePageConfig(config));
    },
  };
};

const ColumnSelector = connect(
  undefined,
  mapDispatchToProps,
)(injectIntl(ColumnSelectorComponent));

export default ColumnSelector;