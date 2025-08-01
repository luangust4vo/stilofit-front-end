import { useNavigate } from "react-router-dom";
import Table from "../../../components/Table/Table";
import { goRegistration, goEdit } from "../../../components/Table/Table";
import { GenericContextProvider } from "../../../contexts/GenericContext";
import { Button, LayoutMenu } from "../../../components";

import "./styles.scss";

function ClassTable() {
  const navigate = useNavigate();
  const routeName = "turma";

  return (
    <LayoutMenu>
      <GenericContextProvider lSName="turmas">
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
            "Turma",
            "Quantidade de Vagas",
            "Duração (minutos)",
            "Local da aula",
            "Observações",
            "Cor",
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
              <td style={{ textAlign: "center" }}>{element.turma ? element.turma : "-"}</td>
              <td>{element.vagas ? element.vagas : "-"}</td>
              <td>{element.tempo ? element.tempo : "-"}</td>
              <td>{element.local ? element.local : "-"}</td>
              <td>{element.observacoes ? element.observacoes : "-"}</td>
              <td>
                {element.cor ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: element.cor,
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                ) : (
                  "-"
                )}
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
    </LayoutMenu>
  );
}

export default ClassTable;
