import { LayoutMenu } from "../../components";
import ListClient from "./components/ListClient";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <LayoutMenu>
      <div className="container">
        <div className="list-container">
          <ListClient />
        </div>

        <div className="client-container">
          <Outlet />
        </div>
      </div>
    </LayoutMenu>
  );
};

export { default as Register } from "./Register";
export { default as Info } from "./Info";
