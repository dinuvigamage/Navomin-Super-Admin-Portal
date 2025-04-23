import { FiGrid, FiFileText, FiShoppingCart, FiMessageSquare, FiArchive, FiUsers, FiLogOut } from "react-icons/fi";
import { useState } from "react";

const Billing = () => {
  const [items, setItems] = useState([
    { code: "1234", name: "Noodles", qty: 1, unitPrice: 345.0 },
    { code: "1234", name: "Pasta", qty: 2, unitPrice: 345.0 },
    { code: "1234", name: "Bread", qty: 3, unitPrice: 345.0 },
  ]);
  const [received, setReceived] = useState(2350.0);

  const totalItems = items.length;
  const totalQty = items.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
  const balance = received - totalPrice;

  const handleLogout = () => {
    alert("Logging out...");
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">

        {/* Billing Form */}
        <div className="mb-4">
          <div className="d-flex mb-2">
            <div className="me-4">
              <label>Date:</label>
              <input type="date" className="form-control" defaultValue="2024-08-08" />
            </div>
            <div className="me-4">
              <label>Time:</label>
              <input type="text" className="form-control" value="11:24 a.m." disabled />
            </div>
            <div>
              <label>Bill Number:</label>
              <input type="text" className="form-control" value="234" disabled />
            </div>
          </div>

          <div className="d-flex mb-3">
            <input type="text" placeholder="Item code" className="form-control me-2" />
            <select className="form-select me-2">
              <option>noodles</option>
              <option>pasta</option>
              <option>bread</option>
            </select>
            <input type="number" placeholder="Qty" className="form-control me-2" />
            <input type="text" placeholder="Price/unit" className="form-control me-2" />
            <input type="text" placeholder="Price" className="form-control me-2" />
          </div>

          <div className="mb-3">
            <button className="btn btn-primary me-2">Add</button>
            <button className="btn btn-outline-primary me-2">Edit item</button>
            <button className="btn btn-outline-danger">Remove</button>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
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
        </div>

        {/* Totals */}
        <div className="d-flex mb-4">
          <div className="me-3">
            <label>Total item</label>
            <input type="text" className="form-control" value={totalItems} readOnly />
          </div>
          <div>
            <label>Total quantity</label>
            <input type="text" className="form-control" value={totalQty} readOnly />
          </div>
        </div>

        {/* Bill Summary */}
        <div className="d-flex">
          <div style={{ width: "250px" }} className="border p-3 me-5">
            <h5 className="fw-bold mb-3">Your bill</h5>
            <p>Total : {totalPrice.toFixed(2)}</p>
            <div className="mb-2">
              <label>Received :</label>
              <input
                type="number"
                className="form-control"
                value={received}
                onChange={(e) => setReceived(parseFloat(e.target.value) || 0)}
              />
            </div>
            <p>Balance : {balance.toFixed(2)}</p>
          </div>

          <div className="d-flex flex-column justify-content-start">
            <button className="btn btn-outline-secondary mb-2">Print Bill</button>
            <button className="btn btn-outline-primary mb-2">Finish</button>
            <div>
              <button className="btn btn-outline-info me-2">Add to credits</button>
              <button className="btn btn-outline-danger">Cancel bill</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
