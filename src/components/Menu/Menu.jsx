import { useState, useEffect } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/x_com_fundo.png";
import UserDialogBox from "./UserDialogBox.jsx";

const menuOptions = [
  {
    label: "Recepção",
    submenu: [
      { label: "Cliente", to: "/cliente" },
      { label: "Caixa", to: "/caixa" },
      { label: "Turma", to: "/turma" },
      { label: "Aniversariante", to: "/aniversariante" },
    ],
  },
  {
    label: "Gestão",
    submenu: [
      { label: "Funcionário", to: "/funcionario" },
      { label: "Contrato", to: "/contrato" },
      { label: "Promoção", to: "/promocao" },
      { label: "Produto", to: "/produto" },
      { label: "Serviço", to: "/servico" },
      { label: "Catraca", to: "/catraca" },
    ],
  },
  {
    label: "Atividade Física",
    submenu: [
      { label: "Ficha de Treino", to: "/ficha-de-treino" },
      { label: "Avaliação", to: "/avaliacao" },
    ],
  },
  {
    label: "Relatório",
    submenu: [
      { label: "Clientes Ausentes", to: "/clientes-ausentes" },
      { label: "Dashboard Financeiro", to: "/dashboard-financeiro" },
    ],
  },
];

const userSubmenu = [
  { label: "Dados", to: "/dados" },
  { label: "Sair", to: "" },
];

const Menu = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    const handleClickOutside = () => setActiveMenu(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleMenuClick = (e) => {
    e.stopPropagation();
  };

  const handleUserDialogClick = (e) => {
    e.stopPropagation();
  };

  const [worker, setWorker] = useState({});
  useEffect(() => {
    const workerStorage = sessionStorage.getItem("funcionario-logado");
    if (workerStorage) {
      setWorker(JSON.parse(workerStorage));
    }
  }, []);

  return (
    <nav className="menu" onClick={handleMenuClick}>
      <div className="menu-content">
        <div className="menu-left">
          <Link to={"/"}>
            <img src={logo} alt="Logo" className="logo-menu" />
          </Link>
        </div>
        <ul className="menu-list">
          {menuOptions.map((option, idx) => (
            <li
              key={option.label}
              className={`menu-item${activeMenu === idx ? " active" : ""}`}
              onClick={() => setActiveMenu(activeMenu === idx ? null : idx)}
            >
              <span className="menu-label">{option.label}</span>
              {activeMenu === idx && (
                <ul className="submenu">
                  {option.submenu.map((sub) => (
                    <li key={sub.label} className="submenu-item">
                      <Link to={sub.to}>{sub.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div className="menu-right">
          {worker.photo ? (
            <img
              className="photo-user"
              src={worker.photo}
              alt="foto"
              onClick={() =>
                setActiveMenu(activeMenu === "user" ? null : "user")
              }
            />
          ) : (
            <i
              className="bi bi-person-fill photo-user"
              onClick={() =>
                setActiveMenu(activeMenu === "user" ? null : "user")
              }
            ></i>
          )}
          {activeMenu === "user" && (
            <UserDialogBox>
              <div onClick={handleUserDialogClick}>
                <ul className="submenu user-submenu">
                  {userSubmenu.map((sub) => (
                    <li key={sub.label} className="submenu-item">
                      <Link to={sub.to}>{sub.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </UserDialogBox>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Menu;
