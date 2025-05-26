import React from "react";
import "./styles.scss";

const Button = ({ children, ...rest }) => {
  return (
    <button className="btn" {...rest}>
      {children}
    </button>
  );
};

export default Button;
