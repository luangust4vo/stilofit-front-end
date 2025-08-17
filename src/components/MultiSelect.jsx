import Select from "react-select";
import { Controller, useFormContext } from "react-hook-form";

const MultiSelect = ({
  labelKey = "name",
  name,
  label,
  options = [],
  required,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const selectOptions = options.map((opt) => ({
    value: opt.id,
    label: opt[labelKey],
  }));

  return (
    <div className={`form-group${errors[name] ? " has-error" : ""}`}>
      {label && (
        <label htmlFor={name}>
          {label}
          {required && <span className="required-asterisk">*</span>}
          {errors[name] && (
            <span className="error-message"> {errors[name].message}</span>
          )}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <Select
            {...field}
            inputId={name}
            options={selectOptions}
            isMulti
            closeMenuOnSelect={false}
            placeholder="Selecione..."
            onChange={(selected) => {
              field.onChange(selected ? selected.map((opt) => opt.value) : []);
            }}
            value={selectOptions.filter((opt) =>
              (field.value || []).includes(opt.value)
            )}
          />
        )}
      />
    </div>
  );
};

export default MultiSelect;
