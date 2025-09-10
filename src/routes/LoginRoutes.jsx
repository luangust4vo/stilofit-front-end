import { Route } from "react-router-dom";
import Login from "../pages/login";

const LoginRoutes = () => {
    return (
        <Route path="/login" >
            <Route index element={<Login />} />
        </Route>
    );
}

export default LoginRoutes;