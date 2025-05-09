import React from 'react';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';
import './style.scss';

const Select = ({ name, label, children, required, ...rest }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className={classNames('form-group', { 'has-error': errors[name] })}>
      {label && (
        <label htmlFor={name}>
          {label}
          {required && <span className="required-asterisk">*</span>}
          {errors[name] && <span className="error-message"> {errors[name].message}</span>}
        </label>
      )}
      <select id={name} {...register(name)} {...rest}>
        {children}
      </select>
    </div>
  );
};

export default Select;
