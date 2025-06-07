import Table from "../../../components/Table/Table";
import GenericContextProvider from "../../../contexts/GenericContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components";
import "./style.scss";


function CashTable() {
  const navigate = useNavigate();
  const routeName = "caixa";

  const calculateTotalCash = (cash) => {
    return cash.reduce((total, item) =>
      total+item.valor, 0);
  };

  const calculateCashBack = (cash) => {
    return cash.filter(item => item.tipo === "dinheiro")
    .reduce((total, item) => total + item.valor, 0);
  };

  const cashData = JSON.parse(localStorage.getItem("caixa")) || [];

  return (
    <GenericContextProvider lSName="caixa">
      <Table
        headerComponent={() => <Button>Voltar</Button>}
        headerCells={["Venda", "Tipo", "Data", "Hora", "Valor", ""]}
        getRowProps={({ element, setSelectedId }) => ({
          onClick: () => {
            setSelectedId(element.id);
          },
          style: { cursor: "pointer" },
        })}
      >
        {(element) => (
          <>
            <span>{element.venda}</span>
            <span>{element.tipo}</span>
            <span>{element.data}</span>
            <span>{element.hora}</span>
            <span>{element.valor}</span>
          </>
        )}
      </Table>
      <div className="cash-table-actions">
        <div className="cash-table-actions-info">
          <Button onClick= {()=> ("")}>Entrada</Button> {/* abre caixa de diálogo para input do valor extra */}
          <Button>Saida</Button>
        </div>
        <div className="cash-table-actions-info">
        <p>Valor Total do Caixa: R$ {calculateTotalCash(cashData).toFixed(2)}</p>
        <p>Troco disponível: R$ {calculateCashBack(cashData).toFixed(2)}</p>
        </div>
      </div>
    </GenericContextProvider>
  );
}

export default CashTable;