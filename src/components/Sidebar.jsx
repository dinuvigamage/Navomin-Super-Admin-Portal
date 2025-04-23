import {
  FiGrid,
  FiFileText,
  FiShoppingCart,
  FiMessageSquare,
  FiArchive,
  FiUsers,
  FiLogOut,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: "300px" }}>
      <h4 className="mb-4">Dashboard</h4>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <NavLink to="/" className="nav-link text-white" end>
            <FiGrid className="me-2" />
            Home
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/billing" className="nav-link text-white">
            <FiFileText className="me-2" />
            Billing
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/preOrders" className="nav-link text-white">
            <FiShoppingCart className="me-2" />
            Pre Order
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/normalOrders" className="nav-link text-white">
            <FiShoppingCart className="me-2" />
            Normal Orders
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/#" className="nav-link text-white">
            <FiMessageSquare className="me-2" />
            Messages
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/#" className="nav-link text-white">
            <FiArchive className="me-2" />
            Inventory
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/creditProfile" className="nav-link text-white">
            <FiUsers className="me-2" />
            Credit Profiles
          </NavLink>
        </li>
        {/* pending payments */}
        <li className="nav-item mb-2">
          <NavLink to="/pendingPayments" className="nav-link text-white">
            <FiUsers className="me-2" />
            Pending Payments
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/#" className="nav-link text-white">
            <FiUsers className="me-2" />
            Staff Profiles
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
