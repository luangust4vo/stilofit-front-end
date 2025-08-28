import { Route, Outlet } from "react-router-dom";
import { GenericContextProvider } from "../contexts/GenericContext.jsx";
import { LayoutMenu } from "../components/index.jsx";
import ContractTable from "../pages/contract/components/ContractTable";
import EditContract from "../pages/contract/Register/EditContract";
import RegisterContract from "../pages/contract/Register";

const ContractRoutes = () => {
  return (
    <Route
      path="/contrato"
      element={
        <LayoutMenu>
          <GenericContextProvider lSName="contratos">
            <Outlet />
          </GenericContextProvider>
        </LayoutMenu>
      }
    >
      <Route
        index
        element={
          <GenericContextProvider lSName="contratos">
            <ContractTable />
          </GenericContextProvider>
        }
      />
      <Route path=":id/editar" element={<EditContract />} />
      <Route path="novo" element={<RegisterContract />} />
    </Route>
  );
};

export default ContractRoutes;
