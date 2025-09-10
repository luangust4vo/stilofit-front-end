import { Route } from "react-router-dom";
import Login from '../pages/login'

const AuthRoutes = () => {
    return (
        <Route path="/login" element={<Login />} />
    );
}

export default AuthRoutes;
