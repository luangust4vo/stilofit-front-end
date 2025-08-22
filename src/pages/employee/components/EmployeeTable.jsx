import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Table from "../../../components/Table/Table.jsx";
import { goRegistration, goEdit } from "../../../components/Table/Table.jsx";
import { useGenericContext } from "../../../contexts/GenericContext.jsx";
import InfoEmployee from "../info/InfoEmployee.jsx";
import { Button, LayoutMenu } from "../../../components/index.jsx";

import "./style.scss";

function EmployeeTable() {
  const navigate = useNavigate();
  const routeName = "funcionario";
  const { storageObject } = useGenericContext();

  const [filteredElements, setFilteredElements] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let result = [...storageObject];
    if (search.trim() !== "") {
      result = result.filter((employee) =>
        (employee.nome || "").toLowerCase().includes(search.toLowerCase())
      );
    }
    result.sort((a, b) => {
      const nomeA = a.nome ? a.nome.toLowerCase() : "";
      const nomeB = b.nome ? b.nome.toLowerCase() : "";
      return nomeA.localeCompare(nomeB);
    });
    setFilteredElements(result);
  }, [search, storageObject]);

  return (
    <LayoutMenu>
      <Table
        data={filteredElements}
        headerComponent={({ search, setSearch }) => (
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
        getRowProps={({ element, setSelectedId }) => ({
          onClick: () => {
            setSelectedId(element.id);
          },
          style: { cursor: "pointer" },
        })}
        visualize={({ selectedId, setSelectedId }) =>
          selectedId !== null && (
            <div className="center-modal-overlay">
              <div className="center-modal-content">
                <InfoEmployee
                  id={selectedId}
                  onClose={() => setSelectedId(null)}
                />
              </div>
            </div>
          )
        }
      >
        {(element) => (
          <>
            <td>{element.nome}</td>
            <td>{element.cargo}</td>
            <td>{element.status}</td>
            <td>{element.jornada}</td>
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
