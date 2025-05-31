import { useState, useEffect } from "react";
import { useGenericContext } from "../../contexts/GenericContext";
//import InfoContract from "../Info";
import "./styles.scss";

function Table ({ headerComponent, headerCells, getRowProps, visualize, children }) {
  const { storageObject } = useGenericContext();
  const [filteredElements, setfilteredElements] = useState([]);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const limit = 30;

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

  return (
    <div className="table-container">
      <div className="table-header">
        {typeof headerComponent === "function"
          ? headerComponent({ search, setSearch })
          : headerComponent}
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
            <tr key={element.id} {...(getRowProps ? getRowProps(element) : {})}>
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
    </div>
  );
};

export default Table;
