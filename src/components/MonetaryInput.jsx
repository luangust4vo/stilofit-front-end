import { Controller, useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import Input from "./Input";

const MonetaryInput = ({
  name,
  label,
  disabled,
  required,
  ...rest
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <NumericFormat
          {...field}
          customInput={Input}
          label={label}
          placeholder="R$ "
          prefix="R$ "
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={2}
          fixedDecimalScale
          allowLeadingZeros={false}
          allowNegative={false}
          disabled={disabled}
          required={required}
          onValueChange={(values) => {
            field.onChange(values.value);
          }}
          value={field.value || ""}
          {...rest}
        />
      )}
    />
  );
};

export default MonetaryInput;