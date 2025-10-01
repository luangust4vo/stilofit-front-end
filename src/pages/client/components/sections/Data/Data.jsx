import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../components";
import { goEdit } from "../../../../../utils/navigation.js";

import "./Data.scss";

const Data = ({ selectedClient }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="box-info">
        {selectedClient ? (
          <>
            <p>
              <strong>Nome:</strong> {selectedClient.name}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {selectedClient.email ? selectedClient.email : "-"}
            </p>
            <p>
              <strong>Telefone:</strong>{" "}
              {selectedClient.cellphone ? selectedClient.cellphone : "-"}
            </p>
            <p>
              <strong>Data de nascimento:</strong> {selectedClient.birthDate}
            </p>
            <p>
              <strong>CPF:</strong> {selectedClient.cpf}
            </p>
            <p>
              <strong>Endereço:</strong>
              {selectedClient &&
              [
                selectedClient.address,
                selectedClient.number,
                selectedClient.complement,
                selectedClient.district,
                selectedClient.city,
                selectedClient.state,
              ]
                .filter(Boolean)
                .join(", ").length > 0
                ? [
                    selectedClient.address,
                    selectedClient.number,
                    selectedClient.complement,
                    selectedClient.district,
                    selectedClient.city,
                    selectedClient.state,
                  ]
                    .filter(Boolean)
                    .join(", ")
                : " - "}
            </p>
          </>
        ) : (
          "Dados"
        )}
      </div>
      <div className="box-info">
        {selectedClient ? (
          <>
            <p>
              <strong>Contrato:</strong>{" "}
              {selectedClient.contrato ? selectedClient.contrato : "-"}
            </p>
          </>
        ) : (
          "Informações do contrato"
        )}
      </div>
      <div className="box-info">
        {selectedClient ? (
          <>
            <p>
              <strong>Observações:</strong>{" "}
              {selectedClient.additionalInfo
                ? selectedClient.additionalInfo
                : "-"}
            </p>
          </>
        ) : (
          "Campo de texto de observações"
        )}
      </div>

      <div className="edit">
        {selectedClient && (
          <Button
            onClick={() => goEdit(navigate, "cliente", selectedClient.id)}
          >
            Editar
          </Button>
        )}
      </div>
    </>
  );
};

export default Data;
