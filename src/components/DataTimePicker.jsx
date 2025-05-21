
import React from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useFormContext } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';

const DateTimePicker = ({ name, label, required, ...rest }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`form-group ${errors[name] ? 'has-error' : ''}`}>
      {label && (
        <label htmlFor={name}>
          {label}
          {required && <span className="required-asterisk">*</span>}
          {errors[name] && <span className="error-message"> {errors[name].message}</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd/MM/yyyy HH:mm"
            placeholderText="Selecione a data e hora"
            className="input"
            {...rest}
          />
        )}
      />
    </div>
  );
};

export default DateTimePicker;
