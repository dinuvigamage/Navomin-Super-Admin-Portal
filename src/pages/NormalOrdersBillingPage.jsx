import { FiGrid, FiFileText, FiShoppingCart, FiMessageSquare, FiArchive, FiUsers, FiLogOut } from "react-icons/fi";
import { TbListCheck } from "react-icons/tb";
import { useState } from "react";

const NormalOrdersPage = () => {
  const [items] = useState([
    { code: "1234", name: "Noodles", qty: 1, unitPrice: 345.0 },
    { code: "1234", name: "Pasta", qty: 2, unitPrice: 345.0 },
    { code: "1234", name: "Bread", qty: 3, unitPrice: 345.0 },
  ]);
  const [received, setReceived] = useState("");

  const totalQty = items.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
  const balance = received ? parseFloat(received) - totalPrice : "";

  const handleLogout = () => alert("Logging out...");

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>

      {/* Main content */}
      <div className="flex-grow-1 p-4">
        {/* Top bar */}
        <div className="d-flex justify-content-end mb-4">
          <button className="btn btn-light text-danger border" onClick={handleLogout}>
            <FiLogOut className="me-1" /> Log out
          </button>
        </div>

        {/* Order Info */}
        <div className="bg-white p-4 border rounded mb-4">
          <div className="d-flex flex-wrap mb-3">
            <div className="me-4 mb-2">
              <label>Date:</label>
              <input type="date" className="form-control" defaultValue="2024-08-08" />
            </div>
            <div className="me-4 mb-2">
              <label>Time:</label>
              <input type="text" className="form-control" value="11:24 a.m." disabled />
            </div>
            <div className="me-4 mb-2">
              <label>Bill Number:</label>
              <input type="text" className="form-control" value="234" disabled />
            </div>
            <div className="mb-2">
              <label>Pickup time:</label>
              <input type="text" className="form-control" value="4.00p.m" disabled />
            </div>
          </div>

          <button className="btn btn-outline-danger mb-3">Remove</button>

          {/* Table */}
          <table className="table table-bordered align-middle mb-3">
            <thead className="table-light">
              <tr>
                <th>Item code</th>
                <th>Item Name</th>
                <th>Qty</th>
                <th>Unit price</th>
                <th>Price/total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>Rs.{item.unitPrice.toFixed(2)}</td>
                  <td>Rs.{(item.unitPrice * item.qty).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals + Print */}
          <div className="d-flex align-items-end justify-content-between mb-3">
            <div className="d-flex">
              <div className="me-3">
                <label>Total item</label>
                <input type="text" className="form-control" value={items.length} readOnly />
              </div>
              <div>
                <label>Total quantity</label>
                <input type="text" className="form-control" value={totalQty} readOnly />
              </div>
            </div>
            <button className="btn btn-outline-secondary">Print list</button>
          </div>

          {/* Actions */}
          <div className="d-flex mb-3">
            <button className="btn btn-primary me-2">Mark as Preparing</button>
            <button className="btn btn-primary">Mark as Ready for Pickup</button>
          </div>

          <div>
            <button className="btn btn-outline-secondary me-2">Print Bill</button>
            <button className="btn btn-outline-danger me-2">Cancel bill</button>
            <button className="btn btn-outline-info">Add to credits</button>
          </div>
        </div>

        {/* Right Bill Summary */}
        <div className="position-absolute end-0 top-0 mt-4 me-4 border p-3 rounded" style={{ width: "250px", background: "#fff" }}>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="fw-bold">Your bill</h5>
            <button className="btn btn-sm" title="Close">✕</button>
          </div>
          <p>Total: {totalPrice.toFixed(2)}</p>
          <div className="mb-2">
            <label>Received :</label>
            <input
              type="number"
              className="form-control"
              value={received}
              onChange={(e) => setReceived(e.target.value)}
            />
          </div>
          <p>Balance: {balance ? balance.toFixed(2) : ""}</p>
        </div>
      </div>
    </div>
  );
};

export default NormalOrdersPage;
