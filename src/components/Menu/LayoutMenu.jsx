import Menu from "./Menu";
import "./styles.scss";

const LayoutMenu = ({ children }) => (
  <>
    <Menu />
    <div className="with-menu">{children}</div>
  </>
);

export default LayoutMenu;
