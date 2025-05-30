import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGenericContext } from "../../contexts/GenericContext";
//import InfoContract from "../Info";
import "./styles.scss";

const Table = ({ routeName, headerCells, registerLabel, children }) => {
  const { storageObject } = useGenericContext();
  const [filteredElements, setfilteredElements] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const limit = 30;
  /*const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);*/

  const goRegistration = () => {
    navigate(`/${routeName}/novo`);
  };

  useEffect(() => {
    let result = [...storageObject];
    if (search.trim() !== "") {
      result = result.filter((element) =>
        element.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    result.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    setfilteredElements(result.slice(0, offset + limit));
  }, [search, storageObject, offset]);

  useEffect(() => {
    const handleScroll = () => {
      const table = document.querySelector(".table-container");
      if (!table) return;
      if (window.innerHeight + window.scrollY >= table.offsetHeight - 100) {
        if (filteredElements.length < storageObject.length) {
          handleLoadMore();
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filteredElements, storageObject]);

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
    <div className="table-container">
      <div className="table-header">
        <input
          className="field-search"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <i className="bi bi-funnel-fill"></i>
        <button className="btn-icon-table" onClick={goRegistration}>
          {registerLabel}
          <i className="bi-plus"></i>
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            {headerCells.map((hC, idx) => (
              <th key={idx}>{hC}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredElements.map((element) => (
            <tr
              key={element.id}
              onClick={() => handleRowClick(element.id)}
              style={{ cursor: "pointer" }}
            >
              {typeof children === "function" ? children(element) : children}
            </tr>
          ))}
          {filteredElements.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                Nenhum elemento encontrado.
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

export default Table;
