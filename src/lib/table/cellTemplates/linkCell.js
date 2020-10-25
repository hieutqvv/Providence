import React from 'react';
import {Link} from 'react-router-dom';

export default (props, accessor) => {
  const options = props.columns[accessor].options;
  return {
    Cell: row => {
      return (<Link to={[options.path, row.original[options.id]].join('/')}>{row.value}</Link>);
    },
  };
};
