import Table from "../../../components/Table/Table";
import {useGenericContext, GenericContextProvider } from "../../../contexts/GenericContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import movementCash from "./MovementCash.json";
import MovementType from "./MovementType";
import { Button, MonetaryInput, DialogBox } from "../../../components";
import "./style.scss";

function CashTable() {
  const [modalOpen, setModalOpen] = useState(false);
  const [typeMovement, setTypeMovement] = useState("dinheiro");
  const [value, setValue] = useState("");
  const methods = useForm();
  const { storageObject, initializeStorageObject, addStorageObject } =
    useGenericContext();

  useEffect(() => {
    initializeStorageObject(movementCash);
  }, [initializeStorageObject]);

  const calculateTotalCash = (cash) => {
    return cash.reduce((total, item) => {
      return total + (item.movement === "Saida" ? -item.valor : item.valor);
    }, 0);
  };

  const calculateCashBack = (cash) => {
    return cash
      .filter((item) => item.tipo === MovementType.DINHEIRO)
      .reduce((total, item) => {
        return total + (item.movement === "Saida" ? -item.valor : item.valor);
      }, 0);
  };
  

  const cash = storageObject || [];

  const handleAddMovement = () => {
    const sanitizedValue = value.replace(/[^\d,]/g, "").replace(",", ".");
    const parsedValue = parseFloat(sanitizedValue);
    if (isNaN(parsedValue) || parsedValue <= 0) return alert("Valor inválido.");

    const newMovement = {
      venda: modalOpen,
      tipo: typeMovement,
      movement: modalOpen,
      data: new Date().toLocaleDateString("pt-BR"),
      hora: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      valor: parsedValue,
    };

    addStorageObject(newMovement);
    setModalOpen(false);
    setValue("");
  };

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
            <td>{new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(element.valor)}</td>
            <td></td>
          </>
        )}
      </Table>

      <div className="cash-table-actions">
        <div className="cash-table-actions-info">
          <div style={{ position: "relative" }}>
            <Button
              onClick={() => {
                setTypeMovement(MovementType.DINHEIRO);
                setModalOpen("Entrada");
              }}
            >
              Entrada
            </Button>
            {modalOpen === "Entrada" && (
              <DialogBox
                title="Adicionar Entrada"
                onConfirm={handleAddMovement}
                onCancel={() => setModalOpen(false)}
                methods={methods}
              >
                <MonetaryInput
                  placeholder="valor"
                  name="valor"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </DialogBox>
            )}
          </div>

          <div style={{ position: "relative" }}>
            <Button
              onClick={() => {
                setTypeMovement(MovementType.DINHEIRO);
                setModalOpen("Saida");
              }}
            >
              Saída
            </Button>
            {modalOpen === "Saida" && (
              <DialogBox
                title="Adicionar Saida"
                onConfirm={handleAddMovement}
                onCancel={() => setModalOpen(false)}
                methods={methods}
              >
                <MonetaryInput
                  placeholder="valor"
                  name="valor"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </DialogBox>
            )}
          </div>
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
