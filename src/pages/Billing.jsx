import {
  FiGrid,
  FiFileText,
  FiShoppingCart,
  FiMessageSquare,
  FiArchive,
  FiUsers,
  FiLogOut,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrder } from "../apis/order";
import {
  getOrderItemByOrderId,
  getPreOrder,
  getPreOrderItemByPreOrderId,
} from "../apis/order";
import { getUser } from "../apis/user";
import { getProducts, getProductSize } from "../apis/products";

const Billing = () => {
  const { billNumberFromOrder } = useParams();

  const [billNumber, setBillNumber] = useState(billNumberFromOrder || "");

  const billFromOrderList = billNumberFromOrder !== undefined ? true : false;

  console.log("Bill Number:", billNumber);
  console.log("Bill From Order List:", billFromOrderList);

  const [orderType, setOrderType] = useState("Normal Order");
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [items, setItems] = useState([
    { code: "1234", name: "Noodles", qty: 1, unitPrice: 345.0 },
    { code: "1234", name: "Pasta", qty: 2, unitPrice: 345.0 },
    { code: "1234", name: "Bread", qty: 3, unitPrice: 345.0 },
  ]);
  const [received, setReceived] = useState(2350.0);

  // const totalItems = items.length;
  // const totalQty = items.reduce((sum, item) => sum + item.qty, 0);
  // const totalPrice = items.reduce(
  //   (sum, item) => sum + item.qty * item.unitPrice,
  //   0
  // );
  // const balance = received - totalPrice;

  const totalItems = orderItems.length;
  const totalQty = orderItems.reduce((sum, item) => sum + item.Quantity, 0);
  const totalPrice = orderItems.reduce((sum, item) => {
    const size = sizes.find(
      ({ Product_ID, Size_ID }) =>
        Product_ID === item.Product_ID && Size_ID === item.Size_ID
    );
    return sum + item.Quantity * (size ? size.Price : 0);
  }, 0);
  const balance = received - totalPrice;
  const pickupTime = orders.find(
    (order) => order.Order_ID == billNumber
  )?.Pickup_Time;
  const status = orders.find((order) => order.Order_ID == billNumber)?.Status;

  useEffect(() => {
    const fetchUsers = async () => {
      getUser()
        .then((response) => {
          console.log("Users:", response);
          setUsers(response);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (orderType === "Normal Order") {
      getOrder()
        .then((response) => {
          console.log("Orders:", response);
          setOrders(response);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    } else if (orderType === "Pre Order") {
      getPreOrder()
        .then((response) => {
          console.log("Pre Orders:", response);
          setOrders(response);
        })
        .catch((error) => {
          console.error("Error fetching pre orders:", error);
        });
    }
  }, [orderType]);

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
    };
    const fetchSizes = async () => {
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
    fetchSizes();
  }, []);

  const searchBillItems = () => {
    if (billNumber === "") return;
    if (orderType === "Normal Order") {
      getOrderItemByOrderId(billNumber)
        .then((response) => {
          console.log("Order Items:", response);
          setOrderItems(response);
          // const newItems = response.map((item) => ({
          //   code: item.itemCode,
          //   name: item.itemName,
          //   qty: item.qty,
          //   unitPrice: item.unitPrice,
          // }));
          // setItems(newItems);
        })
        .catch((error) => {
          console.error("Error fetching order items:", error);
        });
    }
    if (orderType === "Pre Order") {
      getPreOrderItemByPreOrderId(billNumber)
        .then((response) => {
          console.log("Pre Order Items:", response);
          setOrderItems(response);
          // const newItems = response.map((item) => ({
          //   code: item.itemCode,
          //   name: item.itemName,
          //   qty: item.qty,
          //   unitPrice: item.unitPrice,
          // }));
          // setItems(newItems);
        })
        .catch((error) => {
          console.error("Error fetching pre order items:", error);
        });
    }
  };

  return (
    <div
      className="d-flex"
      style={{
        maxHeight: "92vh",
        overflowY: "auto",
        scrollbarWidth: "none",
        "-ms-overflow-style": "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {/* Main Content */}
      <div className="flex-grow-1">
        <h1 className="mb-2">Billing</h1>

        {/* Billing Form */}
        <div className="mb-4">
          <div className="d-flex mb-2" style={{ gap: "3rem" }}>
            {/* <div className="me-4">
              <label>Date:</label>
              <input type="date" className="form-control" defaultValue="2024-08-08" />
            </div>
            <div className="me-4">
              <label>Time:</label>
              <input type="text" className="form-control" value="11:24 a.m." disabled />
            </div> */}
            <div>
              <label>Order Type</label>
              <select
                className="form-select me-2"
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
              >
                <option value="Normal Order">Normal Order</option>
                <option value="Pre Order">Pre Order</option>
              </select>
            </div>

            <div>
              <label>Bill Number</label>
              <input
                type="text"
                className="form-control"
                value={billNumber}
                disabled={billFromOrderList}
                onChange={(e) => setBillNumber(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary btn-sm mt-4"
              onClick={searchBillItems}
            >
              Search
            </button>
          </div>

          {/* <div className="d-flex mb-3">
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
          </div> */}
        </div>

        <h5 className="fw-bold my-2">Items</h5>
        {/* Table */}
        {/* <div className="table-responsive"> */}
        <div
          className="pb-2 border-1 rounded-3 shadow-sm bg-black"
          style={{
            maxHeight: "50vh",
          }}
        >
          <div
            className="table-responsive"
            style={{
              maxHeight: "45vh",
              overflowY: "auto",
              scrollbarWidth: "none",
              "-ms-overflow-style": "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
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
                {Array.isArray(orderItems) &&
                  Array.isArray(products) &&
                  Array.isArray(sizes) &&
                  orderItems.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {
                          products.find(
                            ({ Product_ID }) => Product_ID === item.Product_ID
                          ).Product_ID
                        }
                      </td>
                      <td>
                        {products.find(
                          ({ Product_ID }) => Product_ID === item.Product_ID
                        ).Product_Name +
                          " - " +
                          sizes.find(
                            ({ Product_ID, Size_ID }) =>
                              Product_ID === item.Product_ID &&
                              Size_ID === item.Size_ID
                          )?.Size}
                      </td>
                      <td>{item.Quantity}</td>
                      <td>
                        Rs.
                        {
                          sizes.find(
                            ({ Product_ID, Size_ID }) =>
                              Product_ID === item.Product_ID &&
                              Size_ID === item.Size_ID
                          )?.Price
                        }
                      </td>
                      <td>
                        Rs.
                        {sizes.find(
                          ({ Product_ID, Size_ID }) =>
                            Product_ID === item.Product_ID &&
                            Size_ID === item.Size_ID
                        )?.Price * item.Quantity}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <h5 className="fw-bold my-2">Bill Summary</h5>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          className="border p-3 me-5 mb-4"
        >
          {/* Totals */}
          <div
            className="d-flex mb-4"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="w-full">
              <label>Total item</label>
              <input
                type="text"
                className="form-control w-full"
                value={totalItems}
                readOnly
              />
            </div>
            <div>
              <label>Total quantity</label>
              <input
                type="text"
                className="form-control"
                value={totalQty}
                readOnly
              />
            </div>
            <div className="d-flex flex-column justify-content-start">
              <button className="btn btn-outline-secondary mb-2">
                Print Bill
              </button>
              {/* <button className="btn btn-outline-primary mb-2">Finish</button>
            <div>
              <button className="btn btn-outline-info me-2">
                Add to credits
              </button>
              <button className="btn btn-outline-danger">Cancel bill</button>
            </div> */}
            </div>
          </div>

          {/* Bill Summary */}
          <div className="d-flex" style={{ width: "55%" }}>
            <div
              style={{ width: "100%", flexDirection: "column" }}
              className="border p-3 "
            >
              <h5 className="fw-bold mb-3">Your bill</h5>
              <p>Total : {totalPrice.toFixed(2)}</p>
              <div className="mb-2">
                <label>Pickup_Time</label>
                <input
                  type="text"
                  className="form-control"
                  value={pickupTime}
                  readOnly
                />
              </div>
              <div className="mb-2">
                <label>Status</label>
                <input
                  type="text"
                  className="form-control"
                  value={status}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
