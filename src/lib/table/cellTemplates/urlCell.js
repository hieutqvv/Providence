import React from 'react';

export default props => {
  return {
    Cell: row => (
      <a href={row.value} title={row.value} target="_causeUrl">{row.value}</a>
    ),
    sortable: false,
  };
};
