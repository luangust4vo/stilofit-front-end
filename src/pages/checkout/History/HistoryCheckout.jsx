import Table from "../../../components/Table/Table";
import {
  useGenericContext,
  GenericContextProvider,
} from "../../../contexts/GenericContext";
import { Button, MonetaryInput } from "../../../components";
import { useForm, FormProvider } from "react-hook-form";
import { useState, useEffect } from "react";
import { DialogBox, Select } from "../../../components";
import { useNavigate } from "react-router-dom";

import "./style.scss";

function HistoryCheckout() {
  const [showInput, setShowInput] = useState(false);
  const { initializeStorageObject } = useGenericContext();
  const [storageObject, setStorageObject] = useState([]);
  const [monthSelected, setMonthSelected] = useState(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState(new Date().getFullYear());

  const methods = useForm({
    defaultValues: {
      initialChange: "",
    },
  });

  const navigate = useNavigate();

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );
  
  useEffect(() => {
    const fullHistory =
      JSON.parse(localStorage.getItem("historicoCaixa")) || [];
    initializeStorageObject(fullHistory);
  }, [initializeStorageObject]);

  useEffect(() => {
    const fullHistory =
      JSON.parse(localStorage.getItem("historicoCaixa")) || [];
  
    const normalizeDate = (dateString) => {
      const [day, month, year] = dateString.split("/");
      return {
        day: parseInt(day),
        month: parseInt(month),
        year: parseInt(year),
      };
    };
  
    const filtered = fullHistory
      .filter((item) => {
        if (!item.dataAbertura) return false;
        const { month, year } = normalizeDate(item.dataAbertura);
        return month === monthSelected && year === yearSelected;
      })
      .sort((a, b) => {
        const dateA = normalizeDate(a.dataAbertura);
        const dateB = normalizeDate(b.dataAbertura);
        return new Date(dateB.year, dateB.month - 1, dateB.day) -
               new Date(dateA.year, dateA.month - 1, dateA.day);
      });
  
    console.log("Dados filtrados e ordenados:", filtered);
    initializeStorageObject(filtered);
  }, [monthSelected, yearSelected, initializeStorageObject]);
  
  useEffect(() => {
    if (!localStorage.getItem("funcionarioLogado")) {
      localStorage.setItem(
        "funcionarioLogado",
        JSON.stringify({ id: 1, nome: "Laryssa" })
      );
    }
  }, []);

  function parseBrazilianCurrency(value) {
    if (!value) return 0;
    let cleaned = value.replace(/[^\d,.-]/g, "");
    cleaned = cleaned.replace(",", ".");
    const number = parseFloat(cleaned);
    return isNaN(number) ? 0 : number;
  }

  function handleOpenNewCash(data) {
    const loggedEmployee = JSON.parse(
      localStorage.getItem("funcionarioLogado")
    );

    if (!loggedEmployee || !loggedEmployee.id) {
      alert("Funcionário não logado!");
      return;
    }

    const now = new Date();
    const openDate = now.toLocaleDateString();
    const openTime = now.toLocaleTimeString();
    const id = Date.now();
    const initialCash = parseBrazilianCurrency(data.initialChange);

    const newCashRegister = {
      id,
      responsavelId: loggedEmployee.id,
      responsavel: loggedEmployee.nome,
      dataAbertura: openDate,
      horaAbertura: openTime,
      horaFechamento: null,
      status: "aberto",
      trocoInicial: initialCash,
      movimentacoes: [],
    };

    const history = JSON.parse(localStorage.getItem("historicoCaixa")) || [];
    const existingOpenCash = history.some((item) => item.status === "Aberto");
    if (existingOpenCash) {
      alert(
        "Já existe um caixa aberto. Feche o caixa atual antes de abrir um novo."
      );
      return;
    }
    history.push(newCashRegister);
    localStorage.setItem("historicoCaixa", JSON.stringify(history));

    localStorage.setItem(
      `movimentacao-${id}`,
      JSON.stringify([
        {
          venda: "Abertura",
          tipo: "dinheiro",
          movement: "Entrada",
          data: openDate,
          hora: openTime,
          valor: initialCash,
        },
      ])
    );

    alert("Caixa aberto com sucesso!");
    setShowInput(false);
    methods.reset();
    navigate(`movimentacao/${id}`);
  }

  return (
    <FormProvider {...methods}>
      <form>
        <Table
          headerComponent={() => (
            <>
              <div></div>
              <div className="dialog-trigger-wrapper">
                <Select
                  id="select"
                  name="mes"
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    console.log("Mês selecionado:", value); // Adicione um log para verificar
                    setMonthSelected(value);
                  }}
                  value={monthSelected}
                >
                  {months.map((month, index) => (
                    <option key={index} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </Select>
                <Select
                  id="select"
                  name="ano"
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    console.log("Ano selecionado:", value); // Adicione um log para verificar
                    setYearSelected(value);
                  }}
                  value={yearSelected}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Select>
                <Button type="button" onClick={() => setShowInput(true)}>
                  Abrir Caixa
                </Button>
                {showInput && (
                  <DialogBox
                    title="Abrir Novo Caixa"
                    methods={methods}
                    onConfirm={methods.handleSubmit(handleOpenNewCash)}
                    onCancel={() => setShowInput(false)}
                    dialogClassName="modal--history-cash"
                  >
                    <MonetaryInput
                      placeholder="Informe o troco inicial"
                      name="initialChange"
                    />
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
          {(element) => {
            console.log("Elemento renderizado:", element); // Verifique os elementos renderizados
            return (
              <>
                <td>{element.dataAbertura}</td>
                <td>{element.horaAbertura}</td>
                <td>{element.horaFechamento || "-"}</td>
                <td>{element.responsavel}</td>
                <td>{element.status}</td>
                <td>
                  <Button
                    onClick={() => navigate(`movimentacao/${element.id}`)}
                  >
                    Ver
                  </Button>
                </td>
              </>
            );
          }}
        </Table>
      </form>
    </FormProvider>
  );
}

export default function CheckoutTableHistory() {
  return (
    <GenericContextProvider lSName="historicoCaixa">
      <HistoryCheckout />
    </GenericContextProvider>
  );
}
