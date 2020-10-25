import React, { Component } from 'react';
import OperableCard from '../../Parts/Card/OperableCard';
import GenerateForm from '../../Parts/Form/GenerateForm';

const schema = {
  title: "Account",
  type: "object",
  required: ["label"],
  properties: {
    "label": {
      "title": "Account name",
      "type": "string",
      "minLength": 3
    },
    "agencyId": {
      "title": "Agency account ID",
      "type": "number"
    },
    "ownerId": {
      "title": "Owner user ID",
      "type": "number" ,
    }
  }
};

const uiSchema = {
  "label": { "ui:autofoucus": true }
};

class AccountNew extends Component {
  constructor(props){
    super(props);
    this.state = {
      displayable: true,
      editable: true,
      account: {},
      campaigns: []
    };
    this.title = 'New Account';
    this.endpoint = '/accounts';
    this.method = 'POST';
    this.pageName = 'new account';
    this.form = React.createRef();
    this.transferPage = this.transferPage.bind(this);
  }
  
  transferPage() {
    this.props.history.push('/accounts');
  }

  render() {
    return (
      <OperableCard
        title={this.title}
        pageName={this.pageName}
        displayable={this.state.displayable}
      >
        <GenerateForm
          schema={schema}
          uiSchema={uiSchema}
          endpoint={this.endpoint}
          method={this.method}
          onSuccess={this.transferPage}
        />
      </OperableCard>
    )
  }
}

export default AccountNew
