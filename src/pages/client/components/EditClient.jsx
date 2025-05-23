import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Register from "../Register";
import { useClient } from "../../../contexts/ClientContext";

const EditClient = () => {
  const { id } = useParams();
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getClientById } = useClient();


  useEffect(() => {
    const found = getClientById(id);
    setClientData(found);
    setLoading(false);
  }, [id, getClientById]);

  if (loading) return <p>Carregando cliente...</p>;
  if (!clientData) return <p>Cliente não encontrado.</p>;

  return <Register initialData={clientData} />;
};

export default EditClient;
