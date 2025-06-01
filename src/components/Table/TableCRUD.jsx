import Table from "./Table";
import GenericContextProvider from "../../contexts/GenericContext";
import { useNavigate } from "react-router-dom";

export const goRegistration = (navigate, routeName) => {
  navigate(`/${routeName}/novo`);
};

export const goView = (navigate, routeName, id) => {
  navigate(`/${routeName}/${id}`);
};

export const goEdit = (navigate, routeName, id) => {
  navigate(`/${routeName}/${id}/editar`);
};

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

  const handleRowClick = (id) => {
    setSelectedId(id);
  };

  return (
    <Table
      // vai vir de parâmetro
      headerCells={headerCells}
      // vai vir de parâmetro
      headerComponent={headerComponent}
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
      {typeof children === "function" ? children({element}) : children}
    </Table>
  );
}

export default TableCRUD;
