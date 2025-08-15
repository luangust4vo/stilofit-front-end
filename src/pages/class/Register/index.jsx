import { useEffect, useState } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./styles.scss";
import { classValidationSchema } from "../../../schemas/classSchema";
import {
  ColorPicker,
  Input,
  Select,
  Textarea,
  Button,
} from "../../../components";
import {
  GenericContextProvider,
  useGenericContext,
} from "../../../contexts/GenericContext";
import { toast } from "react-toastify";

const locaisPredefinidos = ["Sala 101", "Laboratório 2", "Auditório"];

const ClassModal = ({ onClose, onSuccess, id = null }) => {
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { storageObject, getStorageObjectById, saveToStorage } =
    useGenericContext();

  useEffect(() => {
    if (id) {
      const found = getStorageObjectById(id);
      if (found) {
        setClassData(found);
      }
    }
    setLoading(false);
  }, [id, getStorageObjectById, storageObject]);

  const defaultValues = classData
    ? classData
    : {
        turma: "",
        vagas: "",
        tempo: "",
        local: "",
        observacoes: "",
        cor: "#000000",
      };

  const methods = useForm({
    resolver: yupResolver(classValidationSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (classData) {
      reset(classData);
    }
  }, [classData, reset]);

  const localSelecionado = useWatch({
    name: "local",
    control: methods.control,
  });

  const onSubmit = (data) => {
    const turmaASalvar = {
      id: Date.now(),
      turma: data.turma,
      vagas: data.vagas,
      tempo: `${data.tempo}`,
      local: data.local,
      observacoes: data.observacoes,
      cor: data.cor,
    };

    try {
      let turmasSalvas = [...storageObject];
      if (id) {
        const updatedTurmas = turmasSalvas.map((turma) =>
          String(turma.id) === String(id)
            ? { ...turma, ...turmaASalvar }
            : turma
        );
        saveToStorage(updatedTurmas);
        toast.success("Turma atualizada com sucesso!");
      } else {
        const newObj = { ...turmaASalvar, id: Date.now() };
        const updatedTurmas = [...turmasSalvas, newObj];
        saveToStorage(updatedTurmas); // Usa a função do contexto para salvar
        toast.success("Turma cadastrada com sucesso!");
      }

      onSuccess();
      onClose();
    } catch (e) {
      console.error("Erro ao salvar turma:", e);
    }
  };

  if (loading) return <p>Carregando turma...</p>;
  if (id && !classData) return <p>Turma não encontrada.</p>;

  return (
    <div className="class-modal-overlay">
      <div className="modal-content form-class">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Cadastro de Turma</h1>
            <Input
              name="turma"
              id="turma"
              label="Nome da turma"
              required
              placeholder="Digite o nome da turma"
            />
            <div className="row">
              <Input
                name="vagas"
                id="vagas"
                type="number"
                label="Quantidade de vagas"
                required
                placeholder="Ex: 30"
              />
              <Input
                name="tempo"
                id="tempo"
                type="number"
                label="Duração (minutos)"
                required
                placeholder="Ex: 50"
              />
              <Select name="local" id="local" label="Local da aula" required>
                <option value="">Selecione o local</option>
                {locaisPredefinidos.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </Select>
            </div>
            <Textarea
              name="observacoes"
              id="observacoes"
              label="Observações"
              placeholder="Caso necessário"
            />
            <ColorPicker name="cor" label="Selecione uma cor:" />
            <div className="modal-actions">
              <Button type="button" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">
                {id ? "Salvar Alterações" : "Cadastrar Turma"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default (props) => <ClassModal {...props} />;
