import Menu from "./Menu";

const LayoutMenu = ({ children }) => (
  <>
    <Menu />
    <div className="with-menu">
      {children}
    </div>
  </>
);

export default LayoutMenu;