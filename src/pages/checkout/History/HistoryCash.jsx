import Table from "../../../components/Table/Table";
import {
  useGenericContext,
  GenericContextProvider,
} from "../../../contexts/GenericContext";
import { Button,  MonetaryInput } from "../../../components";
import { useForm, FormProvider } from "react-hook-form";
import { useState, useEffect } from "react";
import { DialogBox } from "../../../components";
import { useNavigate } from "react-router-dom";

import "./style.scss";

function HistoryCash() {
  const [showInput, setShowInput] = useState(false);
  const [changeInitial, SetChangeInitial] = useState("");

  const methods = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    // Simula login apenas para testes
    if (!localStorage.getItem("funcionarioLogado")) {
      localStorage.setItem(
        "funcionarioLogado",
        JSON.stringify({ id: 1, nome: "Laryssa" })
      );
    }
  }, []);
  
  function openNewCash() {
    const employeeLoggedIn = JSON.parse(localStorage.getItem("funcionarioLogado"));
  
    if (!employeeLoggedIn || !employeeLoggedIn.id) {
      alert("Funcionário não logado!");
      return;
    }
  
  
    const now = new Date();
    const dataAbertura = now.toLocaleDateString(); 
    const horaAbertura = now.toLocaleTimeString();
  

    const newCash = {
      id: Date.now(),
      responsavelId: funcionarioLogado.id,
      responsavel: funcionarioLogado.nome,
      dataAbertura,
      horaAbertura,
      horaFechamento: null,
      status: "aberto",
      trocoInicial: parseFloat(changeInitial),
      movimentacoes: [],
    };
  
    let history = JSON.parse(localStorage.getItem("historicoCaixa")) || [];
    history.push(newCash);
    localStorage.setItem("historicoCaixa", JSON.stringify(history));
  
    alert("Caixa aberto com sucesso!");
    SetChangeInitial("");
    setShowInput(false);
  
    navigate("movimentacao");
  }
  
  return (
    <FormProvider {...methods}>
      <form>
        <Table
          headerComponent={() => (
            <>
              <div></div>
              <div className="dialog-trigger-wrapper">
                <Button type="button" onClick={() => setShowInput(true)}>
                  Abrir Caixa
                </Button>
                {showInput && (
                  <DialogBox
                    title="Abrir Novo Caixa"
                    methods={methods}
                    onConfirm={methods.handleSubmit(openNewCash)}
                    onCancel={() => setShowInput(false)}
                    dialogClassName="modal--history-cash"
                  >
                    <MonetaryInput
                      placeholder="Informe o troco inicial"
                      name="trocoInicial"
                      value={trocoInicial}
                      onChange={(e) => setTrocoInicial(e.target.value)}
                    ></MonetaryInput>
                  </DialogBox>
                )}
              </div>
            </>
          )}
          headerCells={[
            "Data",
            "Hora Abertura",
            "Hora Fechamento",
            "Responsável",
            "Status",
            "",
          ]}
        >
          {(element) => (
            <>
              <td>{element.dataAbertura}</td>
              <td>{element.horaAbertura}</td>
              <td>{element.horaFechamento || "-"}</td>
              <td>{element.responsavel}</td>
              <td>{element.status}</td>
              <td>
                <Button>Ver</Button>
              </td>
            </>
          )}
        </Table>
      </form>
    </FormProvider>
  );
}

export default function CashTableHistory() {
  return (
    <GenericContextProvider lSName="historicoCaixa">
      <HistoryCash />
    </GenericContextProvider>
  );
}
