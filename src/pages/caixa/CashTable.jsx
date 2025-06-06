import Table from "../../components/Table/Table";
import { goRegistration, goEdit } from "../../components/Table/Table";
import GenericContextProvider from "../../contexts/GenericContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import "./style.scss";


function CashTable() {
  const navigate = useNavigate();
  const routeName = "caixa";


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
            <span>{element.vena}</span>
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
          <p>Valor Total do Caixa</p>
          <p>Troco disponível</p>
        </div>
      </div>
    </GenericContextProvider>
  );
}

export default CashTable;
