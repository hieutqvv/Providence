import React, {Component} from 'react';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import {Nav, NavItem, NavLink} from 'reactstrap';
import {changeSelectedCampaign, changeSelectedAccount} from '../../../lib/redux/actions/';
import Select, {components} from 'react-select';
import {Link} from 'react-router-dom';

class CampaignPickerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: {
        account: {
          isOpen: false,
        },
        campaign: {
          isOpen: false,
        },
      },
      selectComponent: null,
    };
    this.props = props;
    this.onChange = this.onChange.bind(this);
  }

  get options() {
    if (!this.props.accounts.length) {
      return [];
    }
    let options = [];
    for (let i = 0; i < this.props.accounts.length; i++) {
      let children = [];
      for (let ii = 0; ii < this.props.campaigns.length; ii++) {
        if (this.props.accounts[i].accountId === this.props.campaigns[ii].accountId) {
          children.push({value: this.props.campaigns[ii].campaignId, label: this.props.campaigns[ii].label});
        }
      }
      options.push({label: this.props.accounts[i].label, options: children});
    }
    return options;
  }

  get defaultValue() {
    return {label: this.props.selectedCampaign.label, value: this.props.selectedCampaign.campaignId};
  }

  get selectedAccountLabel() {
    for (let i = 0; i < this.props.accounts.length; i++) {
      if (this.props.selectedCampaign.accountId === this.props.accounts[i].accountId) {
        return this.props.accounts[i].label;
      }
    }
    return '';
  }

  onChange(selection) {
    if (selection.value === this.props.selectedCampaign.campaignId) {
      return false;
    }
    for (let i = 0; i < this.props.campaigns.length; i++) {
      if (selection.value === this.props.campaigns[i].campaignId) {
        const account = this.props.accounts.filter(account => account.accountId === this.props.campaigns[i].accountId);
        this.props.changeSelectedCampaign(this.props.campaigns[i]);
        this.props.changeSelectedAccount(account[0]);
        break;
      }
    }
  }

  render() {
    const Group = props => (
      <div>
        <components.Group {...props}/>
      </div>
    );
    return (
      <Nav className="mr-auto campaign-picker">
        <NavItem className="selected-account">
          <NavLink className="btn btn-ghost-dark" tag={Link} to={'/accounts/' + this.props.selectedCampaign.accountId}>
            <i className="icon-home" aria-hidden="true" style={{marginRight: '0.5em'}}/>
            {this.selectedAccountLabel}
          </NavLink>
        </NavItem>
        <NavItem style={{width: '16rem'}}>
          <Select
            className="campaign-picker"
            value={this.defaultValue}
            autosize={true}
            options={this.options}
            components={{Group}}
            onChange={this.onChange}
          />
        </NavItem>
        <NavItem>
          <NavLink className="btn btn-ghost-dark" tag={Link} to={'/campaigns/' + this.props.selectedCampaign.campaignId}>
            <i className="fa fa-chevron-right" aria-hidden="true"/>
          </NavLink>
        </NavItem>
      </Nav>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeSelectedCampaign(newSelection) {
      dispatch(changeSelectedCampaign(newSelection));
    },
    changeSelectedAccount(newSelection) {
      dispatch(changeSelectedAccount(newSelection));
    },
  };
};

const CampaignPicker = connect(
  undefined,
  mapDispatchToProps,
)(injectIntl(CampaignPickerComponent));
export default CampaignPicker;