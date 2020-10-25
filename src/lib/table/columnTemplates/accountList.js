const accountListColumns = {
  rowNumber: {label: 'Row number', cellType: 'rowNumber', isForce: true},
  label: {label: 'Account Name', cellType: 'link', options: {path: '/accounts', id: 'accountId'}},
  isAgency: {label: 'Account Type', cellType: 'agency'},
  createdAt: {label: 'Creation date', cellType: 'datetime'},
};
export default accountListColumns;