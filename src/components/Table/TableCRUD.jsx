import Table from "./Table";
import GenericContextProvider from "../../contexts/GenericContext";
import { useNavigate } from "react-router-dom";

function TableCRUD({
  headerComponent,
  headerCells,
  getRowProps,
  visualize,
  children,
  routeName,
}) {
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const goEdit = (id) => {
    navigate(`/${routeName}/${id}/editar`);
  };

  const goRegistration = () => {
    navigate(`/${routeName}/novo`);
  };

  const handleRowClick = (id) => {
    setSelectedId(id);
  };

  return (
    <Table
      // vai vir de parâmetro
      headerCells={headerCells}
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
      visualize={
        typeof visualize === "function"
          ? visualize({ selectedId, setSelectedId })
          : visualize
      }
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
  );
}

export default TableCRUD;
