import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContract } from "../../../contexts/ContractContext";
import InfoContract from "../Info";

import "./styles.scss";

const ContractTable = ({ onContractSelect }) => {
  const { contracts, loadMoreContracts } = useContract();
  const [filteredContracts, setFilteredContracts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  //const [offset, setOffset] = useState(0);
  //const limit = 30;
  //const [expanded, setExpanded] = React.useState(false);

  const handleRowClick = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedId(null);
  };

  const goRegistration = () => {
    navigate("/contrato/novo");
  };

  const goEdit = (id) => {
    navigate(`/contrato/${id}/editar`);
  };

  useEffect(() => {
    let result = [...contracts];
    if (search.trim() !== "") {
      result = result.filter((contract) =>
        contract.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    result.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    setFilteredContracts(result);
  }, [search, contracts]);

  /*const changeExpanded = () => {
    setExpanded(!expanded);
  };*/

  /*const handleContractClick = (contract) => {
    if (onContractSelect) onContractSelect(contract);
    navigate(`/contrato/${contract.id}`);
  };*/

  /*useEffect(() => {
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
  }, [expanded]);*/

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
        <i className="bi bi-funnel-fill"></i>
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredContracts.map((contract) => (
            <tr
              key={contract.id}
              onClick={() => handleRowClick(contract.id)}
              style={{ cursor: "pointer" }}
            >
              <td>{contract.name}</td>
              <td>
                {"R$ " +
                  Number(contract.totalValue).toFixed(2).replace(".", ",")}
              </td>
              <td>{contract.typeExpire}</td>
              <td>{contract.expire}</td>
              <td>
                <button
                  className="btn-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    goEdit(contract.id);
                  }}
                  title="Editar"
                >
                  <i className="bi bi-pencil-fill"></i>
                </button>
              </td>
            </tr>
          ))}
          {filteredContracts.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                Nenhum contrato encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <InfoContract id={selectedId} onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractTable;
