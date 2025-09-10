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
import { useGenericContext } from "../../../contexts/GenericContext";
import { toast } from "react-toastify";

const predefinedPlaces = ["Sala 101", "Laboratório 2", "Auditório"];

const ClassModal = ({ onClose, onSuccess, id = null }) => {
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    storageObject,
    getStorageObjectById,
    addStorageObject,
    updateStorageObject,
  } = useGenericContext();

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

  const onSubmit = (data) => {
    try {
      if (id) {
        updateStorageObject(id, data);
        toast.success("Turma atualizada com sucesso!");
      } else {
        addStorageObject(data);
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
            <h1>{id ? "Editar Turma" : "Cadastro de Turma"}</h1>
            <Input
              name="turma"
              label="Nome da turma"
              required
              placeholder="Digite o nome da turma"
            />
            <div className="row">
              <Input
                name="vagas"
                type="number"
                label="Qtde. de vagas"
                required
                placeholder="Ex: 30"
              />
              <Input
                name="tempo"
                type="number"
                label="Duração (minutos)"
                required
                placeholder="Ex: 50"
              />
              <div className="select-place">
                <Select name="local" label="Local da aula" required>
                  <option value="">Selecione o local</option>
                  {predefinedPlaces.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <Textarea
              name="observacoes"
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
