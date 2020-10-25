import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Collapse, Form} from 'reactstrap';
import ColumnSelector from './ColumnSelector';
import Filter from './Filter';

/**
 * OperationPanel component
 *
 * - Implement configuration form for the component inside `CardBody`.
 * - May specify own columnSelector by `this.props.columnSelector`.
 */
class OperationPanel extends Component {
  static propTypes = {
    toggleDisplay: PropTypes.bool.isRequired,
    filterForm: PropTypes.func,
    columnSelector: PropTypes.func,
    filter: PropTypes.array
  };

  render() {
    return (
      <Collapse className="operation-panel" isOpen={this.props.toggleDisplay}>
        <Form>
          {
            this.props.filterForm
              ? this.props.filterForm
              : (this.props.filter && <Filter {...this.props}/>)
          }
          {
            this.props.columnSelector
              ? this.props.columnSelector
              : <ColumnSelector {...this.props}/>
          }
        </Form>
      </Collapse>
    );
  }
}

export default OperationPanel;