import React from 'react';

export default props => {
  return {
    Cell: row => (
      <span>{row.value ? <audio
        controls
        className="recorded-audio hidden"
        src={row.value}
        preload="metadata"
        // http://www.htmq.com/video/
        onLoadedMetadata={e => {
          e.target.className = 'recorded-audio';
        }}
      /> : ''}</span>
    ),
    sortable: false,
    minWidth: 180,
    style: {padding: 0, lineHeight: 1},
  };
};
