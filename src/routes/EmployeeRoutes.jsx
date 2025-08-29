import { Route, Outlet } from "react-router-dom";
import { GenericContextProvider } from "../contexts/GenericContext.jsx";
import { LayoutMenu } from "../components/index.jsx";
import EmployeeTable from "../pages/employee/components/EmployeeTable";
import InfoEmployee from "../pages/employee/info/InfoEmployee";
//import EmployeeEdit from "../pages/employee/Register/EmployeeEdit";
//import RegisterEmployee from "../pages/employee/Register";

const EmployeeRoutes = () => {
  return (
    <Route
      path="/funcionario"
      element={
        <LayoutMenu>
          <GenericContextProvider lSName="funcionarios">
            <Outlet />
          </GenericContextProvider>
        </LayoutMenu>
      }
    >
      <Route index element={<EmployeeTable />} />
      <Route path=":id/" element={<InfoEmployee />} />
      {/*<Route path=":id/editar" element={<EmployeeEdit />} />*/}
      {/*<Route path="novo" element={<RegisterCt />} />*/}
    </Route>
  );
};

export default EmployeeRoutes;
