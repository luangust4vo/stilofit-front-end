import { Route } from "react-router-dom";
import { GenericContextProvider } from "../contexts/GenericContext.jsx";
import ClassTable from "../pages/class/components/ClassTable";

const ClassRoutes = () => {
  return (
    <Route path="/turma">
      <Route
        index
        element={
          <GenericContextProvider lSName="turmas">
            <ClassTable />
          </GenericContextProvider>
        }
      />
    </Route>
  );
};

export default ClassRoutes;
