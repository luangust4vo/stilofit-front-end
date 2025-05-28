import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
//import InfoContract from "../Info";
import "./styles.scss";

const MyContext = createContext();

export const useContract = () => useContext(MyContext);

const ContractProvider = ({ children }) => {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("contratos");
    if (stored) setContracts(JSON.parse(stored));
  }, []);

  const saveToStorage = (updated) => {
    localStorage.setItem("contratos", JSON.stringify(updated));
    setContracts(updated);
  };

  const addContract = (contractData) => {
    const newContract = { ...contractData, id: crypto.randomUUID() };
    const updated = [...contracts, newContract];
    saveToStorage(updated);
    return newContract;
  };

  const updateContract = (id, updatedData) => {
    const updated = contracts.map((c) =>
      c.id === id ? { ...c, ...updatedData } : c
    );
    saveToStorage(updated);
  };

  const getContractById = (id) => {
    return contracts.find((c) => String(c.id) === String(id)) || null;
  };

  const contextValue = {
    contracts,
    addContract,
    updateContract,
    getContractById,
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

const ContractTable = ({ onContractSelect }) => {
  const { contracts, loadMoreContracts } = useContract();
  const [filteredContracts, setFilteredContracts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const limit = 30;
  /*const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);*/

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
    setFilteredContracts(result.slice(0, offset + limit));
  }, [search, contracts, offset]);

  useEffect(() => {
    const handleScroll = () => {
      const table = document.querySelector(".contract-table-container");
      if (!table) return;
      if (window.innerHeight + window.scrollY >= table.offsetHeight - 100) {
        if (filteredContracts.length < contracts.length) {
          handleLoadMore();
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filteredContracts, contracts]);

  const handleLoadMore = () => {
    setOffset((prev) => prev + limit);
  };

  const handleRowClick = (id) => {
    /*setSelectedId(id);
    setModalOpen(true);*/
  };

  /*const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedId(null);
  };*/

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
        <button className="btn-icon-table" onClick={goRegistration}>
          Criar Contrato
          <i className="bi-plus"></i>
        </button>
      </div>

      <table className="contract-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Valor Total</th>
            <th>Tipo Vencimento</th>
            <th>Vencimento</th>
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
              <td>
                {contract.expire}
                {contract.typeExpire === "por Seção"
                  ? " aulas"
                  : contract.typeExpire === "por Tempo"
                    ? " meses"
                    : ""}
              </td>
              <td>
                <button
                  className="btn-icon-edit"
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
      {/*modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <InfoContract id={selectedId} onClose={handleCloseModal} />
          </div>
        </div>
      )*/}
    </div>
  );
};

export default ContractTable;
