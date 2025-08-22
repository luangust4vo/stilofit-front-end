import { Route } from "react-router-dom";
import { GenericContextProvider } from "../contexts/GenericContext.jsx";
import EmployeeTable from "../pages/employee/components/EmployeeTable";
import InfoEmployee from "../pages/employee/info/InfoEmployee";
//import EmployeeEdit from "../pages/employee/Register/EmployeeEdit";
//import RegisterCt from "../pages/employee/Register";

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
      <Route path=":id/" element={<InfoEmployee />} />
      {/*<Route path=":id/editar" element={<EmployeeEdit />} />*/}
      {/*<Route path="novo" element={<RegisterCt />} />*/}
    </Route>
  );
};

export default EmployeeRoutes;
