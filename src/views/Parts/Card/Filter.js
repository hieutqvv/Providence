import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {FormGroup, CustomInput} from 'reactstrap';

class Filter extends Component {
  static propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    filter: PropTypes.array.isRequired,
    filterParameterGetter: PropTypes.func.isRequired,
    urlParameterGetter: PropTypes.func.isRequired,
    shouldUpdate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      filter: [],
    };
    this.filterChange = this.filterChange.bind(this);
  }

  componentWillMount() {
    this.setState({filter: this.props.filterParameterGetter()});
  }

  /**
   * Update state and fetch data when campaign or URL changed.
   *
   * @param prevProps
   * @param prevState
   * @param snapshot
   */
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.shouldUpdate(prevProps, prevState, snapshot)) {
      this.setState({filter: this.props.filterParameterGetter()}, this.props.onFilterChange);
    }
  }

  /**
   * Called when change something in filter.
   *
   * @param e
   * @returns {boolean}
   */
  filterChange(e) {
    let search = this.props.urlParameterGetter(e);
    if (search === false) {
      return false;
    }
    this.props.history.push({pathname: this.props.location.pathname, search: search});
    this.setState({filter: this.props.filterParameterGetter(e)}, this.props.onFilterChange);
  }

  renderCheckBoxes(filter, index) {
    return (
      <FormGroup key={index}>
        <label><FormattedMessage id={filter.label}/></label>
        <ul>
          {filter.values.map(pattern => {
            const id = 'Filter' + pattern.value;
            return (
              <li key={id}>
                <CustomInput
                  id={id}
                  type={filter.type}
                  name={filter.name}
                  value={pattern.value}
                  label={pattern.label}
                  checked={pattern.checked !== undefined && pattern.checked}
                  onChange={this.filterChange}
                />
              </li>
            );
          })}
        </ul>
      </FormGroup>
    );
  }

  render() {
    return (
      <div>
        {this.state.filter.map((filter, index) => {
          if (filter.type === 'checkbox') {
            return this.renderCheckBoxes(filter, index);
          }
          return false;
        })}
      </div>
    );
  }
}

export default Filter;