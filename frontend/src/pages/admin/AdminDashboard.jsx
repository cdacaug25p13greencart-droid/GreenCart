import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";

import ManageAccounts from "./ManageAccounts";
import ProductsList from "./ProductsList";
import OrdersList from "./OrdersList";

function AdminDashboard() {
  const [section, setSection] = useState("accounts");

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
        <h2>Admin Panel</h2>

        <p onClick={() => setSection("accounts")} style={{ cursor: "pointer" }}>
          Manage Accounts
        </p>
        <p onClick={() => setSection("products")} style={{ cursor: "pointer" }}>
          Products
        </p>
        <p onClick={() => setSection("orders")} style={{ cursor: "pointer" }}>
          Orders
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
        {section === "accounts" && <ManageAccounts />}
        {section === "products" && <ProductsList />}
        {section === "orders" && <OrdersList />}
      </div>
    </div>
  );
}

export default AdminDashboard;
