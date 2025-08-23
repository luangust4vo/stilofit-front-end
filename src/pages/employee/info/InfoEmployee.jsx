import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../../components";
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

  useEffect(() => {
    const employees = JSON.parse(localStorage.getItem("funcionarios")) || [];
    const foundEmployee = employees.find((c) => String(c.id) === id);
    setSelectedEmployee(foundEmployee);
  }, [id]);

  return (
    <LayoutMenu>
      <div className="container-employee-info">
        <Button onClick={() => navigate("/funcionario")}>
          <i className="bi bi-arrow-left"></i>
          Voltar
        </Button>
        {selectedEmployee ? (
          <>
            <p>
              <strong>Nome:</strong> {" " + selectedEmployee.nome}
            </p>
            <p>
              <strong>Email:</strong> {" " + selectedEmployee.email}
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
              <strong>Registro Profissional:</strong>
              {" " + selectedEmployee.registroProfissional}
            </p>
            <p>
              <strong>Estado Civil:</strong>
              {selectedEmployee && selectedEmployee.estadoCivil
                ? " " + selectedEmployee.estadoCivil
                : " - "}
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
              <strong>Contato:</strong>
              {selectedEmployee && selectedEmployee.contato
                ? " " + formatContact(selectedEmployee.contato)
                : " - "}
            </p>
            <p>
              <strong>Endereço:</strong>
              {selectedEmployee && selectedEmployee.estadoCivil
                ? " " + selectedEmployee.endereco
                : " - "}
            </p>
            <p>
              <strong>Jornada:</strong>
              {selectedEmployee && selectedEmployee.jornada
                ? selectedEmployee.jornada.inicio +
                  " - " +
                  selectedEmployee.jornada.fim
                : " - "}
            </p>
          </>
        ) : (
          "Nenhuma Informação encontrada"
        )}
      </div>
    </LayoutMenu>
  );
};

export default InfoEmployee;
