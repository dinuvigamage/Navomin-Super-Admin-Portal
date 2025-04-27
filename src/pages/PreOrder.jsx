import React, { useEffect, useState } from "react";
import {
  FiGrid,
  FiFileText,
  FiShoppingCart,
  FiMessageSquare,
  FiArchive,
  FiUsers,
  FiLogOut,
} from "react-icons/fi";
import { getPreOrder, updatePreOrderStatus } from "../apis/order";
import { getUser } from "../apis/user";

// const preOrders = [
//   {
//     id: "PO001",
//     name: "John Doe",
//     status: "Pending|Ready for Pickup",
//     price: 500,
//   },
//   {
//     id: "PO002",
//     name: "Jane Smith",
//     status: "Confirmed|Awaiting Pickup",
//     price: 700,
//   },
//   {
//     id: "PO003",
//     name: "Michael Johnson",
//     status: "Cancelled|Refunded",
//     price: 300,
//   },
//   {
//     id: "PO004",
//     name: "Emily Brown",
//     status: "Pending|Ready for Pickup",
//     price: 900,
//   },
//   {
//     id: "PO005",
//     name: "David Wilson",
//     status: "Confirmed|Awaiting Pickup",
//     price: 1000,
//   },
//   {
//     id: "PO006",
//     name: "Sarah White",
//     status: "Pending|Ready for Pickup",
//     price: 4,
//   },
// ];

const PreOrder = () => {
  const [preOrders, setPreOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchPreOrders = () => {
      getPreOrder()
        .then((response) => {
          setPreOrders(response);
        })
        .catch((error) => {
          console.error("Error fetching pre-orders:", error);
        });
    };
    fetchPreOrders();
  }, []);

  useEffect(() => {
    const fetchUserData = () => {
      getUser()
        .then((response) => {
          setUsers(response);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (!Array.isArray(preOrders)) return;
    const filteredOrders = preOrders.filter(
      // ({ orderNumber, customer }) =>
      //   orderNumber.includes(searchTerm) ||
      //   customer.toLowerCase().includes(searchTerm.toLowerCase())
      ({ Pre_Order_ID, User_ID }) =>
        String(Pre_Order_ID).includes(searchTerm) || // Assuming Order_ID is a number
        users
          .find((user) => user.User_ID === User_ID)
          .First_Name.toLowerCase()
          .includes(searchTerm.toLowerCase()) || // Assuming User_ID is a number
        users
          .find((user) => user.User_ID === User_ID)
          .Last_Name.toLowerCase()
          .includes(searchTerm.toLowerCase()) || // Assuming User_ID is a number
        // include both first and last name in the search
        users
          .find((user) => user.User_ID === User_ID)
          .First_Name.toLowerCase()
          .concat(
            " ",
            users
              .find((user) => user.User_ID === User_ID)
              .Last_Name.toLowerCase()
          )
          .includes(searchTerm.toLowerCase()) // Assuming User_ID is a number
    );
    setFilteredOrders(filteredOrders);
  }, [searchTerm, preOrders, users]);

  const handleStatusChange = (orderId, newStatus) => {
    // Handle status change logic here (e.g., update the order status in the database)
    console.log(`Order ID: ${orderId}, New Status: ${newStatus}`);
    updatePreOrderStatus(orderId, newStatus)
      .then((response) => {
        console.log("Status updated successfully:", response);

        // Optionally, you can refresh the pre-orders list after updating the status
        getPreOrder()
          .then((response) => {
            setPreOrders(response);
          })
          .catch((error) => {
            console.error("Error fetching pre-orders:", error);
          });
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  return (
    <div className="d-flex" style={{ maxHeight: "100vh" }}>
      {/* Main Content */}
      <div className="flex-grow-1 p-2">
        <h1 className="mb-2">Pre Orders</h1>

        <input
          type="text"
          className="form-control my-4"
          placeholder="Search by customer name or order number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Table */}
        <div
          className="pb-2 border-1 rounded-3 shadow-sm bg-black"
          style={{
            maxHeight: "75vh",
          }}
        >
          <div
            className="table-responsive"
            style={{
              maxHeight: "70vh",
              overflowY: "auto",
              scrollbarWidth: "none",
              "-ms-overflow-style": "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <table className="table align-middle table-bordered">
              <thead className="table-light">
                <tr>
                  <th>Pre-Order Number</th>
                  <th>Customer Name</th>
                  <th>Status</th>
                  <th>Final Price</th>
                  <th>Pickup Date</th>
                  <th>Pickup Time</th>
                  <th>Change Status</th>
                  {/* <th>Send message</th> */}
                </tr>
              </thead>
              <tbody>
                {Array.isArray(filteredOrders) &&
                  filteredOrders.map((order) => (
                    <tr key={order.Pre_Order_ID}>
                      <td>
                        {/* <a href="#" className="text-decoration-underline"> */}
                        {order.Pre_Order_ID}
                        {/* </a> */}
                      </td>
                      <td>
                        {users.find((user) => (user.User_ID = order.User_ID))
                          ?.First_Name +
                          " " +
                          users.find((user) => (user.User_ID = order.User_ID))
                            ?.Last_Name}
                      </td>
                      <td>{order.Status}</td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-text">Rs</span>
                          <span className="form-control">
                            {order.Estimated_Total}
                          </span>
                        </div>
                      </td>
                      <td>
                        {
                          // Format the date to "YYYY-MM-DD"
                          new Date(order.Pickup_Date).toLocaleDateString(
                            "en-CA"
                          )
                        }
                      </td>
                      <td>
                        {
                          // remove seconds from the time string
                          order?.Pickup_Time &&
                            order?.Pickup_Time.split(":")
                              .slice(0, 2)
                              .join(":") +
                              " " +
                              (order?.Pickup_Time.split(":")[0] >= 12
                                ? "PM"
                                : "AM")
                        }
                      </td>
                      <td>
                        <select
                          className="form-select"
                          onChange={(e) =>
                            handleStatusChange(
                              order.Pre_Order_ID,
                              e.target.value
                            )
                          }
                        >
                          <option value="" disabled selected>
                            Select Status
                          </option>
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Ready for Pickup">
                            Ready for Pickup
                          </option>
                        </select>
                      </td>
                      {/* <td>
                        <button className="btn btn-success">Send</button>
                      </td> */}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreOrder;
