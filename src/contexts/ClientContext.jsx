// src/contexts/ClientContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const ClientContext = createContext();

export const useClient = () => useContext(ClientContext);

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("clientes");
    if (stored) setClients(JSON.parse(stored));
  }, []);

  const saveToStorage = (updated) => {
    localStorage.setItem("clientes", JSON.stringify(updated));
    setClients(updated);
  };

  const addClient = (clientData) => {
    const newClient = { ...clientData, id: crypto.randomUUID() };
    const updated = [...clients, newClient];
    saveToStorage(updated);
    return newClient;
  };

  const updateClient = (id, updatedData) => {
    const updated = clients.map((c) => (c.id === id ? { ...c, ...updatedData } : c));
    saveToStorage(updated);
  };

  const getClientById = (id) => {
    return clients.find((c) => String(c.id) === String(id)) || null;
  };

  const contextValue = {
    clients,
    addClient,
    updateClient,
    getClientById,
  };

  return (
    <ClientContext.Provider value={contextValue}>
      {children}
    </ClientContext.Provider>
  );
};
