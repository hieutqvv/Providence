import React from 'react';

const CustomFieldTemplate = (props, intl) => {
  const {id, classNames, label, help, required, description, errors, children} = props;
  return (
    <div className={classNames}>
      {id !== 'root' && <label htmlFor={id}>{intl.formatMessage({id: label})}{required ? ' (*)' : null}</label>}
      {description}
      {children}
      {errors}
      {help}
    </div>
  )
};

export default CustomFieldTemplate;