import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import { validationSchemaContract } from "../../../utils/validation";
import {
  Button,
  Input,
  Select,
  CheckboxPanel,
  MonetaryInput,
  MultiSelect,
} from "../../../components";
import { useContract } from "../../../contexts/ContractContext";

import "./styles.scss";
import "react-toastify/dist/ReactToastify.css";


const RegisterContract = ({ initialData = null, onSubmit: externalSubmit }) => {
  console.log("teste", initialData);

  const methods = useForm({
    resolver: yupResolver(validationSchemaContract),
    defaultValues: initialData || {},
  });

  const { handleSubmit, setValue, watch, reset } = methods;
  const { addContract, updateContract } = useContract();

  const installmentable = watch("installmentable");
  const typeExpire = watch("typeExpire");

  useEffect(() => {
    if (initialData) {
      methods.reset(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (installmentable === "aVista") {
      setValue("installments", undefined);
    }
  }, [installmentable, setValue]);

  let expireLabel = "Validade por ";
  let expirePlaceHolder = "";
  if (typeExpire === "porSecao") {
    expireLabel += "Seções";
    expirePlaceHolder += "Aulas";
  } else if (typeExpire === "porTempo") {
    expireLabel += "Tempo";
    expirePlaceHolder += "Meses";
  }

  const [classRoms, setClassRoms] = useState([]);
  useEffect(() => {
    const classRomsStorage = localStorage.getItem("turmas");
    if (classRomsStorage) {
      setClassRoms(JSON.parse(classRomsStorage));
    }
  }, []);

  const prepareData = (data) => {
    const parsedData = {
      ...data,
      status: data.status || undefined,
      template: data.template || undefined,
      installmentable: data.installmentable || undefined,
      installments: data.installments ? Number(data.installments) : undefined,
      totalValue: data.totalValue
        ? Number(
            String(data.totalValue)
              .replace("R$ ", "")
              .replace(/\./g, "")
              .replace(",", ".")
          )
        : undefined,
      expire: data.expire ? Number(data.expire) : undefined,
      classRoms: Array.isArray(data.classRoms)
        ? data.classRoms
        : data.classRoms
          ? [data.classRoms]
          : [],
      timeMin: data.timeMin || undefined,
      timeMax: data.timeMax || undefined,
      weekdays: Array.isArray(data.weekdays) ? data.weekdays : [],
    };
    return parsedData;
  };

const onSubmit = (data) => {
  const parsedData = prepareData(data);

  if (externalSubmit) {
    externalSubmit(parsedData);
    return;
  }

  if (initialData && initialData.id) {
    updateContract(initialData.id, parsedData);
    toast.success("Contrato atualizado!");
  } else {
    addContract(parsedData);
    toast.success("Contrato cadastrado!");
    reset();
  }
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
              {installmentable === "parcelavel" && (
                <Input
                  label="Nº de parcelas"
                  name="installments"
                  type="number"
                  min={0}
                />
              )}
              <MonetaryInput name="totalValue" label="Valor Total" required />
            </div>

            <div className="block">
              <h3>Vencimento</h3>
              <Select label="Tipo de Vencimento" name="typeExpire" required>
                <option value="">Selecione</option>
                <option value="porSecao">Por Seção</option>
                <option value="porTempo">Por Tempo</option>
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
              <MultiSelect
                name="classRoms"
                label="Turmas"
                options={classRoms}
              />
              <div className="side">
                <Input label="Horário" name="timeMin" type="time" />
                <span className="arrow-time">-</span>
                <Input label="." name="timeMax" type="time" />
              </div>
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

            <Button>{initialData ? "Atualizar" : "Salvar"}</Button>
          </form>
        </FormProvider>
        <ToastContainer position="top-right" autoClose={3000} />
      </main>
    </div>
  );
};

export default RegisterContract;
