// src/contexts/ContractContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const ContractContext = createContext();

export const useContract = () => useContext(ContractContext);

export const ContractProvider = ({ children }) => {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("contratos");
    if (stored) setContracts(JSON.parse(stored));
  }, []);

  const saveToStorage = (updated) => {
    localStorage.setItem("contratos", JSON.stringify(updated));
    setContracts(updated);
  };

  const addContract = (contractData) => {
    const newContract = { ...contractData, id: crypto.randomUUID() };
    const updated = [...contracts, newContract];
    saveToStorage(updated);
    return newContract;
  };

  const updateContract = (id, updatedData) => {
    const updated = contracts.map((c) => (c.id === id ? { ...c, ...updatedData } : c));
    saveToStorage(updated);
  };

  const getContractById = (id) => {
    return contracts.find((c) => String(c.id) === String(id)) || null;
  };

  const contextValue = {
    contracts,
    addContract,
    updateContract,
    getContractById,
  };

  return (
    <ContractContext.Provider value={contextValue}>
      {children}
    </ContractContext.Provider>
  );
};
