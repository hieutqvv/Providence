import React from 'react';

export default ({intl}) => {
  const status = {
    0: {
      label: intl.formatMessage({id: 'Uncertain'}),
      description: intl.formatMessage({id: 'Uncertain'}),
    },
    1: {
      label: intl.formatMessage({id: 'Ended normally'}),
      description: intl.formatMessage({id: 'Disconnected by caller.'}),
    },
    2: {
      label: intl.formatMessage({id: 'Ended normally'}),
      description: intl.formatMessage({id: 'Disconnected by receiver.'}),
    },
    3: {
      label: intl.formatMessage({id: 'Did not respond'}),
      description: intl.formatMessage({id: 'Receiver did not respond.'}),
    },
    4: {
      label: intl.formatMessage({id: 'Line was busy'}),
      description: intl.formatMessage({id: 'Receiver was talking.'}),
    },
    5: {
      label: intl.formatMessage({id: 'Did not established'}),
      description: intl.formatMessage({id: 'Did not established by phone configuration.'}),
    },
    6: {
      label: intl.formatMessage({id: 'Disconnect before transfer'}),
      description: intl.formatMessage({id: 'Caller disconnected immediately after making a call.'}),
    },
    7: {
      label: intl.formatMessage({id: 'Disconnect before receive'}),
      description: intl.formatMessage({id: 'Caller disconnected while receiver response guidance was playing.'}),
    },
    8: {
      label: intl.formatMessage({id: 'Ended normally'}),
      description: intl.formatMessage({id: 'Disconnected by caller or receiver.'}),
    },
    10: {
      label: intl.formatMessage({id: 'Transfer'}),
      description: intl.formatMessage({id: 'Transfer when non-business hours.'}),
    },
    11: {
      label: intl.formatMessage({id: 'Send a guidance'}),
      description: intl.formatMessage({id: 'Send a guidance when non-business hours.'}),
    },
    12: {
      label: intl.formatMessage({id: 'Voice mail'}),
      description: intl.formatMessage({id: 'Voice mail when non-business hours.'}),
    },
    13: {
      label: intl.formatMessage({id: 'Transfer'}),
      description: intl.formatMessage({id: 'Transfer when a receiver is busy.'}),
    },
    14: {
      label: intl.formatMessage({id: 'Voice mail'}),
      description: intl.formatMessage({id: 'Voice mail when a receiver is busy.'}),
    },
    15: {
      label: intl.formatMessage({id: 'Disconnect before receive'}),
      description: intl.formatMessage({id: 'A caller ended call when waiting.'}),
    },
    16: {
      label: intl.formatMessage({id: 'Transfer'}),
      description: intl.formatMessage({id: 'Transfer when no one received the call.'}),
    },
    17: {
      label: intl.formatMessage({id: 'Voice mail'}),
      description: intl.formatMessage({id: 'Voice mail when no one received the call.'}),
    },
    18: {
      label: intl.formatMessage({id: 'Disconnect before receive'}),
      description: intl.formatMessage({id: 'Suspended IVR by the caller.'}),
    },
    19: {
      label: intl.formatMessage({id: 'Disconnect before receive'}),
      description: intl.formatMessage({id: 'Suspended the call because no one received the call.'}),
    },
    20: {
      label: intl.formatMessage({id: 'Blocked'}),
      description: intl.formatMessage({id: 'Blocked the call by anonymous.'}),
    },
    21: {
      label: intl.formatMessage({id: 'Blocked'}),
      description: intl.formatMessage({id: 'Blocked the call by the caller'}),
    },
  };
  return {
    Cell: row => (
      <span>{status[row.value].label}</span>
    ),
    sortable: false,
  };
};
