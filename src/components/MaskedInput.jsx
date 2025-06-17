import React from "react";
import { IMaskInput } from "react-imask";
import { useFormContext, Controller } from "react-hook-form";

const MaskedInput = ({ name, label, mask, required, ...rest }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`form-group ${errors[name] ? "has-error" : ""}`}>
      <label htmlFor={name}>
        {label}
        {required && <span className="required-asterisk">*</span>}
        {errors[name] && (
          <span className="error-message">{errors[name].message}</span>
        )}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <IMaskInput
            {...field}
            mask={mask}
            id={name}
            className="input"
            {...rest}
          />
        )}
      />
    </div>
  );
};

export default MaskedInput;
