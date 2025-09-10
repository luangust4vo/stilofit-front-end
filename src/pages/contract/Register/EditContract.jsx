import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RegisterContract from ".";
import { useGenericContext } from "../../../contexts/GenericContext";

const EditContract = () => {
  const { id } = useParams();
  const [contractData, setContractData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { storageObject, getStorageObjectById } = useGenericContext();

  useEffect(() => {
    if (storageObject.length === 0) {
      return;
    }
    const found = getStorageObjectById(id);
    setContractData(found);
    setLoading(false);
  }, [id, getStorageObjectById, storageObject]);

  if (loading) return <p>Carregando contrato...</p>;
  if (!contractData) return <p>Contrato não encontrado.</p>;

  return <RegisterContract initialData={contractData} />;
};

export default EditContract;
