import { useNavigate } from "react-router-dom";
import Table from "../../../components/Table/Table";
import { goRegistration, goEdit } from "../../../utils/navigation.js";
import { useGenericContext } from "../../../contexts/GenericContext.jsx";
import { useTableLogic } from "../../../hooks/useTableLogic.jsx";
import InfoContract from "../Info/index";
import { Button } from "../../../components";

import "./styles.scss";

function ContractTable() {
  const navigate = useNavigate();
  const routeName = "contrato";
  const { storageObject } = useGenericContext();

  const { search, setSearch, elementsToDisplay } = useTableLogic(
    storageObject,
    "name"
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
                Criar Contrato
                <i className="bi-plus"></i>
              </Button>
            </div>
          </>
        )}
        headerCells={[
          "Nome",
          "Valor Total",
          "Parcelas",
          "Valor da Parcela",
          "Vencimento",
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
            <div className="center-modal-overlay">
              <div className="center-modal-content">
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
  );
}

export default ContractTable;
