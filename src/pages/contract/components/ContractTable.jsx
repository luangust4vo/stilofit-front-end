import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContract } from "../../../contexts/ContractContext";

import "./styles.scss";

const ListContract = ({ onContractSelect }) => {
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
    <div className="sidebar">
      <div className="top-bar">
        <div className="search-row">
          <input
            className="field-search"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="btn-icon">
          <i className="bi bi-funnel-fill"></i>
        </button>
        <button className="btn-icon" onClick={goRegistration}>
          <i className="bi-file-earmark-plus-fill"></i>
        </button>
      </div>

      <div className="scroller">
        {(search ? filteredContracts : contracts).map((contract) => (
          <div
            className="contract"
            key={contract.id}
            onClick={() => handleContractClick(contract)}
          >
            <i className="bi bi-file-earmark-text-fill icon-contract"></i>
            <span className="contractname">{contract.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListContract;
