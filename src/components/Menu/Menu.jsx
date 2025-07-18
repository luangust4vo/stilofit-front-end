import { useState } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

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

const Menu = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <nav className="menu">
      <ul className="menu-list">
        {menuOptions.map((option, idx) => (
          <li
            key={option.label}
            className="menu-item"
            onMouseEnter={() => setActiveIndex(idx)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <span className="menu-label">{option.label}</span>
            {activeIndex === idx && (
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
    </nav>
  );
};

export default Menu;
