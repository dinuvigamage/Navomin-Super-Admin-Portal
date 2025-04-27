import { useEffect, useState } from "react";
import {
  addImage,
  addProduct,
  addSize,
  getCategory,
  getProductCategory,
  getProductSize,
  getStock,
  removeImage,
  removeProduct,
  removeSize,
  updateStock,
} from "../apis/products";

const topTabs = ["Stock Update", "Add Item", "Remove Item"];

const Inventory = () => {
  const [activeTopTab, setActiveTopTab] = useState("Stock Update");
  const [category, setCategory] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProductCategory, setSelectedProductCategory] = useState("");

  const [addingProduct, setAddingProduct] = useState({
    Product_ID: "",
    ProductCategory_ID: "",
    Product_Name: "",
    Product_Description: "",
    Size: "",
    Stock: "",
    Price: "",
    Image_Link: "",
  });

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
          console.log("Fetched product categories:", response);
          setProductCategory(response);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    };
    fetchProductCategories();
  }, []);

  const searchStock = async () => {
    getStock(selectedProductCategory)
      .then((response) => {
        console.log("Fetched stock:", response);
        setProducts(response);
      })
      .catch((error) => {
        console.error("Error fetching stock:", error);
      });
    getProductSize()
      .then((response) => {
        console.log("Fetched product size:", response);
        setProductSize(response);
      })
      .catch((error) => {
        console.error("Error fetching product size:", error);
      });
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    // Add your logic to submit the product here
    if (
      !addingProduct.Product_ID ||
      !addingProduct.Product_Name ||
      !addingProduct.Size ||
      !addingProduct.Stock ||
      !addingProduct.Price ||
      !addingProduct.Image_Link ||
      !addingProduct.ProductCategory_ID
    ) {
      alert("Please fill in all fields.");
      return;
    }
    addProduct(addingProduct)
      .then((response) => {
        console.log("Product added successfully:", response);
        alert("Product added successfully!");
        // Reset the form after successful submission
        setAddingProduct({
          Product_ID: "",
          ProductCategory_ID: "",
          Product_Name: "",
          Product_Description: "",
          Size: "",
          Stock: "",
          Price: "",
          Image_Link: "",
        });
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Error adding product. Please try again.");
      });

    addSize(addingProduct)
      .then((response) => {
        console.log("Size added successfully:", response);
        alert("Size added successfully!");
      })
      .catch((error) => {
        console.error("Error adding size:", error);
        alert("Error adding size. Please try again.");
      });

    addImage(addingProduct)
      .then((response) => {
        console.log("Image added successfully:", response);
        alert("Image added successfully!");
      })
      .catch((error) => {
        console.error("Error adding image:", error);
        alert("Error adding image. Please try again.");
      });
    console.log("Product submitted:", addingProduct);
  };

  const submitRemoveProduct = async (Size_ID, Product_ID) => {
    removeProduct(Product_ID)
      .then((response) => {
        console.log("Product removed successfully:", response);
        alert("Stock Cleared and product removed successfully!");
      })
      .catch((error) => {
        console.error("Error removing product:", error);
        alert("Error removing product. Please try again.");
      });
    removeSize(Size_ID)
      .then((response) => {
        console.log("Size removed successfully:", response);
        // alert("Stock Cleared and product removed successfully!");
      })
      .catch((error) => {
        console.error("Error removing size:", error);
        alert("Error removing product. Please try again.");
      });
    removeImage(Product_ID)
      .then((response) => {
        console.log("Image removed successfully:", response);
        // alert("Image removed successfully!");
      })
      .catch((error) => {
        console.error("Error removing image:", error);
        alert("Error removing image. Please try again.");
      });

    searchStock();
  };

  const handleStockChange = () => {
    filteredProducts.forEach((product) => {
      updateStock(product.Size_ID, parseInt(product.Stock))
        .then((response) => {
          console.log("Stock updated successfully:", response);
        })
        .catch((error) => {
          console.error("Error updating stock:", error);
          alert("Error updating stock. Please try again.");
          return;
        });
    });
    alert("Stock updated successfully!");
  };

  useEffect(() => {
    if (!Array.isArray(products)) return;
    if (!Array.isArray(productSize)) return;
    const filteredProducts = productSize.filter((size) =>
      products.some(
        (product) => product.Product_ID == size.Product_ID
        //   && product.ProductCategory_ID == selectedProductCategory
      )
    );

    console.log("Filtered products:", filteredProducts);
    setFilteredProducts(filteredProducts);
  }, [products, productSize, selectedProductCategory]);

  useEffect(() => {
    console.log("addProduct:", addingProduct);
  }, [addingProduct]);

  useEffect(() => {
    // change the addProduct.ProductCategory_ID when the selectedProductCategory changes
    setAddingProduct((prev) => ({
      ...prev,
      ProductCategory_ID: selectedProductCategory,
    }));
  }, [selectedProductCategory]);

  return (
    <div className="container-fluid px-4" style={{ maxHeight: "100vh" }}>
      {/* Top Tabs */}
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="d-flex gap-4">
          {topTabs.map((tab) => (
            <span
              key={tab}
              className={`pb-1 ${
                activeTopTab === tab
                  ? "fw-bold text-primary border-bottom border-primary"
                  : "text-muted"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setActiveTopTab(tab)}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>
      <h1 className="mt-2">Inventory</h1>
      <div className="d-flex flex-row justify-content-between align-items-center mb-2 card p-3">
        {/* <div className="row-md-12">
          <div className="card mb-4"> */}
        {/* category select drop down list */}

        <div
          className="d-flex justify-content-between align-items-center w-45"
          // flex direction="row"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h5 className="mb-2">Select Category</h5>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option selected>Select Category</option>
            {Array.isArray(category) &&
              category.map((cat) => (
                <option key={cat.Category_ID} value={cat.Category_ID}>
                  {cat.Category_Name}
                </option>
              ))}
          </select>
        </div>

        {/* product category select drop down list, list should change according to the selected category */}
        <div
          className="d-flex justify-content-between align-items-center w-45"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h5 className="mb-2">Select Product Category</h5>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => setSelectedProductCategory(e.target.value)}
            value={selectedProductCategory}
          >
            <option selected>Select Product Category</option>
            {Array.isArray(productCategory) &&
              productCategory.map(
                (cat) =>
                  // Only show product categories that belong to the selected category
                  cat.Category_ID == selectedCategory && (
                    <option
                      key={cat.ProductCategory_ID}
                      value={cat.ProductCategory_ID}
                    >
                      {cat.ProductCategory_Name}
                    </option>
                  )
                // <option key={cat.Product_Category_ID} value={cat.Product_Category_ID}>
                //   {cat.Product_Category_Name}
                // </option>
              )}
          </select>
        </div>
        {activeTopTab !== "Add Item" && (
          <div>
            <button
              className="btn btn-primary mt-3"
              onClick={searchStock}
              disabled={!selectedCategory && !selectedProductCategory}
            >
              Search Inventory
            </button>
          </div>
        )}
      </div>

      {activeTopTab === "Stock Update" && (
        <div className="card-body">
          <h5 className="card-title">Inventory List</h5>
          {/* Add your inventory list here */}

          <div
            className="table-responsive"
            style={{
              minHeight: "50vh",
              maxHeight: "50vh",
              overflowY: "auto",
              scrollbarWidth: "none",
              "-ms-overflow-style": "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Size</th>
                  <th>Stock</th>
                  <th>Unit Price</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(filteredProducts) &&
                  filteredProducts.map((product) => (
                    <tr key={product.Size_ID}>
                      <td>{product.Product_ID}</td>
                      <td>
                        {
                          products.find(
                            (product) =>
                              product.Product_ID == product.Product_ID
                          )?.Product_Name
                        }
                      </td>
                      <td>{product.Size}</td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={product.Stock}
                          onChange={(e) => {
                            const newStock = e.target.value;
                            setFilteredProducts((prevProducts) =>
                              prevProducts.map((p) =>
                                p.Size_ID === product.Size_ID
                                  ? { ...p, Stock: newStock }
                                  : p
                              )
                            );
                          }}
                        />
                      </td>
                      <td>{product.Price}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-3 mb-4">
            <button className="btn btn-primary" onClick={handleStockChange}>
              Update Inventory
            </button>
          </div>
        </div>
      )}

      {activeTopTab === "Add Item" && (
        <div className="card-body">
          <h5 className="card-title">Add Item</h5>
          {/* Add your add item form here */}
          <p>Add Item Form</p>
          <div className="d-flex justify-content-center align-items-center mt-3 mb-4">
            <form className="w-100">
              <div
                className="justify-content-between"
                style={{ flexDirection: "row", display: "flex" }}
              >
                <div style={{ width: "45%" }}>
                  <div className="mb-3">
                    <label htmlFor="productID" className="form-label">
                      Product ID
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="productID"
                      value={addingProduct.Product_ID}
                      onChange={(e) =>
                        setAddingProduct({
                          ...addingProduct,
                          Product_ID: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="productName" className="form-label">
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="productName"
                      value={addingProduct.Product_Name}
                      onChange={(e) =>
                        setAddingProduct({
                          ...addingProduct,
                          Product_Name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="productDescription" className="form-label">
                      Product Description
                    </label>
                    <textarea
                      className="form-control"
                      id="productDescription"
                      rows="3"
                      value={addingProduct.Product_Description}
                      onChange={(e) =>
                        setAddingProduct({
                          ...addingProduct,
                          Product_Description: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                </div>
                <div style={{ width: "45%" }}>
                  <div className="mb-3">
                    <label htmlFor="productSize" className="form-label">
                      Size
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="productSize"
                      value={addingProduct.Size}
                      onChange={(e) =>
                        setAddingProduct({
                          ...addingProduct,
                          Size: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="productStock" className="form-label">
                      Stock
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="productStock"
                      value={addingProduct.Stock}
                      onChange={(e) =>
                        setAddingProduct({
                          ...addingProduct,
                          Stock: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="productPrice" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="productPrice"
                      value={addingProduct.Price}
                      onChange={(e) =>
                        setAddingProduct({
                          ...addingProduct,
                          Price: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="productImage" className="form-label">
                      Image Link
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="productImage"
                      value={addingProduct.Image_Link}
                      onChange={(e) =>
                        setAddingProduct({
                          ...addingProduct,
                          Image_Link: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={submitProduct}
                >
                  Add Item
                </button>
                {/* <button
                  type="reset"
                  className="btn btn-secondary ms-2"
                  onClick={() => {
                    setAddProduct({
                      Product_ID: undefined,
                      ProductCategory_ID: undefined,
                      Product_Name: undefined,
                      Product_Description: "",
                      Size: undefined,
                      Stock: "",
                      Price: undefined,
                      Image_Link: undefined,
                    });
                  }}
                >
                  Reset
                </button> */}
                <button
                  type="button"
                  className="btn btn-danger ms-2"
                  onClick={() => {
                    setActiveTopTab("Stock Update");
                    setAddingProduct({
                      Product_ID: undefined,
                      ProductCategory_ID: undefined,
                      Product_Name: undefined,
                      Product_Description: "",
                      Size: undefined,
                      Stock: "",
                      Price: undefined,
                      Image_Link: undefined,
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeTopTab === "Remove Item" && (
        <div className="card-body">
          <h5 className="card-title">Inventory List</h5>
          {/* Add your inventory list here */}

          <div
            className="table-responsive"
            style={{
              minHeight: "50vh",
              maxHeight: "50vh",
              overflowY: "auto",
              scrollbarWidth: "none",
              "-ms-overflow-style": "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Size</th>
                  <th>Stock</th>
                  <th>Unit Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(filteredProducts) &&
                  filteredProducts.map((product) => (
                    <tr key={product.Size_ID}>
                      <td>{product.Product_ID}</td>
                      <td>
                        {
                          products.find(
                            (product) =>
                              product.Product_ID == product.Product_ID
                          )?.Product_Name
                        }
                      </td>
                      <td>{product.Size}</td>
                      <td>
                        <input
                          // type="number"
                          className="form-control"
                          value={product.Stock}
                          onChange={(e) => {
                            const newStock = e.target.value;
                            setFilteredProducts((prevProducts) =>
                              prevProducts.map((p) =>
                                p.Size_ID === product.Size_ID
                                  ? { ...p, Stock: newStock }
                                  : p
                              )
                            );
                          }}
                        />
                      </td>
                      <td>{product.Price}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            submitRemoveProduct(
                              product.Size_ID,
                              product.Product_ID
                            );
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
