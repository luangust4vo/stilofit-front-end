import { useNavigate } from "react-router-dom";
import Table from "../../../components/Table/Table.jsx";
import { goRegistration, goView, goEdit } from "../../../utils/navigation.jsx";
import { useGenericContext } from "../../../contexts/GenericContext.jsx";
import { useTableLogic } from "../../../hooks/useTableLogic.jsx";
import { Button, LayoutMenu } from "../../../components/index.jsx";

import "./style.scss";

function EmployeeTable() {
  const navigate = useNavigate();
  const routeName = "funcionario";
  const { storageObject } = useGenericContext();

  const { search, setSearch, elementsToDisplay } = useTableLogic(
    storageObject,
    "nome"
  );

  return (
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
  );
}

export default EmployeeTable;
