import Table from "./Table";
import GenericContextProvider from "../../contexts/GenericContext";
import { useNavigate } from "react-router-dom";

function TableCRUD() {
  const navigate = useNavigate();

  // vão vir de parâmetros
  const routeName = "contrato";
  const registerLabel = "Criar Contrato";

  // fica
  const goEdit = (id) => {
    navigate(`/${routeName}/${id}/editar`);
  };

  // fica
  const goRegistration = () => {
    navigate(`/${routeName}/novo`);
  };

  return (
    <GenericContextProvider lSName="contratos">
      <Table
        // vai vir de parâmetro
        headerCells={[
          "Nome",
          "Valor Total",
          "Tipo de Vencimento",
          "Vencimento",
          "",
        ]}
        // vai vir de parâmetro
        headerComponent={({ search, setSearch }) => (
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
        // fica
        getRowProps={(element) => ({
          onClick: () => handleRowClick(element.id),
          style: { cursor: "pointer" },
        })}
      >
        {/*vai vir de parâmetro*/}
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

export default TableCRUD;
