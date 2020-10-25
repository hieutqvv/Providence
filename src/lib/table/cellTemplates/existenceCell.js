import React from 'react';

export default props => {
  return {
    Cell: row => (
      <span>{row.value > 0 ? '✔' : ''}</span>
    ),
    sortable: false,
    style: {textAlign: 'center'},
  };
};
