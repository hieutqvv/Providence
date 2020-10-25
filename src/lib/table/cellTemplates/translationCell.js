import React from 'react';

export default ({intl}) => {
  return {
    Cell: row => (<span>{row.value ? intl.formatMessage({id: row.value}) : ''}</span>),
    sortable: false,
  };
};
