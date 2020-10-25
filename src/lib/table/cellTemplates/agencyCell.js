import React from 'react';
import { Badge } from 'reactstrap';

export default props => {
  return {
    Cell: row => (
      <span>{row.value === true ? <Badge color="secondary">{props.intl.formatMessage({id: 'Agency'})}</Badge> : ''}</span>
    ),
    minWidth: 100,
    maxWidth: 150,
    style: {textAlign: 'center'},
  };
};
