import React from 'react';

export default props => {
  return {
    expander: true,
    Expander: ({isExpanded, ...rest}) => {
      if (rest.original.history === undefined || !rest.original.history.length) {
        return null;
      }

      return (
        <div>
          {isExpanded ? <div className="rt-expander -open"/> : <div className="rt-expander"/>}
        </div>
      );
    },
    Cell: props => {
      if (props.original.history === undefined) {
        return null;
      }
      return (<ul>{props.original.history.map((row, index) => {
        return (<li key={index}>{row.url}</li>);
      })}</ul>);
    },
    style: {
      cursor: 'pointer',
      padding: '0',
      textAlign: 'center',
      userSelect: 'none',
    },
  };
};
