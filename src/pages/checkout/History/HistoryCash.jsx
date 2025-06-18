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
  const methods = useForm({
    defaultValues: {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    },
  });

  useEffect(() => {
    initializeStorageObject([]);
  }, [initializeStorageObject]);

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

  const filteredHistory = (storageObject || [])
    .filter((item) => {
      if (!item.dataAbertura) return false;
      const [day, month, year] = item.dataAbertura.split("/");
      return (
        parseInt(month) === monthSelected + 1 && parseInt(year) === yearSelected
      );
    })
    .sort((a, b) => {
      const dateA = new Date(a.dataAbertura.split("/").reverse().join("/"));
      const dateB = new Date(b.dataAbertura.split("/").reverse().join("/"));
      return dateB - dateA;
    });

  return (
    <>
      <FormProvider {...methods}>
        <form>
          <Table
            headerComponent={() => (
                <>
                <div className="left">
                <Button>Voltar</Button>
                </div>
                <div className="right">
                <Select id="select" name="mes" >
                  {months.map((month, index) => (
                    <option key={index} value={index}>
                      {month}
                    </option>
                  ))}
                </Select>
                <Select id="select" name="ano" >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Select>
                <Button>teste</Button>
               </div>
               </>
            )}
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
