import React, {Component} from 'react';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import {Nav, NavItem, Button} from 'reactstrap';
import {changeSelectedTerm} from '../../../lib/redux/actions';
import moment from 'moment';

import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';

class TermPickerComponent extends Component {
  constructor(props){
    super(props);
    this.onApply = this.onApply.bind(this);
    this.presetTerms = {
      [this.props.intl.formatMessage({id: 'Today'})]: [
        moment(),
        moment(),
      ],
      [this.props.intl.formatMessage({id: 'Yesterday'})]: [
        moment().subtract(1, 'days'),
        moment().subtract(1, 'days'),
      ],
      [this.props.intl.formatMessage({id: 'Last 7 Days'})]: [
        moment().subtract(6, 'days'),
        moment(),
      ],
      [this.props.intl.formatMessage({id: 'Last 30 Days'})]: [
        moment().subtract(29, 'days'),
        moment(),
      ],
      [this.props.intl.formatMessage({id: 'This Month'})]: [
        moment().startOf('month'),
        moment().endOf('month'),
      ],
      [this.props.intl.formatMessage({id: 'Last Month'})]: [
        moment().subtract(1, 'month').startOf('month'),
        moment().subtract(1, 'month').endOf('month')
      ],
    };
    this.presetLocale = {
      direction: 'ltr',
      format: moment.localeData().longDateFormat('L'),
      separator: ' - ',
      applyLabel: this.props.intl.formatMessage({id: 'Apply'}),
      cancelLabel: this.props.intl.formatMessage({id: 'Cancel'}),
      weekLabel: 'W',
      customRangeLabel: 'Custom Range',
      daysOfWeek: moment.weekdaysMin(),
      monthNames: moment.monthsShort(),
      firstDay: moment.localeData().firstDayOfWeek(),
    };
  }

  get selectedTerm() {
    let begin = moment(this.props.selectedTerm.beginTimestamp, 'x').format('LL');
    let end = moment(this.props.selectedTerm.endTimestamp, 'x').format('LL');
    return `${begin} - ${end}`;
  }

  onApply(e, picker) {
    this.props.onApply(e, picker);
  }

  render() {
    return (
      <Nav className="ml-auto">
        <NavItem>
          <DateRangePicker
            startDate={moment(this.props.selectedTerm.beginTimestamp, 'x')}
            endDate={moment(this.props.selectedTerm.endTimestamp, 'x')}
            onApply={this.onApply}
            opens="left"
            alwaysShowCalendars={true}
            showCustomRangeLabel={false}
            locale={this.presetLocale}
            ranges={this.presetTerms}
          >
            <Button className="btn-ghost-dark">
              <i className="fa fa-calendar" style={{marginRight: '0.5em'}}/>
              {this.selectedTerm}
            </Button>
          </DateRangePicker>
        </NavItem>
      </Nav>
    );
  }
}

const mapStateToProps = (storeState, ownProps) => {
  let newProps = Object.assign({}, ownProps);

  newProps.selectedTerm = storeState.selectedTerm;

  return newProps;
};

const mapDispatchToProps = dispatch => {
  return {
    onApply: (event, picker) => {
      dispatch(changeSelectedTerm({event, picker}));
    },
  };
};

const TermPicker = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(TermPickerComponent));
export default TermPicker;
