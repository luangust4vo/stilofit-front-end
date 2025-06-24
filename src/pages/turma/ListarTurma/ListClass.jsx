import { useNavigate } from "react-router-dom";
import Table from "../../../components/Table/Table";
import { goRegistration, goEdit } from "../../../components/Table/Table";
import { GenericContextProvider } from "../../../contexts/GenericContext";
import InfoContract from "../infoClass";
import { Button } from "../../../components";

import "./ListClass.scss";

function ListClass() {
  const navigate = useNavigate();
  const routeName = "listclass";

  return (
    <GenericContextProvider lSName="listclass">
      <Table
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
                Criar Turma
                <i className="bi-plus"></i>
              </Button>
            </div>
          </>
        )}
        headerCells={[
          "Nome da Turma",
          "Modalidade",
          "Local",
          "Vagas",
          "Duração",
          "",
        ]}
        getRowProps={({ element, setSelectedId }) => ({
          onClick: () => {
            setSelectedId(element.id);
          },
          style: { cursor: "pointer" },
        })}
        visualize={({ selectedId, setSelectedId }) =>
          selectedId !== null && (
            <div className="modal-overlay">
              <div className="modal-content">
                <InfoContract
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
            <td>{element.name}</td>
            <td>
              {"R$ " + Number(element.totalValue).toFixed(2).replace(".", ",")}
            </td>
            <td>{element.installments ? element.installments : "-"}</td>
            <td>
              {element.installmentsValue
                ? "R$ " +
                  Number(element.installmentsValue).toFixed(2).replace(".", ",")
                : "-"}
            </td>
            <td>
              {element.expire}
              {element.typeExpire === "por Seção"
                ? " aulas"
                : element.typeExpire === "por Tempo"
                ? " meses"
                : ""}
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
    </GenericContextProvider>
  );
}

export default ListClass;
