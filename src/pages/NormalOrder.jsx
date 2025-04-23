import React, { useState } from "react";
import {
  FiHome,
  FiLogOut,
  FiUser,
  FiMail,
  FiBox,
  FiClipboard,
  FiUsers,
  FiShoppingCart,
} from "react-icons/fi";
import { FaUserFriends } from "react-icons/fa";

const ordersData = [
  {
    orderNumber: "001",
    customer: "John Doe",
    status: "Pending",
    pickup: "2023-10-10",
  },
  {
    orderNumber: "002",
    customer: "Jane Smith",
    status: "Preparing",
    pickup: "2023-10-11",
  },
  {
    orderNumber: "003",
    customer: "Michael Johnson",
    status: "Ready for Pickup",
    pickup: "2023-10-12",
  },
  {
    orderNumber: "004",
    customer: "Emily Brown",
    status: "Pending",
    pickup: "2023-10-13",
  },
  {
    orderNumber: "005",
    customer: "David Wilson",
    status: "Preparing",
    pickup: "2023-10-14",
  },
  {
    orderNumber: "006",
    customer: "Sarah White",
    status: "Ready for Pickup",
    pickup: "2023-10-15",
  },
  {
    orderNumber: "007",
    customer: "Kevin Lee",
    status: "Pending",
    pickup: "2023-10-16",
  },
];

const sidebarItems = [
  { label: "Dashboard", icon: <FiHome /> },
  { label: "Billing", icon: <FiClipboard /> },
  { label: "Pre Order", icon: <FaUserFriends /> },
  { label: "Normal Orders", icon: <FiShoppingCart /> },
  { label: "Messages", icon: <FiMail /> },
  { label: "Inventory", icon: <FiBox /> },
  { label: "Credit Profiles", icon: <FiUsers /> },
  { label: "Staff Profiles", icon: <FiUser /> },
];

const topTabs = ["Home", "Kitchen", "Tables"];

const NormalOrder = () => {
  const [activeSidebar, setActiveSidebar] = useState("Normal Orders");
  const [activeTopTab, setActiveTopTab] = useState("Home");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = ordersData.filter(
    ({ orderNumber, customer }) =>
      orderNumber.includes(searchTerm) ||
      customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex min-vh-100">
      {/* Main Content */}
      <div className="flex-grow-1 p-4 bg-light">
        {/* Top Tabs */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex gap-4">
            {topTabs.map((tab) => (
              <span
                key={tab}
                className={`pb-1 ${
                  activeTopTab === tab
                    ? "fw-bold text-primary border-bottom border-primary"
                    : "text-muted"
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setActiveTopTab(tab)}
              >
                {tab}
              </span>
            ))}
          </div>
        </div>

        {/* Page Content */}
        {activeSidebar === "Normal Orders" && activeTopTab === "Home" && (
          <>
            <input
              type="text"
              className="form-control mb-4"
              placeholder="Search by customer name or order number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="table-responsive bg-white shadow-sm rounded p-3">
              <table className="table table-bordered mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Order Number</th>
                    <th>Customer Name</th>
                    <th>Order Status</th>
                    <th>Pickup Time</th>
                    <th>Prepare</th>
                    <th>Ready for Pickup</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.orderNumber}>
                      <td>
                        <a href="#" className="text-decoration-none">
                          {order.orderNumber}
                        </a>
                      </td>
                      <td>{order.customer}</td>
                      <td>{order.status}</td>
                      <td>{order.pickup}</td>
                      <td>
                        <button className="btn btn-primary btn-sm">
                          Mark as Preparing
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-primary btn-sm">
                          Mark as Ready for Pickup
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredOrders.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center text-muted py-3">
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Fallback content for other combinations */}
        {!(activeSidebar === "Normal Orders" && activeTopTab === "Home") && (
          <div className="bg-white shadow-sm rounded p-5 text-center">
            <h4>
              {activeSidebar} - {activeTopTab}
            </h4>
            <p className="text-muted">
              Content for this section is coming soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NormalOrder;
