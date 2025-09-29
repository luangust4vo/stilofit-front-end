import ContractService from "../../../../../services/ContractService";

const Sale = ({ clientId }) => {
  const contractService = new ContractService();
  const [activeTab, setActiveTab] = useState("Contratos");
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const serviceMap = useMemo(
    () => ({
      Contracts: contractService,
      Products: contractService,
      Services: contractService,
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
        const data = await service.findAll();
        setEntities(data);
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

  return (
    <div className="sale-div">
      <div className="tabs-div">
        <TabButton tab="Contratos" />
        <TabButton tab="Produtos" />
        <TabButton tab="Serviços" />
      </div>
      <input
        type="text"
        placeholder={`Buscar ${activeTab} por nome...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="sale-input"
      />
      <div className="items-list">
        {isLoading ? (
          <div className="loading-div">Carregando {activeTab}...</div>
        ) : filteredEntities.length === 0 ? (
          <div className="empty-div">
            Nenhum {activeTab.toLowerCase().slice(0, -1)} encontrado.
          </div>
        ) : (
          filteredEntities.map((entity) => (
            <div
              key={entity.id}
              className={`item 
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
      <div className="item-info">
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
          className={`sale-button ${
            selectedEntity ? "button-obj-selected" : "button-obj-not-selected"
          }`}
        >
          Realizar Venda
        </button>
      </div>
    </div>
  );
};

export default Sale;
