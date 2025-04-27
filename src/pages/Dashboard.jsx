import React, { useEffect, useState } from "react";
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
import {
  getTotalOrderSales,
  getTotalPreOrderSales,
  getTotalSales,
} from "../apis/owner";
import { getProducts } from "../apis/products";
import { getProductSize } from "../apis/products";

const Dashboard = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [orderSales, setOrderSales] = useState(0);
  const [preOrderSales, setPreOrderSales] = useState(0);
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    const fetchTotalSales = async () => {
      getTotalSales()
        .then((response) => {
          setTotalSales(response.TOTAL_SALES);
        })
        .catch((error) => {
          console.error("Error fetching total sales:", error);
        });

      getTotalOrderSales()
        .then((response) => {
          setOrderSales(response.TOTAL_SALES);
        })
        .catch((error) => {
          console.error("Error fetching total order sales:", error);
        });

      getTotalPreOrderSales()
        .then((response) => {
          setPreOrderSales(response.TOTAL_SALES);
        })
        .catch((error) => {
          console.error("Error fetching total pre-order sales:", error);
        });
    };
    fetchTotalSales();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      getProducts()
        .then((response) => {
          console.log("Products:", response);
          setProducts(response);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
      getProductSize()
        .then((response) => {
          console.log("Sizes:", response);
          setSizes(response);
        })
        .catch((error) => {
          console.error("Error fetching sizes:", error);
        });
    };
    fetchProducts();
  }, []);

  return (
    <div className="d-flex min-vh-100">
      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <h1 className="mb-4">Dashboard</h1>
        {/* Top Navigation Tabs */}
        {/* <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex gap-4">
            {topTabs.map((tab) => (
              <span
                key={tab}
                className={`pb-1 ${
                  activeTab === tab
                    ? "fw-bold text-primary border-bottom border-primary"
                    : "text-muted"
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </span>
            ))}
          </div>
        </div> */}

        {/* Dashboard Content (example) */}
        {/* {activeTab === "Dashboard" && ( */}
        <div className="row g-4">
          {/* Total Sales */}
          <div className="col-md-4">
            <div className="bg-white shadow-sm rounded p-4 h-100">
              <h2 className="">Total Sales</h2>
              {/* <p className="text-muted mt-3 mb-1">Total Sales Today</p> */}
              <h3 className="mt-4">Rs. {totalSales}</h3>
            </div>
          </div>

          <div className="col-md-4">
            <div className="bg-white shadow-sm rounded p-4 h-100">
              <h2 className="">Normal Order Sales</h2>
              {/* <p className="text-muted mt-3 mb-1">Total Sales Today</p> */}
              <h3 className="mt-4">Rs. {orderSales}</h3>
            </div>
          </div>

          <div className="col-md-4">
            <div className="bg-white shadow-sm rounded p-4 h-100">
              <h2 className="">Pre-Order Sales</h2>
              {/* <p className="text-muted mt-3 mb-1">Total Sales Today</p> */}
              <h3 className="mt-4">Rs. {preOrderSales}</h3>
            </div>
          </div>

          {/* Outstanding Credit */}
          {/* <div className="col-md-8">
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
          </div> */}

          {/* Low Stock */}
          <div className="col-12">
            <div className="bg-white shadow-sm rounded p-4">
              <h4 className="mb-3">Low stock</h4>
              <div className="row row-cols-2 row-cols-md-4 g-3">
                {Array.isArray(products) &&
                  Array.isArray(sizes) &&
                  sizes.map((size) => {
                    if (size.Stock > 10) return null; // Skip if stock is greater than 10
                    const product = products.find(
                      (product) => product.Product_ID === size.Product_ID
                    );
                    return (
                      <div key={size.Size_ID} className="col">
                        <div className="bg-light rounded p-3 h-100">
                          <strong>{product?.Product_Name}</strong>
                          <div className="text-muted">Size: {size.Size}</div>
                          <div className="text-muted">Stock: {size.Stock}</div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        {/* )} */}

        {/* Placeholder content for other tabs */}
        {/* {activeTab !== "Dashboard" && (
          <div className="bg-white rounded p-5 text-center shadow-sm">
            <h4>{activeTab} Page</h4>
            <p className="text-muted">
              This is where {activeTab} content will go.
            </p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Dashboard;
