const readableTime = (millisecond, intl) => {
  if (typeof millisecond !== 'number') {
    return;
  }
  let second = millisecond / 1000;
  let hour = Math.floor(second / 3600);
  second = second - hour * 3600;
  let minute = Math.floor(second / 60);
  second = second - minute * 60;
  return [
    (hour ? hour + intl.formatMessage({id: 'hour' + (hour > 1 ? 's' : '')}) : ''),
    (minute ? minute + intl.formatMessage({id: 'minute' + (hour > 1 ? 's' : '')}) : ''),
    (second ? second + intl.formatMessage({id: 'second' + (hour > 1 ? 's' : '')}) : ''),
  ].join('');
};

export default readableTime;