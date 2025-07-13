import { Route } from "react-router-dom";
import ContractTable from "../pages/contract/components/ContractTable";
import InfoContract from "../pages/contract/Info";
import EditContract from "../pages/contract/Register/EditContract";
import RegisterContract from "../pages/contract/Register";

const ContractRoutes = () => {
    return (
        <Route path="/contrato">
            <Route index element={<ContractTable />} />
            <Route path="info/:id" element={<InfoContract />} />
            <Route path="editar/:id" element={<EditContract />} />
            <Route path="registrar" element={<RegisterContract />} />
        </Route>
    );
}

export default ContractRoutes;