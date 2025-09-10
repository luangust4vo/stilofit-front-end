import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Register from ".";
import ClientService from "../../../services/ClientService";

const EditClient = () => {
  const { id } = useParams();
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const clientService = new ClientService();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const data = await clientService.findById(id);
        setClientData(data);
      } catch (error) {
        console.error("Erro ao buscar cliente:", error);
        setClientData(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchClient();
    }
  }, [id]);

  if (loading) return <p>Carregando cliente...</p>;
  if (!clientData) return <p>Cliente não encontrado.</p>;

  return <Register initialData={clientData} />;
};

export default EditClient;
