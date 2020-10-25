import React from 'react';

export default props => {
  return {
    Cell: (row) => (
      <span>{props.intl.formatNumber(row.value)}</span>
    ),
    style: {textAlign: 'right'}
  };
};