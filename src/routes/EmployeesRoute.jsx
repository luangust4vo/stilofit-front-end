import { Route } from "react-router-dom";
import EmployeeTable from "../pages/employees/components/EmployeeTable";
import InfoEmployee from "../pages/employees/info/InfoEmployee";
import EmployeeEdit from "../pages/employees/Register/EmployeeEdit";
import RegisterCt from "../pages/employees/Register";

const EmployeeRoutes = () => {
    return (
        <Route path="/funcionario">
            <Route index element={<EmployeeTable />} />
            <Route path=":id" element={<InfoEmployee />} />
            <Route path=":id/editar" element={<EmployeeEdit />} />
            <Route path="novo" element={<RegisterCt />} />
        </Route>
    );
}

export default EmployeeRoutes;