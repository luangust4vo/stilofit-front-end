import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import { validationSchemaContract } from "../../utils/validation";
import {
  Button,
  Input,
  Select,
  CheckboxPanel,
  MonetaryInput,
} from "../../components";

import "./styles.scss";
import "react-toastify/dist/ReactToastify.css";

const RegisterContract = () => {
  const methods = useForm({
    // validationSchemaContract - atualizar
    resolver: yupResolver(validationSchemaContract),
  });

  const { handleSubmit, setValue, watch, reset } = methods;

  const installmentable = watch("installmentable");
  const typeExpire = watch("typeExpire");

  useEffect(() => {
    if (installmentable === "aVista") {
      setValue("installmentsValue", undefined);
      setValue("installments", undefined);
    }
  }, [installmentable, setValue]);

  let expireLabel = "Validade por ";
  let expirePlaceHolder = "";
  if (typeExpire === "porSecao") {
    expireLabel += "Seções";
    expirePlaceHolder += "aulas";
  } else if (typeExpire === "porTempo") {
    expireLabel += "Tempo";
    expirePlaceHolder += "meses";
  }

  let lock = installmentable === "aVista" || installmentable === "";

  const [turmas, setTurmas] = useState([]);
  useEffect(() => {
    const turmasStorage = localStorage.getItem("turmas");
    if (turmasStorage) {
      setTurmas(JSON.parse(turmasStorage));
    }
  }, []);

  const onSubmit = (data) => {
    const parsedData = {
      ...data,
      status: data.status || undefined,
      template: data.template || undefined,
      installmentable: data.installmentable || undefined,
      installments: data.installments ? Number(data.installments) : undefined,
      installmentsValue: data.installmentsValue
        ? Number(
            String(data.installmentsValue)
              .replace("R$ ", "")
              .replace(/\./g, "")
              .replace(",", ".")
          )
        : undefined,
      totalValue: data.totalValue
        ? Number(
            String(data.totalValue)
              .replace("R$ ", "")
              .replace(/\./g, "")
              .replace(",", ".")
          )
        : undefined,
      expire: data.expire ? Number(data.expire) : undefined,
      class: data.class || undefined,
      time: data.time || undefined,
      weekdays: data.weekdays || undefined,
    };
    console.log(parsedData);

    const contracts = JSON.parse(localStorage.getItem("contratos")) || [];
    const newContract = { ...parsedData, id: crypto.randomUUID() };
    localStorage.setItem(
      "contratos",
      JSON.stringify([...contracts, newContract])
    );
    toast.success("Contrato cadastrado!");
    reset();
  };

  return (
    <div className="container">
      <main className="form">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="block">
              <h3>Dados Gerais do Contrato</h3>
              <Input label="Nome do Contrato" name="name" required />
              <Select label="Status" name="status">
                <option value="">Selecione</option>
                <option value="disponivel">Disponível</option>
                <option value="naoDisponivel">Não Disponível</option>
              </Select>
              <Select label="Template" name="template">
                <option value="">Selecione</option>
                <option value="templateAzul">Template Azul</option>
                <option value="templateVerde">Template Verde</option>
                <option value="templateAmarelo">Template Amarelo</option>
              </Select>
            </div>

            <div className="block">
              <h3>Parcelamento</h3>
              <Select label="Parcelamento" name="installmentable">
                <option value="">Selecione</option>
                <option value="parcelavel">Parcelável</option>
                <option value="aVista">À vista</option>
              </Select>
              <Input
                label="Nº de parcelas"
                name="installments"
                type="number"
                min={0}
                disabled={lock}
              />
              <MonetaryInput
                name="installmentsValue"
                label="Valor da Parcela"
                disabled={lock}
              />
              <MonetaryInput name="totalValue" label="Valor Total" required />
            </div>

            <div className="block">
              <h3>Vencimento</h3>
              <Select label="Tipo de Vencimento" name="typeExpire" required>
                <option value="">Selecione</option>
                <option value="porSecao">por Seção</option>
                <option value="porTempo">por Tempo</option>
              </Select>
              <Input
                label={expireLabel}
                name="expire"
                type="number"
                min={0}
                placeholder={expirePlaceHolder}
                disabled={typeExpire === ""}
                required
              />
            </div>

            <div className="block">
              <h3>Turma</h3>
              <Select label="Turma" name="class">
                <option value="">Escolha a Turma</option>
                {turmas.map((turma) => (
                  <option key={turma.nome} value={turma.nome}>
                    {turma.nome} : {turma.vagas}
                  </option>
                ))}
              </Select>
              <Input label="Horário" name="time" type="time" />
              <CheckboxPanel
                name="weekdays"
                label="Dias da Semana"
                options={[
                  { value: "domingo", label: "Dom" },
                  { value: "segunda", label: "Seg" },
                  { value: "terca", label: "Ter" },
                  { value: "quarta", label: "Qua" },
                  { value: "quinta", label: "Qui" },
                  { value: "sexta", label: "Sex" },
                  { value: "sabado", label: "Sáb" },
                ]}
              />
            </div>

            <Button>Salvar</Button>
          </form>
        </FormProvider>
        <ToastContainer position="top-right" autoClose={3000} />
      </main>
    </div>
  );
};

export default RegisterContract;
