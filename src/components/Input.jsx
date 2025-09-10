import { useFormContext } from "react-hook-form";
import classNames from "classnames";

import "./styles.scss";

const Input = ({ name, label, required, ...rest }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className={classNames("form-group", { "has-error": errors[name] })}>
      {label && (
        <label htmlFor={name}>
          {label}
          {required && <span className="required-asterisk">*</span>}
         
        </label>
      )}
      <input id={name} {...register(name)} {...rest} />
      {errors[name] && (
        <span className="error-message"> {errors[name].message}</span>
      )}
    </div>
  );
};

export default Input;
