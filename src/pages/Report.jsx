import { FiLogOut } from "react-icons/fi";
import { FaDownload, FaPrint } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import {
  getCategory,
  getProductCategory,
  getProducts,
  getProductSize,
  getStock,
} from "../apis/products";
import { generateStockPDF, generateSalesPDF } from "../generatePdf";
import { getOrder, getPreOrder } from "../apis/order";
import { getUser } from "../apis/user";

const reortTypes = [
  { id: 1, name: "Stocks" },
  { id: 2, name: "Sales" },
];

const Report = () => {
  const [category, setCategory] = useState("");
  const [productCategory, setProductCategory] = useState("");

  const [products, setProducts] = useState([]);
  const [productSize, setProductSize] = useState([]);

  const [report, setReport] = useState([]);
  const [reportReady, setReportReady] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const [ordersData, setOrdersData] = useState([]);
  const [preOrders, setPreOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      getCategory()
        .then((response) => {
          setCategory(response);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProductCategories = async () => {
      getProductCategory()
        .then((response) => {
          setProductCategory(response);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    };
    fetchProductCategories();
  }, []);

  const searchStock = async () => {
    getProducts()
      .then((response) => {
        setProducts(response);
      })
      .catch((error) => {
        console.error("Error fetching stock:", error);
      });
    getProductSize()
      .then((response) => {
        setProductSize(response);
      })
      .catch((error) => {
        console.error("Error fetching product size:", error);
      });
  };

  useEffect(() => {
    searchStock();
  }, []);

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

  // generate the report of stock category, product category, product and product size wise
  const generateReport = async () => {
    if (selectedReportType == 1) {
      const report = category.map((cat) => {
        const catProducts = productCategory
          .filter((prodCat) => prodCat.Category_ID === cat.Category_ID)
          .map((prodCat) => {
            const prodList = products
              .filter(
                (prod) => prod.ProductCategory_ID === prodCat.ProductCategory_ID
              )
              .map((prod) => {
                const matchedSizes = productSize
                  .filter((size) => size.Product_ID == prod.Product_ID)
                  .map((size) => ({
                    product: prod.Product_Name,
                    size: size.Size,
                    quantity: size.Stock,
                  }));

                return matchedSizes; // This will be an array
              })
              .flat(); // Flatten nested arrays of sizes

            return {
              productCategory: prodCat.ProductCategory_Name, // Or ID if you prefer
              products: prodList,
            };
          });

        return {
          category: cat.Category_Name,
          productCategory: catProducts,
        };
      });
      setReport(report);
    }

    if (selectedReportType == 2) {
      const report = [
        {
          type: "Normal Order",
          orders: ordersData.map((order) => {
            const user = users.find((user) => user.User_ID === order.User_ID);
            return {
              orderNumber: order.Order_ID,
              customerName: `${user.First_Name} ${user.Last_Name}`,
              // remove seconds from the time string
              time:
                order?.Pickup_Time &&
                order?.Pickup_Time.split(":").slice(0, 2).join(":") +
                  " " +
                  (order?.Pickup_Time.split(":")[0] >= 12 ? "PM" : "AM"),
              status: order.Status,
              totalAmount: order.Total_Amount,
            };
          }),
        },
        {
          type: "Pre Order",
          orders: preOrders.map((order) => {
            const user = users.find((user) => user.User_ID === order.User_ID);
            return {
              orderNumber: order.Pre_Order_ID,
              customerName: `${user.First_Name} ${user.Last_Name}`,
              // Format the date to "YYYY-MM-DD"
              date: new Date(order.Pickup_Date).toLocaleDateString("en-CA"),
              // remove seconds from the time string
              time:
                order?.Pickup_Time &&
                order?.Pickup_Time.split(":").slice(0, 2).join(":") +
                  " " +
                  (order?.Pickup_Time.split(":")[0] >= 12 ? "PM" : "AM"),
              status: order.Status,
              totalAmount: order.Estimated_Total,
            };
          }),
        },
      ];
      setReport(report);
    }
  };

  useEffect(() => {
    if (report.length > 0) {
      setReportReady(true);
    } else {
      setReportReady(false);
    }
  }, [report]);

  const handleDownload = () => {
    if (reportReady) {
      if (selectedReportType == 1) {
        generateStockPDF(report);
      } else if (selectedReportType == 2) {
        generateSalesPDF(report);
      }
    } else {
      console.log("No report available to download.");
    }
  };

  return (
    <div className="container-fluid p-4">
      {/* Report Selection Section */}
      <div>
        <h5 className="fw-bold mb-3">Select Report</h5>
        <select
          className="form-select mb-4"
          style={{ maxWidth: "200px" }}
          onChange={(e) => setSelectedReportType(e.target.value)}
          value={selectedReportType}
        >
          <option value="" disabled selected>
            Select Report Type
          </option>
          {reortTypes.map((reportType) => (
            <option key={reportType.id} value={reportType.id}>
              {reportType.name}
            </option>
          ))}
        </select>
      </div>

      {/* Report Filter Section */}
      <div>
        <h5 className="fw-bold mb-3">Select Date Range</h5>
        <div className="d-flex align-items-center gap-3 mb-4">
          <button className="btn btn-primary" onClick={generateReport}>
            Generate Report
          </button>
        </div>
      </div>

      {/* Other Buttons on the page */}
      {reportReady && (
        <div className="d-flex flex-column align-items-center mt-5">
          <h4>Download Report</h4>
          <div className="d-flex justify-content-end">
            <FaDownload
              className="text-primary me-3"
              style={{ cursor: "pointer", fontSize: "30px" }}
              onClick={handleDownload}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;
