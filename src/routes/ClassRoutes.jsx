import { Route, Outlet } from "react-router-dom";
import { GenericContextProvider } from "../contexts/GenericContext.jsx";
import { LayoutMenu } from "../components/index.jsx";
import ClassTable from "../pages/class/components/ClassTable";

const ClassRoutes = () => {
  return (
    <Route
      path="/turma"
      element={
        <LayoutMenu>
          <GenericContextProvider lSName="turmas">
            <Outlet />
          </GenericContextProvider>
        </LayoutMenu>
      }
    >
      <Route index element={<ClassTable />} />
    </Route>
  );
};

export default ClassRoutes;
