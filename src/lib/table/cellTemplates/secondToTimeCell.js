import React from 'react';
import {FormattedMessage} from 'react-intl';

export default props => {
  return {
    Cell: row => {
      if (row.column.id === 'stayDuration' && row.value === 0) {
        return (<span><FormattedMessage id="< 30 sec"/></span>);
      }
      const hour = Math.floor(row.value / 3600);
      const minute = Math.floor(row.value / 60);
      const second = row.value % 60;
      const time = ('00' + hour).substr(-2) + ':' + ('00' + minute).substr(-2) + ':' + ('00' + second).substr(-2);
      return (<span>{time}</span>);
    },
    style: {textAlign: 'right'},
  };
};
