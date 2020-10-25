import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MoldableTable from './MoldableTable';
import OperableCard from '../../../views/Parts/Card/OperableCard';
import trackingNumberListColumns from '../../../lib/table/columnTemplates/trackingNumberList';

class TrackingNumberList extends Component {
  static propTypes = {
    columns: PropTypes.object,
    data: PropTypes.array,
    defaultTrackingNumberId: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.title = 'Tracking Number List';
    this.pageName = 'trackingNumberList';
  }

  /**
   * Return tracking numbers that remolded.
   *
   * - `isDefault` is `true` if the tracking number is default tracking number.
   *
   * @returns {Array}
   */
  trackingNumbers() {
    let trackingNumbers = Object.assign([], this.props.data);
    if (this.props.defaultTrackingNumberId !== undefined) {
      for (let i = 0; i < trackingNumbers.length; ++i) {
        if (trackingNumbers[i].trackingNumberId === this.props.defaultTrackingNumberId) {
          trackingNumbers[i].isDefault = true;
        }
      }
    }

    return trackingNumbers;
  }

  render() {
    return (
      <OperableCard
        title={this.title}
        pageName={this.pageName}
        displayable={true}
      >
        <MoldableTable
          columns={trackingNumberListColumns}
          data={this.trackingNumbers()}
          showPagination={false}
          onFetchData={this.onFetchData}
        />
      </OperableCard>
    );
  }
}

export default TrackingNumberList;
