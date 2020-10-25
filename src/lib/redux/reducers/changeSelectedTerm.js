export default (storeState, {payload}) => {
  let newState = Object.assign({}, storeState);
  newState.selectedTerm = {
    beginTimestamp: payload.picker.startDate.format('x'),
    endTimestamp: payload.picker.endDate.format('x'),
  };
  return newState;
};