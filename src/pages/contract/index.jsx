import { Outlet } from "react-router-dom";

export const LayoutContract = () => {
  return (
    <div className="container">
      <div className="list-container">
      </div>

      <div className="client-container">
        <Outlet />
      </div>
    </div>
  );
};

export { default as RegisterContract } from "./Register";
