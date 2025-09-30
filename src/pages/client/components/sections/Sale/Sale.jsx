import ContractService from "../../../../../services/ContractService";
import SaleService from "../../../../../services/SaleService";
import { useState, useMemo, useEffect, useCallback } from "react";
import "./Sale.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/************** retirar antes da PR ************/
const contractsmock = {
  data: {
    content: [
      {
        id: 1,
        name: "Contrato Premium Anual",
        type: "Contratos",
        price: 1200.0,
      },
      {
        id: 2,
        name: "Plano Trimestral Básico",
        type: "Contratos",
        price: 300.0,
      },
      { id: 3, name: "Mensalidade Flex", type: "Contratos", price: 120.0 },
      {
        id: 4,
        name: "Contrato Familiar Gold",
        type: "Contratos",
        price: 2500.0,
      },
    ],
  },
};
/**************************************************/

const Sale = ({ clientId }) => {
  const contractService = new ContractService();
  const saleService = new SaleService();
  const [activeTab, setActiveTab] = useState("Contracts");
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const serviceMap = useMemo(
    () => ({
      Contracts: contractService,
      Products: false,
      Services: false,
    }),
    []
  );

  useEffect(() => {
    const loadEntities = async () => {
      const service = serviceMap[activeTab];
      if (!service) return;

      setIsLoading(true);
      setEntities([]);
      setSelectedEntity(null);
      setSearchTerm("");

      try {
        //const data = await service.findAll(); // +
        const data = contractsmock; //////////////// x
        setEntities(data.data.content);
      } catch (error) {
        console.error(`Erro ao carregar ${activeTab}:`, error);
        setEntities([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadEntities();
  }, [activeTab, serviceMap]);

  const filteredEntities = useMemo(() => {
    if (!searchTerm) {
      return entities;
    }
    const lowerCaseSearch = searchTerm.toLowerCase();
    return entities.filter((entity) =>
      entity.name.toLowerCase().includes(lowerCaseSearch)
    );
  }, [entities, searchTerm]);

  const handleSell = useCallback(async () => {
    if (!selectedEntity) {
      alert("Selecione um item para realizar a venda.");
      return;
    }

    const saleData = {
      clientId: clientId,
      contractsIDs: [],
      productsIDs: [],
      servicesIDs: [],
      price: selectedEntity.price,
    };

    switch (selectedEntity.type) {
      case "Contratos":
        saleData.contractsIDs.push(selectedEntity.id);
        break;
      case "Produtos":
        saleData.productsIDs.push(selectedEntity.id);
        break;
      case "Serviços":
        saleData.servicesIDs.push(selectedEntity.id);
        break;
      default:
        console.warn(`Tipo de entidade desconhecido: ${selectedEntity.type}`);
    }

    const payload = Object.fromEntries(
      Object.entries(saleData).map(([key, value]) => [
        key,
        value === "" ? null : value,
      ])
    );

    try {
      await saleService.create(payload);
      setSelectedEntity(null);
      toast.success(
        `Venda de ${selectedEntity.name} realizada para o Cliente (ID): ${clientId}!`
      );
    } catch (error) {
      toast.error("Falha na venda. Verifique a conexão ou os dados.");
    }
  }, [selectedEntity, clientId]);

  const TabButton = ({ tab, name }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`tab-button ${
        activeTab === tab ? "active-tab" : "inative-tab"
      }`}
    >
      {name}
    </button>
  );

  return (
    <div className="sale-container">
      <div className="tab-bar">
        <TabButton tab="Contracts" name="Contratos" />
        <TabButton tab="Products" name="Produtos" />
        <TabButton tab="Services" name="Serviços" />
      </div>
      <div className="sale-content">
        <input
          type="text"
          placeholder={`Buscar ${activeTab} por nome...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="entity-list-container">
          {isLoading ? (
            <div className="loading-message">Carregando {activeTab}...</div>
          ) : filteredEntities.length === 0 ? (
            <div className="empty-message">
              Nenhum {activeTab.toLowerCase().slice(0, -1)} encontrado.
            </div>
          ) : (
            filteredEntities.map((entity) => (
              <div
                key={entity.id}
                className={`entity-item 
                  ${
                    selectedEntity && selectedEntity.id === entity.id
                      ? "item-obj-selected"
                      : "item-obj-not-selected"
                  }`}
                onClick={() => setSelectedEntity(entity)}
              >
                <span>{entity.name}</span>
                <span>R$ {entity.price.toFixed(2).replace(".", ",")}</span>
              </div>
            ))
          )}
        </div>
        <div className="selected-info">
          {selectedEntity ? (
            <p>
              {selectedEntity.name} ({selectedEntity.type}) - R${" "}
              {selectedEntity.price.toFixed(2).replace(".", ",")}
            </p>
          ) : (
            <p>
              Selecione um {activeTab.toLowerCase().slice(0, -1)} na lista acima
              para realizar a venda.
            </p>
          )}
        </div>
        <div className="button-div">
          <button
            onClick={handleSell}
            disabled={!selectedEntity}
            className={`sell-button ${
              selectedEntity ? "button-obj-selected" : "button-obj-not-selected"
            }`}
          >
            Realizar Venda
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sale;
