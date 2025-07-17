import { useFormContext } from "react-hook-form";
import classNames from "classnames";

import "./styles.scss";

const LoginInput = ({ name, label, ...rest }) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const value = watch(name);

  return (
    <div className={classNames("form-group", { "has-error": errors[name] })}>
      {value && (
        <label htmlFor={name} className="floating-label">
          {label}
        </label>
      )}
      <input
        id={name}
        {...register(name)}
        value={value || ""}
        placeholder={label}
        aria-label={label}
        {...rest}
        className="input-login"
      />
      {errors[name] && (
        <span className="error-message"> {errors[name].message}</span>
      )}
    </div>
  );
};

export default LoginInput;
