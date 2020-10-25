const observerListColumns = {
  rowNumber: {label: 'Row number', cellType: 'rowNumber', isForce: true},
  label: {label: 'Observer name', cellType: 'link', options: {path: '/observers', id: 'observerId'}},
  channel: {label: 'Tracking channel', cellType: 'translation'}
};
export default observerListColumns;