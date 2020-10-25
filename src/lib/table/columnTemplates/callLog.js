const callLogColumns = {
  rowNumber: {label: 'Row number', cellType: 'rowNumber', isForce: true},
  visitedAt: {label: 'Visited at', cellType: 'datetime'},
  calledAt: {label: 'Called at', cellType: 'datetime'},
  observerLabel: {label: 'Observer label'},
  audienceId: {label: 'Audience ID'},
  callId: {label: 'Call ID'},
  media: {label: 'Media'},
  source: {label: 'Source'},
  keyword: {label: 'Keyword'},
  pageView: {label: 'Page view', cellType: 'number'},
  callDuration: {label: 'Call duration', cellType: 'secondToTime'},
  callerPhoneNumber: {label: 'Caller phone number'},
  trackingPhoneNumber: {label: 'Tracking phone number'},
  hangupCode: {label: 'Hangup code', cellType: 'callStatus'},
  deviceType: {label: 'Device type', cellType: 'translation'},
  causedUrl: {label: 'Caused URL', cellType: 'url'},
  recordedAudioUrl: {label: 'Recorded audio', cellType: 'audio'},
};
export default callLogColumns;