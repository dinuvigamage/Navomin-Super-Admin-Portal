import React, { useState } from "react";
import {
  FiHome, FiLogOut, FiUser, FiMail, FiBox,
  FiClipboard, FiUsers, FiShoppingCart
} from "react-icons/fi";
import { FaUserFriends } from "react-icons/fa";

const Dashboard= () => {
  const [activeSidebar, setActiveSidebar] = useState("Dashboard");
  const [activeTab, setActiveTab] = useState("Dashboard");

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

  const topTabs = ["Dashboard", "Billing", "Messages"];

  return (
    <div className="d-flex min-vh-100">

      {/* Main Content */}
      <div className="flex-grow-1 p-4 bg-light">
        {/* Top Navigation Tabs */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex gap-4">
            {topTabs.map((tab) => (
              <span
                key={tab}
                className={`pb-1 ${activeTab === tab ? "fw-bold text-primary border-bottom border-primary" : "text-muted"}`}
                style={{ cursor: "pointer" }}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </span>
            ))}
          </div>
        </div>

        {/* Dashboard Content (example) */}
        {activeTab === "Dashboard" && (
          <div className="row g-4">
            {/* Total Sales */}
            <div className="col-md-4">
              <div className="bg-white shadow-sm rounded p-4 h-100">
                <h5 className="fw-bold">Total Sales</h5>
                <p className="text-muted mt-3 mb-1">Total Sales Today</p>
                <h3 className="fw-bold">Rs.67,000</h3>
              </div>
            </div>

            {/* Outstanding Credit */}
            <div className="col-md-8">
              <div className="bg-white shadow-sm rounded p-4 h-100">
                <h5 className="fw-bold mb-3">Outstanding Credit</h5>
                <div className="row row-cols-2 g-3">
                  {["Siripala", "Amal", "Chama", "Kamal"].map((name, i) => (
                    <div key={i} className="col">
                      <div className="bg-light rounded p-3 h-100">
                        <strong>{name}</strong>
                        <div className="text-muted">Amount Due: Rs.560</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Low Stock */}
            <div className="col-12">
              <div className="bg-white shadow-sm rounded p-4">
                <h5 className="fw-bold mb-3">Low stock</h5>
                <div className="row row-cols-2 row-cols-md-4 g-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="col">
                      <div className="bg-light rounded p-3 h-100">
                        <div className="fw-semibold">Eggs</div>
                        <div className="text-muted">Available: 10</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Placeholder content for other tabs */}
        {activeTab !== "Dashboard" && (
          <div className="bg-white rounded p-5 text-center shadow-sm">
            <h4>{activeTab} Page</h4>
            <p className="text-muted">This is where {activeTab} content will go.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
