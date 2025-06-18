import Table from "../../../components/Table/Table";
import {
  useGenericContext,
  GenericContextProvider,
} from "../../../contexts/GenericContext";
import { Button, Select, Input } from "../../../components";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import "./style.scss";

function HistoryCash() {
  const { storageObject, initializeStorageObject } = useGenericContext();
  const [monthSelected, setMonthSelected] = useState(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState(new Date().getFullYear());

  const methods = useForm();

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

    const filtered = fullHistory
      .filter((item) => {
        if (!item.dataAbertura) return false;
        const [day, month, year] = item.dataAbertura.split("/");
        return (
          parseInt(month) === monthSelected && parseInt(year) === yearSelected
        );
      })
      .sort((a, b) => {
        const dateA = new Date(a.dataAbertura.split("/").reverse().join("/"));
        const dateB = new Date(b.dataAbertura.split("/").reverse().join("/"));
        return dateB - dateA;
      });

    initializeStorageObject(filtered);
  }, [monthSelected, yearSelected, initializeStorageObject]);

  function openNewCash(responsavel) {
    const history = JSON.parse(localStorage.getItem("historicoCaixa")) || [];
    const existingOpenCash = history.some((item) => item.status === "Aberto");
    if (existingOpenCash) {
      alert(
        "Já existe um caixa aberto. Feche o caixa atual antes de abrir um novo."
      );
      return;
    }
  

  const now = new Date();
  const dataAbertura = now.toLocaleDateString("pt-BR");
  const horaAbertura = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const newCash = {
    dataAbertura,
    horaAbertura,
    responsavel,
    status: "Aberto",
  };

  history.push(newCash);
  localStorage.setItem("historicoCaixa", JSON.stringify(history));
  alert("Caixa aberto com sucesso!");
}

  return (
    <>
      <FormProvider {...methods}>
        <form>
          <Table
            headerComponent={() => (
              <>
                {/* <div className="left">
                <Button>Voltar</Button>
                </div> */}
                <div></div>
                <div className="right">
                  <Select
                    id="select"
                    name="mes"
                    onChange={(e) => setMonthSelected(Number(e.target.value))}
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
                    onChange={(e) => setYearSelected(Number(e.target.value))}
                    value={yearSelected}
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </Select>
                  <Button onClick={() => openNewCash("Laryssa")}>teste</Button>
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
                <td>{element.horaFechamento}</td>
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
