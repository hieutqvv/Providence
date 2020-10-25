import React from 'react';

const ObjectFieldTemplate = (props, intl) => {
  return (
    <fieldset>
      <legend>{intl.formatMessage({id: props.title})}</legend>
      {props.description}
      {props.properties.map((element, index) => <div key={index} className="property-wrapper">{element.content}</div>)}
    </fieldset>
  );
};

export default ObjectFieldTemplate;