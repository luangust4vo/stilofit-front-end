import Table from "./Table";
import GenericContextProvider from "./GenericContext";

function Example() {
  return (
    <GenericContextProvider lSName="contratos">
      <Table
        routeName="contratos"
        labels={["Nome", "Valor Total", "Tipo de Vencimento", "Vencimento"]}
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
