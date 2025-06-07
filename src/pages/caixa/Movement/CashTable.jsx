import Table from "../../../components/Table/Table";
import { useGenericContext } from "../../../contexts/GenericContext";
import GenericContextProvider from "../../../contexts/GenericContext";
import { useEffect } from "react";
import movement from "./MovementCash.json"; 
import { Button } from "../../../components";
import "./style.scss";

function CashTable() {
  
  const { storageObject, initializeStorageObject} = useGenericContext();

  useEffect(() => {
    initializeStorageObject(movement);
  }, [initializeStorageObject]);

  const calculateTotalCash = (cash) => {
    return cash.reduce((total, item) => total + item.valor, 0);
  };

  const calculateCashBack = (cash) => {
    return cash
      .filter((item) => item.tipo === "dinheiro")
      .reduce((total, item) => total + item.valor, 0);
  };

  const cash = storageObject || [];

  return (
    <>
      <Table
        headerComponent={() => <Button>Voltar</Button>}
        headerCells={["Venda", "Tipo", "Data", "Hora", "Valor", ""]}
        getRowProps={({ element, setSelectedId }) => ({
          onClick: () => setSelectedId(element.id),
          style: { cursor: "pointer" },
        })}
      >
        {(element) => (
          <>
            <td>{element.venda}</td>
            <td>{element.tipo}</td>
            <td>{element.data}</td>
            <td>{element.hora}</td>
            <td>{element.valor.toFixed(2)}</td>
            <td></td>
          </>
        )}
      </Table>

      <div className="cash-table-actions">
        <div className="cash-table-actions-info">
          <Button onClick= {()=> ("")}>Entrada</Button> {/* abre caixa de diálogo para input do valor extra */}
          <Button>Saida</Button>
        </div>

        <div className="cash-table-summary">
          <p>Valor Total do Caixa: R$ {calculateTotalCash(cash).toFixed(2)}</p>
          <p>Troco disponível: R$ {calculateCashBack(cash).toFixed(2)}</p>
        </div>
      </div>
    </>
  );
}

export default function CashTableWrapper() {
  return (
    <GenericContextProvider lSName="caixa">
      <CashTable />
    </GenericContextProvider>
  );
}
