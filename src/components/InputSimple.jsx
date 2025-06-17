import { useFormContext } from "react-hook-form";
import classNames from "classnames";

import "./styles.scss";

const InputSimple = ({ name, label, required, ...rest }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={classNames("form-group", { "has-error": errors[name] })}>
      <input id={name} {...register(name)} {...rest} />
      <label htmlFor={name}>
        {errors[name] && (
          <span className="error-message"> {errors[name].message}</span>
        )}
      </label>
    </div>
  );
};

export default InputSimple;
