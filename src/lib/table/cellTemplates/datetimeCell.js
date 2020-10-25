import React from 'react';
import moment from 'moment';

export default props => {
  return {
    Cell: row => (
      <span>{row.value ? moment(row.value).format('lll') : ''}</span>
    ),
    minWidth: 155,
  };
};
