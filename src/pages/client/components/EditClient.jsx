import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Register from "../Register";

const EditClient = () => {
  const { id } = useParams();
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const clients = JSON.parse(localStorage.getItem("clientes")) || [];
    const found = clients.find((c) => String(c.id) === id);
    setClientData(found);
    setLoading(false);
  }, [id]);

  if (loading) return <p>Carregando cliente...</p>;
  if (!clientData) return <p>Cliente não encontrado.</p>;

  return <Register initialData={clientData} />;
};

export default EditClient;
