import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../../components";
import { useGenericContext } from "../../../contexts/GenericContext";
import { LayoutMenu } from "../../../components/index.jsx";
import "./style.scss";

function formatCPF(cpf) {
  const cpfNumbers = cpf.replace(/\D/g, "");
  return cpfNumbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function formatRG(rg) {
  const rgNumbers = rg.replace(/\D/g, "");
  return rgNumbers.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");
}

function formatContact(contact) {
  const contactNumbers = contact.replace(/\D/g, "");
  return contactNumbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1)$2-$3");
}

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
            <h2>Pessoal</h2>
            <p>
              <strong>Nome:</strong> {" " + selectedEmployee.nome}
            </p>
            <p>
              <strong>Data de Nascimento:</strong>{" "}
              {selectedEmployee && selectedEmployee.dataNascimento
                ? new Intl.DateTimeFormat("pt-BR").format(
                    new Date(selectedEmployee.dataNascimento)
                  )
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
              {selectedEmployee && selectedEmployee.estadoCivil
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
            <h2>Profissional</h2>
            <p>
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
