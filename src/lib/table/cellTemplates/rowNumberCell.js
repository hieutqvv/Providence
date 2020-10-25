import React from 'react';

export default props => {
  return {
    Cell: row => {
      return (<span>{row.index + 1}</span>);
    },
    sortable: false,
    style: {textAlign: 'right'},
    width: 70,
  };
};
