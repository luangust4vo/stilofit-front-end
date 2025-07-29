import "./styles.scss"

const UserDialogBox = ({ children, dialogClassName = "" }) => {
  return (
    <div className="menu-modal-overlay">
      <div className={`menu-modal ${dialogClassName}`}>
        <div className="menu-modal-fields">{children}</div>
      </div>
    </div>
  );
};

export default UserDialogBox;
