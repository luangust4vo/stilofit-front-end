import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContract } from "../../../contexts/ContractContext";

import "./styles.scss";

const ContractTable = ({ onContractSelect }) => {
  const [expanded, setExpanded] = React.useState(false);
  const { contracts, loadMoreContracts } = useContract();
  const [filteredContracts, setFilteredContracts] = useState([]);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const limit = 30;
  const navigate = useNavigate();

  const handleContractClick = (contract) => {
    if (onContractSelect) onContractSelect(contract);
    navigate(`/contrato/${contract.id}`);
  };

  const goRegistration = () => {
    navigate("../contrato");
  };

  const changeExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredContracts(contracts);
    } else {
      const result = contracts.filter((contract) =>
        contract.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredContracts(result);
    }
  }, [search, contracts]);

  useEffect(() => {
    const scroller = document.querySelector(".scroller");
    if (!scroller) return;
    const handleScroll = () => {
      const isBottom =
        scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight;
      if (isBottom) {
        setOffset((prev) => prev + limit);
      }
    };
    scroller.addEventListener("scroll", handleScroll);
    return () => scroller.removeEventListener("scroll", handleScroll);
  }, [expanded]);

  const handleLoadMore = () => {
    setOffset((prev) => prev + limit);
  };

  return (
    <div className="contract-table-container">
      <div className="table-header">
        <input
          className="field-search"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn-icon">
          <i className="bi bi-funnel-fill"></i>
        </button>
        <button className="btn-icon" onClick={goRegistration}>
          <i className="bi-file-earmark-plus-fill"></i>
        </button>
      </div>

      <table className="contract-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Valor Total</th>
            <th>Tipo Vencimento</th>
            <th>Total de sessões/meses</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default ContractTable;
