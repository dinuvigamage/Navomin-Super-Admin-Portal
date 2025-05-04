/* eslint-disable no-unused-vars */
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
import { getOrder, updateOrderStatus } from "../apis/order";
import { getUser } from "../apis/user";

const topTabs = ["Home", "Kitchen", "Tables"];

const NormalOrder = () => {
  const [activeSidebar, setActiveSidebar] = useState("Normal Orders");
  const [activeTopTab, setActiveTopTab] = useState("Home");
  const [searchTerm, setSearchTerm] = useState("");
  const [ordersData, setOrdersData] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchOrders = () => {
      getOrder()
        .then((response) => {
          setOrdersData(response);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    };
    fetchOrders();
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
    if (!Array.isArray(ordersData)) return;
    const filteredOrders = ordersData.filter(
      ({ Order_ID, User_ID }) =>
        String(Order_ID).includes(searchTerm) || // Assuming Order_ID is a number
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
  }, [searchTerm, ordersData, users]);

  const handleStatusChange = (orderId, newStatus) => {
    // Handle status change logic here (e.g., update the order status in the database)
    updateOrderStatus(orderId, newStatus)
      .then((response) => {
        // Optionally, you can refresh the pre-orders list after updating the status
        getOrder()
          .then((response) => {
            setOrdersData(response);
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
    <div className="d-flex max-vh-100">
      {/* Main Content */}
      <div className="flex-grow-1">
        <h1 className="my-2">Normal Orders</h1>

        <div style={{ maxHeight: "100vh" }}>
          <input
            type="text"
            className="form-control my-4"
            placeholder="Search by customer name or order number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

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
              <table className="table table-bordered mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Order Number</th>
                    <th>Customer Name</th>
                    <th>Status</th>
                    <th>Final Price</th>
                    <th>Pickup Time</th>
                    <th>Change Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(filteredOrders) &&
                    filteredOrders.map((order) => (
                      <tr key={order.Order_ID}>
                        <td>{order.Order_ID}</td>
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
                              {order.Total_Amount}
                            </span>
                          </div>
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
                              handleStatusChange(order.Order_ID, e.target.value)
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default NormalOrder;
