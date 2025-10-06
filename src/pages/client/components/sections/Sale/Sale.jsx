import ContractService from "../../../../../services/ContractService";
import SaleService from "../../../../../services/SaleService";
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import "./Sale.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ITEMS_PER_PAGE = 30;

const Sale = ({ clientId }) => {
  const contractService = new SaleService();
  const saleService = new SaleService();
  const [activeTab, setActiveTab] = useState("Contracts");
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [allEntitiesData, setAllEntitiesData] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const scrollRef = useRef(null);

  const serviceMap = useMemo(
    () => ({
      Contracts: contractService,
      Products: false,
      Services: false,
    }),
    []
  );

  const applyPagination = useCallback((pageToLoad, append, rawData) => {
    if (!rawData || rawData.length === 0) {
      setEntities([]);
      setHasMore(false);
      setIsLoading(false);
      return;
    }
    const start = pageToLoad * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const paginatedContent = rawData.slice(start, end);
    const newHasMore = end < rawData.length;
    if (append) {
      setEntities((prev) => [...prev, ...paginatedContent]);
    } else {
      setEntities(paginatedContent);
    }
    setHasMore(newHasMore);
    setPage(pageToLoad);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const fetchAndLoad = async () => {
      const service = serviceMap[activeTab];
      setIsLoading(true);
      setEntities([]);
      setSelectedEntity(null);
      setSearchTerm("");
      setPage(0);
      setHasMore(true);
      if (!service) {
        setAllEntitiesData([]);
        setIsLoading(false);
        return;
      }
      try {
        const dataGeneral = await service.findPaginated(2);
        console.log(dataGeneral.content);
        setAllEntitiesData(dataGeneral.content);
        applyPagination(0, false, dataGeneral.content);
      } catch (error) {
        console.error(`Erro ao carregar ${activeTab}:`, error);
        setAllEntitiesData([]);
        setEntities([]);
        setIsLoading(false);
      }
    };
    fetchAndLoad();
  }, [activeTab, serviceMap, applyPagination]);

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (!currentRef || isLoading || !hasMore || !serviceMap[activeTab]) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = currentRef;
      if (scrollHeight - scrollTop - clientHeight < 100) {
        if (!isLoading && hasMore) {
          setIsLoading(true);
          applyPagination(page + 1, true, allEntitiesData);
        }
      }
    };
    currentRef.addEventListener("scroll", handleScroll);
    return () => {
      currentRef.removeEventListener("scroll", handleScroll);
    };
  }, [
    isLoading,
    hasMore,
    page,
    applyPagination,
    allEntitiesData,
    activeTab,
    serviceMap,
  ]);

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
      toast.warn("Selecione um item para realizar a venda.");
      return;
    }
    const saleData = {
      clientId: clientId,
      contractsIds: [],
      totalAmount: selectedEntity.totalValue,
    };
    switch (activeTab) {
      case "Contracts":
        saleData.contractsIds.push(selectedEntity.id);
        break;
      default:
        console.warn(`Aba ativa desconhecida: ${activeTab}`);
        toast.error("Tipo de entidade não reconhecido para a venda.");
        return;
    }
    const payload = Object.fromEntries(
      Object.entries(saleData).map(([key, value]) => [
        key,
        value === "" ? null : value,
      ])
    );
    try {
      console.log(payload);
      await saleService.create(payload);
      setSelectedEntity(null);
      toast.success(
        `Venda de ${selectedEntity.name} realizada para o Cliente (ID): ${clientId}!`
      );
    } catch (error) {
      toast.error("Falha na venda. Verifique a conexão ou os dados.");
    }
  }, [selectedEntity, clientId, activeTab, saleService]);

  const TabButton = ({ tab, name }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`tab-button ${activeTab === tab ? "active" : ""}`}
    >
      {name}
    </button>
  );

  let emptyMessage;
  if (isLoading && entities.length === 0) {
    emptyMessage = (
      <div className="empty-message">Carregando {activeTab}...</div>
    );
  } else if (!serviceMap[activeTab]) {
    emptyMessage = (
      <div className="empty-message">A aba {activeTab} está desativada.</div>
    );
  } else if (searchTerm && filteredEntities.length === 0) {
    emptyMessage = (
      <div className="empty-message">
        Nenhum resultado encontrado para "{searchTerm}".
      </div>
    );
  } else if (entities.length === 0) {
    emptyMessage = (
      <div className="empty-message">
        Nenhum {activeTab.toLowerCase().slice(0, -1)} encontrado.
      </div>
    );
  }

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
          disabled={!serviceMap[activeTab]}
          className="search-input"
        />

        <div ref={scrollRef} className="entity-list-container">
          {filteredEntities.length === 0 && !isLoading ? (
            emptyMessage
          ) : (
            <>
              {filteredEntities.map((entity) => (
                <div
                  key={entity.id}
                  className={`entity-item 
                        ${
                          selectedEntity && selectedEntity.id === entity.id
                            ? "selected"
                            : ""
                        }`}
                  onClick={() => setSelectedEntity(entity)}
                >
                  <span>{entity.id}</span>
                  {/*<span>{entity.name}</span>
                  <span>R$ {entity.totalValue.toFixed(2).replace(".", ",")}</span>*/}
                </div>
              ))}
            </>
          )}
        </div>

        <div className="button-div">
          <button
            onClick={handleSell}
            disabled={!selectedEntity}
            className="sell-button"
          >
            Realizar Venda
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sale;
