import { Route } from "react-router-dom";
import CheckoutTableHistory from '../pages/checkout/History/HistoryCheckout';

const CheckoutRoutes = () => {
    return (
        <Route path="/caixa">
            <Route index element={<CheckoutTableHistory />} />
        </Route>
    );
}

export default CheckoutRoutes;