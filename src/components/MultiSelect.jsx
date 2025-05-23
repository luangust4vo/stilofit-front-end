import React from "react";
import { useFormContext } from "react-hook-form";

const MultiSelect = ({ name, label, options = [], required }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`form-group${errors[name] ? " has-error" : ""}`}>
      {label && (
        <label htmlFor={name}>
          {label}
          {required && <span className="required-asterisk">*</span>}
          {errors[name] && <span className="error-message"> {errors[name].message}</span>}
        </label>
      )}
      <select
        id={name}
        {...register(name)}
        multiple
        size={options.length > 6 ? 6 : options.length}
      >
        {options.map((opt) => (
          <option key={opt.nome} value={opt.nome}>
            {opt.nome}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MultiSelect;