import { useNavigate } from "react-router-dom";
import Table from "../../../components/Table/Table.jsx";
import { goRegistration, goEdit } from "../../../components/Table/Table.jsx";
import { GenericContextProvider } from "../../../contexts/GenericContext.jsx";
import InfoEmployee from "../info/InfoEmployee.jsx";
import { Button, LayoutMenu } from "../../../components/index.jsx";

import "./style.scss";

function EmployeeTable() {
  const navigate = useNavigate();
  const routeName = "funcionario";

  return (
    <LayoutMenu>
      <GenericContextProvider lSName="funcionarios">
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
                  Criar Contrato
                  <i className="bi-plus"></i>
                </Button>
              </div>
            </>
          )}
          /*
          Nome
          email
          senha
          data nascimento
          sexo
          cpf
          rg
          registro profissional
          estado civil
          cargo
          status (Ativo, cancelado)
          Contato
          Endereço
          Jornada (Se trabalha de manhã, tarde ou noite e em que hora)
          */
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
              <td>{element.carto}</td>
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
      </GenericContextProvider>
    </LayoutMenu>
  );
}

export default EmployeeTable;
