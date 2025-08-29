import { useState } from "react";
import "./styles.scss";

export const goRegistration = (navigate, routeName) => {
  navigate(`/${routeName}/novo`);
};

export const goView = (navigate, routeName, id) => {
  navigate(`/${routeName}/${id}`);
};

export const goEdit = (navigate, routeName, id) => {
  navigate(`/${routeName}/${id}/editar`);
};

function Table({
  headerComponent,
  headerCells,
  getRowProps,
  visualize,
  children,
  data,
}) {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="table-container">
      <div className="table-header">
        {typeof headerComponent === "function"
          ? headerComponent({})
          : headerComponent}
      </div>
      <table className="table">
        <thead>
          <tr>
            {headerCells.map((hC, idx) => (
              <th key={idx}>{hC}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((element) => (
              <tr
                key={element.id}
                {...(getRowProps
                  ? getRowProps({ element, selectedId, setSelectedId })
                  : {})}
              >
                {typeof children === "function" ? children(element) : children}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headerCells.length} style={{ textAlign: "center" }}>
                Nenhum elemento encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {typeof visualize === "function"
        ? visualize({ selectedId, setSelectedId })
        : visualize}
    </div>
  );
}

export default Table;
