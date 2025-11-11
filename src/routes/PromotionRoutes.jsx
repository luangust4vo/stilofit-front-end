import { Route, Outlet } from "react-router-dom";
import { LayoutMenu } from "../components/index.jsx";
import PromotionTable from "../pages/promotion/components/PromotionTable";

const PromotionRoutes = () => {
  return (
    <Route
      path="/promocao"
      element={
        <LayoutMenu>
          <Outlet />
        </LayoutMenu>
      }
    >
      <Route index element={<PromotionTable />} />
    </Route>
  );
};

export default PromotionRoutes;
