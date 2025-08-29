import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Registeremployee from ".";
import { useGenericContext } from "../../../contexts/GenericContext";

const EditEmployee = () => {
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { storageObject, getStorageObjectById } = useGenericContext();

  useEffect(() => {
    if (storageObject.length === 0) {
      return;
    }
    const found = getStorageObjectById(id);
    setEmployeeData(found);
    setLoading(false);
  }, [id, getStorageObjectById, storageObject]);

  if (loading) return <p>Carregando funcionário...</p>;
  if (!employeeData) return <p>Funcionário não encontrado.</p>;

  return <Registeremployee initialData={employeeData} />;
};

export default EditEmployee;