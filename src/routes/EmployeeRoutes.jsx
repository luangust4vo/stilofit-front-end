import { Route } from "react-router-dom";
import { GenericContextProvider } from "../contexts/GenericContext.jsx";
import EmployeeTable from "../pages/employee/components/EmployeeTable";
//import EmployeeEdit from "../pages/employees/Register/EmployeeEdit";
//import RegisterCt from "../pages/employees/Register";

const EmployeeRoutes = () => {
  return (
    <Route path="/funcionario">
      <Route
        index
        element={
          <GenericContextProvider lSName="funcionarios">
            <EmployeeTable />
          </GenericContextProvider>
        }
      />
      {/*<Route path=":id/editar" element={<EmployeeEdit />} />*/}
      {/*<Route path="novo" element={<RegisterCt />} />*/}
    </Route>
  );
};

export default EmployeeRoutes;
