import React from "react";
import {
  FiGrid,
  FiFileText,
  FiShoppingCart,
  FiMessageSquare,
  FiArchive,
  FiUsers,
  FiLogOut,
} from "react-icons/fi";

const preOrders = [
  {
    id: "PO001",
    name: "John Doe",
    status: "Pending|Ready for Pickup",
    price: 500,
  },
  {
    id: "PO002",
    name: "Jane Smith",
    status: "Confirmed|Awaiting Pickup",
    price: 700,
  },
  {
    id: "PO003",
    name: "Michael Johnson",
    status: "Cancelled|Refunded",
    price: 300,
  },
  {
    id: "PO004",
    name: "Emily Brown",
    status: "Pending|Ready for Pickup",
    price: 900,
  },
  {
    id: "PO005",
    name: "David Wilson",
    status: "Confirmed|Awaiting Pickup",
    price: 1000,
  },
  {
    id: "PO006",
    name: "Sarah White",
    status: "Pending|Ready for Pickup",
    price: 4,
  },
];

const PreOrder = () => {
  const handleLogout = () => {
    alert("Logging out...");
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <h4 className="fw-bold mb-4">Pre Orders</h4>

        {/* Table */}
        <div className="table-responsive">
          <table className="table align-middle table-bordered">
            <thead className="table-light">
              <tr>
                <th>Pre-Order Number</th>
                <th>Customer Name</th>
                <th>Order Status</th>
                <th>Final Price</th>
                <th>Change status</th>
                <th>Send message</th>
              </tr>
            </thead>
            <tbody>
              {preOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <a href="#" className="text-decoration-underline">
                      {order.id}
                    </a>
                  </td>
                  <td>{order.name}</td>
                  <td>
                    {order.status.split("|").map((status, index) => (
                      <span
                        key={index}
                        className="badge bg-light text-dark border me-1"
                        style={{ fontSize: "12px" }}
                      >
                        {status}
                      </span>
                    ))}
                  </td>
                  <td>
                    <div className="input-group">
                      <span className="input-group-text">&#8377;</span>
                      <input
                        type="text"
                        className="form-control"
                        value={order.price}
                        readOnly
                      />
                    </div>
                  </td>
                  <td>
                    <select className="form-select">
                      <option>Dropdown</option>
                      <option>Confirmed</option>
                      <option>Ready for Pickup</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-success">Send</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PreOrder;
