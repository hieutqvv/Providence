import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import {doesRequireReload, updatePageConfig} from '../../../lib/redux/actions';
import OperableCard from '../../../views/Parts/Card/OperableCard';
import LoadableTable from '../../../views/Parts/Table/LoadableTable';
import accountListColumns from '../../../lib/table/columnTemplates/accountList';

class AccountListComponent extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      displayable: false,
    };
    this.title = 'Account List';
    this.endpoint = '/accounts';
    this.pageName = 'accounts';
    this.table = React.createRef();
    this.columns = accountListColumns;
    this.filter = [
      {
        label: 'Accounts to display',
        name: 'relationshipTypes',
        type: 'checkbox',
        values: [
          {
            'label': props.intl.formatMessage({id: 'Accounts that you own'}),
            'value': 'owner',
          },
          {
            'label': props.intl.formatMessage({id: 'Accounts to which you belong'}),
            'value': 'belongs',
          },
          {
            'label': props.intl.formatMessage({id: 'Accounts to which your agency account is an agency'}),
            'value': 'client',
          },
          {
            'label': props.intl.formatMessage({id: 'Your agency account'}),
            'value': 'agency',
          },
        ],
      },
    ];
    this.getUrlParameters = this.getUrlParameters.bind(this);
    this.getFilterParameters = this.getFilterParameters.bind(this);
    this.shouldUpdate = this.shouldUpdate.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  componentWillMount() {
    this.setState({displayable: false});
  }

  /**
   * It is called on `componentDidUpdate` in `Filter` to judge whether should update.
   *
   * @param prevProps
   * @param prevState
   * @param snapshot
   * @returns {boolean}
   */
  shouldUpdate(prevProps, prevState, snapshot) {
    return this.props.location.pathname === prevProps.location.pathname
      && !this.props.location.search
      && prevProps.location.search;
  }

  getUrlParameters(e) {
    let search = {relationshipTypes: []};
    document.getElementsByName('relationshipTypes').forEach(function(elm) {
      if (elm.checked) {
        search.relationshipTypes.push(elm.value);
      }
    });
    return search.relationshipTypes.length ? (new URLSearchParams(search)).toString() : '';
  }

  getFilterParameters(e) {
    let filter = Object.assign([], this.filter);

    /** If `e` is event object, filter changed. */
    if (e !== undefined) {
      if (e.target.name === 'relationshipTypes') {
        for (let i = 0; i < filter[0].values.length; ++i) {
          if (filter[0].values[i].value === e.target.value) {
            filter[0].values[i].checked = !filter[0].values[i].checked;
          }
        }
      }
      return filter;
    }

    let query = this.getSearchParamsAsObject();
    for (let i = 0; i < filter[0].values.length; ++i) {
      filter[0].values[i].checked = query.relationshipTypes.length < 1 ||
        query.relationshipTypes.includes(filter[0].values[i].value);
    }

    return filter;
  }

  getSearchParamsAsObject() {
    let query = new URLSearchParams(this.props.location.search);

    let relationshipTypes = query.get('relationshipTypes');
    if (relationshipTypes !== null) {
      relationshipTypes = relationshipTypes.split(',');
    } else {
      relationshipTypes = [];
    }

    return {relationshipTypes};
  }

  get query() {
    let query = {};
    const params = new URLSearchParams(this.props.location.search);
    const relationshipTypes = params.get('relationshipTypes');
    if (relationshipTypes !== null) {
      query.relationshipTypes = relationshipTypes;
    }
    return query;
  }

  onCreate() {
    this.props.history.push('/accounts/new');
  }

  render() {
    return (
      <OperableCard
        title={this.title}
        pageName={this.pageName}
        onReload={this.table.current && this.table.current.fireFetchData}
        onCollapseConfig={this.toggleConfig}
        displayable={this.state.displayable}
        configurable={true}
        onCreate={this.onCreate}
        columns={this.columns}
        filter={this.filter}
        filterParameterGetter={this.getFilterParameters}
        urlParameterGetter={this.getUrlParameters}
        onFilterChange={e => this.table.current.fireFetchData(e)}
        shouldUpdate={this.shouldUpdate}
        {...this.props}
      >
        <LoadableTable
          pageName={this.pageName}
          endpoint={this.endpoint}
          query={this.query}
          columns={this.columns}
          onLoaded={() => this.setState({displayable: true})}
          table={this.table}
          {...this.props}
        />
      </OperableCard>
    );
  }
}

const mapStateToProps = (storeState, ownProps) => {
  let newState = Object.assign({}, ownProps);

  newState.config = storeState.configOfAccounts;

  return newState;
};

const mapDispatchToProps = dispatch => {
  return {
    reloaded: () => dispatch(doesRequireReload(true)),
    updateConfig: config => dispatch(updatePageConfig(config)),
  };
};

const AccountList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(AccountListComponent));
export default AccountList;
