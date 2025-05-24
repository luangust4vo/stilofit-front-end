import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./styles.scss";

const ListContract = ({ onContractSelect }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [contracts, setContracts] = React.useState([]);
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
    const storedContracts = JSON.parse(localStorage.getItem("contratos")) || [];
    const sortedContracts = storedContracts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    const nextContracts = sortedContracts.slice(offset, offset + limit);
    setContracts((prev) => {
      const ids = new Set(prev.map((c) => c.id));
      const newContracts = nextContracts.filter((c) => !ids.has(c.id));
      return [...prev, ...newContracts];
    });
  }, [offset]);

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
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (bottom) {
        setOffset((prev) => prev + limit);
      }
    };

    if (expanded) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
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
          {/* Escolher bootstrap icon */}
          <i className="bi-file-earmark-plus-fill"></i>
        </button>
      </div>

      {(search ? filteredContracts : contracts).map((contract) => (
        <div
          className="user"
          key={contract.id}
          onClick={() => handleContractClick(contract)}
        >
          {/* Escolher bootstrap icon */}
          <i className="bi bi-file-earmark-text-fill icon-user"></i>
          <span className="username">{contract.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ListContract;
