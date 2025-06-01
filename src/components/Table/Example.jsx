import { useNavigate } from "react-router-dom";
import Table from "./Table";
import { goRegistration, goView, goEdit } from "./Table";
import GenericContextProvider from "../../contexts/GenericContext";

// Informações de um objeto específico a serem exibidas
import InfoContract from "../../pages/contract/Info/index";

function Example() {
  const navigate = useNavigate();
  const routeName = "contrato";

  return (
    <GenericContextProvider lSName="contratos">
      <Table
        // Rotas para preencher as funções de registro e edição (ex: contratos | turmas | clientes)
        routeName={routeName}
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
            {/* Botão de adicionar registro */}
            <button
              className="btn-icon-table"
              onClick={() => goRegistration(navigate, routeName)}
            >
              Criar Contrato
              <i className="bi-plus"></i>
            </button>
          </>
        )}
        // Campos do cabeçalho (ex: Nome, Sobrenome, e-mail, status)
        headerCells={[
          "Nome",
          "Valor Total",
          "Tipo de Vencimento",
          "Vencimento",
          "",
        ]}
        // Comportamento para quando linha for clicada
        getRowProps={({ element, setSelectedId }) => ({
          onClick: () => {
            setSelectedId(element.id);
            // Se houver roteamento para visualizar em outra página
            //goView(navigate, routeName, element.id);
          },
          style: { cursor: "pointer" },
        })}
        // Visualizar linha/registro (ex: modal ou abrir nova página)
        visualize={
          ({selectedId, setSelectedId}) =>
            // exemplo para chamar modal
            selectedId !== null && (
              // modal (pode ser componentizado!)
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
        {/*Regras de exibição de células em uma linhas
        (esse molde serve para todas as linhas)
        São passados como 'children'*/}
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
              {/* Botão de editar */}
              <button
                className="btn-icon-edit"
                onClick={(e) => {
                  e.stopPropagation();
                  goEdit(navigate, routeName, element.id);
                }}
                title="Editar"
              >
                <i className="bi bi-pencil-fill"></i>
              </button>
            </td>
          </>
        )}
      </Table>
    </GenericContextProvider>
  );
}

export default Example;
