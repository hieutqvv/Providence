const campaignListColumns = {
  rowNumber: {label: 'Row number', cellType: 'rowNumber', isForce: true},
  label: {label: "Campaign Name", cellType:'link', options: {path: '/campaigns', id: 'campaignId'}},
  createdAt: {label: "Creation date", cellType:'datetime'}
};
export default campaignListColumns;