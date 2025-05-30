import Table from "./Table";
import GenericContextProvider from "../../contexts/GenericContext";
import { useNavigate } from "react-router-dom";

function Example() {
  const navigate = useNavigate();
  const routeName = "contrato";
  const registerLabel = "Criar Contrato";

  const goEdit = (id) => {
    navigate(`/${routeName}/${id}/editar`);
  };

  const goRegistration = () => {
    navigate(`/${routeName}/novo`);
  };

  return (
    <GenericContextProvider lSName="contratos">
      <Table
        headerCells={[
          "Nome",
          "Valor Total",
          "Tipo de Vencimento",
          "Vencimento",
          "",
        ]}
        headerComponent={({ search, setSearch, goRegistration }) => (
          <>
            <input
              className="field-search"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <i className="bi bi-funnel-fill"></i>
            <button className="btn-icon-table" onClick={goRegistration}>
              {registerLabel}
              <i className="bi-plus"></i>
            </button>
          </>
        )}
      >
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
      </Table>
    </GenericContextProvider>
  );
}

export default Example;
