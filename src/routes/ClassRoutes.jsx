import { Route } from "react-router-dom";
import ClassTable from "../pages/class/components/ClassTable";

const ClassRoutes = () => {
  return (
    <Route path="/turma">
      <Route index element={<ClassTable />} />
    </Route>
  );
};

export default ClassRoutes;
