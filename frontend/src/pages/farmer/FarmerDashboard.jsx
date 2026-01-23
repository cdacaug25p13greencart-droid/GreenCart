import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";

import FarmerProducts from "./FarmerProducts";
import FarmerOrders from "./FarmerOrders";

function FarmerDashboard() {
  const [section, setSection] = useState("products");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
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
          onClick={() => setSection("products")}
          style={{ cursor: "pointer" }}
        >
          My Products
        </p>

        <p
          onClick={() => setSection("orders")}
          style={{ cursor: "pointer" }}
        >
          Buyer Orders
        </p>

        {/* Logout */}
        <p
          onClick={handleLogout}
          style={{
            cursor: "pointer",
            marginTop: "30px",
            color: "#ffcccb",
            fontWeight: "bold",
          }}
        >
          Logout
        </p>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {section === "products" && <FarmerProducts />}
        {section === "orders" && <FarmerOrders />}
      </div>
    </div>
  );
}

export default FarmerDashboard;
