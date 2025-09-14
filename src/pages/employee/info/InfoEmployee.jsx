import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../../components";
import { useGenericContext } from "../../../contexts/GenericContext";
import { formatCPF, formatRG, formatContact } from "../../../utils/helpers.js";
import "./style.scss";

const InfoEmployee = () => {
  const { id } = useParams();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();
  const { getStorageObjectById } = useGenericContext();

  useEffect(() => {
    setSelectedEmployee(getStorageObjectById(id));
  }, [id, getStorageObjectById]);

  return (
    <div className="container-employee-info">
      <Button onClick={() => navigate("/funcionario")}>
        <i className="bi bi-arrow-left"></i>
        Voltar
      </Button>
      {selectedEmployee ? (
        <div className="info-grid">
          <div className="column-personal">
            <h2>Dados Pessoais</h2>
            <p>
              <strong>Nome:</strong> {" " + selectedEmployee.nome}
            </p>
            <p>
              <strong>Data de Nascimento:</strong>{" "}
              {selectedEmployee && selectedEmployee.dataNascimento
                ? " " + selectedEmployee.dataNascimento
                : " - "}
            </p>
            <p>
              <strong>Sexo:</strong>
              {" " + selectedEmployee.sexo}
            </p>
            <p>
              <strong>CPF:</strong>
              {" " + formatCPF(selectedEmployee.cpf)}
            </p>
            <p>
              <strong>RG:</strong>
              {selectedEmployee && selectedEmployee.rg
                ? " " + formatRG(selectedEmployee.rg)
                : " - "}
            </p>
            <p>
              <strong>Endereço:</strong>
              {selectedEmployee && selectedEmployee.endereco
                ? " " + selectedEmployee.endereco
                : " - "}
            </p>
            <p>
              <strong>Estado Civil:</strong>
              {selectedEmployee && selectedEmployee.estadoCivil
                ? " " + selectedEmployee.estadoCivil
                : " - "}
            </p>
          </div>

          <div className="column-professional">
            <h2>Dados Profissionais</h2>
            <p className="break-word-container">
              <strong>Email:</strong> {" " + selectedEmployee.email}
            </p>
            <p>
              <strong>Contato:</strong>
              {selectedEmployee && selectedEmployee.contato
                ? " " + formatContact(selectedEmployee.contato)
                : " - "}
            </p>
            <p>
              <strong>Registro Profissional:</strong>
              {" " + selectedEmployee.registroProfissional}
            </p>
            <p>
              <strong>Cargo:</strong>
              {" " + selectedEmployee.cargo}
            </p>
            <p>
              <strong>Status:</strong>
              {selectedEmployee && selectedEmployee.status
                ? " " + selectedEmployee.status
                : " - "}
            </p>
            <p>
              <strong>Dias da Semana: </strong>
              {selectedEmployee && selectedEmployee.dias
                ? selectedEmployee.dias
                : " - "}
            </p>
            <p>
              <strong>Turno: </strong>
              {selectedEmployee && selectedEmployee.turno
                ? selectedEmployee.turno
                : " - "}
            </p>
            <p>
              <strong>Jornada: </strong>
              {selectedEmployee && selectedEmployee.jornada
                ? selectedEmployee.jornada.inicio +
                  " - " +
                  selectedEmployee.jornada.fim
                : " - "}
            </p>
          </div>
        </div>
      ) : (
        "Nenhuma Informação encontrada"
      )}
    </div>
  );
};

export default InfoEmployee;
