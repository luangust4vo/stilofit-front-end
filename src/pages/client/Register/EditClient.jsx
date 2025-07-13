import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Register from ".";
import { useGenericContext } from "../../../contexts/GenericContext";

const EditClient = () => {
  const { id } = useParams();
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getStorageObjectById } = useGenericContext();

  useEffect(() => {
    const found = getStorageObjectById(id);
    setClientData(found);
    setLoading(false);
  }, [id, getStorageObjectById]);

  if (loading) return <p>Carregando cliente...</p>;
  if (!clientData) return <p>Cliente não encontrado.</p>;

  return <Register initialData={clientData} />;
};

export default EditClient;
