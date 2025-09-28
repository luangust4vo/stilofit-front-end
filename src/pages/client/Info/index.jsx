import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../../components";
import "./infoClient.scss";
import ClientService from "../../../services/ClientService";
import Data from "../components/sections/Data/Data.jsx";

const TABS_CONFIG = {
  Status: () => <div>- Status -</div>,
  Dados: Data,
  Venda: () => <div>- Venda -</div>,
  Pagamento: () => <div>- Pagamento -</div>,
  Contrato: () => <div>- Contrato -</div>,
  Turma: () => <div>- Turma -</div>,
  Treino: () => <div>- Treino -</div>,
  Avaliação: () => <div>- Avaliação -</div>,
};

const Info = () => {
  const { id } = useParams();
  const [selectedClient, setSelectedClient] = useState(null);
  const [activeTab, setActiveTab] = useState("Dados");
  const clientService = new ClientService();

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

  const renderContent = () => {
    const ComponentToRender = TABS_CONFIG[activeTab];
    if (ComponentToRender) {
      return <ComponentToRender selectedClient={selectedClient} />;
    }
    return <div>Selecione uma aba.</div>;
  };

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
            {Object.keys(TABS_CONFIG).map((tabName) => (
              <Button
                key={tabName}
                className={activeTab === tabName ? "active" : ""}
                onClick={() => setActiveTab(tabName)}
              >
                {tabName}
              </Button>
            ))}
          </div>

          <div className="tab-content">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Info;
