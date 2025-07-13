import { Route } from "react-router-dom";
import Class from "../pages/class";

const ClassRoutes = () => {
    return (
        <Route path="/turma" element={<Class />} />
    );
}

export default ClassRoutes;