import Table from "../../../components/Table/Table";
import {GenericContextProvider } from "../../../contexts/GenericContext";
import { Button } from "../../../components";

function HistoryCash() {

  return (
    <>
      <Table
        headerComponent={() => <Button>Voltar</Button>}
        headerCells={[
          "Abertura",
          "Hora Abertura",
          "Fechamento",
          "Hora Fechamento",
          "Responsável",
        ]}
      >
        {(element) => (
          <>
            <td>{element.dataAbertura}</td>
            <td>{element.horaAbertura}</td>
            <td>{element.dataFechamento || "-"}</td>
            <td>{element.horaFechamento || "-"}</td>
            <td>{element.responsavel}</td>
          </>
        )}
      </Table>
    </>
  );
}

export default function CashTableHistory() {
    return (
      <GenericContextProvider lSName="historicoCaixa">
        <HistoryCash />
      </GenericContextProvider>
    );
}