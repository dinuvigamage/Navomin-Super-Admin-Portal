import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";


const ShoppingCart = () => {
  const [activeTab, setActiveTab] = useState("normal");
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: "images/apple.jpg",
      name: "Apple",
      pricePer100g: 20,
      quantity: 5,
      total: 100,
    },
    {
      id: 2,
      image: "images/bananas.jpg",
      name: "Banana",
      pricePer100g: 400,
      quantity: 1,
      total: 400,
    },
    {
      id: 3,
      image: "images/carrot.jpg",
      name: "Carrot",
      pricePer100g: 430,
      quantity: "500g",
      total: 2150,
    },
    {
      id: 4,
      image: "images/orange.jpg",
      name: "Orange",
      pricePer100g: 300,
      quantity: "300g",
      total: 900,
    },
  ]);

  const [paymentMethod, setPaymentMethod] = useState("online");

  const totalAmount = cartItems.reduce((acc, item) => acc + item.total, 0);

  const removeItem = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this item?");
    if (confirmDelete) {
      const updatedCart = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedCart);
    }
  };
  
  const toggleEdit = (id) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, isEditing: !item.isEditing } : item));
  };

  const updateQuantity = (id, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity, total: item.pricePer100g * newQuantity, isEditing: false } : item
    ));
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <div className="d-flex justify-content-center mb-3">
          <button
            className={`btn mx-2 ${activeTab === "normal" ? "btn-primary fw-bold" : "btn-outline-primary"}`}
            onClick={() => setActiveTab("normal")}
          >
            Normal Orders
          </button>
          <button
            className={`btn mx-2 ${activeTab === "pre" ? "btn-primary fw-bold" : "btn-outline-primary"}`}
            onClick={() => setActiveTab("pre")}
          >
            Pre Orders
          </button>
        </div>

        <div className="container" style={{ maxWidth: "900px" }}>
          {activeTab === "normal" && (
            <div>
              <h2 className="title">Normal Orders Shopping Cart</h2>

              <div className="table-container">
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th>Item Image</th>
                      <th>Item Name</th>
                      <th>Price/100G</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td><img src={item.image} alt={item.name} className="cart-image" /></td>
                  <td>{item.name}</td>
                  <td>Rs.{item.pricePer100g}</td>
                  <td>
                    {item.isEditing ? (
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                      />
                    ) : (
                      item.quantity
                    )}
                  </td>
                  <td>Rs.{item.total}</td>
                  <td>
                    {item.isEditing ? (
                      <button className="btn btn-success" onClick={() => updateQuantity(item.id, item.quantity)}>Save</button>
                    ) : (
                      <button className="btn btn-warning" onClick={() => toggleEdit(item.id)}>Update</button>
                    )}
                    <button className="btn btn-danger ms-2" onClick={() => removeItem(item.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
                </table>
              </div>

              <div className="pickup-section">
                <label className="fw-bold">Pickup Time:</label>
                <input type="time" className="time-input" />
              </div>

              <div className="payment-section">
                <p className="fw-bold">Payment Options:</p>
                <label>
                  <input
                    type="radio"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                  />
                  Online Payment <span className="info-text">Ensure a smooth and secure transaction.</span>
                </label>
                <label>
                  <input
                    type="radio"
                    value="pickup"
                    checked={paymentMethod === "pickup"}
                    onChange={() => setPaymentMethod("pickup")}
                  />
                  Pay at Pickup
                </label>
              </div>

              <div className="total-amount">Total Amount: Rs.{totalAmount.toFixed(2)}</div>

              <button className="submit-btn" onClick={() => navigate("/PaymentDetails")}>Submit</button>
            
            </div>
          )}

          {activeTab === "pre" && 
          <div>
          <h2 className="title">Pre-Orders Shopping Cart</h2>

          <div className="table-container">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Item Image</th>
                  <th>Item Name</th>
                  <th>Price/1</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td><img src={item.image} alt={item.name} className="cart-image" /></td>
                  <td>{item.name}</td>
                  <td>Rs.{item.pricePer100g}</td>
                  <td>
                    {item.isEditing ? (
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                      />
                    ) : (
                      item.quantity
                    )}
                  </td>
                  <td>Rs.{item.total}</td>
                  <td>
                    {item.isEditing ? (
                      <button className="btn btn-success" onClick={() => updateQuantity(item.id, item.quantity)}>Save</button>
                    ) : (
                      <button className="btn btn-warning" onClick={() => toggleEdit(item.id)}>Update</button>
                    )}
                    <button className="btn btn-danger ms-2" onClick={() => removeItem(item.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>

          <div className="pickup-section">
            <label className="fw-bold">Pickup Date:</label>
            <input type="date" className="time-input" />
          </div>

          <div className="pickup-section">
            <label className="fw-bold">Pickup Time:</label>
            <input type="time" className="time-input" />
          </div>

          <div className="total-amount"> Total Amount: Rs.{totalAmount.toFixed(2)}</div>

          <button className="submit-btn">Finalize Order</button>
        </div>
          }
        </div>
      </div>

      <Footer />

      <style>{`
        .container {
          max-width: 900px;
          margin: auto;
          padding: 20px;
        }

        .title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .table-container {
          max-height: 300px; 
          overflow-y: auto;
          border-radius: 8px;
          border: 1px solid #ddd;
        }

        .cart-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .cart-table th, .cart-table td {
          padding: 12px;
          border-bottom: 1px solid #ddd;
        }

        .cart-table th {
          background-color: #f5f5f5;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .cart-image {
          width: 90px;
          height: 60px;
          object-fit: cover;
          border-radius: 5px;
        }

        .remove-btn {
          background-color: #6C63FF;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
        }

        .remove-btn:hover {
          background-color: #5548d4;
        }

        .pickup-section {
          margin-top: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .time-input {
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }

        .payment-section {
          margin-top: 20px;
        }

        .payment-section label {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .info-text {
          font-size: 12px;
          color: gray;
        }

        .total-amount {
          margin-top: 20px;
          font-size: 18px;
          font-weight: bold;
          text-align: right;
        }

        .submit-btn {
          display: block;
          width: 100%;
          padding: 10px;
          background-color: #6C63FF;
          color: white;
          font-size: 16px;
          border: none;
          border-radius: 5px;
          margin-top: 20px;
          cursor: pointer;
        }

        .submit-btn:hover {
          background-color: #5548d4;
        }

        .table-container::-webkit-scrollbar {
          width: 5px;
        }

        .table-container::-webkit-scrollbar-thumb {
          background-color: #ddd;
          border-radius: 10px;
        }

        .table-container::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
      `}</style>
    </>
  );
};

export default ShoppingCart;
