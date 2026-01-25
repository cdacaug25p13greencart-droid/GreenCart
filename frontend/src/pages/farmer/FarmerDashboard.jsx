import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";

import MyProducts from "./MyProducts";
import AddProduct from "./AddProduct";
import FarmerOrders from "./FarmerOrders";

function FarmerDashboard() {
  const [section, setSection] = useState("my-products");
  const [productToEdit, setProductToEdit] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setSection("add-product");
  };

  const handleBackToProducts = () => {
    setProductToEdit(null);
    setSection("my-products");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: "#2e7d32",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2>Farmer Panel</h2>

        <p
          onClick={() => {
            setProductToEdit(null);
            setSection("my-products");
          }}
          style={{
            cursor: "pointer",
            padding: "10px",
            background: section === "my-products" ? "#1b5e20" : "transparent",
            borderRadius: "5px",
            marginBottom: "5px"
          }}
        >
          📦 My Products
        </p>

        <p
          onClick={() => {
            setProductToEdit(null);
            setSection("add-product");
          }}
          style={{
            cursor: "pointer",
            padding: "10px",
            background: section === "add-product" ? "#1b5e20" : "transparent",
            borderRadius: "5px",
            marginBottom: "5px"
          }}
        >
          ➕ Add Product
        </p>

        <p
          onClick={() => setSection("orders")}
          style={{
            cursor: "pointer",
            padding: "10px",
            background: section === "orders" ? "#1b5e20" : "transparent",
            borderRadius: "5px",
            marginBottom: "5px"
          }}
        >
          🧾 Buyer Orders
        </p>

        {/* Logout */}
        <p
          onClick={handleLogout}
          style={{
            cursor: "pointer",
            marginTop: "30px",
            padding: "10px",
            color: "#ffcccb",
            fontWeight: "bold",
            borderRadius: "5px",
            background: "#c62828"
          }}
        >
          🚪 Logout
        </p>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "20px", background: "#f5f5f5" }}>
        {section === "my-products" && (
          <MyProducts
            onAddProductClick={() => setSection("add-product")}
            onEditProduct={handleEditProduct}
          />
        )}
        {section === "add-product" && (
          <AddProduct
            productToEdit={productToEdit}
            onBackToProducts={handleBackToProducts}
          />
        )}
        {section === "orders" && <FarmerOrders />}
      </div>
    </div>
  );
}

export default FarmerDashboard;
