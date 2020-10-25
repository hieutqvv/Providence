import React from 'react';

export default props => {
  return {
    Cell: (row) => (
      <span>{row.original.trackingNumberId === row.original.defaultTrackingNumberId ? 'o' : ''}</span>
    ),
    minWidth: 100,
    maxWidth: 100,
    style: {textAlign: 'center'},
  };
};