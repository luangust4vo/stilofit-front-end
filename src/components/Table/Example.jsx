import Table from "./Table";
import GenericContextProvider from "../../contexts/GenericContext";

function Example() {
  return (
    <GenericContextProvider lSName="contratos">
      <Table
        routeName="contrato"
        headerCells={[
          "Nome",
          "Valor Total",
          "Tipo de Vencimento",
          "Vencimento",
        ]}
        registerLabel="Criar Contrato"
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
          </>
        )}
      </Table>
    </GenericContextProvider>
  );
}

export default Example;
