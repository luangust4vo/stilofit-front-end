import React from 'react';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

import './styles.scss';

const CheckboxPanel = ({ name, label, options = [], required, ...rest }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={classNames('form-group', { 'has-error': errors[name] })}>
      {label && (
        <label className="checkbox-panel-label">
          {label}
          {required && <span className="required-asterisk">*</span>}
          {errors[name] && <span className="error-message"> {errors[name].message}</span>}
        </label>
      )}
      <div className="checkbox-panel-options">
        {options.map((option) => (
          <label key={option.value} className="checkbox-panel-option">
            <input
              type="checkbox"
              value={option.value}
              {...register(name)}
              {...rest}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxPanel;