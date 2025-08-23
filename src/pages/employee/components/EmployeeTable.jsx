import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Table from "../../../components/Table/Table.jsx";
import {
  goRegistration,
  goEdit,
  goView,
} from "../../../components/Table/Table.jsx";
import { useGenericContext } from "../../../contexts/GenericContext.jsx";
import { Button, LayoutMenu } from "../../../components/index.jsx";

import "./style.scss";

const limit = 30;

function EmployeeTable() {
  const navigate = useNavigate();
  const routeName = "funcionario";
  const { storageObject } = useGenericContext();

  const [filteredAndSortedElements, setFilteredAndSortedElements] = useState([]);
  const [elementsToDisplay, setElementsToDisplay] = useState([]);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let result = [...storageObject];
    if (search.trim() !== "") {
      result = result.filter((employee) =>
        (employee.nome || "").toLowerCase().includes(search.toLowerCase())
      );
    }
    result.sort((a, b) => {
      const nomeA = (a.nome || "").toLowerCase();
      const nomeB = (b.nome || "").toLowerCase();
      return nomeA.localeCompare(nomeB, "pt-BR");
    });

    setFilteredAndSortedElements(result);
    setOffset(0);
  }, [search, storageObject]);

  useEffect(() => {
    const nextBatch = filteredAndSortedElements.slice(0, offset + limit);
    setElementsToDisplay(nextBatch);
  }, [filteredAndSortedElements, offset]);

  const handleLoadMore = useCallback(() => {
    setOffset((prev) => prev + limit);
  }, [setOffset]);

  useEffect(() => {
    const handleScroll = () => {
      const table = document.querySelector(".table-container");
      if (!table) return;

      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = table.offsetHeight - 100;

      if (scrollPosition >= threshold) {
        if (elementsToDisplay.length < filteredAndSortedElements.length) {
          handleLoadMore();
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleLoadMore, elementsToDisplay.length, filteredAndSortedElements.length]);

  return (
    <LayoutMenu>
      <Table
        data={elementsToDisplay}
        headerComponent={() => (
          <>
            <div className="header-left"></div>
            <div className="header-right">
              <input
                className="field-search"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <i className="bi bi-funnel-fill"></i>
              <Button
                className="btn-icon-table"
                onClick={() => goRegistration(navigate, routeName)}
              >
                Cadastrar Funcionário
                <i className="bi-plus"></i>
              </Button>
            </div>
          </>
        )}
        headerCells={["Nome", "Cargo", "Status", "Jornada", ""]}
        getRowProps={({ element }) => ({
          onClick: () => {
            goView(navigate, routeName, element.id);
          },
          style: { cursor: "pointer" },
        })}
      >
        {(element) => (
          <>
            <td>{element.nome}</td>
            <td>{element.cargo}</td>
            <td>{element.status}</td>
            <td>
              {element && element.jornada
                ? element.jornada.inicio + " - " + element.jornada.fim
                : " - "}
            </td>
            <td className="buttons">
              <Button
                className="btn-icon-edit"
                onClick={(e) => {
                  e.stopPropagation();
                  goEdit(navigate, routeName, element.id);
                }}
                title="Editar"
              >
                <i className="bi bi-pencil-fill bi-cell"></i>
              </Button>
            </td>
          </>
        )}
      </Table>
    </LayoutMenu>
  );
}

export default EmployeeTable;
