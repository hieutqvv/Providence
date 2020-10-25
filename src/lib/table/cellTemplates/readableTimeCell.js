import React from 'react';
import readableTime from '../../../functions/readableTime';

export default props => {
  return {
    Cell: row => (
      <span>{readableTime(row.value, props.intl)}</span>
    ),
  };
};