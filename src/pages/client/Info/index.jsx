import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../../components";
import "./infoClient.scss";
import ClientService from "../../../services/ClientService";

const Info = () => {
  const { id } = useParams();
  const [selectedClient, setSelectedClient] = useState(null);
  const navigate = useNavigate();
  const clientService = new ClientService;

  const goEdit = () => {
    navigate(`/cliente/${id}/editar`);
  };

    useEffect(() => {
    const fetchClient = async () => {
      try {
        const clients = await clientService.findById(id);
        setSelectedClient(clients);
      } catch (error) {
        console.error("Erro ao buscar cliente:", error);
        setSelectedClient(null);
      }
    };

    if (id) {
      fetchClient();
    }
  }, [id]);

  return (
    <div className="container">
      <div className="client-container">
        <div className="client-side">
          {selectedClient?.photo ? (
            <img src={selectedClient.photo} alt="Foto" className="photo-user" />
          ) : (
            <i className="bi bi-person-fill photo-user"></i>
          )}

          <p className="client-name">
            {selectedClient ? selectedClient.name : "Nome"}
          </p>
          <Button>Anexos</Button>
        </div>

        <div className="client-content">
          <div className="tabs">
            <Button>Status</Button>
            <Button>Dados</Button>
            <Button>Venda</Button>
            <Button>Pagamento</Button>
            <Button>Contrato</Button>
            <Button>Turma</Button>
            <Button>Treino</Button>
            <Button>Avaliação</Button>
          </div>

          <div className="box-info">
            {selectedClient ? (
              <>
                <p>
                  <strong>Nome:</strong> {selectedClient.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedClient.email}
                </p>
                <p>
                  <strong>Telefone:</strong> {selectedClient.cellphone}
                </p>
                <p>
                  <strong>Data de nascimento:</strong>{" "}
                  {selectedClient.birthDate}
                </p>
                <p>
                  <strong>CPF:</strong> {selectedClient.cpf}
                </p>
                <p>
                  <strong>Endereço:</strong> {selectedClient.address}
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
                  <strong>Contrato:</strong> {selectedClient.contrato}
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
                  <strong>Observações:</strong> {selectedClient.additionalInfo}
                </p>
              </>
            ) : (
              "Campo de texto de observações"
            )}
          </div>

          <div className="edit">
            <Button onClick={goEdit}>Editar</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
