import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/Dashboardlayout";
import PreOrder from "./pages/PreOrder.jsx";
import NormalOrder from "./pages/NormalOrder.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreditProfile from "./pages/CreditProfile.jsx";
import PendingPayment from "./pages/PendingPayment.jsx";
import Billing from "./pages/Billing.jsx";
import Inventory from "./pages/Inventory.jsx";
import Login from "./pages/Login.jsx";
import Report from "./pages/Report.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/preOrders" element={<PreOrder />} />
          <Route path="/normalOrders" element={<NormalOrder />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/creditProfile" element={<CreditProfile />} />
          <Route path="/pendingPayments" element={<PendingPayment />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="login" element={<Login />} />
          <Route path="reports" element={<Report />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
