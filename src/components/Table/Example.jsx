import TableCRUD from "./TableCRUD";
import GenericContextProvider from "../../contexts/GenericContext";
import { useNavigate } from "react-router-dom";

// Informações de um objeto específico a serem exibidas
import InfoContract from "../../pages/contract/Info/index";

function Example() {
  // Caso haja navegação
  const navigate = useNavigate();

  return (
    <GenericContextProvider lSName="contratos">
      <TableCRUD
        // Rotas para preencher as funções de registro e edição (ex: contratos | turmas | clientes)
        routeName={"contratos"}
        // Campos do cabeçalho (ex: Nome, Sobrenome, e-mail, status)
        headerCells={[
          "Nome",
          "Valor Total",
          "Tipo de Vencimento",
          "Vencimento",
          "",
        ]}
        // Elementos do painel do cabeçalho (ex: filtro, adicionar elemento)
        headerComponent={({ search, setSearch }) => (
          <>
            {/* Entrada de busca */}
            <input
              className="field-search"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* Botão do funil */}
            <i className="bi bi-funnel-fill"></i>
            <button className="btn-icon-table" onClick={goRegistration}>
              Criar Contrato
              <i className="bi-plus"></i>
            </button>
          </>
        )}
        // Visualizar linha/registro (ex: modal ou abrir nova página)
        visualize={(selectedId, setSelectedId) =>
          selectedId !== null && (
            <div className="modal-overlay">
              <div className="modal-content">
                <InfoContract id={selectedId} onClose={setSelectedId(null)} />
              </div>
            </div>
          )
        }
      >
        {/*Regras de exibição de células em uma linhas (esse molde serve para todas as linhas)*/}
        {(element) => (
          <>
            <td>{element.name}</td>
            <td>
              {"R$ " + Number(element.totalValue).toFixed(2).replace(".", ",")}
            </td>
            <td>{element.typeExpire}</td>
            <td>
              {element.expire}
              {element.typeExpire === "por Seção"
                ? " aulas"
                : element.typeExpire === "por Tempo"
                ? " meses"
                : ""}
            </td>
            <td>
              <button
                className="btn-icon-edit"
                onClick={(e) => {
                  e.stopPropagation();
                  goEdit(element.id);
                }}
                title="Editar"
              >
                <i className="bi bi-pencil-fill"></i>
              </button>
            </td>
          </>
        )}
      </TableCRUD>
    </GenericContextProvider>
  );
}

export default Example;
