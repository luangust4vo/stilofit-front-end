import { Route } from "react-router-dom";
import { Register, Info, Layout } from "../pages/client";
import EditClient from "../pages/client/Register/EditClient";
import { GenericContextProvider } from "../contexts/GenericContext";

const ClientRoutes = () => {
  return (
    <Route
      path="/cliente"
      element={
        <GenericContextProvider lSName="clientes">
          <Layout />
        </GenericContextProvider>
      }
    >
      <Route index element={<Register />} />
      <Route path=":id" element={<Info />} />
      <Route path=":id/editar" element={<EditClient />} />
    </Route>
  );
};

export default ClientRoutes;
