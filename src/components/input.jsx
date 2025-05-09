import React from 'react';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';
import './input.scss';

const Input = ({ name, label, ...rest }) => {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className={classNames('form-group', { 'has-error': errors[name] })}>
      {label && <label htmlFor={name}>{label}</label>}
      <input id={name} {...register(name)} {...rest} />
      {errors[name] && <span className="error-message">{errors[name].message}</span>}
    </div>
  );
};

export default Input;